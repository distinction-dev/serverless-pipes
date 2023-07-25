import Serverless from "serverless";
import { FromSchema } from "json-schema-to-ts";
import { schema } from "./schema";
import {
  EnrichmentParameter,
  getEnrichmentLambdaFunctionIAMRole,
  getSharedIAMRole,
} from "./models";
import { get, removeEmptyProperties } from "./util";
import Ajv from "ajv";
import {
  compileBasedOnSourceType,
  compileBasedOnTargetType,
  compileFilterPatterns,
  generateSourceIAMRole,
  generateTargetIAMRole,
  getDesiredStateOfPipe,
  getSourceArn,
  getTargetArn,
} from "./compiler";
import {
  AWSPipesPipePipeSourceParametersDefinition,
  AWSPipesPipePipeTargetParametersDefinition,
  AWSPipesPipeRequestedPipeStateDefinition,
} from "serverless-schema";

export interface ServerlessPluginOptions {
  globalOptions?: boolean;
}
export class ServerlessPipes {
  serverless: Serverless;
  options: ServerlessPluginOptions;
  config: any;
  hooks: { "package:compileFunctions": any };
  extendedServerless: Serverless & { classes: { Error: typeof Error } };
  sharedIAMRoleCount: number;
  sharedIAMRoleARN: string;
  constructor(serverless: Serverless, options: ServerlessPluginOptions) {
    this.serverless = serverless;
    this.extendedServerless = serverless as Serverless & {
      classes: { Error: typeof Error };
    };
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
    this.sharedIAMRoleARN = "EventBridgePipesSharedIAMRole";
    this.sharedIAMRoleCount = 0;
  }

