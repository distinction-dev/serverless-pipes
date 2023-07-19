

## Resource Compilation Functions

### getSourceArn

▸ **getSourceArn**(`config`, `PipeName`): `string`

Checks in the pipes plugins input & returns the arn property value for the source

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`config`](../classes/ServerlessPipes.md#config) | The config object from ServerlessPipes class|
| `PipeName` | `string` | The name of the Pipe

### getTargetArn

▸ **getTargetArn**(`config`, `PipeName`): `string`

Checks in the pipes plugins input & returns the arn property value for the target

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`config`](../classes/ServerlessPipes.md#config) | The config object from ServerlessPipes class|
| `PipeName` | `string` | The name of the Pipe

### compileBasedOnSourceType

▸ **compileBasedOnSourceType**(`config`, `PipeName`): `DynamoDBSourceParameters` | `KinesisStreamSourceParameter` | `SQSSourceParameter` | `object`

Takes the pipes plugin `source` input & returns specific object type, as required by the EventBridge Pipes CloudFormation - SourceParameters property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`config`](../classes/ServerlessPipes.md#config) | The config object from ServerlessPipes class|
| `PipeName` | `string` | The name of the Pipe

### compileBasedOnTargetType

▸ **compileBasedOnTargetType**(`config`, `PipeName`): `SNSTargetParameter` | `SQSTargetParameter` | `LambdaTargetParameter` | `StepFunctionTargetParameter` | `object`

Takes the pipes plugin `target` input & returns specific object type, as required by the EventBridge Pipes CloudFormation - TargetParameters property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`config`](../classes/ServerlessPipes.md#config) | The config object from ServerlessPipes class|
| `PipeName` | `string` | The name of the Pipe

### compileFilterPatterns

▸ **compileFilterPatterns**(`arn`, `type`): `void`

Takes the pipes plugin `filter` input & returns specific object type, as required by the EventBridge Pipes CloudFormation - SourceParameters.FilterCriteria property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arn` | `string` / `object` | The arn passed as string or object to validate |
| `type` | `string` | The arn type (source / target) for which it is created |

___
