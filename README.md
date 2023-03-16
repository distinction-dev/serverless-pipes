# Serverless Pipes Plugin

🚧 This is a Work in Progress and we're looking to get inputs from the community
Making it easier to use Eventbridge pipes with Serverless Framework. Easier Api resembling that of Step Functions

## Install

```bash
npm install @distinction-dev/serverless-pipes
```

or

```bash
yarn add @distinction-dev/serverless-pipes
```

## Usage

```yaml
# serverless.yml

functions:
    pipeEnricher:
        handler: functions/pipeEnricher.handler

pipes:
    event:
        # Define Event source
        sqs:
            arn:
                Fn::GetAtt:
                    - MySourceQueue
                    - Arn
    enrichment:
        function: pipeEnricher
    target:
        sqs:
            arn:
                Fn::GetAtt:
                    - MyTargetQueue
                    - Arn
```
