import cloneDeep                                from 'lodash.clonedeep';
import {getAndSetIfNil}                         from '../../_lib/resources-apis-builder-utils';
import {globalVariablePrefix, variablePrefixes} from '../../_lib/resources-apis-builder-vars';
import {varNameRx, varsRx}                      from './_lib/path-processor-vars';

export function pathProcessor(resourceDefinition, {collectionName, database}) {
  let {path, pathTemplate} = resourceDefinition;
  let pathVariablesToIndices = {};
  let pathVariableNames = [];
  let globalVariables = [];
  
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
            
            if(varIndicator === globalVariablePrefix && !globalVariables.includes(part)) {
              globalVariables.push(part);
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

  if(globalVariables.length) {
    Object.assign(resourceDefinition, {globalVariables});
  }

  if(pathVariableNames.length) {
    Object.assign(resourceDefinition, {
      pathVariableNames, 
      pathVariablesToIndices
    });
  }
}
