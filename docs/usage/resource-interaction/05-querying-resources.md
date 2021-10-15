## `firebase-lib` Documentation

### Querying Resources

Only `get()` and `list()` accept query parameters.  The sorting and filtering
criteria are specified as an array of statements.  Each statement is an array
containing Firebase filtering function name and the function's inputs.

```javascript
let query = [
  ['orderByKey'],
  ['limitToLast', 2]
];

let {value} = resources.users.get(undefined, query);
```

In this example, `orderByKey` takes no parameters.  `limitToLast` takes one.
There are no Firebase filtering functions that take more than one entry.  In
case such functions may be added in the future, all of their inputs should
simply follow their name.

```javascript
let query = [
  ['newFilteringFunction', 'param 1', 'param 2']
];
```

---

[Previous (Altering Variable Resource Paths)](./04-altering-variable-resource-paths.md) :palm_tree:
[Table of Contents](../../../README.md) :palm_tree:
[Next (Cloning Resources)](./06-cloning-resources.md)
