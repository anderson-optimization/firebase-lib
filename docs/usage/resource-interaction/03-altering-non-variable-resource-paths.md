## `firebase-lib` Documentation

### Altering Non-Variable Resource Paths

A resource path that does not include global or local variables can be altered
only by appending a subpath to it and then, if necessary, removing the
addition.  The alteration can be made during a data method's call or prior by
changing the path template.  The latter changes persist until subsequent path 
template modifications.  Path alterations made during a method's execution are
good only for that invocation.

Suppose there is a simple `users` resource.

```javascript
export const resourceDefinitions = {
  users: 'users'
}
```

To fetch a specific user, a `user-id` can be included in a `get()` call as a
subpath that will be appended to the resource path.  The new path
`users/user-id` is generated during the `get()` invocation and will not persist
beyond that execution.

```javascript
let {value: userInfo} = await resources.users.get('user-id');
```

To attach a user id permanently to a resource, `updatePathTemplate()` method can
be employed.

```javascript
resources.users.updatePathTemplate('user-id');
let {value: userInfo} = await.resources.users.get();
```

Now, the empty `get()` call will still return `user-id`'s data.  Invoking
`get()` or any other method on `users` with a new path will take precedence over
the path template.  Executing a data method with the option to
`{removeSubpaths: true}` will ignore additions to the template during that call.
A path can be reset to the original via `clearPathTemplate()`.  And, just the
subpaths can be removed via `clearSubpaths()`.

NOTE: A measure of caution should be exercised when using path templates.
Assigning subpaths during method invocation, despite being slightly more
verbose, is more deterministic and thus less problematic.

---

[Previous (Data Methods' Inputs)](./02-data-methods-inputs.md) :palm_tree:
[Table of Contents](../../../README.md) :palm_tree:
[Next (Altering Variable Resource Paths)](./03-altering-variable-resource-paths.md)
