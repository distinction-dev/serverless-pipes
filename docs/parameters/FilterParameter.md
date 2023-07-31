[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / FilterParameter

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    filter:
      - Pattern: 'json-stringified-patterns'
```


### filter (optional)



It defines the filters for the EventBridge Pipes.

filter property contains array of objects. Pattern is the key in each object

### Properties
 
 - [Pattern](FilterParameter.md#Pattern)
 

#### Defined in

[schema.ts:276](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L276)

## Properties

### Pattern

• **Pattern**: `string`

The filtering pattern (in `JSON` encoded string format) used to filter the source events before passing them to target/enrichment.


#### Defined in

[schema.ts:216](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L216)


---
