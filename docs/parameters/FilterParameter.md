[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / FilterParameter

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    filter:
      - Pattern: 'pattern1'
      - Pattern: 'pattern2'
      ...
```


### filter (optional)



It defines the filters for the EventBridge Pipes.

filter property contains array of objects. Pattern is the key in each object

### Properties
 
 - [Pattern](FilterParameter.md#Pattern)
 

#### Defined in

[schema.ts:308](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L308)

## Properties

### Pattern

• **Pattern**: `string`

The filtering pattern (in `JSON` encoded string format) used to filter the source events before passing them to target/enrichment.


#### Defined in

[schema.ts:216](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L216)


---
