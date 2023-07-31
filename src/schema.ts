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
    invocationType: {
      type: "string",
      enum: ["REQUEST_RESPONSE", "FIRE_AND_FORGET"],
    },
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
    invocationType: {
      type: "string",
      enum: ["REQUEST_RESPONSE", "FIRE_AND_FORGET"],
    },
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
  properties: {
    dynamodb: DynamoDbSourceObject,
    kinesisStream: KinesisStreamSourceObject,
    sqs: SQSSourceObject,
  },
  minProperties: 1,
  maxProperties: 1,
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
  properties: {
    sns: SNSTargetObject,
    lambda: LambdaFunctionTargetObject,
    stepFunction: StepFunctionTargetObject,
    sqs: SQSTargetObject,
  },
  minProperties: 1,
  maxProperties: 1,
} as const;

const IAMRoleParameter = {
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: ["individual", "shared"],
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
        enabled: {
          type: "boolean",
        },
        source: SourceParameter,
        filter: FilterParameter,
        enrichment: EnrichmentParameter,
        target: TargetParameter,
        iamRolePipes: IAMRoleParameter,
      },
      required: ["source", "target", "enabled"],
      additionalProperties: false,
    },
  },
} as const;
