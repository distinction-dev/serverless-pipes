[serverless-pipes](../README.md) / [Exports](parameters.md) / SourceParameter

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

[schema.ts:275](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L275)


---