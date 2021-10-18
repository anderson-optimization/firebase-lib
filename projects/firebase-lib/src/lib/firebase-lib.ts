import {error}                               from './_lib/utils';
import {resourceCollections}                 from './_lib/vars';
import {angularApi, firebaseApi, generalApi} from './resource-apis/resource-apis';
import {resourcesApisBuilder}                from './resources-apis-builder/resources-apis-builder';
import {TopGeneralApi}                       from './top-general-api/top-general-api';

export function resourcesApisFactory(configs) {
  let {collectionName = 'default', resourceDefinitions} = configs as any;
  let {angularDatabase, database} = configs;
  let topGeneralApi = new TopGeneralApi(configs);
  let resourceDefinition = {topGeneralApi};

  if(resourceCollections[collectionName]) {
    error(`resources collection '${collectionName}' already exists`);
  }

  if(!database && !angularDatabase) {
    error('provide angular or regular firebase instance');
  }

  if(angularDatabase) {
    database = angularDatabase.database.app.database();
    Object.assign(configs, {database});
  }

  function ResourceApi(resourceDefinition) {
    if(!resourceDefinition.methodsParams) {
      resourceDefinition.methodsParams = {};
    }
    
    Object.assign(this, {
      configs,
      angularDatabase,
      database,
      resourceDefinition
    });
  }

  ResourceApi.prototype = {...firebaseApi, ...generalApi};

  if(angularDatabase) {
    Object.assign(ResourceApi.prototype, angularApi);
  }

  Object.assign(configs, {ResourceApi});
  let params = {configs, resourceDefinitions, resourceDefinition, first: true, names: []};
  return resourceCollections[collectionName] = resourcesApisBuilder(params);
}
