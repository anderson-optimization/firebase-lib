## `firebase-lib` Documentation

### Instantiating Resources for Firebase API

At this time `firebase-lib` is tested with the compatibility layer of version 9
of Firebase API.  As the dependency becomes more documented, the appropriate
changes will be made to this documentation.  Regardless of the API version used,
the general process of instantiating resources should remain the same.  Whenever
just the Firebase API is used with the library, naturally, AngularFire methods
will be excluded from the resource api.

#### Include dependencies
```javascript
import firebase               from 'firebase/compat/app';
import                             'firebase/compat/database';
import {resourcesApisFactory} from '@anderson-optimization/firebase-lib';
import {resourceCollections}  from '@anderson-optimization/firebase-lib';
import {resourceDefinitions}  from '<your resource definitions file>';
```

#### Specify Firebase Configs
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

#### Initialize application and get database object
```javascript
let app = firebase.initializeApp(firebaseConfigs);
let database = firebase.database(app);
```

#### Generate resources

```javascript
let resourcesParams = {collectionName: 'my-resources', database, resourceDefinitions};
let resources = resourcesApisFactory(resourcesParams);
resources === resourceCollections['my-resources']; //true
```

NOTE: `methodsParams` parameter can also be added if there is a need to preset
methods' parameters at the application level.  The generated `resources` can
also be accessed from `resourceCollections['my-resources']`.

---

[Previous (Instantiating Resources)](./03-instantiating-resources.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Instantiating Resources for AngularFire API)](./05-instantiating-for-angular-api.md)
