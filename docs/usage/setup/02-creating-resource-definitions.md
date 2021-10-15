## `firebase-lib` Documentation

### Creating Resource Definitions

Resource definition has two reserved properties: `path` and `methodsParams`.
The former is a direct data path in Firebase and the latter is for presetting
parameters for methods that interact with the database.  Anything else included
in the definition is considered another resource and will be namespaced within
its parent.

#### Basic resource definition

The shorthand way to define an alias is to use resource name as the object
property and the data path as the value.

```javascript
export const resourceDefinitions = {
  users: 'users',
  teams: 'teams',
  projects: 'projects'
};
```

#### Basic resource with explicit `path` and `methodsParams`

Whenever methods' parameters are to be preset within a definition, the longhand
declaration is the one to be used.

```javascript
export const resourceDefinitions = {
  users: {
    path: 'users',
    methodsParams: {
      list: {
        observableMethod: 'snapshotChanges'
      }
    }
  }
};
```

#### Namespaced resources

Related resources can be grouped within a resource definition.  The latter may
or may not be a resource itself.

NOTE: The path for a resource is absolute!  `firebase-lib` will **not**
concatenate nested paths with the paths of namespacing resources.

Basic namespacing:

```javascript
export const resourceDefinitions = {
  users: {
    userInfo: 'users'
  }
};
```

Namespace that is also a resource:

```javascript
export const resourceDefinitions = {
  users: {
    path: 'users',
    
    userInfo: {
      path: 'user-info'
    }
  }
};

```

#### Variable-path resources

The library allows global and local variables within a path.  Global variables
begin with the dollar sign (`$`).  Local variables start with the pound sign
(`#`).  Variable names are delineated using curly brackets (`{` `}`).  Resource
paths can be declared as strings, arrays, or a combination of both.

NOTE: The same variable can be used more than once within a path.  Very few, if
any, use cases would call for that.  The library, however, does support such
declarations.

Array path with variables:

```javascript
export const resourceDefinitions = {
  projects: ['projects', '${uid}', '#{projectId}']
};
```

String path with variables:

```javascript
export const resourceDefinitions = {
  projects: 'projects/${uid}/#{projectId}'
};
```

String and array path with variables:

```javascript
export const resourceDefinitions = {
  projects: ['projects/${uid}', '#{projectId}']
};
```

String path with "duplicate" variables:

```javascript
export const resourceDefinitions = {
  projects: 'projects/${projectId}/details/${projectId}'
};
```

String path with variables as parts of a database key:

```javascript
export const resourceDefinitions = {
  projects: 'projects/${teamId}-${uid}-configs'
};
```

---

[Previous (Installation)](./01-installation.md) :palm_tree:
[Table of Contents](../../../README.md) :palm_tree:
[Next (Instantiating Resources)](../resource-instantiation/01-instantiating-resources.md)
