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

[schema.ts:278](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L278)


---
