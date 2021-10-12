import isPlainObject      from 'lodash.isplainobject';
import mergeWith            from 'lodash.mergewith';
import {error}              from '../../../_lib/utils';
import {getAndSetIfNil}     from '../../_lib/resources-apis-builder-utils';
import {variablePrefixes}   from '../../_lib/resources-apis-builder-vars';
import {paramsMerger}       from './params-merger';
import {methodToParamNames} from './resource-apis-vars';

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
  let paramNames = methodToParamNames[method];
  let configsMethodsParams = getAndSetIfNil(api.configs, 'methodsParams', {});
  let {[method]: configsMethodParams = {}} = configsMethodsParams as any;
  let {[method]: resourceMethodParams = {}} = api.methodsParams as any;
  params = normalizeParams(params, paramNames);
  
  return mergeWith({}, configsMethodParams, resourceMethodParams, params, paramsMerger);
}

export function reconcilePathToRef(api, path, {truncateExtras}) {
  if(!(path && typeof path === 'object' && path.onDisconnect)) {
    let activePath = api.updatePathTemplate(path, true, truncateExtras);
    return api.database.ref(activePath);
  }
  
  return path;
}

export function reconcileQueryToRef(query = [], ref) {
  return query.reduce((ref, [methodName, ...params]) => {
    return ref[methodName](...params);
  }, ref);
}
