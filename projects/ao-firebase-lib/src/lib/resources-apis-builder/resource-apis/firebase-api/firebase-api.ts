import firebase                                  from 'firebase/compat/app';
import isPlainObject                             from 'lodash.isplainobject';
import {reconcileParamsWithPresets}              from '../_lib/resource-apis-reconcilers';
import {reconcilePathToRef, reconcileQueryToRef} from '../_lib/resource-apis-reconcilers';
import {arrayToBooleansObject}                   from './_lib/firebase-api-utils';
import {modifyBase}                              from './modify-base/modify-base';

export const firebaseApi = {
  get(...params) {
    let reconciledParams = reconcileParamsWithPresets(this, 'get', params);
    let {path, query, options = {} as any} = reconciledParams;
    let returnData = arrayToBooleansObject(options.returnData ?? ['value']);
    let _returnData = {};
    let ref = reconcilePathToRef(this, path, options);
    ref = reconcileQueryToRef(query, ref);

    if(returnData.ref) {
      Object.assign(_returnData, {ref});
    }
    
    return ref.once('value').then((snapshot) => {
      if(returnData.snapshot) {
        Object.assign(_returnData, {snapshot})
      }
      
      if(returnData.key) {
        Object.assign(_returnData, {key: snapshot.key});
      }
      
      if(returnData.value) {
        Object.assign(_returnData, {value: snapshot.val()});
      }
      
      return _returnData;
    });
  },
  
  push(...params) {
    return modifyBase.call(this, 'push', ...params);
  },
  
  remove(...params) {
    let reconciledParams = reconcileParamsWithPresets(this, 'remove', params);
    let {path, options = {} as any} = reconciledParams;
    let ref = reconcilePathToRef(this, path, options);
    let {onComplete} = options;
    
    return ref.remove(onComplete);
  },
  
  set(...params) {
    return modifyBase.call(this, 'set', ...params);
  },
  
  transaction(...params) {
    return modifyBase.call(this, 'transaction', ...params);
  },
  
  update(...params) {
    return modifyBase.call(this, 'update', ...params);
  }
};
