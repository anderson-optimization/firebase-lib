import omit                          from 'lodash.omit';
import {error}                       from '../_lib/utils';
import {normalizeResourceDefinition} from './_lib/resources-apis-builder-utils';
import {isValidPath}                 from './_lib/resources-apis-builder-utils';
import {reservedResourceKeywords}    from './_lib/resources-apis-builder-vars';
import {resourceApiBuilder}          from './resource-api-builder/resource-api-builder';
import {resourceApisAll}             from './resource-apis/resource-apis-all';

export function resourcesApisBuilder(params) {
  let {configs, resourceDefinitions, resourceDefinition, first, names} = params;
  resourceDefinitions = Object.entries(resourceDefinitions);
  
  resourceDefinitions = resourceDefinitions.reduce((_namespace, [resourceName, resourceDefinition]) => {
    resourceDefinition = normalizeResourceDefinition(resourceDefinition);
    let {path} = resourceDefinition as any;
    let resourceDefinitions = omit(resourceDefinition, reservedResourceKeywords);
    let resourceNameFull = names.concat(resourceName).join('.');
    
    if(resourceApisAll[resourceName]) {
      error(`declaration for '${resourceNameFull}' conflicts with '${resourceName}' api method`);
    }

    if(resourceDefinition.hasOwnProperty('path')) {
      if(!isValidPath(path)) {
        error(`path for '${resourceNameFull}' must be a string or an array of strings`);
      }
      
      Object.assign(resourceDefinition, {resourceName, resourceNameFull});
      resourceApiBuilder(resourceDefinition, configs);
    }
    
    params = {configs, resourceDefinitions, resourceDefinition};
    Object.assign(params, {first: false, names: names.concat(resourceName)});
    _namespace[resourceName] = resourcesApisBuilder(params);
    return _namespace;
  }, {} as any);

  return new Proxy({}, {
    get(o, prop: any) {
      if(resourceDefinitions[prop]) {
        return resourceDefinitions[prop];
      }

      if(first) {
        let {topGeneralApi} = resourceDefinition;
        
        if(topGeneralApi[prop]) {
          return topGeneralApi[prop];
        }
      } else {
        let {resourceApi} = resourceDefinition;
        
        if(resourceApi && resourceApi[prop]) {
          return resourceApi[prop];
        }
      }
      
      error(`property '${prop}' does not exist`);
    }
  });
}
