import isPlainObject      from 'lodash.isplainobject';
import mergeWith          from 'lodash.mergewith';
import {error}            from '../../../_lib/utils';
import {getAndSetIfNil}   from '../../_lib/resources-apis-builder-utils';
import {variablePrefixes} from '../../_lib/resources-apis-builder-vars';
import {paramsMerger}     from './params-merger';
import {methodToParams}   from './resource-apis-vars';

function assertPathIsValid(path, {resourceNameFull}) {
  let variables = path.reduce((variables, part) => {
    if(variablePrefixes.includes(part[0])) {
      variables.push(part);
    }
    
    return variables;
  }, []);
  
  if(variables.length) {
    let message  = `path for '${resourceNameFull}' includes non-replaced `;
        message += `variables: ${variables.join(', ')}`;
    
    error(message);
  }
}

function normalizeParams(params, paramNames) {
  let [firstParam] = params;

  if(params.length === 1 && isPlainObject(firstParam)) {
    return firstParam;
  }

  return params.reduce((params, value, index) => {
    let prop = paramNames[index];
    return Object.assign(params, {[prop]: value});
  }, {} as any);
}

export function reconcileParamsWithPresets(api, method, params) {
  let paramNames = methodToParams[method];
  let configsMethodsParams = getAndSetIfNil(api.configs, 'methodsParams', {});
  let {[method]: configsMethodParams = {}} = configsMethodsParams as any;
  let {[method]: resourceMethodParams = {}} = api.methodsParams as any;
  params = normalizeParams(params, paramNames);
  
  return mergeWith({}, configsMethodParams, resourceMethodParams, params, paramsMerger);
}

export function reconcilePathToRef(api, path, {truncateExtras}) {
  if(!(path && typeof path === 'object' && path.onDisconnect)) {
    let activePath = api.setPath(path, true, truncateExtras);
    assertPathIsValid(activePath, api.resourceDefinition);
    return api.database.ref(activePath.join('/'));
  }
  
  return path;
}

export function reconcileQueryToRef(query = [], ref) {
  return query.reduce((ref, [methodName, ...params]) => {
    return ref[methodName](...params);
  }, ref);
}
