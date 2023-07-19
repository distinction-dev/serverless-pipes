

## Util Functions

### get

▸ **get**(`obj`,`path`, `def`): `any`

Takes the `path` parameter & searches in the `obj` parameter. If the `path` found, returns the object defined by `path`. Else returns the `def` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `object` | The object from which path defined is to be searches |
| `path` | `string` | The path provided for search within `obj` |
| `def` | `object` | The default object to be returned in case the `path` was not found in `obj` |

___

### removeEmptyProperties

▸ **removeEmptyProperties**(`obj`): `object`

Take the `obj` parameter & removes any empty {} or undefined or null properties from the object at all the levels within the object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | object | The object from which empty properties are to be removed |


