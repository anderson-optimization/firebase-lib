import omit                            from 'lodash.omit';
import cloneDeep                       from 'lodash.clonedeep';
import isPlainObject                   from 'lodash.isplainobject';
import mergeWith                       from 'lodash.mergewith';
import {error}                         from '../../../_lib/utils';
import {variableToResourceDefinitions} from '../../_lib/resources-apis-builder-vars';
import {resourceApiBuilder}            from '../../resource-api-builder/resource-api-builder';
import {paramsMerger}                  from '../_lib/params-merger';
import {difference}                    from './_lib/general-api-utils';
import {pathInfoNormalizer}            from './path-setting/path-setting';

export const generalApi = {
  clearPathTemplate() {
    this.resourceDefinition.pathTemplate = this.resourceDefinition.path.slice();
  },
  
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
      let {collectionName} = this.configs;
      
      pathVariableNames.forEach((variableName) => {
        let keyToResourceDefinitionMap = variableToResourceDefinitions[collectionName][variableName];
        let {length} = Object.keys(variableToResourceDefinitions[collectionName][variableName]);
        delete keyToResourceDefinitionMap[resourceDefinitionsIndexKey];
        
        if(length === 1) {
          delete variableToResourceDefinitions[collectionName][variableName];
        }
      });
    }
  },
  
  setMethodsParams(_methodsParams) {
    mergeWith(this.methodsParams, _methodsParams, paramsMerger);
  },
  
  updatePathTemplate(pathInfo, internal = false, truncateExtras = false) {
    let {resourceDefinition} = this;
    let {pathVariableNames, path, pathTemplate} = resourceDefinition;
    let {pathVariablesToIndices = {}, resourceNameFull} = resourceDefinition;
    let {vars = {}, extras = []} = pathInfoNormalizer(pathInfo);
    let providedVariableNames = Object.keys(vars);
    let unknowns = difference(providedVariableNames, pathVariableNames);
    let activePath = pathTemplate.slice();

    if(unknowns.length) {
      let message =  `resource path for '${resourceNameFull}' does not include `;
          message += `the following variables: ${unknowns.join(', ')}`;
      
      error(message);
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
    } else if(truncateExtras) {
      activePath.splice(path.length);
    }
    
    if(internal) {
      return activePath;
    }
    
    resourceDefinition.pathTemplate = activePath;
  }
};
