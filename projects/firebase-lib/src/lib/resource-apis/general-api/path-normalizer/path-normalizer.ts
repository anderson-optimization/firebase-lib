import isPlainObject      from 'lodash.isplainobject';
import {variablePrefixes} from '../../../_lib/vars';
import {isFalsey}         from '../_lib/general-api-utils';

export function pathNormalizer(pathInfo) {
  if(!isPlainObject(pathInfo)) {
    if(Array.isArray(pathInfo)) {
      pathInfo = pathInfo.reduce((pathInfo, part) => {
        if(isPlainObject(part)) {
          Object.assign(pathInfo.vars, part);
        } else if(Array.isArray(part) && variablePrefixes.includes(part[0][0])) {
          pathInfo.vars[part[0]] = part[1];
        } else {
          pathInfo.subpaths.push(part);
        }
        
        return pathInfo;
      }, {vars: {}, subpaths: []});
    } else if(!isFalsey(pathInfo)) {
      pathInfo = {subpaths: [pathInfo]};
    }
  } else {
    let {vars, subpaths} = pathInfo;
    
    if(!Array.isArray(subpaths) && !isFalsey(subpaths)) {
      subpaths = [subpaths];
      Object.assign(pathInfo, {subpaths});
    }
    
    if(!vars) {
      delete pathInfo.subpaths;
      pathInfo = {vars: pathInfo, subpaths};
    }
  }
  
  return pathInfo || {};
}
