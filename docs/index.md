[serverless-pipes](README.md) / Exports

# serverless-pipes
Serverless Framework plugin called as "pipes", used to create EventBridge Pipes by providing the required event sources, targets and other parameters as needed.

## Table of contents

### Classes

- [ServerlessPipes](classes/ServerlessPipes.md)

### Serverless Pipes Plugin Parameters

- [enabled](parameters/EnabledParameter.md)
- [source](parameters/SourceParameter.md)
- [target](parameters/TargetParameter.md)
- [filter](parameters/FilterParameter.md)
- [enrichment](parameters/EnrichmentParameter.md)
- [iamRolePipes](parameters/IAMRoleParameter.md)

### Serverless Pipes Plugin Functions

- [buildEventBridgePipes](functions/functions.md#buildEventBridgePipes)
- [generateIAMRole](functions/functions.md#generateIAMRole)
- [generatePipesResourceStack](functions/functions.md#generatePipesResourceStack)
- [validateInput](functions/functions.md#validateInput)
- [validateArn](functions/functions.md#validateArn)
