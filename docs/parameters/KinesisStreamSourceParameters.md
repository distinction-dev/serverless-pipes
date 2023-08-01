[serverless-pipes](../README.md) / [Exports](parameters.md) / KinesisStreamSourceParameters

It defines KinesisStream as the source for the EventBridge Pipes.
# Usage: 
```yaml

# serverless.yml

pipes:
  pipeName:
    source:
      kinesisStream:
        ...properties
```


## Table of contents

### Properties

- [arn](KinesisStreamSourceParameters.md#arn)
- [batchsize](KinesisStreamSourceParameters.md#batchsize)
- [deadLetterArn](KinesisStreamSourceParameters.md#deadLetterArn)
- [maximumBatchingWindow](KinesisStreamSourceParameters.md#maximumBatchingWindow)
- [maximumRecordAgeInSeconds](KinesisStreamSourceParameters.md#maximumRecordAgeInSeconds)
- [maximumRetryAttempts](KinesisStreamSourceParameters.md#maximumRetryAttempts)
- [onPartialBatchItemFailure](KinesisStreamSourceParameters.md#onPartialBatchItemFailure)
- [parallelizationFactor](KinesisStreamSourceParameters.md#parallelizationFactor)
- [startingPosition](KinesisStreamSourceParameters.md#startingPosition)
- [startingPositionTimestamp](KinesisStreamSourceParameters.md#startingPositionTimestamp)

## Properties

### arn

• **arn**: `object` | `string`

The arn of the event source.


#### Defined in

[schema.ts:57](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L57)

### batchsize (optional)

• **batchsize**: `integer`

The maximum number of records to include in each batch.


#### Defined in

[schema.ts:67](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L67)

### deadLetterArn (optional)

• **deadLetterArn**: `object` | `string`

Define the target queue arn to send dead-letter queue events to.

#### Defined in

[schema.ts:70](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L70)


### maximumBatchingWindow (optional)

• **maximumBatchingWindow**: `integer`

The maximum length of a time to wait for events.

#### Defined in

[schema.ts:80](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L80)


### maximumRetryAttempts (optional)

• **maximumRetryAttempts**: `integer`

Discard records after the specified number of retries. The default value is -1, which sets the maximum number of retries to infinite. When MaximumRetryAttempts is infinite, EventBridge retries failed records until the record expires in the event source.

#### Defined in

[schema.ts:87](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L87)

### maximumRecordAgeInSeconds (optional)

• **maximumRecordAgeInSeconds**: `integer`

Discard records older than the specified age. The default value is -1, which sets the maximum age to infinite. When the value is set to infinite, EventBridge never discards old records.

#### Defined in

[schema.ts:83](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L83)



### onPartialBatchItemFailure (optional)

• **onPartialBatchItemFailure**: `string`

Define how to handle item process failures. `AUTOMATIC_BISECT` halves each batch and retry each half until all the records are processed or there is one failed message left in the batch.

#### Defined in

[schema.ts:91](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L91)


### parallelizationFactor (optional)

• **parallelizationFactor**: `integer`


The number of batches to process concurrently from each shard. The default value is 1.

#### Defined in

[schema.ts:95](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L95)


### startingPosition (optional)

• **startingPosition**: `string`

The position in a stream from which to start reading.

Valid values: `TRIM_HORIZON` | `LATEST`

#### Defined in

[schema.ts:99](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L99)


### startingPositionTimestamp (optional)

• **startingPositionTimestamp**: `string`

With StartingPosition set to `AT_TIMESTAMP`, the time from which to start reading, in Unix time seconds.


#### Defined in

[schema.ts:103](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L103)

---
