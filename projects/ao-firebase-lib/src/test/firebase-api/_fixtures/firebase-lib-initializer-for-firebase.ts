import firebase               from 'firebase/compat/app';
import                             'firebase/compat/database';
import {resourcesApisFactory} from '../../../lib/ao-firebase-lib';
import {firebaseConfigs}      from '../../_fixtures/firebase-configs';
import {namespace}            from './namespace-firebase';

export function firebaseLibInitializerForFirebase() {
  let app = firebase.initializeApp(firebaseConfigs);
  let database = firebase.database(app);
  
  firebase.setLogLevel('silent')
  resourcesApisFactory({name: 'firebase', database, namespace});
}
