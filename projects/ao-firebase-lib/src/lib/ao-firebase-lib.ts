import {error}                               from './_lib/utils';
import {resourceCollections}                 from './_lib/vars';
import {resourcesApisBuilder}                from './resources-apis-builder/resources-apis-builder';
import {angularApi, firebaseApi, generalApi} from './resources-apis-builder/resource-apis/resource-apis';
import {TopGeneralApi}                       from './top-general-api/top-general-api';

export function resourcesApisFactory(configs) {
  let {name = 'default', namespace, angularDatabase, database} = configs as any;
  let topGeneralApi = new TopGeneralApi(configs);
  let resourceDefinition = {topGeneralApi};

  if(resourceCollections[name]) {
    error(`resources collection '${name}' already exists`);
  }

  if(!database) {
    if(!angularDatabase) {
      error('provide angular or regular firebase instance');
    }
    
    database = angularDatabase.database.app.database();
    Object.assign(configs, {database});
  }
  
  function ResourceApi(resourceDefinition) {
    Object.assign(this, {
      configs,
      angularDatabase,
      database,
      resourceDefinition,
      methodsParams: {}
    });
  }

  ResourceApi.prototype = {...firebaseApi, ...generalApi};

  if(angularDatabase) {
    Object.assign(ResourceApi.prototype, angularApi);
  }

  Object.assign(configs, {ResourceApi});
  let params = {configs, namespace, resourceDefinition, first: true, names: []};
  return resourceCollections[name] = resourcesApisBuilder(params);
}
