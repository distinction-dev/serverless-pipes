# Serverless Pipes Plugin

Serverless Framework plugin called as "pipes", used to create EventBridge Pipes by providing the required event sources, targets and other parameters as needed.

## Install

```bash
npm install @distinction-dev/serverless-pipes
```

or

```bash
yarn add @distinction-dev/serverless-pipes
```

## Allowed Services
At the initial version of the plugin, the below mentioned AWS services are supported for the source, target and enrichment in the EventBridge Pipes. We will expand to other services in the future.


### Source

- SQS
- DynamoDB
- Kinesis Streams

### Target

- SQS
- SNS
- Step Function
- Lambda Function

### Enrichment

- Lambda Function



## Usage

```yaml
# serverless.yml

functions:
    pipeEnricher:
        handler: functions/pipeEnricher.handler

pipes:
  testPipe: #pipesName
    source:
      sqs:
        arn:
          Fn::GetAtt: [SourceSQSQueue, Arn]
    target:
      sqs:
        arn:
          Fn::GetAtt: [TargetSNSTopic, TopicArn]
    enrichment: 
      name: pipeEnricher
    iamRolePipes:
      statements:
        - Effect: Allow
          Action:
            - sns:Subscribe
            - sns:Publish
          Resource: '*'
        - Effect: Allow
          Action:
            - sqs:ReceiveMessage
            - sqs:DeleteMessage
            - sqs:GetQueueAttributes
          Resource: '*'

```

