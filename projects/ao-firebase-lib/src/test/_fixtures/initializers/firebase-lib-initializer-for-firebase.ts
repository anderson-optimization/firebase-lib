import firebase               from 'firebase/compat/app';
import                             'firebase/compat/database';
import {resourcesApisFactory} from '../../../lib/ao-firebase-lib';
import {firebaseConfigs}      from '../configs/firebase-configs';

export function firebaseLibInitializerForFirebase(collectionName, namespace, methodsParams?) {
  let app = firebase.initializeApp(firebaseConfigs);
  let database = firebase.database(app);
  
  firebase.setLogLevel('silent')
  resourcesApisFactory({collectionName, database, namespace,methodsParams});
}
