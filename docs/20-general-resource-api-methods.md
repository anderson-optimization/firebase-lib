## `firebase-lib` Documentation

### General Resource API Methods

##### clearPathTemplate()

Description

* resets the path template to the original path

Parameters None
  
Returns `undefined`

Example

```javascript
resources.users.userInfo.clearPathTemplate();
```

---

##### clearSubpaths()

Description

* truncats subpaths from the path template

Parameters None
  
Returns `undefined`

Example

```javascript
resources.users.userInfo.clearSubpaths();
```

---

##### clone()

Description

* creates a copy of a resource

Parameters None
  
Returns `ResourceApi` instance

Example

```javascript
let clone = resources.users.userInfo.clone();
```

---

##### removeFromVariablesIndex()

Description

* removes resource's definition from variables registry
* added to prevent memory leaks

Parameters None
  
Returns `undefined`

Example

```javascript
resources.users.userInfo.removeFromVariablesIndex();
```

---

##### setMethodsParams(methodsParams)

Description

* presets data method's parameters

Parameters

* methodsParams
  * this object should be partitioned by each data method
  * each data method's section should specify default parameters
  * the method will merge `options` parameter with existing ones
  * parameters other than `options` will be overwritten with newer value
  
Returns `undefined`

Example

```javascript
let methodsParams = {
  update: {
    options: {returnData: ['value', 'snapshot']}
  }
};

resources.users.userInfo.setMethodsParams(methodsParams);
```

---

##### updatePathTemplate(path)

Description

* fills path variables and appends resource subpaths

Parameters

* path
  * can be a subpath string
  * can be an array of subpaths
  * can be an array of arrays of variable values and subpaths
  * can be an array of objects of variable data and subpaths
  * can be an object of variable inputs and subpaths
  
Returns `undefined`

Examples

```javascript
let path = 'configs';
resources.userInfo.updatePathVariable(path);
```

```javascript
let path = ['configs', 'styles];
resources.userInfo.updatePathVariable(path);
```

```javascript
let path = [['$uid', '22'], ['#tid', 'team-a'], 'settings'];
resources.userInfo.updatePathVariable(path);
```

```javascript
let path = [{'$uid': '22'}, {'#tid': 'team-a'}, 'settings'];
resources.userInfo.updatePathVariable(path);
```

```javascript
let path = {vars: {'$uid': '22', '#tid': 'team-a'}, subpaths: ['settings']};
resources.userInfo.updatePathVariable(path);
```

---

[Previous (AngularFireDatabase API Methods)](./19-angular-fire-database-api-methods.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (General Top-Level API Methods)](./21-general-top-level-api-methods.md)
