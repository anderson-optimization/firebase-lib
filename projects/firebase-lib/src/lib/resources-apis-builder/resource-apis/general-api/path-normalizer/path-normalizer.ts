import isPlainObject      from 'lodash.isplainobject';
import {variablePrefixes} from '../../../_lib/resources-apis-builder-vars';

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
    } else if(pathInfo) {
      pathInfo = {subpaths: [pathInfo]};
    }
  } else {
    let {vars, subpaths} = pathInfo;
    
    if(!vars) {
      delete pathInfo.subpaths;
      pathInfo = {vars: pathInfo, subpaths};
    }
  }
  
  return pathInfo || {};
}
