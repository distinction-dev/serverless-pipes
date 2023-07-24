[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / SQSSourceParameters

# Usage: 
```yaml

# serverless.yml


pipes:
  pipeName:
    source:
      sqs:
        ...properties
```


## Table of contents

### Properties

- [arn](SQSSourceParameters.md#arn)
- [batchsize](SQSSourceParameters.md#batchsize)
- [maximumBatchingWindow](SQSSourceParameters.md#maximumBatchingWindow)

## Properties

### arn

• **arn**: `object` | `string`

The arn of the event source.


#### Defined in

[schema.ts:113](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L113)

### batchsize (optional)

• **batchsize**: `integer`

The maximum number of records to include in each batch.


#### Defined in

[schema.ts:123](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L123)

### maximumBatchingWindow (optional)

• **maximumBatchingWindow**: `integer`

The maximum length of a time to wait for events.

#### Defined in

[models.ts:126](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L126)


---
