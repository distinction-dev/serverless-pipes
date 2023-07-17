import Serverless from "serverless";
import { FromSchema } from "json-schema-to-ts";
import { schema } from "./schema";
import {
  DynamoDBSourceParameters,
  EnrichmentParameter,
  FilterCriteria,
  KinesisStreamSourceParameter,
  LambdaTargetParameter,
  SNSTargetParameter,
  SQSSourceParameter,
  SQSTargetParameter,
  StepFunctionTargetParameter,
} from "./models";
import { get, removeEmptyProperties } from "./util";
import {
  compileBasedOnSourceType,
  compileBasedOnTargetType,
  compileFilterPatterns,
  getSourceArn,
  getTargetArn,
} from "./compiler";

interface ServerlessPluginOptions {
  globalOptions?: boolean;
}
class ServerlessPipes {
  serverless: Serverless;
  options: ServerlessPluginOptions;
  config: any;
  hooks: { "package:compileFunctions": any };
  constructor(serverless: Serverless, options: ServerlessPluginOptions) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {
      "package:compileFunctions": this.buildEventBridgePipes.bind(this),
    };
    type pipesSchema = FromSchema<typeof schema>;
    this.serverless.configSchemaHandler.defineTopLevelProperty("pipes", schema);
    const config: pipesSchema = get(
      this.serverless,
      "configurationInput.pipes",
      {}
    );
    if (!Object.keys(config).length) return;
    this.config = config;
  }

  buildEventBridgePipes() {
    const PipeName = Object.keys(this.config)[0];

    const pipesDescription: string = this.config[PipeName]?.description || "";
    const pipesDesiredState: string = this.config[PipeName]?.desiredState || "";

    // get source ARN
    const sourceARN: string = getSourceArn(this.config, PipeName);

    // get target ARN
    const targetARN: string = getTargetArn(this.config, PipeName);

    // get source parameters
    const sourceCompiledResources:
      | SQSSourceParameter
      | DynamoDBSourceParameters
      | KinesisStreamSourceParameter
      | Record<string, any> = compileBasedOnSourceType(this.config, PipeName);

    // get target parameters
    const targetCompiledResources:
      | SNSTargetParameter
      | LambdaTargetParameter
      | StepFunctionTargetParameter
      | SQSTargetParameter
      | Record<string, any> = compileBasedOnTargetType(this.config, PipeName);

    // get filter parameters
    const filterParameters: FilterCriteria = compileFilterPatterns(
      this.config,
      PipeName
    );

    // get enrichment parameters
    const enrichmentParameters: EnrichmentParameter = {
      FunctionName: this.config[PipeName]?.enrichment?.name || "",
    };

    // create pipes resource template
    const PipesTemplate = this.generatePipesResourceStack(
      PipeName,
      pipesDescription,
      pipesDesiredState,
      sourceARN,
      targetARN,
      sourceCompiledResources,
      targetCompiledResources,
      filterParameters,
      enrichmentParameters
    );

    // create iam roles resource template
    const iamRolesPipes = this.generateIAMRole();

    // merge the pipes & iam roles template in the main template of application
    const template =
      this.serverless.service.provider.compiledCloudFormationTemplate;
    template.Resources = {
      ...template.Resources,
      ...iamRolesPipes.Resources,
      ...PipesTemplate.Resources,
    };
  }

  generateIAMRole() {
    const PipeName = Object.keys(this.config)[0];
    return {
      Resources: {
        [`${PipeName}PipesIAMRole`]: {
          Type: "AWS::IAM::Role",
          Properties: {
            RoleName: `${PipeName}-pipes-iam-role`,
            AssumeRolePolicyDocument: {
              Version: "2012-10-17",
              Statement: [
                {
                  Effect: "Allow",
                  Principal: {
                    Service: ["pipes.amazonaws.com"],
                  },
                  Action: ["sts:AssumeRole"],
                },
              ],
            },
            Policies:
              this.config[PipeName].iamRolePipes.statements.length > 0
                ? [
                    {
                      PolicyName: "EventBridgePipesPolicy",
                      PolicyDocument: {
                        Version: "2012-10-17",
                        Statement:
                          this.config[PipeName].iamRolePipes.statements,
                      },
                    },
                  ]
                : [],
          },
        },
      },
    };
  }

  generatePipesResourceStack(
    pipeName: string,
    pipesDescription: string,
    pipesDesiredState: string,
    sourceARN: string,
    targetARN: string,
    sourceParameters:
      | SQSSourceParameter
      | DynamoDBSourceParameters
      | KinesisStreamSourceParameter
      | Record<string, any>,
    targetParameters:
      | SNSTargetParameter
      | LambdaTargetParameter
      | StepFunctionTargetParameter
      | SQSTargetParameter
      | Record<string, any>,
    filterParameters: FilterCriteria,
    enrichmentParameters: EnrichmentParameter
  ) {
    const pipesIamRoleLogicalName = `${pipeName}PipesIAMRole`;
    const pipesSourceProperty = {
      ...sourceParameters,
      ...filterParameters,
    };
    let enrichmentFunctionArn: string | Record<string, any> = {};
    if (enrichmentParameters.FunctionName !== "") {
      if (
        Object.keys(this.serverless.service.functions).includes(
          enrichmentParameters.FunctionName
        )
      ) {
        const enrichmentFunctionName: string =
          enrichmentParameters.FunctionName.includes("-")
            ? (
                enrichmentParameters.FunctionName.charAt(0).toUpperCase() +
                enrichmentParameters.FunctionName.slice(1)
              ).replace(/-/g, "Dash")
            : enrichmentParameters.FunctionName.charAt(0).toUpperCase() +
              enrichmentParameters.FunctionName.slice(1);
        enrichmentFunctionArn = {
          "Fn::GetAtt": [`${enrichmentFunctionName}LambdaFunction`, "Arn"],
        };
      } else {
        throw new this.serverless["classes"].Error(
          `Lambda Function Not Found: The value of name property ( ${enrichmentParameters.FunctionName} ) in enrichment property of pipes doesnt seems to be matching with any function name defined in functions property.`
        );
      }
    }
    const Resources = {
      [pipeName + "EventBridgePipes"]: {
        Type: "AWS::Pipes::Pipe",
        Properties: {
          Description: pipesDescription,
          DesiredState: pipesDesiredState,
          Source: sourceARN,
          Target: targetARN,
          SourceParameters: pipesSourceProperty,
          TargetParameters: targetParameters,
          Enrichment: enrichmentFunctionArn,
          RoleArn: { "Fn::GetAtt": [`${pipesIamRoleLogicalName}`, "Arn"] },
        },
      },
    };

    // delete/remove all the empty/undefined/null properties from the Resources object to avoid any unwanted issues.
    removeEmptyProperties(Resources);
    return {
      Resources,
    };
  }
}

module.exports = ServerlessPipes;
