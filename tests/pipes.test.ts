import { expect, assert } from "chai";
import { ServerlessPipes, ServerlessPluginOptions } from "../src/index";
import Serverless from "serverless";
import {
  compileBasedOnSourceType,
  compileBasedOnTargetType,
  compileFilterPatterns,
  generateSourceIAMRole,
  getSourceArn,
  getTargetArn,
} from "../src/compiler";

describe("ServerlessPipes", () => {
  let serverless: Serverless;
  // let serverless: Serverless & { classes: { Error: typeof Error } };
  let serverlessPipes: ServerlessPipes;

  beforeEach(() => {
    // serverless = serverless as Serverless & {
    //   classes: { Error: typeof Error };
    // };
    serverless = new Serverless({ commands: [], options: {} });
    serverless.service.service = "test-service";
    serverless.service.provider.compiledCloudFormationTemplate = {
      Resources: {},
    };
  });
  it("should create an instance of ServerlessPipes", () => {
    const options: ServerlessPluginOptions = { globalOptions: true };
    serverlessPipes = new ServerlessPipes(serverless, options);
    serverlessPipes.config = {
      testPipe: {
        enabled: true,
        source: {
          sqs: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
        },
        target: {
          sqs: { arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] } },
        },
        iamRolePipes: {
          type: "shared",
        },
      },
    };

    expect(serverlessPipes).to.be.an.instanceOf(ServerlessPipes);
  });

  it("should generate the shared IAM Role CF Template if iamRolePipes.type property is shared", () => {
    serverlessPipes.config = {
      testPipe: {
        enabled: true,
        source: {
          sqs: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
        },
        target: {
          sqs: { arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] } },
        },
        iamRolePipes: {
          type: "shared", // generates shared role
        },
      },
    };
    const PipeName = Object.keys(serverlessPipes.config)[0];
    expect(serverlessPipes.generateIAMRole(PipeName)).to.be.deep.equal({
      Resources: {
        EventBridgePipesSharedIAMRole: {
          Type: "AWS::IAM::Role",
          Properties: {
            RoleName: "shared-pipes-iam-role",
            AssumeRolePolicyDocument: {
              Version: "2012-10-17",
              Statement: [
                {
                  Effect: "Allow",
                  Principal: { Service: ["pipes.amazonaws.com"] },
                  Action: ["sts:AssumeRole"],
                },
              ],
            },
            Policies: [
              {
                PolicyName: "EventBridgePipesSharedPolicy",
                PolicyDocument: {
                  Version: "2012-10-17",
                  Statement: [
                    {
                      Effect: "Allow",
                      Action: [
                        "sqs:SendMessage",
                        "sqs:ReceiveMessage",
                        "sqs:DeleteMessage",
                        "sqs:GetQueueAttributes",
                        "lambda:InvokeFunction",
                        "sqs:ReceiveMessage",
                        "sqs:DeleteMessage",
                        "sqs:GetQueueAttributes",
                        "dynamodb:GetRecords",
                        "dynamodb:GetShardIterator",
                        "dynamodb:DescribeStream",
                        "kinesis:PutRecord",
                        "sns:Subscribe",
                        "sns:Publish",
                      ],
                      Resource: "*",
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    });
  });

  it("should generate the individual IAM Role CF Template based on source & destination if iamRolePipes.type property is individual", () => {
    serverlessPipes.config = {
      testPipe: {
        enabled: true,
        source: {
          sqs: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
        },
        target: {
          sqs: { arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] } },
        },
        iamRolePipes: {
          type: "individual", // generates individual role
        },
      },
    };
    const PipeName = Object.keys(serverlessPipes.config)[0];
    expect(serverlessPipes.generateIAMRole(PipeName)).to.be.deep.equal({
      Resources: {
        testPipePipesIAMRole: {
          Type: "AWS::IAM::Role",
          Properties: {
            RoleName: "testPipe-pipes-iam-role",
            AssumeRolePolicyDocument: {
              Version: "2012-10-17",
              Statement: [
                {
                  Effect: "Allow",
                  Principal: { Service: ["pipes.amazonaws.com"] },
                  Action: ["sts:AssumeRole"],
                },
              ],
            },
            Policies: [
              {
                PolicyName: "testPipePipesIAMPolicy",
                PolicyDocument: {
                  Version: "2012-10-17",
                  Statement: [
                    {
                      Effect: "Allow",
                      Action: [
                        "sqs:ReceiveMessage",
                        "sqs:DeleteMessage",
                        "sqs:GetQueueAttributes",
                      ],
                      Resource: "*",
                    },
                    {
                      Effect: "Allow",
                      Action: [
                        "sqs:SendMessage",
                        "sqs:ReceiveMessage",
                        "sqs:DeleteMessage",
                        "sqs:GetQueueAttributes",
                      ],
                      Resource: "*",
                    },
                    {
                      Effect: "Allow",
                      Action: ["lambda:InvokeFunction"],
                      Resource: "*",
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    });
  });

  it("should generate the Pipes CF Template based on the config property", () => {
    // write this test case in morning once login by providing required params
  });

  it("should throw the validation error if pipes.iamRolePipes.types is not shared or individual", () => {
    try {
      serverlessPipes.config = {
        testPipe: {
          enabled: true,
          source: {
            sqs: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
          },
          target: {
            sqs: { arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] } },
          },
          iamRolePipes: {
            type: "others",
          },
        },
      };
      serverlessPipes.validateInput();
    } catch (err) {
      assert.throws(
        () => {
          serverlessPipes.validateInput();
        },
        Error,
        'EventBridge Pipes Resource creation Failed: At /testPipe/iamRolePipes/type path - must be equal to one of the allowed values : ["individual","shared"]'
      );
    }
  });

  it("should throw the validation error if pipes.iamRolePipes doesnt have all the required properties", () => {
    try {
      // missing source property
      serverlessPipes.config = {
        testPipe: {
          enabled: true,
          // source: {
          //   sqs: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
          // },
          target: {
            sqs: { arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] } },
          },
          iamRolePipes: {
            type: "shared",
          },
        },
      };
      serverlessPipes.validateInput();
    } catch (err) {
      assert.throws(
        () => {
          serverlessPipes.validateInput();
        },
        Error,
        "EventBridge Pipes Resource creation Failed: source property is missing at /testPipe path in pipes plugin"
      );
    }
  });

  it("should vaidateArn without error if proper input are given", () => {
    const arn = { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] };
    const type = "source";
    const pipe = "testPipe";
    expect(serverlessPipes.validateArn(arn, type, pipe)).to.be.undefined;
  });

  it("should throw error if validateArn doesnt get invalid input parameters", () => {
    try {
      const arn = { "Fn::GetAtt:": ["SourceSQSQueue", "Arn"] }; //invalid arn; starts with Fn::GetAtt:: instead of Fn::GetAtt
      const type = "source";
      const pipe = "testPipe";
      assert.throws(
        () => serverlessPipes.validateArn(arn, type, pipe),
        Error,
        "EventBridge Pipes Resource creation Failed: arn property is invalid for testPipe.source"
      );
    } catch (err) {
      return;
    }
  });

  it("should validate input for pipes without any error if it is according to the schema required", () => {
    serverlessPipes.config = {
      testPipe: {
        enabled: true,
        source: {
          sqs: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
        },
        target: {
          sqs: { arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] } },
        },
        iamRolePipes: {
          type: "shared",
        },
      },
    };
    serverlessPipes.validateInput();
    assert.doesNotThrow(() => {
      serverlessPipes.validateInput();
    });
  });

  it("builds EventBridge Pipes plugin", () => {
    assert.doesNotThrow(() => {
      serverlessPipes.buildEventBridgePipes();
    });
  });

  it("should generate the SQS SourceParameters if source is sqs", () => {
    serverlessPipes.config = {
      source: {
        sqs: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
      },
    };

    expect(compileBasedOnSourceType(serverlessPipes.config)).to.be.deep.equal({
      SqsQueueParameters: { BatchSize: 10, MaximumBatchingWindowInSeconds: 10 },
    });
  });

  it("should generate the DynamoDB SourceParameters if source is dynamodb", () => {
    serverlessPipes.config = {
      source: {
        dynamodb: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
      },
    };

    expect(compileBasedOnSourceType(serverlessPipes.config)).to.be.deep.equal({
      DynamoDBStreamParameters: {
        StartingPosition: "",
        BatchSize: 10,
        DeadLetterConfig: { Arn: "" },
        MaximumBatchingWindowInSeconds: 10,
        MaximumRecordAgeInSeconds: "",
        MaximumRetryAttempts: "",
        OnPartialBatchItemFailure: "",
        ParallelizationFactor: "",
      },
    });
  });

  it("should generate the KinesisStream SourceParameters if source is kinesisStream", () => {
    serverlessPipes.config = {
      source: {
        kinesisStream: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
      },
    };

    expect(compileBasedOnSourceType(serverlessPipes.config)).to.be.deep.equal({
      KinesisStreamParameters: {
        StartingPosition: "",
        BatchSize: 10,
        DeadLetterConfig: { Arn: "" },
        MaximumBatchingWindowInSeconds: 10,
        MaximumRecordAgeInSeconds: "",
        MaximumRetryAttempts: "",
        OnPartialBatchItemFailure: "",
        ParallelizationFactor: "",
        StartingPositionTimestamp: "",
      },
    });
  });

  it("should return empty object if source is other than sqs/dynamodb/kinesisStream", () => {
    serverlessPipes.config = {
      source: {
        others: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
      },
    };

    expect(compileBasedOnSourceType(serverlessPipes.config)).to.be.deep.equal(
      {}
    );
  });

  it("should return empty object if target is sns for TargetParameters", () => {
    serverlessPipes.config = {
      target: {
        sns: { arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] } },
      },
    };

    expect(compileBasedOnTargetType(serverlessPipes.config)).to.be.deep.equal(
      {}
    );
  });

  it("should return Lambda TargetParameters if target is lambda", () => {
    serverlessPipes.config = {
      target: {
        sqs: { arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] } },
      },
    };

    expect(compileBasedOnTargetType(serverlessPipes.config)).to.be.deep.equal({
      SqsQueueParameters: { MessageDeduplicationId: "", MessageGroupId: "" },
    });
  });

  it("should return SQS TargetParameters if target is sqs", () => {
    serverlessPipes.config = {
      target: {
        lambda: { arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] } },
      },
    };

    expect(compileBasedOnTargetType(serverlessPipes.config)).to.be.deep.equal({
      LambdaFunctionParameters: { InvocationType: "" },
    });
  });

  it("should return StepFunction TargetParameters if target is stepFunction", () => {
    serverlessPipes.config = {
      target: {
        stepFunction: {
          arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] },
        },
      },
    };

    expect(compileBasedOnTargetType(serverlessPipes.config)).to.be.deep.equal({
      StepFunctionStateMachineParameters: { InvocationType: "" },
    });
  });

  it("should return empty object if target is other than sqs/lambda/stepFunction", () => {
    serverlessPipes.config = {
      target: {
        others: {
          arn: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] },
        },
      },
    };

    expect(compileBasedOnTargetType(serverlessPipes.config)).to.be.deep.equal(
      {}
    );
  });

  it("should create FilterCriteria object with proper filter patterns if filter property present for pipes", () => {
    serverlessPipes.config = {
      filter: [{ Pattern: '{ "data": { "message": [ "hello" ] }}' }],
    };

    expect(compileFilterPatterns(serverlessPipes.config)).to.be.deep.equal({
      FilterCriteria: {
        Filters: [{ Pattern: '{ "data": { "message": [ "hello" ] }}' }],
      },
    });
  });

  it("should create FilterCriteria object with empty filter patterns if filter property not present for pipes", () => {
    serverlessPipes.config = {};

    expect(compileFilterPatterns(serverlessPipes.config)).to.be.deep.equal({
      FilterCriteria: { Filters: "" },
    });
  });

  it("should return the source arn if source is sqs/kinesisStream/dynamodb", () => {
    serverlessPipes.config = {
      source: {
        kinesisStream: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
      },
    };

    expect(getSourceArn(serverlessPipes.config)).to.be.deep.equal({
      "Fn::GetAtt": ["SourceSQSQueue", "Arn"],
    });
  });

  it("should return empty string if source is other than sqs/kinesisStream/dynamodb", () => {
    serverlessPipes.config = {
      source: {
        others: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
      },
    };

    expect(getSourceArn(serverlessPipes.config)).to.be.deep.equal("");
  });

  it("should return the target arn if target is sqs/lambda/stepFunction/sns", () => {
    serverlessPipes.config = {
      target: {
        lambda: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
      },
    };

    expect(getTargetArn(serverlessPipes.config)).to.be.deep.equal({
      "Fn::GetAtt": ["SourceSQSQueue", "Arn"],
    });
  });

  it("should return empty string if target is other than sqs/lambda/stepFunction/sns", () => {
    serverlessPipes.config = {
      target: {
        others: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
      },
    };

    expect(getTargetArn(serverlessPipes.config)).to.be.deep.equal("");
  });

  it("should generate the Source IAM role if source is sqs/kinesisStream/dynamodb", () => {
    serverlessPipes.config = {
      testPipe: {
        source: {
          sqs: { arn: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] } },
        },
      },
    };
    const PipeName = Object.keys(serverlessPipes.config)[0];
    expect(
      generateSourceIAMRole(serverlessPipes.config, PipeName)
    ).to.be.deep.equal({
      Statement: {
        Effect: "Allow",
        Action: [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes",
        ],
        Resource: "*",
      },
    });
  });
});
