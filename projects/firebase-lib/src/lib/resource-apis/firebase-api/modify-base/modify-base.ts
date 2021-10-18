import firebase                     from 'firebase/compat/app';
import isPlainObject                from 'lodash.isplainobject';
import {reconcileParamsWithPresets} from '../../_lib/resource-apis-reconcilers';
import {reconcilePathToRef}         from '../../_lib/resource-apis-reconcilers';

export function modifyBase(methodName, ...params) {
  let reconciledParams = reconcileParamsWithPresets(this, methodName, params);
  let {path, value, options = {} as any} = reconciledParams;
  let {onComplete, returnData, addTimestamps, includePushKey} = options;
  let ref = reconcilePathToRef(this, path, options);
  let _isPlainObject = isPlainObject(value);

  if(addTimestamps) {
    let {createdKeyName = 'created', modifiedKeyName = 'modified'} = this.configs;
    let {TIMESTAMP} = firebase.database.ServerValue;
    let timestamps = {[modifiedKeyName]: TIMESTAMP};
    
    if(['set', 'push'].includes(methodName)) {
      Object.assign(timestamps, {[createdKeyName]: TIMESTAMP});
    }
    
    if(methodName === 'transaction') {
      value = ((value) => {
        return (data) => {
          if(isPlainObject(data)) {
            Object.assign(data, timestamps);
          }
          
          return value(data);
        }
      })(value);
    } else if(_isPlainObject) {
      Object.assign(value, timestamps);
    }
  }
  
  if(methodName === 'push') {
    ref = ref[methodName]();
    methodName = 'set';
    
    if(includePushKey && _isPlainObject) {
      let keyName = typeof includePushKey === 'string' ? includePushKey : 'key';
      Object.assign(value, {[keyName]: ref.key});
    }
  }
  
  let promise = ref[methodName](value, onComplete);
  
  if(returnData) {
    if(!Array.isArray(returnData)) {
      returnData = [returnData];
    }
    
    promise = promise.then(() => this.get(ref, undefined, {returnData}));
  }
  
  return promise;
}
