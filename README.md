# firebase-lib

## Introduction

The library builds on [Firebase][b] and [Angular Fire][a] software development 
kits (SDKs) and facilitates a simplified way of interfacing with the database.
The software provides a mechanism to abstract subsets of data as resources and
alias their direct paths declaratively in definition files.  The aliases can be
nested within other aliases, permitting namespacing of related resources
irrespective of the hierarchy within which their data is stored.  The subsets
can then be interacted with by invoking appropriate methods to fetch or mutate
the data.  Multiple resources may have equal path elements and oftentimes the
same resource's path may have to be altered repeatedly depending, for example,
on user input.  `firebase-lib` allows path variables to capture access
changeability.  Global variables are interpolatable across all paths.  Local
variables are substitutable only at a specific resource. Globals can likewise be
targetedly assigned.  The simplest path alteration available is appending and
then, if necessary, truncating sub-paths. The library provides functionality for
presetting path parts or changing them at the time of a data method invocation.
For use cases that require multiple instances of the same resource, but with
specific settings, `firebase-lib` can be used to clone a resource and then each
duplicate can be altered to a desired state.  Beyond just path configurability,
the library can preset every input for the data methods globally.  Fixing query
or path parameters at the application level is unlikedly to be necessitated.
However, preconfiguring data return options or the type of observable that an
Angular Fire method produces can be useful.  Parameter prefilling can also be
accomplished at the resource level programmatically and declaratively.  Both
global and local presets are overridable at the time of method execution.
Working with a lot of resources that use global variables may lead to memory
leaks, because each definition is registered with an index.  For the last set of
features, `firebase-lib` makes methods available to clear these registries once
resource instances are no longer needed.

## Usage

### Installation

`firebase-lib` is a private package distributed via Github.  To install the
software, a developer should be added to Anderson Optimization organization and
have `.npmrc` file at the root of their project point to the appropriate
registry as shown below.

```
@anderson-optimization:registry=https://npm.pkg.github.com
```

Then, pull the package via the following command.

```
npm install --save @anderson-optimization/firebase-lib
```

### Creating Resource Definitions

Resource definition has two reserved properties: `path` and `methodsParams`.
The former is a direct data path in Firebase and the latter is for presetting
parameters for methods that interact with the database.  Anything else included
in the definition is considered another resource and will be namespaced within
its parent.

#### 1. Basic resource definition

The shorthand way to define an alias is to use resource name as the object
property and the data path as the value.

```javascript
export const resourceDefinitions = {
  users: 'users',
  teams: 'teams',
  projects: 'projects'
};
```

#### 2. Basic resource with explicit `path` and `methodsParams`

Whenever methods' parameters are to be preset within a definition, longhand
declaration is the only one that can be used.

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

#### 3. Namespaced resources

Related resources can be grouped within a resource definition.  The latter may
or may not be a resource itself.

NOTE: For the last example, the paths are absolute!  `firebase-lib` will **not**
concatenate nested paths with the paths of namespacing resources.

**Basic namespacing**

```javascript
export const resourceDefinitions = {
  users: {
    userInfo: 'users'
  }
};
```

**Namespace that is also a resource**

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

#### 4. Variable-path resources

The library allows global and local variables within a path.  Global variables
begin with a dollar sign (`$`).  Local variables start with a pound sign (`#`).
Variable names are delineated using curly braces (`{` `}`).  Resource paths can
be declared as strings, arrays, or a combination of both.

NOTE: The same variable can be used more than once within a path.  Very few, if
any, use cases would require that.  The library, however, does support such
declarations.

**Array path with variables**

```javascript
export const resourceDefinitions = {
  projects: ['projects', '${uid}', '#{projectId}']
};
```

**String path with variables**

```javascript
export const resourceDefinitions = {
  projects: 'projects/${uid}/#{projectId}'
};
```

**String and array path with variables**

```javascript
export const resourceDefinitions = {
  projects: ['projects/${uid}', '#{projectId}']
};
```

**String path with "duplicate" variables**

```javascript
export const resourceDefinitions = {
  projects: 'projects/${projectId}/details/${projectId}'
};
```

**String path with variables as parts of database key**

```javascript
export const resourceDefinitions = {
  projects: 'projects/${teamId}-${uid}-configs'
};
```

