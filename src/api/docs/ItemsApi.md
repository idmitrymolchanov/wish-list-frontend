# ItemsApi

All URIs are relative to *https://todo/newgor-wishlist*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createItem**](ItemsApi.md#createitem) | **POST** /wishlist/item | Создать новый предмет |
| [**deleteItem**](ItemsApi.md#deleteitem) | **DELETE** /wishlist/item/{id} | Удалить предмет |
| [**getItemById**](ItemsApi.md#getitembyid) | **GET** /wishlist/item/{id} | Получить предмет вишлиста по id |
| [**getItemImage**](ItemsApi.md#getitemimage) | **GET** /wishlist/item/{id}/image | Получить изображение предмета |
| [**getItems**](ItemsApi.md#getitems) | **GET** /wishlist/item | Получить список предметов |
| [**patchItem**](ItemsApi.md#patchitem) | **PATCH** /wishlist/item/{id} | Обновить предмет |
| [**reserveItem**](ItemsApi.md#reserveitem) | **POST** /wishlist/item/{id}/reserve | Изменить статус резерва |
| [**setItemStatus**](ItemsApi.md#setitemstatus) | **POST** /wishlist/item/{id}/status | Обновить статус предмета |
| [**uploadItemImage**](ItemsApi.md#uploaditemimage) | **POST** /wishlist/item/{id}/image | Загрузить/обновить изображение предмета |



## createItem

> CreateItem200Response createItem(item)

Создать новый предмет

### Example

```ts
import {
  Configuration,
  ItemsApi,
} from '';
import type { CreateItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Authorization
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ItemsApi(config);

  const body = {
    // Item (optional)
    item: ...,
  } satisfies CreateItemRequest;

  try {
    const data = await api.createItem(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **item** | [Item](Item.md) |  | [Optional] |

### Return type

[**CreateItem200Response**](CreateItem200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | - Bad Request,   code: 00001,   message: Некорректный запрос  |  -  |
| **409** | - code: 00003   message: При выполнении операции произошел сбой. Для уточнения деталей ошибки необходимо выполнить анализ логов  |  -  |
| **500** | - code: 00005   message: Внутренняя ошибка сервера  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteItem

> deleteItem(id)

Удалить предмет

Метод для удаления предмета

### Example

```ts
import {
  Configuration,
  ItemsApi,
} from '';
import type { DeleteItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Authorization
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ItemsApi(config);

  const body = {
    // string | Идентификатор предмета
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteItemRequest;

  try {
    const data = await api.deleteItem(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Идентификатор предмета | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **400** | - Bad Request,   code: 00001,   message: Некорректный запрос  |  -  |
| **404** | - Not Found,   code: 14001,   message: Предмет не найден  |  -  |
| **500** | - code: 00005   message: Внутренняя ошибка сервера  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getItemById

> Item getItemById(id)

Получить предмет вишлиста по id

Получение подробной информации о предмете по указанному идентификатору.

### Example

```ts
import {
  Configuration,
  ItemsApi,
} from '';
import type { GetItemByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Authorization
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ItemsApi(config);

  const body = {
    // string | Идентификатор предмета
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetItemByIdRequest;

  try {
    const data = await api.getItemById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Идентификатор предмета | [Defaults to `undefined`] |

### Return type

[**Item**](Item.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | - Bad Request,   code: 00001,   message: Некорректный запрос  |  -  |
| **404** | - Not Found,   code: 00002,   message: Предмет не найден  |  -  |
| **409** | - code: 00003   message: При выполнении операции произошел сбой. Для уточнения деталей ошибки необходимо выполнить анализ логов  |  -  |
| **500** | - code: 00005   message: Внутренняя ошибка сервера  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getItemImage

> Blob getItemImage(id)

Получить изображение предмета

### Example

```ts
import {
  Configuration,
  ItemsApi,
} from '';
import type { GetItemImageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ItemsApi();

  const body = {
    // string | Идентификатор предмета
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetItemImageRequest;

  try {
    const data = await api.getItemImage(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Идентификатор предмета | [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `image/png`, `image/jpeg`, `image/webp`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Изображение предмета |  -  |
| **404** | - code: 00002   message: Изображение не найдено  |  -  |
| **400** | - code: 00001   message: Некорректный запрос  |  -  |
| **500** | - code: 00005   message: Внутренняя ошибка сервера  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getItems

> GetItems200Response getItems(userLogin, statusCode, createDateFrom, createDateTo, limit, offset, showReservedStatus, sortField)

Получить список предметов

Метод позволяет получить список предметов вишлиста по заданным параметрам запроса. Если по заданным параметрам предметы не найдены, то возвращается пустой массив.

### Example

```ts
import {
  Configuration,
  ItemsApi,
} from '';
import type { GetItemsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Authorization
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ItemsApi(config);

  const body = {
    // string | логин пользователя
    userLogin: userLogin_example,
    // string | Код статуса (optional)
    statusCode: statusCode_example,
    // Date | Созданы после (optional)
    createDateFrom: 2013-10-20T19:20:30+01:00,
    // Date | Созданы до (optional)
    createDateTo: 2013-10-20T19:20:30+01:00,
    // number | Количество записей на странице (optional)
    limit: 56,
    // number | Смещение от начала списка (optional)
    offset: 56,
    // boolean | показывать резерв (optional)
    showReservedStatus: true,
    // SortField | показывать резерв (optional)
    sortField: ...,
  } satisfies GetItemsRequest;

  try {
    const data = await api.getItems(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userLogin** | `string` | логин пользователя | [Defaults to `undefined`] |
| **statusCode** | `string` | Код статуса | [Optional] [Defaults to `undefined`] |
| **createDateFrom** | `Date` | Созданы после | [Optional] [Defaults to `undefined`] |
| **createDateTo** | `Date` | Созданы до | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Количество записей на странице | [Optional] [Defaults to `50`] |
| **offset** | `number` | Смещение от начала списка | [Optional] [Defaults to `0`] |
| **showReservedStatus** | `boolean` | показывать резерв | [Optional] [Defaults to `undefined`] |
| **sortField** | `SortField` | показывать резерв | [Optional] [Defaults to `undefined`] [Enum: CREATE_DATE, PRIORITY, AMOUNT] |

### Return type

[**GetItems200Response**](GetItems200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | - Bad Request,   code: 00001,   message: Некорректный запрос  |  -  |
| **409** | - code: 00003   message: При выполнении операции произошел сбой. Для уточнения деталей ошибки необходимо выполнить анализ логов  |  -  |
| **500** | - code: 00005   message: Внутренняя ошибка сервера  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## patchItem

> patchItem(id, itemUpdate)

Обновить предмет

Метод для изменения предмета

### Example

```ts
import {
  Configuration,
  ItemsApi,
} from '';
import type { PatchItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Authorization
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ItemsApi(config);

  const body = {
    // string | Идентификатор предмета
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // ItemUpdate
    itemUpdate: ...,
  } satisfies PatchItemRequest;

  try {
    const data = await api.patchItem(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Идентификатор предмета | [Defaults to `undefined`] |
| **itemUpdate** | [ItemUpdate](ItemUpdate.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **400** | - Bad Request,   code: 00001,   message: Некорректный запрос  |  -  |
| **404** | - Not Found,   code: 14001,   message: Предмет не найден  |  -  |
| **500** | - code: 00005   message: Внутренняя ошибка сервера  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## reserveItem

> reserveItem(id, reserved)

Изменить статус резерва

### Example

```ts
import {
  Configuration,
  ItemsApi,
} from '';
import type { ReserveItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Authorization
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ItemsApi(config);

  const body = {
    // string | Идентификатор предмета
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | статус резерва
    reserved: true,
  } satisfies ReserveItemRequest;

  try {
    const data = await api.reserveItem(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Идентификатор предмета | [Defaults to `undefined`] |
| **reserved** | `boolean` | статус резерва | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | OK |  -  |
| **400** | - Bad Request,   code: 00001,   message: Некорректный запрос  |  -  |
| **409** | - code: 00003   message: При выполнении операции произошел сбой. Для уточнения деталей ошибки необходимо выполнить анализ логов  |  -  |
| **500** | - code: 00005   message: Внутренняя ошибка сервера  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## setItemStatus

> setItemStatus(id, statusCode)

Обновить статус предмета

### Example

```ts
import {
  Configuration,
  ItemsApi,
} from '';
import type { SetItemStatusRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Authorization
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ItemsApi(config);

  const body = {
    // string | Идентификатор предмета
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Код статуса (optional)
    statusCode: statusCode_example,
  } satisfies SetItemStatusRequest;

  try {
    const data = await api.setItemStatus(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Идентификатор предмета | [Defaults to `undefined`] |
| **statusCode** | `string` | Код статуса | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | OK |  -  |
| **400** | - Bad Request,   code: 00001,   message: Некорректный запрос  |  -  |
| **409** | - code: 00003   message: При выполнении операции произошел сбой. Для уточнения деталей ошибки необходимо выполнить анализ логов  |  -  |
| **500** | - code: 00005   message: Внутренняя ошибка сервера  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## uploadItemImage

> CreateItem200Response uploadItemImage(id, file, metadata)

Загрузить/обновить изображение предмета

### Example

```ts
import {
  Configuration,
  ItemsApi,
} from '';
import type { UploadItemImageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ItemsApi();

  const body = {
    // string | Идентификатор предмета
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // Blob | Изображение предмета
    file: BINARY_DATA_HERE,
    // string | JSON с метаинформацией о предмете
    metadata: metadata_example,
  } satisfies UploadItemImageRequest;

  try {
    const data = await api.uploadItemImage(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Идентификатор предмета | [Defaults to `undefined`] |
| **file** | `Blob` | Изображение предмета | [Defaults to `undefined`] |
| **metadata** | `string` | JSON с метаинформацией о предмете | [Defaults to `undefined`] |

### Return type

[**CreateItem200Response**](CreateItem200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | - Bad Request,   code: 00001,   message: Некорректный запрос  |  -  |
| **409** | - code: 00003   message: При выполнении операции произошел сбой. Для уточнения деталей ошибки необходимо выполнить анализ логов  |  -  |
| **500** | - code: 00005   message: Внутренняя ошибка сервера  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

