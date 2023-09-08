import {
  AWSPipesPipePipeSourceParametersDefinition,
  AWSPipesPipePipeTargetParametersDefinition,
  AWSPipesPipeRequestedPipeStateDefinition,
} from "serverless-schema";
import {
  getSourceDynamoDbStreamIAMRole,
  getSourceKinesisStreamIAMRole,
  getSourceSQSIAMRole,
  getTargetLambdaFunctionIAMRole,
  getTargetSNSIAMRole,
  getTargetSQSIAMRole,
  getTargetStepFunctionIAMRole,
} from "./models";

export function getSourceArn(config: Record<string, any>): string {
  const sourceARN: string =
    config.source?.dynamodb?.arn ||
    config.source?.kinesisStream?.arn ||
    config.source?.sqs?.arn ||
    "";
  return sourceARN;
}

export function getTargetArn(config: Record<string, any>): string {
  const targetARN: string =
    config.target?.sns?.arn ||
    config.target?.sqs?.arn ||
    config.target?.lambda?.arn ||
    config.target?.stepFunction?.arn ||
    "";
  return targetARN;
}

export function compileBasedOnSourceType(
  config: Record<string, any>
): AWSPipesPipePipeSourceParametersDefinition {
  const sourceName: string = Object.keys(config.source)[0];
  switch (sourceName) {
    case "dynamodb": {
      const params: AWSPipesPipePipeSourceParametersDefinition = {
        DynamoDBStreamParameters: {
          StartingPosition: config.source[sourceName].startingPosition || "",
          BatchSize: config.source[sourceName]?.batchsize || 10,
          DeadLetterConfig: {
            Arn: config.source[sourceName]?.deadLetterArn || "",
          },
          MaximumBatchingWindowInSeconds:
            config.source[sourceName]?.maximumBatchingWindow || 10,
          MaximumRecordAgeInSeconds:
            config.source[sourceName]?.maximumRecordAgeInSeconds || "",
          MaximumRetryAttempts:
            config.source[sourceName]?.maximumRetryAttempts || "",
          OnPartialBatchItemFailure:
            config.source[sourceName]?.onPartialBatchItemFailure || "",
          ParallelizationFactor:
            config.source[sourceName]?.parallelizationFactor || "",
        },
      };
      return params;
    }
    case "kinesisStream": {
      const params: AWSPipesPipePipeSourceParametersDefinition = {
        KinesisStreamParameters: {
          StartingPosition: config.source[sourceName].startingPosition || "",
          BatchSize: config.source[sourceName]?.batchsize || 10,
          DeadLetterConfig: {
            Arn: config.source[sourceName]?.deadLetterArn || "",
          },
          MaximumBatchingWindowInSeconds:
            config.source[sourceName]?.maximumBatchingWindow || 10,
          MaximumRecordAgeInSeconds:
            config.source[sourceName]?.maximumRecordAgeInSeconds || "",
          MaximumRetryAttempts:
            config.source[sourceName]?.maximumRetryAttempts || "",
          OnPartialBatchItemFailure:
            config.source[sourceName]?.onPartialBatchItemFailure || "",
          ParallelizationFactor:
            config.source[sourceName]?.parallelizationFactor || "",
          StartingPositionTimestamp:
            config.source[sourceName]?.startingPositionTimestamp || "",
        },
      };
      return params;
    }
    case "sqs": {
      const params: AWSPipesPipePipeSourceParametersDefinition = {
        SqsQueueParameters: {
          BatchSize: config.source[sourceName]?.batchsize || 10,
          MaximumBatchingWindowInSeconds:
            config.source[sourceName]?.maximumBatchingWindow || 10,
        },
      };
      return params;
    }
    default:
      return {};
  }
}

export function compileFilterPatterns(
  config: Record<string, any>
): AWSPipesPipePipeSourceParametersDefinition {
  const params: AWSPipesPipePipeSourceParametersDefinition = {
    FilterCriteria: {
      Filters: config?.filter || "",
    },
  };
  return params;
}

export function compileBasedOnTargetType(
  config: Record<string, any>
): AWSPipesPipePipeTargetParametersDefinition {
  const targetName: string = Object.keys(config.target)[0];
  switch (targetName) {
    case "sns": {
      return {};
    }
    case "sqs": {
      const params: AWSPipesPipePipeTargetParametersDefinition = {
        SqsQueueParameters: {
          MessageDeduplicationId:
            config.target[targetName].messageDeduplicationId || "",
          MessageGroupId: config.target[targetName].messageGroupId || "",
        },
      };
      return params;
    }
    case "lambda": {
      const params: AWSPipesPipePipeTargetParametersDefinition = {
        LambdaFunctionParameters: {
          InvocationType: config.target[targetName].invocationType || "",
        },
      };
      return params;
    }
    case "stepFunction": {
      const params: AWSPipesPipePipeTargetParametersDefinition = {
        StepFunctionStateMachineParameters: {
          InvocationType: config.target[targetName].invocationType || "",
        },
      };
      return params;
    }
    default:
      return {};
  }
}

export function getDesiredStateOfPipe(
  config: Record<string, any>
): AWSPipesPipeRequestedPipeStateDefinition {
  const enabled: boolean = config.enabled;

  const PipeDesiredState: AWSPipesPipeRequestedPipeStateDefinition = enabled
    ? "RUNNING"
    : "STOPPED";
  return PipeDesiredState;
}

export function generateSourceIAMRole(
  config: Record<string, any>,
  PipeName: string
): Record<string, any> {
  const sourceName: string = Object.keys(config[PipeName].source)[0];
  switch (sourceName) {
    case "sqs":
      return getSourceSQSIAMRole();
    case "dynamodb":
      return getSourceDynamoDbStreamIAMRole();
    case "kinesisStream":
      return getSourceKinesisStreamIAMRole();
    default:
      return {};
  }
}

export function generateTargetIAMRole(
  config: Record<string, any>,
  PipeName: string
): Record<string, any> {
  const targetName: string = Object.keys(config[PipeName].target)[0];
  switch (targetName) {
    case "sns":
      return getTargetSNSIAMRole();
    case "sqs":
      return getTargetSQSIAMRole();
    case "lambda":
      return getTargetLambdaFunctionIAMRole();
    case "stepFunction":
      return getTargetStepFunctionIAMRole();
    default:
      return {};
  }
}
