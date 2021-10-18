import cloneDeep                                from 'lodash.clonedeep';
import {getAndSetIfNil}                         from '../../../_lib/utils';
import {globalVariablePrefix, variablePrefixes} from '../../../_lib/vars';
import {varNameRx, varsRx}                      from './_lib/path-processor-vars';

export function pathProcessor(resourceDefinition, {collectionName, database}) {
  let {path} = resourceDefinition;
  let pathVariablesToIndices = {};
  let pathVariableNames = [];
  let globalVariableNames = [];
  
  if(!Array.isArray(path)) {
    path = path.split('/');
  }
  
  path = path.reduce((path, part, pathIndex) => {
    let vars = part.split(varsRx);
    
    if(vars.length > 1) {
      vars = vars.reduce((vars, part) => {
        if(part) {
          let [varIndicator] = part;
          
          if(variablePrefixes.includes(varIndicator)) {
            [, part] = part.match(varNameRx);
            part = varIndicator + part;
            let variableIndices = getAndSetIfNil(pathVariablesToIndices, part, []);
            
            if(varIndicator === globalVariablePrefix && !globalVariableNames.includes(part)) {
              globalVariableNames.push(part);
            }
            
            if(!pathVariableNames.includes(part)) {
              pathVariableNames.push(part);
            }
            
            variableIndices.push([pathIndex, vars.length]);
          }
          
          vars.push(part);
        }
        
        return vars;
      }, []);
      
      path.push(vars);
    } else {
      path.push(part);
    }
    
    return path;
  }, []);

  Object.assign(resourceDefinition, {path, pathTemplate: cloneDeep(path)});

  if(globalVariableNames.length) {
    Object.assign(resourceDefinition, {globalVariableNames});
  }

  if(pathVariableNames.length) {
    Object.assign(resourceDefinition, {
      pathVariableNames, 
      pathVariablesToIndices
    });
  }
}