  buildEventBridgePipes(): void {
    for (const pipe of Object.keys(this.config)) {
      // validate input
      this.validateInput();

      // pipe description
      const pipesDescription: string = this.config[pipe]?.description || "";

      // get pipe desiredState
      const pipesDesiredState: AWSPipesPipeRequestedPipeStateDefinition =
        getDesiredStateOfPipe(this.config[pipe]);

      // get source ARN
      const sourceARN: string = getSourceArn(this.config[pipe]);
      sourceARN.length && this.validateArn(sourceARN, "source", pipe);

      // get target ARN
      const targetARN: string = getTargetArn(this.config[pipe]);
      targetARN.length && this.validateArn(targetARN, "target", pipe);

      // get source parameters
      const sourceCompiledResources: AWSPipesPipePipeSourceParametersDefinition =
        compileBasedOnSourceType(this.config[pipe]);

      // get target parameters
      const targetCompiledResources: AWSPipesPipePipeTargetParametersDefinition =
        compileBasedOnTargetType(this.config[pipe]);

      // get filter parameters
      const filterParameters: AWSPipesPipePipeSourceParametersDefinition =
        compileFilterPatterns(this.config[pipe]);

      // get enrichment parameters
      const enrichmentParameters: EnrichmentParameter = {
        FunctionName: this.config[pipe]?.enrichment?.name || "",
      };

      // create pipes resource template
      const PipesTemplate = this.generatePipesResourceStack(
        pipe,
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
      const iamRolesPipes = this.generateIAMRole(pipe);
      this.config[pipe]?.iamRolePipes?.type === "shared" &&
        this.sharedIAMRoleCount++;

      // merge the pipes & iam roles template in the main template of application
      const template =
        this.serverless.service.provider.compiledCloudFormationTemplate;

      if (
        this.config[pipe]?.iamRolePipes?.type.length > 0 ||
        this.sharedIAMRoleCount === 1
      ) {
        template.Resources = {
          ...template.Resources,
          ...iamRolesPipes.Resources,
          ...PipesTemplate.Resources,
        };
      } else {
        template.Resources = {
          ...template.Resources,
          ...PipesTemplate.Resources,
        };
      }
    }
  }

  generateIAMRole(PipeName: string): Record<string, any> {
    // CF Resource Template for IAM Role for EventBridgePipes
    return {
      Resources: {
        [this.config[PipeName]?.iamRolePipes?.type === "individual"
          ? `${PipeName}PipesIAMRole`
          : this.config[PipeName]?.iamRolePipes?.type === "shared"
          ? this.sharedIAMRoleARN
          : ""]: {
          Type: "AWS::IAM::Role",
          Properties: {
            RoleName:
              this.config[PipeName]?.iamRolePipes?.type === "individual"
                ? `${PipeName}-pipes-iam-role`
                : this.config[PipeName]?.iamRolePipes?.type === "shared"
                ? "shared-pipes-iam-role"
                : "",
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
              this.config[PipeName]?.iamRolePipes?.type === "individual"
                ? [
                    {
                      PolicyName: "EventBridgePipesPolicy",
                      PolicyDocument: {
                        Version: "2012-10-17",
                        Statement: [
                          generateSourceIAMRole(this.config, PipeName)
                            .Statement,
                          generateTargetIAMRole(this.config, PipeName)
                            .Statement,
                          getEnrichmentLambdaFunctionIAMRole().Statement,
                        ],
                      },
                    },
                  ]
                : this.config[PipeName]?.iamRolePipes?.type === "shared"
                ? [getSharedIAMRole().Statement]
                : [],
          },
        },
      },
    };
  }

  generatePipesResourceStack(
    pipeName: string,
    pipesDescription: string,
    pipesDesiredState: AWSPipesPipeRequestedPipeStateDefinition,
    sourceARN: string,
    targetARN: string,
    sourceParameters: AWSPipesPipePipeSourceParametersDefinition,
    targetParameters: AWSPipesPipePipeTargetParametersDefinition,
    filterParameters: AWSPipesPipePipeSourceParametersDefinition,
    enrichmentParameters: EnrichmentParameter
  ): Record<string, any> {
    // individual iamRolePipes type pipes name
    const pipesIamRoleLogicalName = `${pipeName}PipesIAMRole`;

    // generating final SourceParameters
    const pipesSourceProperty = {
      ...sourceParameters,
      ...filterParameters,
    };

    // generating Enrichment Lambda Function Arn
    let enrichmentFunctionArn: string | Record<string, any> = {};
    if (enrichmentParameters.FunctionName !== "") {
      if (
        Object.keys(this.serverless.service.functions).includes(
          enrichmentParameters.FunctionName
        )
      ) {
        const enrichmentFunctionName: string = this.serverless.providers[
          "aws"
        ].naming.getNormalizedFunctionName(enrichmentParameters.FunctionName);
        enrichmentFunctionArn = {
          "Fn::GetAtt": [`${enrichmentFunctionName}LambdaFunction`, "Arn"],
        };
      } else {
        throw new this.extendedServerless["classes"].Error(
          `Lambda Function Not Found: The value of name property ( ${enrichmentParameters.FunctionName} ) in enrichment property of pipes doesnt seems to be matching with any function name defined in functions property.`
        );
      }
    }

    // generating IAM Role ARN for EventBridge Pipes
    const RoleArn: string =
      this.config[pipeName].iamRolePipes?.type.length > 0
        ? this.config[pipeName].iamRolePipes?.type === "shared"
          ? { "Fn::GetAtt": [`${this.sharedIAMRoleARN}`, "Arn"] }
          : { "Fn::GetAtt": [`${pipesIamRoleLogicalName}`, "Arn"] }
        : this.serverless.service.provider["iamRoleStatements"].length > 0
        ? this.serverless.providers["aws"].naming.getRoleName(
            this.serverless.service.provider["iamRoleStatements"]
          )
        : "";

    // CF Resource Template for EventBridgePipes
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
          RoleArn,
        },
      },
    };

    // delete/remove all the empty/undefined/null properties from the Resources object to avoid any unwanted issues.
    removeEmptyProperties(Resources);

    // check all the required parameters are persisted after removal of empty/undefined/null properties
    const propertiesToCheck = ["Source", "Target", "RoleArn"];
    const hasAllRequiredPipesParameters = propertiesToCheck.every(
      prop => prop in Resources[pipeName + "EventBridgePipes"].Properties
    );
    if (!hasAllRequiredPipesParameters) {
      throw new this.extendedServerless["classes"].Error(
        "EventBridge Pipes Resource creation Failed: Invalid CloudFormation Template for AWS::Pipes::Pipe. Check your pipes plugin configuration."
      );
    }
    return {
      Resources,
    };
  }

  validateInput(): void {
    const ajv = new Ajv({ messages: true, allErrors: true });
    const schemaObject = schema;
    const pipesData = this.config;
    const compileInput: Record<string, any> = ajv.compile(schema);
    const validatedInput = ajv.validate(schemaObject, pipesData);

    if (!validatedInput) {
      let errorMessage = "";
      for (const error of compileInput.errors) {
        if (error.keyword === "required") {
          const missingProperty: string = error?.params?.missingProperty;
          const path: string = error?.instancePath;
          errorMessage += `${missingProperty} property is missing at ${path} path in pipes plugin, `;
        } else if (error.keyword === "type") {
          const message: string = error?.message;
          const path: string = error?.instancePath;
          errorMessage += `At ${path} path, it ${message} or should have all its required properties, `;
        } else {
          const message: string = error?.message;
          const path: string = error?.instancePath;
          errorMessage += `At ${path} path - ${message}, `;
        }
      }

      if (errorMessage.length) {
        throw new this.extendedServerless["classes"].Error(
          `EventBridge Pipes Resource creation Failed: ${errorMessage.slice(
            0,
            -2
          )}`
        );
      }
    }
  }

  validateArn(
    arn: string | Record<string, any>,
    type: string,
    pipe: string
  ): void {
    const arnRegex = new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9-]+):([a-z]{2}((-gov)|(-iso(b?)))?-[a-z]+-d{1})?:(d{12})?:(.+)$"
    );
    if (typeof arn === "object") arn = Object.keys(arn)[0];
    if (
      !(
        arn?.startsWith("Ref") ||
        arn?.startsWith("Fn::GetAtt:") ||
        arn?.startsWith("Fn::Sub:") ||
        arnRegex?.test(arn)
      )
    ) {
      throw new this.extendedServerless["classes"].Error(
        `EventBridge Pipes Resource creation Failed: arn property is invalid for ${pipe}.${type}`
      );
    }
  }
}

// comment when doing unit testing
module.exports = ServerlessPipes;
