# ServerlessPipes

Creates the EventBridge Pipes CloudFormation Resources as per the plugin defined in the serverless.yml file.

## Properties

- [serverless](#serverless)
- [options](#options)
- [config](#config)
- [hooks](#hooks)
- [extendedServerless](#extendedServerless)
- [sharedIAMRoleCount](#sharedIAMRoleCount)
- [sharedIAMRoleARN](#sharedIAMRoleARN)

## Methods

Defined in [Functions](../functions/functions.md)

## Constructor

• **new ServerlessPipes**(`serverless`, `options`)

#### Parameters

| Name       | Type     | Description |
| :--------- | :------- | :---------- |
| `serverless` | `Serverless` |       Contains the information from the serverless.yml file      |
| `options` | `ServerlessPluginOptions` |  Contains the options for Serverless Plugin         |

#### Defined in

[index.ts:39](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/index.ts#L39)

## Properties

### serverless

• `Private` **serverless**: `Serverless`

Contains the information from the serverless.yml file

#### Defined in

[index.ts:32](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/index.ts#L32)

---

### options

• `Private` **options**: `ServerlessPluginOptions`

Contains the options for Serverless Plugin

#### Defined in

[index.ts:33](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/index.ts#L33)

### config

• `Private` **config**: `any`

Defines the config property from the configurationInput of serverless object

#### Defined in

[index.ts:34](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/index.ts#L34)


### hooks

• `Private` **hooks**: `{ "package:compileFunctions": any }`

Bind the plugin building logic for the pipes

#### Defined in

[index.ts:35](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/index.ts#L35)


### extendedServerless

• `Private` **extendedServerless**: `Serverless & { classes: { Error: typeof Error } };`

Extended serverless object with the capability of throwing errors via ServerlessPipes

#### Defined in

[index.ts:36](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/index.ts#L36)


### sharedIAMRoleCount

• `Private` **sharedIAMRoleCount**: `number`

Maintains the count for shared iam role type of pipes

#### Defined in

[index.ts:37](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/index.ts#L37)

### sharedIAMRoleARN

• `Private` **sharedIAMRoleARN**: `string`

Constant ARN for shared iam role type of pipes

#### Defined in

[index.ts:38](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/index.ts#L38)
