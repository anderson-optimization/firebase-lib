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
/*
export function omit(o, props) {
  let picks = pick(o, props);

  for(let i = 0, {length} = props; i < length; i++) {
    delete o[props[i]];
  }

  let _o = {...o};
  Object.assign(o, picks);
  return _o;
}

export function pick(o, props) {
  for(var i = 0, _o = {}, {length} = props; i < length; i++) {
    let prop = props[i];
    _o[prop] = o[prop];
  }

  return _o;  
}
*/