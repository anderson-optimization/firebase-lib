import {error}                               from '../_lib/utils';
import {angularApi, firebaseApi, generalApi} from '../resources-apis-builder/resource-apis/resource-apis';

export function reconcileDatabases(configs) {
  let {angularDatabase, database} = configs as any;
  
  if(!database) {
    if(!angularDatabase) {
      error('provide angular or regular firebase instance');
    }
    
    configs.database = angularDatabase.database.app.database();
  }
}

export function selectApis(configs) {
  let {angularDatabase} = configs as any;
  configs.apis = {...firebaseApi, ...generalApi};

  if(angularDatabase) {
    Object.assign(configs.apis, angularApi);
  }
}
