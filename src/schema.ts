const DynamoDbSourceObject = {
  type: "object",
  properties: {
    arn: {
      oneOf: [
        {
          type: "object",
        },
        {
          type: "string",
        },
      ],
    },
    batchsize: {
      type: "integer",
    },
    deadLetterArn: {
      oneOf: [
        {
          type: "object",
        },
        {
          type: "string",
        },
      ],
    },
    maximumBatchingWindow: {
      type: "integer",
    },
    maximumRecordAgeInSeconds: {
      type: "integer",
      default: -1,
    },
    maximumRetryAttempts: {
      type: "integer",
      default: -1,
    },
    onPartialBatchItemFailure: {
      type: "string",
      enum: ["AUTOMATIC_BISECT"],
    },
    parallelizationFactor: {
      type: "integer",
      default: 1,
    },
    startingPosition: {
      type: "string",
      enum: ["TRIM_HORIZON", "LATEST"],
    },
  },
  required: ["arn", "startingPosition"],
} as const;

const KinesisStreamSourceObject = {
  type: "object",
  properties: {
    arn: {
      oneOf: [
        {
          type: "object",
        },
        {
          type: "string",
        },
      ],
    },
    batchsize: {
      type: "integer",
    },
    deadLetterArn: {
      oneOf: [
        {
          type: "object",
        },
        {
          type: "string",
        },
      ],
    },
    maximumBatchingWindow: {
      type: "integer",
    },
    maximumRecordAgeInSeconds: {
      type: "integer",
      default: -1,
    },
    maximumRetryAttempts: {
      type: "integer",
      default: -1,
    },
    onPartialBatchItemFailure: {
      type: "string",
      enum: ["AUTOMATIC_BISECT"],
    },
    parallelizationFactor: {
      type: "integer",
      default: 1,
    },
    startingPosition: {
      type: "string",
      enum: ["TRIM_HORIZON", "LATEST", "AT_TIMESTAMP"],
    },
    startingPositionTimestamp: {
      type: "string",
    },
  },
  required: ["arn", "startingPosition"],
} as const;

const SQSSourceObject = {
  type: "object",
  properties: {
    arn: {
      oneOf: [
        {
          type: "object",
        },
        {
          type: "string",
        },
      ],
    },
    batchsize: {
      type: "integer",
    },
    maximumBatchingWindow: {
      type: "integer",
    },
  },
  required: ["arn"],
} as const;

const SNSTargetObject = {
  type: "object",
  properties: {
    arn: {
      oneOf: [
        {
          type: "object",
        },
        {
          type: "string",
        },
      ],
    },
  },
  required: ["arn"],
} as const;

const LambdaFunctionTargetObject = {
  type: "object",
  properties: {
    arn: {
      oneOf: [
        {
          type: "object",
        },
        {
          type: "string",
        },
      ],
    },
    invocationType: { type: "string" },
  },
  required: ["arn"],
} as const;

const StepFunctionTargetObject = {
  type: "object",
  properties: {
    arn: {
      oneOf: [
        {
          type: "object",
        },
        {
          type: "string",
        },
      ],
    },
    invocationType: { type: "string" },
  },
  required: ["arn"],
} as const;

const SQSTargetObject = {
  type: "object",
  properties: {
    arn: {
      oneOf: [
        {
          type: "object",
        },
        {
          type: "string",
        },
      ],
    },
    messageDeduplicationId: { type: "string" },
    messageGroupId: { type: "string" },
  },
  required: ["arn"],
} as const;

const FilterParameter = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Pattern: { type: "string" },
    },
  },
} as const;

const SourceParameter = {
  type: "object",
  oneOf: [
    {
      properties: {
        dynamodb: DynamoDbSourceObject,
      },
    },
    {
      properties: {
        kinesisStream: KinesisStreamSourceObject,
      },
    },
    {
      properties: {
        sqs: SQSSourceObject,
      },
    },
  ],
} as const;

const EnrichmentParameter = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
  },
} as const;

const TargetParameter = {
  type: "object",
  oneOf: [
    {
      properties: {
        sns: SNSTargetObject,
      },
    },
    {
      properties: {
        lambda: LambdaFunctionTargetObject,
      },
    },
    {
      properties: {
        stepFunction: StepFunctionTargetObject,
      },
    },
    {
      properties: {
        sqs: SQSTargetObject,
      },
    },
  ],
} as const;

const IAMRoleParameter = {
  type: "object",
  properties: {
    statements: {
      type: "array",
      items: {
        type: "object",
        properties: {
          Effect: { type: "string" },
          Action: { type: "array" },
          Resource: { type: "string" },
        },
        required: ["Effect", "Action", "Resource"],
      },
    },
  },
} as const;

export const schema = {
  type: "object",
  patternProperties: {
    "^[a-zA-Z0-9-]+$": {
      type: "object",
      properties: {
        description: {
          type: "string",
        },
        desiredState: {
          type: "string",
        },
        source: SourceParameter,
        filter: FilterParameter,
        enrichment: EnrichmentParameter,
        target: TargetParameter,
        iamRolePipes: IAMRoleParameter,
      },
      required: ["source", "target", "iamRolePipes"],
      additionalProperties: false,
    },
  },
} as const;
