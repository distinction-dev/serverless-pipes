
# Serverless Pipes Plugin

Serverless Framework plugin called as "pipes", used to create EventBridge Pipes by providing the required event sources, targets and other parameters as needed.

## Install

```bash
npm install serverless-pipes
```

or

```bash
yarn add serverless-pipes
```

## Allowed Services
At the initial version of the plugin, the below mentioned AWS services are supported for the source, target and enrichment in the EventBridge Pipes. We will expand to other services in the future.


### Source

- [SQS](parameters/SQSSourceParameters.md)
- [DynamoDB](parameters/DynamoDBSourceParameters.md)
- [Kinesis Streams](parameters/KinesisStreamSourceParameters.md)

### Target

- [SQS](parameters/SQSTargetParameters.md)
- [SNS](parameters/SNSTargetParameters.md)
- [Step Function](parameters/StepFunctionTargetParameters.md)
- [Lambda Function](parameters/LambdaFunctionTargetParameters.md)

### Enrichment

- [Lambda Function](parameters/EnrichmentParameters.md)



## Usage

```yaml
# serverless.yml

functions:
    pipeEnricher:
        handler: functions/pipeEnricher.handler

pipes:
 testPipe: #pipeName
    enabled: true
    source:
      sqs:
        arn:
          Fn::GetAtt: [SourceSQSQueue, Arn]
    target:
      sns:
        arn:
          Fn::GetAtt: [TargetSNSTopic, TopicArn]
    enrichment: 
      name: pipeEnricher
    filter:
      - Pattern: "{ \"body\": { \"message\": [ \"hello\" ], \"city\": [ \"hey\" ] }}"
    iamRolePipes:
      type: "individual"

```

For documentation refer [Docs](index.md)
