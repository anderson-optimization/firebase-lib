import {reconcileParamsWithPresets}              from '../../_lib/resource-apis-reconcilers';
import {reconcilePathToRef, reconcileQueryToRef} from '../../_lib/resource-apis-reconcilers';

export function getBaseAngular(methodName, ...params) {
  let reconciledParams = reconcileParamsWithPresets(this, methodName, params);
  let {path, query, method = 'valueChanges', eventTypes} = reconciledParams;
  let {options = {} as any} = reconciledParams;
  let ref = reconcilePathToRef(this, path, options);
  
  if(query && methodName === 'list') {
    var queryFunc = (ref) => reconcileQueryToRef(query, ref);
  }
  
  return this.angularDatabase[methodName](ref, queryFunc)[method](eventTypes);
}
