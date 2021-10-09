import firebase               from 'firebase/compat/app';
import                             'firebase/compat/database';
import {resourcesApisFactory} from '../../../lib/ao-firebase-lib';
import {firebaseConfigs}      from '../../_fixtures/firebase-configs';
import {namespace}            from './namespace-general';

export function firebaseLibInitializerForGeneral() {
  let app = firebase.initializeApp(firebaseConfigs);
  let database = firebase.database(app);

  firebase.setLogLevel('silent')
  resourcesApisFactory({name: 'general', database, namespace});
}
