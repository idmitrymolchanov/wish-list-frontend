
# ItemBaseInfo

Базовая информация о предмете

## Properties

Name | Type
------------ | -------------
`id` | string
`createDate` | Date
`lastUpdateDate` | Date
`name` | string
`amount` | number
`currency` | string
`reserved` | boolean
`priority` | number
`priorityName` | string

## Example

```typescript
import type { ItemBaseInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "createDate": null,
  "lastUpdateDate": null,
  "name": null,
  "amount": null,
  "currency": null,
  "reserved": null,
  "priority": null,
  "priorityName": null,
} satisfies ItemBaseInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ItemBaseInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


