## `firebase-lib` Documentation

### `firebase-lib` Exports

##### resourcesApisFactory(configsObject)

Description

* processes resource definitions and build resources apis to interface with
  Firebase's real-time database

Parameters
  
* configsObject ***required***
  * angularDatabase *(optional)*
    * `AngularFire` database instance
    * should be provided whenever `list()` and `object()` methods are needed
  * collectionName *(optional)*
    * a name under which to store generated resources apis in `resourceCollections`
    * default is `default`
  * createdKeyName *(optional)*
    * name of the key for storing a timestamp for when data is created
    * applies only to `push` and `set` methods
    * default is `created`
  * database *(optional)*
    * Firebase API's database instance
    * should not be provided when `angularDatabase` is supplied
  * methodsParams *(optional)*
    * an object of data methods' parameter presets
    * presets applie across a collection of resources
  * modifiedKeyName
    * name of the key for storing a timestamp for when data is updated
    * applies to `push`, `set`, `transaction`, and `update`
    * default is `modified`
  * resourceDefinitions ***required***

Returns Proxy object that intercepts property access and returns data or a method

Examples

See [Instantiating Resources for Firebase API](./04-instantiating-for-firebase-api.md)
and [Instantiating Resources for Angular API](./05-instantiating-for-angular-api.md).

---


##### resourceCollections

Description

* an object that stores collections of generated resources apis under a
  developer-supplied collection name
* can be imported anywhere in an application and used to interact with the
  database after resources are instantiated

---

[Previous (Publishing Npm Package to Github)](../development/03-publishing-npm-package-to-github.md) :palm_tree:
[Table of Contents](../../README.md) :palm_tree:
[Next (Firebase API Methods)](./02-firebase-api-methods.md)
