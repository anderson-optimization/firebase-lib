import {error}                          from './_lib/utils';
import {resourceCollections}            from './_lib/vars';
import {reconcileDatabases, selectApis} from './configs-preprocessors/configs-preprocessors';
import {resourcesApisBuilder}           from './resources-apis-builder/resources-apis-builder';
import {TopGeneralApi}                  from './top-general-api/top-general-api';

export function resourcesApisFactory(configs) {
  let {name = 'default', namespace} = configs as any;
  let topGeneralApi = new TopGeneralApi(configs);
  let resourceDefinition = {topGeneralApi};

  if(resourceCollections[name]) {
    error(`resources collection '${name}' already exists`);
  }

  reconcileDatabases(configs);
  selectApis(configs);

  let params = {configs, namespace, resourceDefinition, first: true, names: []};
  return resourceCollections[name] = resourcesApisBuilder(params);
}
