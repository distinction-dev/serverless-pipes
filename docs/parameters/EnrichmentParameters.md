[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / EnrichmentParameters.md

It defines LambdaFunction as the enrichment for the EventBridge Pipes.

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    enrichment:
      name:
        lambdaFunctionName
```


## Table of contents

### Properties

- [name](EnrichmentParameters.md#name)


## Properties

### name

• **name**: `string`

The name of the enrichment lambda function.


#### Defined in

[schema.ts:245](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L245)




---
