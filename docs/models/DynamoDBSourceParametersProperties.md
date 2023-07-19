[@distinction-dev/serverless-pipes](../README.md) / [Exports](models.md) / DynamoDBSourceParametersProperties

# Interface: DynamoDBSourceParametersProperties

## Table of contents

### Properties

- [BatchSize](DynamoDBSourceParametersProperties.md#BatchSize)
- [DeadLetterConfig](DynamoDBSourceParametersProperties.md#DeadLetterConfig)
- [MaximumBatchingWindowInSeconds](DynamoDBSourceParametersProperties.md#MaximumBatchingWindowInSeconds)
- [MaximumRecordAgeInSeconds](DynamoDBSourceParametersProperties.md#MaximumRecordAgeInSeconds)
- [MaximumRetryAttempts](DynamoDBSourceParametersProperties.md#MaximumRetryAttempts)
- [OnPartialBatchItemFailure](DynamoDBSourceParametersProperties.md#OnPartialBatchItemFailure)
- [ParallelizationFactor](DynamoDBSourceParametersProperties.md#ParallelizationFactor)
- [StartingPosition](DynamoDBSourceParametersProperties.md#StartingPosition)


## Properties

### BatchSize

• **BatchSize**: `number`

The maximum number of records to include in each batch.


#### Defined in

[models.ts:31](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/models.ts#L31)

### DeadLetterConfig


• **DeadLetterConfig**: `number`

Define the target queue to send dead-letter queue events to.


#### Defined in

[models.ts:32](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/models.ts#L32)

### MaximumBatchingWindowInSeconds

• **MaximumBatchingWindowInSeconds**: `number`

The maximum length of a time to wait for events.

#### Defined in

[models.ts:33](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/models.ts#L33)


### MaximumRecordAgeInSeconds

• **MaximumRecordAgeInSeconds**: `number`

Discard records older than the specified age. The default value is -1, which sets the maximum age to infinite. When the value is set to infinite, EventBridge never discards old records.


#### Defined in

[models.ts:34](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/models.ts#L34)

### MaximumRetryAttempts

• **MaximumRetryAttempts**: `number`

Discard records after the specified number of retries. The default value is -1, which sets the maximum number of retries to infinite. When MaximumRetryAttempts is infinite, EventBridge retries failed records until the record expires in the event source.


#### Defined in

[models.ts:35](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/models.ts#L35)

### OnPartialBatchItemFailure

• **OnPartialBatchItemFailure**: `string`

Define how to handle item process failures. AUTOMATIC_BISECT halves each batch and retry each half until all the records are processed or there is one failed message left in the batch.


#### Defined in

[models.ts:36](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/models.ts#L36)

### ParallelizationFactor

• **ParallelizationFactor**: `number`

The number of batches to process concurrently from each shard. The default value is 1.

#### Defined in

[models.ts:37](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/models.ts#L37)

### StartingPosition

• **StartingPosition**: `string`

The position in a stream from which to start reading.

Valid values: `TRIM_HORIZON` | `LATEST`


#### Defined in

[models.ts:38](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/models.ts#L38)



---