### Instantiating Resources

`firebase-lib` exports `resourceCollections` object and `resourcesApisFactory()`
method.  The factory takes configuration information and builds and assigns
database methods for each resource in the definitions file.  This collection of
resources is placed within `resourceCollection` map under a developer specified
name.  This way, after the resources are generated, they can be accessed
anywhere in the application simply by including and referencing an appropriate
part of `resourceCollections`.

#### Instantiating for Firebase API

NOTE: At this time `firebase-lib` uses compatibility layer of version 9 of
Firebase API.  As the dependency becomes more documented, the appropriate
changes will be made to this documentation.  Regardless of the API version used
the general process of instantiating resources should remain the same.

**1. Include dependencies**
```javascript
import firebase               from 'firebase/compat/app';
import                             'firebase/compat/database';
import {resourcesApisFactory} from '@anderson-optimization/firebase-lib';
import {resourceCollections}  from '@anderson-optimization/firebase-lib';
import {resourceDefinitions}  from '<your resource definitions file>';
```

**2. Specify Firebase Configs**
```javascript
let firebaseConfig = {
  apiKey: '<your apiKey>',
  authDomain: '<your authDomain>',
  databaseURL: '<your databaseURL>',
  projectId: '<your projectId>',
  storageBucket: '<your storageBucket>',
  messagingSenderId: '<your messagingSenderId>',
  appId: '<your appId>',
  measurementId: '<your measurementId>'
};
```

**3. Initialize application and get database object**
```javascript
let app = firebase.initializeApp(firebaseConfigs);
let database = firebase.database(app);
```

**4. Generate resources**

```javascript
let resourcesParams = {collectionName: 'my-resources', database, resourceDefinitions};
let resources = resourcesApisFactory(resourcesParams);
resources === resourceCollections['my-resources']; //true
```

NOTE: `methodsParams` parameter can also be added if there is a need to preset
method parameters at the application level.  The generated `resources` can be
also be accessed from `resourceCollections['my-resources']`.

#### Instantiating for Angular Firebase API

Instantiation process for Angular applications is almost the same as above.  The
only difference is that instead of supplying Firebase API's database instance,
an `AngularFireDatabase` instance is provided to the `resourcesApisFactory()`.
Perhaps the best Angular setup approach is to instantiate resources at the
initialization of the application as follows.

**1. Include dependencies**

```javascript
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {BrowserModule}             from '@angular/platform-browser';
import {AngularFireModule}         from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFireDatabase}       from '@angular/fire/compat/database';
import {resourcesApisFactory}      from '@anderson-optimization/firebase-lib';
import {resourceCollections}       from '@anderson-optimization/firebase-lib';
import {AppComponent}              from './app.component';
import {firebaseConfigs}           from './configs/firebase-configs';
import {resourceDefinitions}       from './configs/resource-definitions';
```

**2. Initialize database and application and generate resources**

```javascript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfigs)
  ],
  providers: [{
    provide: APP_INITIALIZER,
    multi: true,
    useFactory(angularDatabase) {
      return () => {
        let resourcesParams = {
          collectionName: 'angular',
          resourceDefinitions,
          angularDatabase
        };
        
        let resources = resourcesApisFactory(resourcesParams);
        console.log(resources === resourceCollections.angular);
      }
    },
    deps: [AngularFireDatabase]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

#### Instantiation Examples

`projects` folder includes a sample Angular `firebase-app` that initializes the
database instance and resources.  `firebase-lib`'s tests also provide realistic
examples.

### Interacting with Database

After resource i

### Development

#### Process and Contributing

#### Publishing a Package to Github

### Application Programming Interfaces (APIs)

#### Firebase API Methods

get()

push()

remove()

set()

transaction()

update()

#### AngularFireDatabase API Methods

list()

object()

#### General Resource Methods

clearPathTemplate()

clone()

removeFromVariablesIndex()

setMethodsParams()

updatePathTemplate()

#### General Top-Level Methods

getAngularDatabase()

getDatabase()

getUniqueKey()

removeFromVariablesIndex()

setPathVariables()



contribution to repo

* minimal ES2021 code
* tests with coverage of 100%
* detailed documentation if appropriate


[a]: https://github.com/angular/angularfire
[b]: https://firebase.google.com/docs/reference/js/v8/firebase
