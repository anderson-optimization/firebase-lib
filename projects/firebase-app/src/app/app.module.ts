import {NgModule, APP_INITIALIZER} from '@angular/core';
import {BrowserModule}             from '@angular/platform-browser';
import {AngularFireModule}         from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFireDatabase}       from '@angular/fire/compat/database';
import {resourcesApisFactory}      from '../../../firebase-lib/src/public-api';
import {resourceCollections}       from '../../../firebase-lib/src/public-api';
import {AppComponent}              from './app.component';
import {firebaseConfigs}           from './configs/firebase-configs';
import {resourceDefinitions}       from './configs/resource-definitions';

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
