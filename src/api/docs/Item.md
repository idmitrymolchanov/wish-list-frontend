
# Item


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
`description` | string
`linkToSite` | string
`image` | string
`statusCode` | [ItemStatus](ItemStatus.md)
`statusName` | string
`userLogin` | string

## Example

```typescript
import type { Item } from ''

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
  "description": null,
  "linkToSite": null,
  "image": null,
  "statusCode": null,
  "statusName": null,
  "userLogin": null,
} satisfies Item

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Item
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


