

## Serverless Pipes Plugin Functions

### buildEventBridgePipes

▸ **buildEventBridgePipes**(): `void`


Used to validate input from pipe section of serverless.yml. If input is as per the schema, generates gets the IAM Role Template & EventBridge Pipes Template and merges in the main template Resource for the serverless application.
___

### generateIAMRole

▸ **generateIAMRole**(`PipeName`): `object`

Used to generate & return the IAM Role CloudFormation Template based on the iamRolePipes property of pipes plugin for the service `pipes.amazonaws.com` with the Action : `sts:AssumeRole` for the specified `PipeName`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `PipeName` | `string` | Name of event bridge pipe |

___

### generatePipesResourceStack

▸ **generatePipesResourceStack**(`pipeName`, `pipesDescription`, `pipesDesiredState`, `sourceARN`, `targetARN`, `sourceParameters`, `targetParameters`, `filterParameters`, `enrichmentParameters`): `object`

Used to generate & return the EventBridge Pipes CloudFormation Template based on the input provided to the function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pipeName` | `string` | The name of pipes plugin |
| `pipesDescription` | `string` | The description for the pipes |
| `pipesDesiredState` | `string` | The desired state for the pipes to be in |
| `sourceARN` | `string` | The source arn for the pipes |
| `targetARN` | `string` | The target arn for the pipes |
| `sourceParameters` | [`SourceParameters`](../compiler/compiler.md#compileBasedOnSourceType) | The SourceParameters as per the event source |
| `targetParameters` | [`TargetParameters`](../compiler/compiler.md#compileBasedOnTargetType) | The SourceParameters as per the event source |
| `filterParameters` | [`FilterParameters`](../compiler/compiler.md#compileFilterPatterns) | The FilterParameters for the EventBridge pipes |
| `enrichmentParameters` | `EnrichmentParameters` | The Lambda Function name serving as the enrichment for the pipes

### validateInput

▸ **validateInput**(): `void`

Validates the input received for the pipes plugin.


### validateArn

▸ **validateArn**(`arn`, `type`, `pipe`): `void`

Validates the arn passed for the specific type & pipe.

| Name | Type | Description |
| :------ | :------ | :------ |
| `arn` | `string` / `object` | The arn passed as string or object to validate |
| `type` | `string` | The arn type (source / target) for which it is created |
| `pipe` | `string` | Name of event bridge pipe |

___