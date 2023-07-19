[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / TargetParameter

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    target:
      ...properties
```


### target



It defines the target for the EventBridge Pipes.

Following AWS services are supported as the target:
 
 - [Step Function](StepFunctionTargetParameters.md)
 - [Lambda Function](LambdaFunctionTargetParameters.md)
 - [SQS](SQSTargetParameters.md)
 - [SNS](SNSTargetParameters.md)


#### Defined in

[schema.ts:310](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L310)


---
