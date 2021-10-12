import {Injectable}                from '@angular/core';
import {TestBed}                   from '@angular/core/testing';
import {AngularFireModule}         from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFireDatabase}       from '@angular/fire/compat/database';
import firebase                    from 'firebase/compat/app';
import {resourcesApisFactory}      from '../../../lib/firebase-lib';
import {firebaseConfigs}           from '../configs/firebase-configs';

export function firebaseLibInitializerForAngular(collectionName, resourceDefinitions) {
  @Injectable()
  class FirebaseLibInitializerService {
    constructor(angularDatabase: AngularFireDatabase) {
      firebase.setLogLevel('silent')
      resourcesApisFactory({collectionName, angularDatabase, resourceDefinitions});
    }
  }
  
  TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(firebaseConfigs),
      AngularFireDatabaseModule
    ],
    providers: [FirebaseLibInitializerService]
  });

  TestBed.inject(FirebaseLibInitializerService);  
}
