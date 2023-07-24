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

export function getSourceArn(
  config: Record<string, any>,
  PipeName: string
): string {
  const sourceARN: string =
    config[PipeName].source?.dynamodb?.arn ||
    config[PipeName].source?.kinesisStream?.arn ||
    config[PipeName].source?.sqs?.arn ||
    "";
  return sourceARN;
}

export function getTargetArn(
  config: Record<string, any>,
  PipeName: string
): string {
  const targetARN: string =
    config[PipeName].target?.sns?.arn ||
    config[PipeName].target?.sqs?.arn ||
    config[PipeName].target?.lambda?.arn ||
    config[PipeName].target?.stepFunction?.arn ||
    "";
  return targetARN;
}

export function compileBasedOnSourceType(
  config: Record<string, any>,
  PipeName: string
): AWSPipesPipePipeSourceParametersDefinition {
  const sourceName: string = Object.keys(config[PipeName].source)[0];
  switch (sourceName) {
    case "dynamodb": {
      const params: AWSPipesPipePipeSourceParametersDefinition = {
        DynamoDBStreamParameters: {
          StartingPosition:
            config[PipeName].source[sourceName].parallelizationFactor || "",
          BatchSize: config[PipeName].source[sourceName]?.batchsize || 10,
          DeadLetterConfig: {
            Arn: config[PipeName].source[sourceName]?.deadLetterArn || "",
          },
          MaximumBatchingWindowInSeconds:
            config[PipeName].source[sourceName]?.maximumBatchingWindow || 10,
          MaximumRecordAgeInSeconds:
            config[PipeName].source[sourceName]?.maximumRecordAgeInSeconds ||
            "",
          MaximumRetryAttempts:
            config[PipeName].source[sourceName]?.maximumRetryAttempts || "",
          OnPartialBatchItemFailure:
            config[PipeName].source[sourceName]?.onPartialBatchItemFailure ||
            "",
          ParallelizationFactor:
            config[PipeName].source[sourceName]?.parallelizationFactor || "",
        },
      };
      return params;
    }
    case "kinesisStream": {
      const params: AWSPipesPipePipeSourceParametersDefinition = {
        KinesisStreamParameters: {
          StartingPosition:
            config[PipeName].source[sourceName].parallelizationFactor || "",
          BatchSize: config[PipeName].source[sourceName]?.batchsize || 10,
          DeadLetterConfig: {
            Arn: config[PipeName].source[sourceName]?.deadLetterArn || "",
          },
          MaximumBatchingWindowInSeconds:
            config[PipeName].source[sourceName]?.maximumBatchingWindow || 10,
          MaximumRecordAgeInSeconds:
            config[PipeName].source[sourceName]?.maximumRecordAgeInSeconds ||
            "",
          MaximumRetryAttempts:
            config[PipeName].source[sourceName]?.maximumRetryAttempts || "",
          OnPartialBatchItemFailure:
            config[PipeName].source[sourceName]?.onPartialBatchItemFailure ||
            "",
          ParallelizationFactor:
            config[PipeName].source[sourceName]?.parallelizationFactor || "",
          StartingPositionTimestamp:
            config[PipeName].source[sourceName]?.startingPositionTimestamp ||
            "",
        },
      };
      return params;
    }
    case "sqs": {
      const params: AWSPipesPipePipeSourceParametersDefinition = {
        SqsQueueParameters: {
          BatchSize: config[PipeName].source[sourceName]?.batchsize || 10,
          MaximumBatchingWindowInSeconds:
            config[PipeName].source[sourceName]?.maximumBatchingWindow || 10,
        },
      };
      return params;
    }
    default:
      return {};
  }
}

export function compileFilterPatterns(
  config: Record<string, any>,
  PipeName: string
): AWSPipesPipePipeSourceParametersDefinition {
  const params: AWSPipesPipePipeSourceParametersDefinition = {
    FilterCriteria: {
      Filters: config[PipeName]?.filter || "",
    },
  };
  return params;
}

export function compileBasedOnTargetType(
  config: Record<string, any>,
  PipeName: string
): AWSPipesPipePipeTargetParametersDefinition {
  const targetName: string = Object.keys(config[PipeName].target)[0];
  switch (targetName) {
    case "sns": {
      return {};
    }
    case "sqs": {
      const params: AWSPipesPipePipeTargetParametersDefinition = {
        SqsQueueParameters: {
          MessageDeduplicationId:
            config[PipeName].target[targetName].messageDeduplicationId || "",
          MessageGroupId:
            config[PipeName].target[targetName].messageGroupId || "",
        },
      };
      return params;
    }
    case "lambda": {
      const params: AWSPipesPipePipeTargetParametersDefinition = {
        LambdaFunctionParameters: {
          InvocationType:
            config[PipeName].target[targetName].invocationType || "",
        },
      };
      return params;
    }
    case "stepFunction": {
      const params: AWSPipesPipePipeTargetParametersDefinition = {
        StepFunctionStateMachineParameters: {
          InvocationType:
            config[PipeName].target[targetName].invocationType || "",
        },
      };
      return params;
    }
    default:
      return {};
  }
}

export function getDesiredStateOfPipe(
  config: Record<string, any>,
  PipeName: string
): AWSPipesPipeRequestedPipeStateDefinition {
  const enabled: boolean = config[PipeName].enabled;

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
