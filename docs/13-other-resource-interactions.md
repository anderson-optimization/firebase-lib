## `firebase-lib` Documentation

### Other Resource Interactions

#### Presetting Data Methods' Parameters

Inputs to data methods can be prefixed to a resource definition or assigned
programmatically via `setMethodsParams()`.  The method will merge `options`
settings and replace other parameters with newer values.

```javascript
let methodsParams = {
  push: {
    options: {
      includePushKey: 'some-key-name'
    }
  }
};

resources.userInfo.setMethodsParams(methodsParams);
```

#### Data retrieval and mutation

This documentation's Firebase and AngularFire API sections can be referenced for
more details of using data methods.  The tests folder -
`projects/firebase-lib/src/test` - also provides detailed examples of data
retrieval, change, and removal.

#### Memory Leak Prevention

Resource definitions that define global variables are stored in a registry.  If
a lot of resources are dynamically created, for example, via cloning, then after
they are no longer needed, their entries in the registry should be cleared to
free up memory.

```javascript
clone1.removeFromVariablesIndex();
clone2.removeFromVariablesIndex();
clone3.removeFromVariablesIndex();
```

To clear the registry for all resources `removeFromVariablesIndex()` can be
called on the collection directly.

```javascript
resources.removeFromVariablesIndex()
```

For almost all use cases these steps are not necessary.  When there is clear
knowledge that resources are not being used while the program will continue
running for some time, then their memory should be freed.

---

[Previous (Cloning Resources)](./12-cloning-resources.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Resource Interaction Examples)](./14-resource-interaction-examples.md)
