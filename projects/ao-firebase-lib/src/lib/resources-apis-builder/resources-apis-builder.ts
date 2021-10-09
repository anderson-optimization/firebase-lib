import omit                          from 'lodash.omit';
import {error}                       from '../_lib/utils';
import {normalizeResourceDefinition} from './_lib/resources-apis-builder-utils';
import {isValidPath}                 from './_lib/resources-apis-builder-utils';
import {reservedResourceKeywords}    from './_lib/resources-apis-builder-vars';
import {resourceApiBuilder}          from './resource-api-builder/resource-api-builder';
import {resourceApisAll}             from './resource-apis/resource-apis-all';

export function resourcesApisBuilder(params) {
  let {configs, namespace, resourceDefinition, first, names} = params;
  
  namespace = Object.entries(namespace).reduce((_namespace, [name, resourceDefinition]) => {
    resourceDefinition = normalizeResourceDefinition(resourceDefinition);
    let {path} = resourceDefinition as any;
    let namespace = omit(resourceDefinition, reservedResourceKeywords);
    let resourceNameFull = names.concat(name).join('.');
    
    if(resourceApisAll[name]) {
      error(`declaration for '${resourceNameFull}' conflicts with '${name}' api method`);
    }

    if(resourceDefinition.hasOwnProperty('path')) {
      if(!isValidPath(path)) {
        error(`path for '${resourceNameFull}' must be a string or an array of strings`);
      }
      
      Object.assign(resourceDefinition, {resourceName: name, resourceNameFull});
      resourceApiBuilder(resourceDefinition, configs);
    }
    
    params = {configs, namespace, resourceDefinition, first: false, names: names.concat(name)};
    namespace = resourcesApisBuilder(params);
    return Object.assign(_namespace, {[name]: namespace});
  }, {} as any);

  return new Proxy({}, {
    get(o, prop: any) {
      if(namespace[prop]) {
        return namespace[prop];
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
