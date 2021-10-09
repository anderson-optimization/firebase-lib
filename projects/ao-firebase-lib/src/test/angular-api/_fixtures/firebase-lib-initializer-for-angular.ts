import {Injectable}                from '@angular/core';
import {TestBed}                   from '@angular/core/testing';
import {AngularFireModule}         from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFireDatabase}       from '@angular/fire/compat/database';
import firebase                    from 'firebase/compat/app';
import {resourcesApisFactory}      from '../../../lib/ao-firebase-lib';
import {firebaseConfigs}           from '../../_fixtures/firebase-configs';
import {namespace}                 from './namespace-angular';

@Injectable()
class FirebaseLibInitializerService {
  constructor(angularDatabase: AngularFireDatabase) {
    firebase.setLogLevel('silent')
    resourcesApisFactory({name: 'angular', angularDatabase, namespace});
  }
}

export function firebaseLibInitializerForAngular() {
  TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(firebaseConfigs),
      AngularFireDatabaseModule
    ],
    providers: [FirebaseLibInitializerService]
  });

  TestBed.inject(FirebaseLibInitializerService);  
}
