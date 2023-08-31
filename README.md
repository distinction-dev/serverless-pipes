
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

- [SQS](docs/parameters/SQSSourceParameters.md)
- [DynamoDB](docs/parameters/DynamoDBSourceParameters.md)
- [Kinesis Streams](docs/parameters/KinesisStreamSourceParameters.md)

### Target

- [SQS](docs/parameters/SQSTargetParameters.md)
- [SNS](docs/parameters/SNSTargetParameters.md)
- [Step Function](docs/parameters/StepFunctionTargetParameters.md)
- [Lambda Function](docs/parameters/LambdaFunctionTargetParameters.md)

### Enrichment

- [Lambda Function](docs/parameters/EnrichmentParameters.md)



## Usage

```yaml
# serverless.yml

plugins:
  - serverless-pipes

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

For documentation refer [Docs](docs/index.md)
