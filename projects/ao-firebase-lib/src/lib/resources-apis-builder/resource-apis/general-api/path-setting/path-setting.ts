import isPlainObject      from 'lodash.isplainobject';
import {error}            from '../../../../_lib/utils';
import {variablePrefixes} from '../../../_lib/resources-apis-builder-vars';

export function pathInfoNormalizer(pathInfo) {
  if(!isPlainObject(pathInfo)) {
    if(Array.isArray(pathInfo)) {
      pathInfo = pathInfo.reduce((pathInfo, part) => {
        if(isPlainObject(part)) {
          Object.assign(pathInfo.vars, part);
        } else if(Array.isArray(part) && variablePrefixes.includes(part[0][0])) {
          pathInfo.vars[part[0]] = part[1];
        } else {
          pathInfo.extras.push(part);
        }
        
        return pathInfo;
      }, {vars: {}, extras: []});
    } else if(pathInfo) {
      pathInfo = {extras: [pathInfo]};
    }
  } else {
    let {vars, extras} = pathInfo;
    
    if(!vars) {
      delete pathInfo.extras;
      pathInfo = {vars: pathInfo, extras};
    }
  }
  
  return pathInfo || {};
}
