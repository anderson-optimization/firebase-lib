## `firebase-lib` Documentation

### Resource Access

Resources can be nested as deep as practically necessary within namespaces.
Access to a resource's api should follow the same hierarchy laid out in the
definitions file.  Consider the following resource definitions.

```javascript
export const resourceDefinitions = {
  users: {
    userInfo: {
      path: 'users',
      
      hobbies: 'hobbies'
    }
  }
}
```

After resources are instantiated by `resourcesApisFactory()` and stored in, say,
`resources` variable, accessing hobbies alias to get its data would necessitate
the following call.

```javascript
let {value} = await resources.users.userInfo.hobbies.get();
```

If a resource is used repeatedly, then access can be simplified via
destructuring.

```javascript
let {hobbies} = resources.users.userInfo;
let {snapshot} = await hobbies.get({options: {returnData: ['snapshot']}});
```

---

[Previous (Instantiation Examples)](./06-instantiation-examples.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Data Methods' Inputs)](./08-data-methods-inputs.md)
