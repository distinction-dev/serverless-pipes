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

[schema.ts:309](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L309)


---