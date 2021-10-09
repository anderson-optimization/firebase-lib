import cloneDeep                       from 'lodash.clonedeep';
import isPlainObject                   from 'lodash.isplainobject';
import mergeWith                       from 'lodash.mergewith';
import omit                            from  'lodash.omit';
import {error}                         from '../../../_lib/utils';
import {variableToResourceDefinitions} from '../../_lib/resources-apis-builder-vars';
import {resourceApiBuilder}            from '../../resource-api-builder/resource-api-builder';
import {paramsMerger}                  from '../_lib/params-merger';
import {difference}                    from './_lib/general-api-utils';
import {pathInfoNormalizer}            from './path-setting/path-setting';

export const generalApi = {
  clone() {
    let {configs, resourceDefinition} = this;
    let omits = ['resourceApi', 'resourceDefinitionsIndexKey'];
    resourceDefinition = omit(resourceDefinition, omits);
    resourceDefinition = cloneDeep(resourceDefinition);
    return resourceApiBuilder(resourceDefinition, configs);
  },
  
  removeFromVariablesIndex() {
    let {resourceDefinitionsIndexKey, pathVariableNames} = this.resourceDefinition;
    
    if(resourceDefinitionsIndexKey) {
      let {name} = this.configs;
      
      pathVariableNames.forEach((variableName) => {
        let keyToResourceDefinitionMap = variableToResourceDefinitions[name][variableName];
        let {length} = Object.keys(variableToResourceDefinitions[name][variableName]);
        delete keyToResourceDefinitionMap[resourceDefinitionsIndexKey];
        
        if(length === 1) {
          delete variableToResourceDefinitions[name][variableName];
        }
      });
    }
  },
  
  setMethodsParams(_methodsParams) {
    mergeWith(this.methodsParams, _methodsParams, paramsMerger);
  },
  
  setPath(pathInfo, previousExtras = false) {
    let {resourceDefinition} = this;
    let {pathVariableNames, path, activePath} = resourceDefinition;
    let {pathVariablesToIndices = {}, resourceNameFull} = resourceDefinition;
    let {vars = {}, extras = []} = pathInfoNormalizer(pathInfo);
    let providedVariableNames = Object.keys(vars);
    let unknowns = difference(providedVariableNames, pathVariableNames);
    
    if(unknowns.length) {
      let message =  `resource path for '${resourceNameFull}' does not include `;
          message += `the following variables: ${unknowns.join(', ')}`;
      
      error(message);
    }

    if(!activePath) {
      activePath = path.slice();
      Object.assign(resourceDefinition, {activePath});
    }
    
    providedVariableNames.forEach((variableName) => {
      let value = vars[variableName];
      let indices = pathVariablesToIndices[variableName];
      
      if(Array.isArray(value)) {
        value = value['flat'](Infinity).join('/');
      }
      
      indices.forEach((index) => activePath[index] = value);
    });
    
    if(extras.length) {
      activePath.splice(path.length, Infinity, ...extras);
    } else if(!previousExtras) {
      activePath.splice(path.length);
    }
    
    return activePath;
  }
};
