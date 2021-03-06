## `firebase-lib` Documentation

### Firebase API Methods

##### get(path, query, options)

Description

* returns requested data

Parameters
  
* path *(optional)*
* query *(optional)*
* options *(optional)*

  * removeSubpaths
    * if *true*, will remove subpaths from path template just for this invocation  
  * returnData
    * any or all of `key`, `ref`, `value`, `snapshot`
    * default is `value`


Returns  Promise

Example

```javascript
let path = 'id-2343';
let query = [['orderByChild', 'name'], ['limitToFirst', 1]];
let options = {returnData: ['ref']}
let {ref} = await resources.users.get(path, query, options);
```

---

##### push(path, value, options)

Description

* adds a new record to a data subset under an auto-generated 20-character key

Parameters

* path *(optional)*
* value ***required***
* options *(optional)*
  * addTimestamps
    * if *true*, will add `created` and `modified` timestamps
    * will include timestamps only when `value` is an object
  * includePushKey
    * if *true*, will include auto-generated key as `key` within `value`
    * if a string, will include auto-generated key as `includeKey`'s value within `value`
    * will include the auto-generated key only when `value` is an object
  * onComplete
    * a callback that will be invoked once the operation is complete
  * removeSubpaths
    * if *true*, will remove subpaths from path template just for this invocation
  * returnData
    * any or all of `key`, `ref`, `value`, `snapshot`
    * default is `undefined`

Returns  Promise

Example

```javascript
let path = 'id-2343';
let value = {userName: 'some-user-name', name: {first: 'John', last: 'Doe'}};
let options = {includePushKey: 'some-key-value', returnData: ['value']};
let {value} = await resources.users.push(path, value, options);
```
---

##### remove(path, options)

Description

* removes the record at the path location

Parameters
  
* path *(optional)*
* options *(optional)*
  * onComplete
    * a callback that will be invoked once the operation is complete
  * removeSubpaths
    * if *true*, will remove subpaths from path template just for this invocation

Returns  Promise
 
Example
 
```javascript
let path = 'id-2343';
let {ref} = await resources.users.remove(path);
```

---

##### set(path, value, options)

Description

* adds a new record or completely overrides an existing one

Parameters

* path *(optional)*
* value ***required***
* options *(optional)*
  
  * addTimestamps
    * if *true*, will add `created` and `modified` timestamps
    * will include timestamps only when `value` is an object
  * onComplete
    * a callback that will be invoked once the operation is complete
  * removeSubpaths
    * if *true*, will remove subpaths from path template just for this invocation
  * returnData
    * any or all of `key`, `ref`, `value`, `snapshot`
    * default is `undefined`

Returns  Promise

Example

```javascript
let path = 'id-234322';
let value = {userName: 'some-user-name', name: {first: 'John', last: 'Doe'}};
let options = {addTimestamps: true, returnData: ['ref']};
let {ref} = await resources.users.set(path, value, options);
```
---

##### transaction(path, value, options)

Description

* selectively and transactionally updates the pathed record

Parameters

* path *(optional)*
* value ***required***
* options *(optional)*
  
  * addTimestamps
    * if *true*, will add `modified` timestamp
    * will include timestamp only when a parameter received by the `value` 
      function is an object
  * onComplete
    * a callback that will be invoked once the operation is complete
  * removeSubpaths
    * if *true*, will remove subpaths from path template just for this invocation
  * returnData
    * any or all of `key`, `ref`, `value`, `snapshot`
    * default is `undefined`

Returns  Promise

Example

```javascript
let path = 'id-88888';
let approvalStatus = true;
let value = (value) => {
  if(value === null) {
    return true;
  }
  
  return Object.assign(value, {approvalStatus});
}
let options = {addTimestamps: true};
await resources.users.transaction(path, value, options);
```

---

##### update(path, value, options)

Description

* selectively updates the indicated record.

Parameters

* path *(optional)*
* value ***required***
* options *(optional)*
  
  * addTimestamps
    * if *true*, will add `modified` timestamp
    * will include timestamp only when `value` is an object
  * onComplete
    * a callback that will be invoked once the operation is complete
  * removeSubpaths
    * if *true*, will remove subpaths from path template just for this invocation
  * returnData
    * any or all of `key`, `ref`, `value`, `snapshot`
    * default is `undefined`

Returns  Promise

Example

```javascript
let path = 'id-88888';
let value = {approvalStatus: true};
let options = {addTimestamps: true, returnData: ['value', 'key']};
let {value, key} = await resources.users.update(path, value, options);
```

---

[Previous (`firebase-lib` Exports)](./01-firebase-lib-exports.md) :palm_tree:
[Table of Contents](../../README.md) :palm_tree:
[Next (AngularFire API Methods)](./03-angular-fire-database-api-methods.md)
