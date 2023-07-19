

## Serverless Pipes Plugin Functions

### buildEventBridgePipes

▸ **buildEventBridgePipes**(): `void`


Used to validate input from pipe section of serverless.yml. If input is as per the schema, generates gets the IAM Role Template & EventBridge Pipes Template and merges in the main template Resource for the serverless application.
___

### generateIAMRole

▸ **generateIAMRole**(): `object`

Used to generate & return the IAM Role CloudFormation Template based on the iamRolePipes property of pipes plugin for the service `pipes.amazonaws.com` with the Action : `sts:AssumeRole`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `method` | [`HttpVerbsEnum`](enums/HttpVerbsEnum.md) | The method type of this route |
| `path` | `string` | The resource path of this route |
| `conditions` | [`AwsPolicyCondition`](modules#awspolicycondition)[] | - |
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

▸ **validateInput**(`PipeName`): `void`

Validates the input received for the pipes plugin.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `PipeName` | `string` | The name of pipes plugin |

### validateArn

▸ **validateArn**(`arn`, `type`): `void`

Validates the arn passed for the specific type.

| Name | Type | Description |
| :------ | :------ | :------ |
| `arn` | `string` / `object` | The arn passed as string or object to validate |
| `type` | `string` | The arn type (source / target) for which it is created |

___
