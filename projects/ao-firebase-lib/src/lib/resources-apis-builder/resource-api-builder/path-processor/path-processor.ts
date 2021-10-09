import {getAndSetIfNil}                         from '../../_lib/resources-apis-builder-utils';
import {globalVariablePrefix, variablePrefixes} from '../../_lib/resources-apis-builder-vars';
import {variableToResourceDefinitions}          from '../../_lib/resources-apis-builder-vars';

export function pathProcessor(resourceDefinition, {name, database}) {
  let {path} = resourceDefinition;
  
  if(!Array.isArray(path)) {
    var skipPathScan = true;
    resourceDefinition.path = [path];
  }

  if(!skipPathScan) {
    let pathVariablesToIndices = {};
    let pathVariableNames = [];
    let _variableToResourceDefinitions = getAndSetIfNil(variableToResourceDefinitions, name, {});
    
    for(let [index, part] of Object.entries(path)) {
      if(variablePrefixes.includes(part[0])) {
        let variableIndices = getAndSetIfNil(pathVariablesToIndices, part, []);
        
        if(!pathVariableNames.includes(part)) {
          pathVariableNames.push(part);
        }
        
        if(!variableIndices.length && part[0] === globalVariablePrefix) {
          let resourceDefinitions = getAndSetIfNil(_variableToResourceDefinitions, part, {});
          let {resourceDefinitionsIndexKey} = resourceDefinition;
          
          if(!resourceDefinitionsIndexKey) {
            resourceDefinitionsIndexKey = database.ref().push().key;
            Object.assign(resourceDefinition, {resourceDefinitionsIndexKey});
          }
          
          resourceDefinitions[resourceDefinitionsIndexKey] = resourceDefinition;
        }
        
        variableIndices.push(index);
      }
    }
    
    if(pathVariableNames.length) {
      Object.assign(resourceDefinition, {pathVariableNames, pathVariablesToIndices});
    }
  }
}
