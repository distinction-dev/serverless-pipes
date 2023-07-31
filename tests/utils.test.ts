import { expect } from "chai";
import "mocha";
import { removeEmptyProperties } from "../src/util";

describe("#removeEmptyProperties()", () => {
  it("should remove all the empty properties from the input object", () => {
    const Resources = {
      testPipeEventBridgePipes: {
        Type: "AWS::Pipes::Pipe",
        Properties: {
          Description: "",
          DesiredState: "",
          Source: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] },
          Target: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] },
          SourceParameters: {
            SqsQueueParameters: {
              BatchSize: 10,
              MaximumBatchingWindowInSeconds: 10,
            },
            FilterCriteria: { Filters: "" },
          },
          TargetParameters: {
            SqsQueueParameters: {
              MessageDeduplicationId: "",
              MessageGroupId: "",
            },
          },
          Enrichment: {},
          RoleArn: { "Fn::GetAtt": ["testPipePipesIAMRole", "Arn"] },
        },
      },
    };
    expect(removeEmptyProperties(Resources)).to.be.deep.equal({
      testPipeEventBridgePipes: {
        Type: "AWS::Pipes::Pipe",
        Properties: {
          Source: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] },
          Target: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] },
          SourceParameters: {
            SqsQueueParameters: {
              BatchSize: 10,
              MaximumBatchingWindowInSeconds: 10,
            },
          },
          RoleArn: { "Fn::GetAtt": ["testPipePipesIAMRole", "Arn"] },
        },
      },
    });
  });
  it("should keep the original object as it is if no empty properties from the input object are found", () => {
    const Resources = {
      testPipeEventBridgePipes: {
        Type: "AWS::Pipes::Pipe",
        Properties: {
          Source: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] },
          Target: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] },
          SourceParameters: {
            SqsQueueParameters: {
              BatchSize: 10,
              MaximumBatchingWindowInSeconds: 10,
            },
          },
          RoleArn: { "Fn::GetAtt": ["testPipePipesIAMRole", "Arn"] },
        },
      },
    };
    expect(removeEmptyProperties(Resources)).to.be.deep.equal({
      testPipeEventBridgePipes: {
        Type: "AWS::Pipes::Pipe",
        Properties: {
          Source: { "Fn::GetAtt": ["SourceSQSQueue", "Arn"] },
          Target: { "Fn::GetAtt": ["TargetSNSTopic", "TopicArn"] },
          SourceParameters: {
            SqsQueueParameters: {
              BatchSize: 10,
              MaximumBatchingWindowInSeconds: 10,
            },
          },
          RoleArn: { "Fn::GetAtt": ["testPipePipesIAMRole", "Arn"] },
        },
      },
    });
  });
});
