import {error}                               from './_lib/utils';
import {counters, resourceCollections}       from './_lib/vars';
import {angularApi, firebaseApi, generalApi} from './resource-apis/resource-apis';
import {resourcesApisBuilder}                from './resources-apis-builder/resources-apis-builder';
import {TopGeneralApi}                       from './top-general-api/top-general-api';

export function resourcesApisFactory(configs) {
  let {collectionName = 'default', resourceDefinitions, cache} = configs as any;
  let {angularDatabase, database} = configs;
  let cacheCollection = cache !== false;

  if(cacheCollection) {
    if(resourceCollections[collectionName]) {
      error(`resources collection '${collectionName}' already exists`);
    }
  } else {
    collectionName = `${collectionName}_uncached_${++counters.uncachedCollection}`;
    configs = {...configs, collectionName};
  }

  let topGeneralApi = new TopGeneralApi(configs);
  let resourceDefinition = {topGeneralApi};

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
  let collection = resourcesApisBuilder(params);

  if(cacheCollection) {
    resourceCollections[collectionName] = collection;
  }

  return collection;
}
