[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / IAMRoleParameter

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    iamRolePipes:
      statements:
        - Effect: Allow
          Action:
            - sns:Subscribe
            - sns:Publish
          Resource: '*'
        - Effect: Allow
          Action:
            - sqs:ReceiveMessage
            - sqs:DeleteMessage
            - sqs:GetQueueAttributes
          Resource: '*'
        ...
```


### iamRolePipes



It defines the iam role statements for the EventBridge Pipes. The iam role statements allow the pipes to access the source/target to perform the required actions.


### Properties
 
 - [statements](IAMRoleParameter.md#statements)
 

#### Defined in

[schema.ts:280](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L280)

## Properties

### statements

• **statements**: `array`

It contains the iam role statements array of objects which define the required access on the required Resource.

Objects have the following properties:

- [Effect](IAMRoleParameter.md#Effect)
- [Action](IAMRoleParameter.md#Action)
- [Resource](IAMRoleParameter.md#Resource)



### Effect

• **Effect**: `string`

Defines if the iam role `Allow` or `Deny` the access to the pipes.


#### Defined in

[schema.ts:285](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L285)


### Action

• **Action**: `string`

Defines what actions are granted or denied for the EventBridge pipes.


#### Defined in

[schema.ts:286](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L286)



### Resource

• **Resource**: `string`

Defines on which AWS Resource the access is granted or denied for the EventBridge pipes.


#### Defined in

[schema.ts:287](https://github.com/distinction-dev/serverless-pipes/blob/bafcd10b595a304cf2a2f2f7cf109be3ea8504f2/src/schema.ts#L287)

---
