[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / StepFunctionTargetParameters

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    target:
      stepFunction:
        ...properties
```


## Table of contents

### Properties

- [arn](StepFunctionTargetParameters.md.md#arn)
- [invocationType](StepFunctionTargetParameters.md.md#invocationType)


## Properties

### arn

• **arn**: `object` | `string`

The arn of the event target.


#### Defined in

[schema.ts:174](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L174)

### invocationType (optional)

• **invocationType**: `string`

Specify whether to invoke the function synchronously or asynchronously.

`REQUEST_RESPONSE` (default) - Invoke synchronously. This corresponds to the RequestResponse option in the InvocationType parameter for the Lambda Invoke API.

`FIRE_AND_FORGET` - Invoke asynchronously. This corresponds to the Event option in the InvocationType parameter for the Lambda Invoke API.


#### Defined in

[schema.ts:184](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L184)


---
