[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / SQSTargetParameters

It defines SQS as the target for the EventBridge Pipes.

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

[schema.ts:195](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L195)

### messageDeduplicationId (optional)

• **messageDeduplicationId**: `string`

This parameter applies only to FIFO (first-in-first-out) queues.

The token used for deduplication of sent messages.


#### Defined in

[schema.ts:205](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L205)


### messageGroupId (optional)

• **messageGroupId**: `string`

The FIFO message group ID to use as the target.


#### Defined in

[schema.ts:206](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L206)

---
