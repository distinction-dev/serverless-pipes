[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / SQSTargetParameters

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    target:
      sqs:
        ...properties
```


## Table of contents

### Properties

- [arn](SQSTargetParameters.md#arn)
- [messageDeduplicationId](SQSTargetParameters.md#messageDeduplicationId)
- [messageGroupId](SQSTargetParameters.md#messageGroupId)

## Properties

### arn

• **arn**: `object` | `string`

The arn of the event target.


#### Defined in

[schema.ts:189](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L189)

### messageDeduplicationId (optional)

• **messageDeduplicationId**: `string`

This parameter applies only to FIFO (first-in-first-out) queues.

The token used for deduplication of sent messages.


#### Defined in

[schema.ts:199](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L199)


### messageGroupId (optional)

• **messageGroupId**: `string`

The FIFO message group ID to use as the target.


#### Defined in

[schema.ts:200](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L200)

---
