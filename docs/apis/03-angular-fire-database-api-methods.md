## `firebase-lib` Documentation

### AngularFire API Methods

##### list(path, query, observableMethod, eventTypes, options)

Description

* returns an Observable that emits every time specified events are triggered on
  the data subset  
* the emitted value is a list/array

Parameters
  
* path *(optional)*
* query *(optional)*
* observableMethod *(optional)*
  * one of `valueChanges`, `snapshotChanges`, `stateChanges`, `auditTrail`
  * default is `valueChanges`
* eventTypes *(optional)*
  * any or all of `child_added`, `child_changed`, `child_removed`, and `child_moved`
  * default is all
* options *(optional)*
  * removeSubpaths
    * if *true*, will remove subpaths from path template just for this invocation  

Returns  Observable

Example

```javascript
let params = {observableMethod: 'snapshotChanges'};
let subscription = resources.users.list(params).subscribe((snapshot) => {
  //do something with snapshot
});
```

---

##### object(path, query, observableMethod, eventTypes, options)

Description

* returns an Observable that emits every time specified events are triggered on
  the data subset
* the emitted value is an object
* the latter is the reason why querying will not work with `object()` and why
  the method does not take a query parameter

Parameters
  
* path *(optional)*
* observableMethod *(optional)*
  * one of `valueChanges`, `snapshotChanges`, `stateChanges`, `auditTrail`
  * default is `valueChanges`
* eventTypes *(optional)*
  * any or all of `child_added`, `child_changed`, `child_removed`, and `child_moved`
  * default is all
* options *(optional)*
  * removeSubpaths
    * if *true*, will remove subpaths from path template just for this invocation  

Returns  Observable

Example

```javascript
let params = {eventTypes: ['child_added', 'child_changed']};
let subscription = resources.users.object(params).subscribe((value) => {
  //do something with value
});
```

[Previous (Firebase API Methods)](./02-firebase-api-methods.md) :palm_tree:
[Table of Contents](../../README.md) :palm_tree:
[Next (General Resource API Methods)](./04-general-resource-api-methods.md)
