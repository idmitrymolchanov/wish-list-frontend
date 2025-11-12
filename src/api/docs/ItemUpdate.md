
# ItemUpdate


## Properties

Name | Type
------------ | -------------
`id` | string
`createDate` | Date
`lastUpdateDate` | Date
`name` | string
`amount` | string
`reserved` | boolean
`currency` | string
`description` | string
`linkToSite` | string
`priority` | string
`image` | string

## Example

```typescript
import type { ItemUpdate } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "createDate": null,
  "lastUpdateDate": null,
  "name": null,
  "amount": null,
  "reserved": null,
  "currency": null,
  "description": null,
  "linkToSite": null,
  "priority": null,
  "image": null,
} satisfies ItemUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ItemUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


