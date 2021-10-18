import {reconcileParamsWithPresets}              from '../_lib/resource-apis-reconcilers';
import {reconcilePathToRef, reconcileQueryToRef} from '../_lib/resource-apis-reconcilers';

export const angularApi = {
  list(...params) {
    let reconciledParams = reconcileParamsWithPresets(this, 'list', params);
    let {path, query, observableMethod = 'valueChanges'} = reconciledParams;
    let {eventTypes, options = {} as any} = reconciledParams;
    let ref = reconcilePathToRef(this, path, options);
    
    if(query) {
      var queryFunc = (ref) => reconcileQueryToRef(query, ref);
    }
    
    return this.angularDatabase.list(ref, queryFunc)[observableMethod](eventTypes);
  },
  
  object(...params) {
    let reconciledParams = reconcileParamsWithPresets(this, 'object', params);
    let {path, observableMethod = 'valueChanges'} = reconciledParams;
    let {eventTypes, options = {} as any} = reconciledParams;
    let ref = reconcilePathToRef(this, path, options);

    return this.angularDatabase.object(ref)[observableMethod](eventTypes);
  }
};
