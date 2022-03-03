# Expiring Local Storage

This package aims to implement a storage that offers a way to specify an expiring date of the items stored.

### Set Item

In order to save an object inside the storage you have to use the method `setItem` of the `ExpiringStorage` class. The
function has two mandatory parameters and one optional parameter. The mandatory parameters are the key that identifies
the item and the item itself, the optional parameter is the time (in seconds) at the end of which the item will expire.
**Only JSON representable data is accepted**

```typescript
import {ExpiringStorage} from "./expiring-storage";

let item = {name: "string"};
ExpiringStorage.setItem('key', item, 60); // This item will expire in 60 seconds
```

### Get Item

The method to retrieve an object that's stored inside the storage works like the `localStorage` one, with the
method `getItem` of the `ExpiringStorage` class. The method requires the key of the item. If the item is expired the
method will return null.

```typescript
import {ExpiringStorage} from "./expiring-storage";

let item = ExpiringStorage.getItem('key'); //The item will be returned if it isn't expired otherwise it'll be null
```
