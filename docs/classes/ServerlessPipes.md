# ServerlessPipes

Creates the EventBridge Pipes CloudFormation Resources as per the plugin defined in the serverless.yml file.

## Properties

- [serverless](#serverless)
- [options](#options)
- [config](#config)
- [hooks](#hooks)

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

[index.ts:32](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/index.ts#L32)

## Properties

### serverless

• `Private` **serverless**: `Serverless`

Contains the information from the serverless.yml file

#### Defined in

[index.ts:28](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/index.ts#L28)

---

### options

• `Private` **options**: `ServerlessPluginOptions`

Contains the options for Serverless Plugin

#### Defined in

[index.ts:29](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/index.ts#L29)

### config

• `Private` **config**: `any`

Defines the config property from the configurationInput of serverless object

#### Defined in

[index.ts:30](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/index.ts#L30)


### hooks

• `Private` **hooks**: `{ "package:compileFunctions": any }`

Bind the plugin building logic for the pipes

#### Defined in

[index.ts:31](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/index.ts#L31)

