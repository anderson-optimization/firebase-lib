## `firebase-lib` Documentation

### Data Methods' Inputs

Data methods allow fetching and mutating database subsets and include Firebase
API's `get`, `push`, `remove`, `set`, `transaction`, and `update`, and
AngularFireDatabase API's `list` and `object`.  All data methods' parameters are
optional.  Whenever a method's behavior has to be altered via inputs, the latter
can be supplied in the order that a method expects them or via an object whose
keys indicate the types of values that are being given.  Using an object can be
convenient when just a fifth ordered parameter needs to be passed to a function.
For example, `list()` method takes five inputs with `options` being the last.
To invoke the function with ordered parameters would result in the following
"simplified" call.

```javascript
let options = {removeSubpaths: true};
let params = [undefined, undefined, undefined, undefined, options];
let observable = resources.users.userInfo.hobbies.list(...params);
```

It would be easier to specify an object with just options.

```javascript
let params = {options: {removeSubpaths: true}};
let observable = resources.users.userInfo.hobbies.list(params);
```

NOTE: If a data function receives just one parameter and it is an object, then
its properties will be treated as inputs.  All other data formats will be
regarded as ordered parameters.

---

[Previous (Resource Access)](./07-resource-access.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Data Methods' Inputs)](./08-data-methods-inputs.md)
