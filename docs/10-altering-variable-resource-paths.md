## `firebase-lib` Documentation

### Altering Variable Resource Paths

#### Declaring Variable Inputs

There are multiple ways to declare variable data to be interpolatable by the
library.

Suppose there is the following resource.

```javascript
export const resourceDefinitions = {
  projectInfo: 'project/${uid}/stats/#{pid}'
};
```

Variable value declaration can be an array of arrays of variable name and value
pairs.

```javascript
let path = [['$uid', '22343'], ['#pid', 'p15']];
```

Variable data can also be arranged as an array of objects.

```javascript
let path = [{'$uid': '22343'}, {'#pid', 'p15'}];
```

Interpolatable information can likewise be specified as an object.

```javascript
let path = {'$uid': '22343', '#pid': 'p15'};
```

Variable replacement can be combined with non-variable path augmentation.
Whenever an array format is used, subpaths can simply be included in the array.

```javascript
let path = [['$uid', '22343'], 'subpath-1', ['#pid', 'p15'], 'subpath-2'];
//resultant path: project/22343/stats/p15/subpath-1/subpath-2
```

Or,

```javascript
let path = [{'$uid': '22343'}, {'#pid', 'p15'}, 'subpath-1', 'subpath-2'];
```

In cases where an object is the optimal format to provide path information, the
object must have `vars` and `subpaths` sections.

```javascript
let path = {vars: {'$uid': '22343', '#pid': 'p15'}, subpaths: ['subpath-1', 'subpath-2']};
```

NOTE: Variables are declared within a path using interpolation syntax
(e.g., `${uid}`).  When a variable's value is specified, its indicator consists
of the global or local sign (`$` or `#`) and a name (e.g., `$uid`).

#### Resource-Level Variable Replacement

Variable path replacement for an individual resource can take place during a
data method invocation or can be permanently preset using `updatePathTemplate()`.

```javascript
let path = {'$uid': '22343', '#pid': 'p15'};
let value = {someData: {}};
await resources.projectInfo.set(path, value);
```

Or,

```javascript
let path = {'$uid': '22343', '#pid': 'p15'};
let value = {someData: {}};
resources.projectInfo.updatePathTemplate(path);
await resources.projectInfo.set(undefined, value);
```

Path template can be reset to the original path by invoking
`clearPathTemplate()` and subpaths can be removed by calling `clearSubpaths()`.

#### Application-Level Variable Replacement

Multiple resources can have equal parts that may need repeated replacement.
These parts can be represented as global variables and then changed.

Consider the following resource definitions.

```javascript
export const resourceDefinitions {
  users: '/users/${uid}',
  hobbies: '/hobbies/${uid}'
}
```

To replace `$uid`s globally `setPathVariables()` available at the `resources`
namespace should be used.

```javascript
resources.setPathVariables({'$uid': 'c'});
let {value: user} = await resources.users.get();
let {value: hobbies} = await resources.hobbies.get();
```

Whenever a global variable is changed again, resources' operations must be
rerun.  Perhaps in a future version of the library that step can be automated.

---

[Previous (Altering Non-Variable Resource Paths)](./09-altering-non-variable-resource-paths.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Querying Resources)](./11-querying-resources.md)
