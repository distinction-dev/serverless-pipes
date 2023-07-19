[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / LambdaFunctionTargetParameters

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    target:
      lambda:
        ...properties
```


## Table of contents

### Properties

- [arn](LambdaFunctionTargetParameters.md#arn)
- [invocationType](LambdaFunctionTargetParameters.md#invocationType)


## Properties

### arn

• **arn**: `object` | `string`

The arn of the event target.


#### Defined in

[schema.ts:153](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L153)

### invocationType (optional)

• **invocationType**: `string`

Specify whether to invoke the function synchronously or asynchronously.

`REQUEST_RESPONSE` (default) - Invoke synchronously. This corresponds to the RequestResponse option in the InvocationType parameter for the Lambda Invoke API.

`FIRE_AND_FORGET` - Invoke asynchronously. This corresponds to the Event option in the InvocationType parameter for the Lambda Invoke API.


#### Defined in

[schema.ts:163](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L163)


---
