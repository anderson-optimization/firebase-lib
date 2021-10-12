import {getAndSetIfNil}                from '../../_lib/resources-apis-builder-utils';
import {variableToResourceDefinitions} from '../../_lib/resources-apis-builder-vars';

export function globalsRegistrar(resourceDefinition, configs) {
  let {globalVariableNames} = resourceDefinition;
  
  if(globalVariableNames) {
    let {collectionName, database} = configs;
    let resourceDefinitionsIndexKey = database.ref().push().key;
    let params = [variableToResourceDefinitions, collectionName, {}] as any;
    let _variableToResourceDefinitions = getAndSetIfNil(...params);
    Object.assign(resourceDefinition, {resourceDefinitionsIndexKey});
  
    globalVariableNames.forEach((variableName) => {
      let params = [_variableToResourceDefinitions, variableName, {}];
      let resourceDefinitions = getAndSetIfNil(...params);
      resourceDefinitions[resourceDefinitionsIndexKey] = resourceDefinition;
    });
  }
}
