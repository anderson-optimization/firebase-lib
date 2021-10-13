## `firebase-lib` Documentation

### Instantiating Resources for Angular Firebase API

Instantiation process for Angular applications is almost the same as the one for
Firebase API.  The only difference is instead of supplying Firebase API's
database instance, an `AngularFireDatabase` instance is provided to the 
`resourcesApisFactory()`.  Firebase API's database instance is derived from 
`AngularFireDatabase` object.  Perhaps the best Angular setup approach is to
instantiate resources at the initialization of the application as shown below.

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

---

[Previous (Instantiating Resources for Firebase API)](./04-instantiating-for-firebase-api.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Instantiation Examples)](./06-instantiation-examples.md)
