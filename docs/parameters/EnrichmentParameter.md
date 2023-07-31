[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / EnrichmentParameter

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    enrichment:
      ...properties
```


### enrichment (optional)



It defines the enrichment for the EventBridge Pipes.

Following AWS services are supported as the target:
 
 - [Lambda Function](EnrichmentParameters.md)
 

#### Defined in

[schema.ts:277](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L277)


---