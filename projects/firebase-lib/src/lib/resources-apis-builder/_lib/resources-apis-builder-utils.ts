import cloneDeep     from 'lodash.clonedeep';
import isPlainObject from 'lodash.isplainobject';

export function getAndSetIfNil(...params) {
  let [o, property, valueIfNotSet] = params;
  
  let value = o[property];
  
  if(typeof value === 'undefined') {
    value = o[property] = valueIfNotSet;
  }
  
  return value;
}

export function isValidPath(path) {
  if(typeof path === 'string' || Array.isArray(path)) {
    if(path.length) {
      if(Array.isArray(path)) {
        for(let part of path) {
          if(typeof part !== 'string' || !part.length) {
            return;
          }
        }
      }
      
      return true;
    }
  }
}

export function normalizeResourceDefinition(resourceDefinition) {
  if(!isPlainObject(resourceDefinition)) {
    resourceDefinition = {
      path: resourceDefinition
    };
  }

  return resourceDefinition;
}
