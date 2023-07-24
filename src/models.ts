export interface DeadLetterConfig {
  Arn: string;
}

export interface SQSSourceParameterProperties {
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}

export interface SQSSourceParameter {
  SqsQueueParameters: SQSSourceParameterProperties;
}

export interface KinesisStreamsSourceParameterProperties {
  BatchSize?: number;
  DeadLetterConfig?: DeadLetterConfig;
  MaximumBatchingWindowInSeconds?: number;
  MaximumRecordAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
  OnPartialBatchItemFailure?: string;
  ParallelizationFactor?: number;
  StartingPosition: string;
  StartingPositionTimestamp?: string;
}

export interface KinesisStreamSourceParameter {
  KinesisStreamParameters: KinesisStreamsSourceParameterProperties;
}

export interface DynamoDBSourceParametersProperties {
  BatchSize?: number;
  DeadLetterConfig?: DeadLetterConfig;
  MaximumBatchingWindowInSeconds?: number;
  MaximumRecordAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
  OnPartialBatchItemFailure?: string;
  ParallelizationFactor?: number;
  StartingPosition: string;
}

export interface DynamoDBSourceParameters {
  DynamoDBStreamParameters: DynamoDBSourceParametersProperties;
}

export interface LambdaTargetParameterProperties {
  InvocationType?: string;
}

export interface LambdaTargetParameter {
  LambdaFunctionParameters: LambdaTargetParameterProperties;
}

export interface StepFunctionTargetParameterProperties {
  InvocationType?: string;
}

export interface StepFunctionTargetParameter {
  StepFunctionStateMachineParameters: StepFunctionTargetParameterProperties;
}

export interface SQSTargetParameterProperties {
  MessageDeduplicationId?: string;
  MessageGroupId?: string;
}

export interface SQSTargetParameter {
  SqsQueueParameters: SQSTargetParameterProperties;
}

export interface SNSTargetParameter {
  ARN: string;
}

export interface FilterCriteriaArrayItems {
  Pattern: string;
}

export interface FilterCriteriaArray {
  Filters: [FilterCriteriaArrayItems];
}

export interface FilterCriteria {
  FilterCriteria: FilterCriteriaArray;
}

export interface EnrichmentParameter {
  FunctionName: string;
}
