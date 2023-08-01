[serverless-pipes](../README.md) / [Exports](parameters.md) / SNSTargetParameters

It defines SNS as the target for the EventBridge Pipes.
# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    target:
      sns:
        ...properties
```


## Table of contents

### Properties

- [arn](SNSTargetParameters.md#arn)

## Properties

### arn

• **arn**: `object` | `string`

The arn of the event target.


#### Defined in

[schema.ts:136](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L136)


---
