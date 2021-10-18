import {libraryName} from './vars';

export function error(errorMessage) {
  throw new Error(`${libraryName}: ${errorMessage}`);
}

export function getAndSetIfNil(...params) {
  let [o, property, valueIfNotSet] = params;
  
  let value = o[property];
  
  if(typeof value === 'undefined') {
    value = o[property] = valueIfNotSet;
  }
  
  return value;
}
