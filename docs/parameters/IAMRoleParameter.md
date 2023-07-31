[@distinction-dev/serverless-pipes](../README.md) / [Exports](parameters.md) / IAMRoleParameter

# Usage
```yaml

# serverless.yml

pipes:
  pipeName:
    iamRolePipes:
      type: "individual"
```


### iamRolePipes


It is used to generate the IAM role statements based on the given type for the EventBridge Pipes. Two possible values can be there: 
 - shared
 - individual

The IAM role statements allow the pipes to access the source/target to perform the required actions.


### Properties
 
 - [type](IAMRoleParameter.md#type)
 

#### Defined in

[schema.ts:256](https://github.com/distinction-dev/serverless-pipes/blob/adc1ce1b20b719d2e58f62a01c813e4ef9c57a5c/src/schema.ts#L256)

## Properties

### type

• **type**: `string`

It defines the type of IAM role required to be generated for the EventBridge Pipes. Two possible values can be there: 
 - shared (creates a single IAM role which is shared among all the pipes created in the application)
 - individual (creates a seperate IAM role per pipe based on the source & target of the pipe)


Note: "shared" type IAM role permits all the possible access to the pipes. So, use it based on the use case in the application.



---
