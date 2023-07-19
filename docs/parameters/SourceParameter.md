[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / SourceParameter

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    source:
      ...properties
```


### source



It defines the source for the EventBridge Pipes.

Following AWS services are supported as the source:
 
 - [DynamoDB](DynamoDBSourceParameters.md)
 - [KinesisStream](KinesisStreamSourceParameters.md)
 - [SQS](SQSSourceParameters.md)


#### Defined in

[schema.ts:307](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L307)


---
