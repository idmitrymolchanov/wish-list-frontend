
# CommonFault

Тело для общего описания ошибок

## Properties

Name | Type
------------ | -------------
`timestamp` | Date
`id` | string
`path` | string
`statusCode` | number
`detail` | string
`code` | string
`message` | string

## Example

```typescript
import type { CommonFault } from ''

// TODO: Update the object below with actual values
const example = {
  "timestamp": null,
  "id": null,
  "path": null,
  "statusCode": null,
  "detail": null,
  "code": null,
  "message": null,
} satisfies CommonFault

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CommonFault
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


