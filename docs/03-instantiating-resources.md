## `firebase-lib` Documentation

### Instantiating Resources

`firebase-lib` exports `resourceCollections` object and `resourcesApisFactory()`
method.  The factory takes configuration information and builds and assigns
database methods for each resource in the definitions file.  This collection of
resources is placed within `resourceCollections` under a developer specified
name.  This way, after the resources are generated, they can be accessed
anywhere in the application simply by including and referencing an appropriate
part of `resourceCollections`.

---

[Previous (Creating Resource Definitions)](./02-creating-resource-definitions.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Instantiating Resources for Firebase API)](./04-instantiating-for-firebase-api.md)
