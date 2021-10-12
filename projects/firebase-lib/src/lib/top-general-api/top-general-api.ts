import isPlainObject                   from 'lodash.isplainobject';
import {error}                         from '../_lib/utils';
import {variableToResourceDefinitions} from '../resources-apis-builder/_lib/resources-apis-builder-vars';

export class TopGeneralApi {
  constructor(private configs) {}
  
  getAngularDatabase() {
    return this.configs.angularDatabase;
  }
  
  getDatabase() {
    return this.configs.database;
  }

  getUniqueKey() {
    return this.getDatabase().ref().push().key;
  }

  removeFromVariablesIndex() {
    let {collectionName} = this.configs;
    delete variableToResourceDefinitions[collectionName];
  }

  setPathVariables(variableName, value?) {
    let {collectionName} = this.configs;

    if(!isPlainObject(variableName)) {
      variableName = {[variableName]: value};
    }

    Object.entries(variableName).forEach(([variableName, value]) => {
      let collectionResourceDefinitions = variableToResourceDefinitions[collectionName] || {} ;
      let resourceDefinitions = collectionResourceDefinitions[variableName];
      
      if(!resourceDefinitions) {
        error(`incorrect global variable: ${variableName}`);
      }
      
      Object.entries(resourceDefinitions).forEach(([, resourceDefinition]) => {
        resourceDefinition['resourceApi'].updatePathTemplate({vars: {[variableName]: value}});
      });
    });
  }  
}
