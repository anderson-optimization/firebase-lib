import omit                            from 'lodash.omit';
import cloneDeep                       from 'lodash.clonedeep';
import isPlainObject                   from 'lodash.isplainobject';
import mergeWith                       from 'lodash.mergewith';
import {error}                         from '../../../_lib/utils';
import {variableToResourceDefinitions} from '../../_lib/resources-apis-builder-vars';
import {variablePrefixes}              from '../../_lib/resources-apis-builder-vars';
import {resourceApiBuilder}            from '../../resource-api-builder/resource-api-builder';
import {paramsMerger}                  from '../_lib/params-merger';
import {difference}                    from './_lib/general-api-utils';
import {pathNormalizer}                from './path-normalizer/path-normalizer';

export const generalApi = {
  clearPathTemplate() {
    let {path} = this.resourceDefinition;
    this.resourceDefinition.pathTemplate = cloneDeep(path);
  },
  
  clearSubpaths() {
    let {path, pathTemplate} = this.resourceDefinition;
    pathTemplate = pathTemplate.slice(0, path.length);
    Object.assign(this.resourceDefinition, {pathTemplate});
  },
  
  clone() {
    let {configs, resourceDefinition} = this;
    let omits = ['resourceApi', 'resourceDefinitionsIndexKey'];
    resourceDefinition = omit(resourceDefinition, omits);
    resourceDefinition = cloneDeep(resourceDefinition);
    return resourceApiBuilder(resourceDefinition, configs, true);
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
    mergeWith(this.resourceDefinition.methodsParams, _methodsParams, paramsMerger);
  },
  
  updatePathTemplate(_path, internal = false, removeSubpaths = false) {
    let {resourceDefinition} = this;
    let {pathVariableNames = [], path, pathTemplate} = resourceDefinition;
    let {pathVariablesToIndices = {}, resourceNameFull} = resourceDefinition;
    let {vars = {}, subpaths = []} = pathNormalizer(_path);
    let providedVariableNames = Object.keys(vars);
    let unknowns = difference(providedVariableNames, pathVariableNames);
    let activePath = cloneDeep(pathTemplate);

    if(unknowns.length) {
      let message =  `resource path for '${resourceNameFull}' does not define `;
          message += `the following variables: ${unknowns.join(', ')}`;
      
      error(message);
    }

    if(internal) {
      let notProvidedVariables = difference(pathVariableNames, providedVariableNames);
      
      notProvidedVariables = notProvidedVariables.reduce((variables, variableName) => {
        let indices = pathVariablesToIndices[variableName];

        indices.forEach(([pathIndex, partIndex]) => {
          let [varIndicator] = activePath[pathIndex][partIndex] + '';
          
          if(variablePrefixes.includes(varIndicator)) {
            variables.push(variableName);
          }
        });
        
        return variables;
      }, []);

      
      if(notProvidedVariables.length) {
        let message  = `for '${resourceNameFull}' include the following `;
            message += `variables: ${notProvidedVariables.join(', ')}`;
        
        error(message);        
      }
    }

    providedVariableNames.forEach((variableName) => {
      let value = vars[variableName];
      let indices = pathVariablesToIndices[variableName];
      
      if(Array.isArray(value)) {
        value = value['flat'](Infinity).join('/');
      }
      
      indices.forEach(([pathIndex, partIndex]) => {
        let pathPartValue = activePath[pathIndex];
        pathPartValue[partIndex] = value;
        
        if(internal) {
          activePath[pathIndex] = pathPartValue.join('');
        }
      });
    });
    
    if(subpaths.length) {
      activePath.splice(path.length, Infinity, ...subpaths);
    } else if(removeSubpaths) {
      activePath.splice(path.length);
    }
    
    if(internal) {
      return activePath.join('/');
    }
    
    resourceDefinition.pathTemplate = activePath;
  }
};
