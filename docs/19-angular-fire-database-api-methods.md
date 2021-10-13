## `firebase-lib` Documentation

### AngularFireDatabase API Methods

##### list(path, query, observableMethod, eventTypes, options)
 
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
 
Parameters
  
* path *(optional)*
* query *(optional)*
  * NOTE: Query parameter will not work for `object()` use `list()` instead
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

[Previous (Firebase API Methods)](./18-firebase-api-methods.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (General Resource API Methods)](./20-general-resource-api-methods.md)
