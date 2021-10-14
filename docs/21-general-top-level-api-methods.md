## `firebase-lib` Documentation

### General Top-Level API Methods

##### getAngularDatabase()

Description

* provides `AngularFire` database instance *(if it was included at the
  initialization)*

Parameters None
  
Returns `AngularFire` database instance

Example

```javascript
resources.getAngularDatabase();
```

---

##### getDatabase()

Description

* provides `Firebase` API's database instance

Parameters None
  
Returns `Firebase` database instance

Example

```javascript
resources.getDatabase();
```

---

##### getUniqueKey()

Description

* generates `Firebase`'s unique 20-character string

Parameters None
  
Returns 20-character unique string

Example

```javascript
resources.getUniqueKey();
```

---

##### removeFromVariablesIndex()

Description

* clears all references to resource definitions within a collection
* should be used with caution; once evoked global variables' updates will not work

Parameters None
  
Returns `undefined`

Example

```javascript
resources.removeFromVariablesIndex();
```

---

##### setPathVariables(variableName, value)

Description

* updates global variables' values across all resources

Parameters

* variableName
  * the first parameter can also be an object of variable names and values pairs
* value *(optional)*
  
Returns `undefined`

Examples

```javascript
resources.setPathVariables('$uid', '23432');
```

```javascript
resources.setPathVariables({'$uid': '23432', '$tid': 'team22'});
```

---

[Previous (General Resource API Methods)](./20-general-resource-api-methods.md) :palm_tree:
[Table of Contents](../README.md)
