## `firebase-lib` Documentation

### Instantiating Resources

`firebase-lib` exports `resourceCollections` object and `resourcesApisFactory()`
method.  The factory takes configuration information and builds and assigns
data and general methods to each resource in the definitions file.  This
collection of resources is placed within `resourceCollections` under a developer
specified name.  This way, after resources are generated, they can be accessed
anywhere in the application simply by including and referencing an appropriate
part of `resourceCollections`.

---

[Previous (Creating Resource Definitions)](../setup/02-creating-resource-definitions.md) :palm_tree:
[Table of Contents](../../../README.md) :palm_tree:
[Next (Instantiating Resources for Firebase API)](./02-instantiating-for-firebase-api.md)
