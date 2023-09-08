[serverless-pipes](../README.md) / [Exports](parameters.md) / DynamoDBSourceParameters

It defines DynamoDB as the source for the EventBridge Pipes.
# Usage: 
```yaml

# serverless.yml

pipes:
  pipeName:
    source:
      dynamodb:
        ...properties
```


## Table of contents

### Properties

- [arn](DynamoDBSourceParameters.md#arn)
- [batchsize](DynamoDBSourceParameters.md#batchsize)
- [deadLetterArn](DynamoDBSourceParameters.md#deadLetterArn)
- [maximumBatchingWindow](DynamoDBSourceParameters.md#maximumBatchingWindow)
- [maximumRecordAgeInSeconds](DynamoDBSourceParameters.md#maximumRecordAgeInSeconds)
- [maximumRetryAttempts](DynamoDBSourceParameters.md#maximumRetryAttempts)
- [onPartialBatchItemFailure](DynamoDBSourceParameters.md#onPartialBatchItemFailure)
- [parallelizationFactor](DynamoDBSourceParameters.md#parallelizationFactor)
- [startingPosition](DynamoDBSourceParameters.md#startingPosition)

## Properties

### arn

• **arn**: `object` | `string`

The arn of the event source.


#### Defined in

[schema.ts:4](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L4)

### batchsize (optional)

• **batchsize**: `integer`

The maximum number of records to include in each batch.


#### Defined in

[schema.ts:14](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L14)

### deadLetterArn (optional)

• **deadLetterArn**: `object` | `string`

Define the target queue arn to send dead-letter queue events to.

#### Defined in

[schema.ts:17](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L17)


### maximumBatchingWindow (optional)

• **maximumBatchingWindow**: `integer`

The maximum length of a time to wait for events.

#### Defined in

[schema.ts:27](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L27)


### maximumRetryAttempts (optional)

• **maximumRetryAttempts**: `integer`

Discard records after the specified number of retries. The default value is -1, which sets the maximum number of retries to infinite. When MaximumRetryAttempts is infinite, EventBridge retries failed records until the record expires in the event source.

#### Defined in

[schema.ts:34](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L34)

### maximumRecordAgeInSeconds (optional)

• **maximumRecordAgeInSeconds**: `integer`

Discard records older than the specified age. The default value is -1, which sets the maximum age to infinite. When the value is set to infinite, EventBridge never discards old records.

#### Defined in

[schema.ts:30](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L30)



### onPartialBatchItemFailure (optional)

• **onPartialBatchItemFailure**: `string`

Define how to handle item process failures. `AUTOMATIC_BISECT` halves each batch and retry each half until all the records are processed or there is one failed message left in the batch.

#### Defined in

[schema.ts:38](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L38)


### parallelizationFactor (optional)

• **parallelizationFactor**: `integer`


The number of batches to process concurrently from each shard. The default value is 1.

#### Defined in

[schema.ts:42](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L42)


### startingPosition

• **startingPosition**: `string`

The position in a stream from which to start reading.

Valid values: `TRIM_HORIZON` | `LATEST`

#### Defined in

[schema.ts:46](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L46)


---
