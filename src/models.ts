export interface EnrichmentParameter {
  FunctionName: string;
}

export function getTargetSNSIAMRole(): Record<string, any> {
  return {
    Statement: {
      Effect: "Allow",
      Action: ["sns:Subscribe", "sns:Publish"],
      Resource: "*",
    },
  };
}

export function getSourceKinesisStreamIAMRole(): Record<string, any> {
  return {
    Statement: {
      Effect: "Allow",
      Action: ["kinesis:PutRecord"],
      Resource: "*",
    },
  };
}

export function getSourceDynamoDbStreamIAMRole(): Record<string, any> {
  return {
    Statement: {
      Effect: "Allow",
      Action: [
        "dynamodb:GetRecords",
        "dynamodb:GetShardIterator",
        "dynamodb:DescribeStream",
      ],
      Resource: "*",
    },
  };
}

export function getSourceSQSIAMRole(): Record<string, any> {
  return {
    Statement: {
      Effect: "Allow",
      Action: [
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes",
      ],
      Resource: "*",
    },
  };
}

export function getTargetLambdaFunctionIAMRole(): Record<string, any> {
  return {
    Statement: {
      Effect: "Allow",
      Action: ["lambda:InvokeFunction"],
      Resource: "*",
    },
  };
}

export function getEnrichmentLambdaFunctionIAMRole(): Record<string, any> {
  return {
    Statement: {
      Effect: "Allow",
      Action: ["lambda:InvokeFunction"],
      Resource: "*",
    },
  };
}

export function getTargetStepFunctionIAMRole(): Record<string, any> {
  return {
    Statement: {
      Effect: "Allow",
      Action: ["states:StartExecution"],
      Resource: "*",
    },
  };
}

export function getTargetSQSIAMRole(): Record<string, any> {
  return {
    Statement: {
      Effect: "Allow",
      Action: [
        "sqs:SendMessage",
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes",
      ],
      Resource: "*",
    },
  };
}

export function getSharedIAMRole(): Record<string, any> {
  return {
    Statement: {
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
  };
}
