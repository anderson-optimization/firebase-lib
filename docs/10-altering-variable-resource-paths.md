## `firebase-lib` Documentation

### Altering Variable Resource Paths

The approach that was used to alter non-variable paths is also applicable to
modifying paths with variables.  The only difference is specifying a path that
includes variable values.  Suppose there is the following resource.

```javascript
export const resourceDefinitions = {
  projectInfo: 'project/${uid}/stats/#{pid}'
};
```

The declaration of variable data can 

---

[Previous (Altering Non-Variable Resource Paths)](./09-altering-non-variable-resource-paths.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Cloning Resources)](./11-cloning-resources.md)
