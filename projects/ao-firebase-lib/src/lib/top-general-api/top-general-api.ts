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
    let {name} = this.configs;
    delete variableToResourceDefinitions[name];
  }

  setPathVariables(variableName, value?) {
    let {name} = this.configs;

    if(!isPlainObject(variableName)) {
      variableName = {[variableName]: value};
    }

    Object.entries(variableName).forEach(([variableName, value]) => {
      let collectionResourceDefinitions = variableToResourceDefinitions[name] || {} ;
      let resourceDefinitions = collectionResourceDefinitions[variableName];
      
      if(!resourceDefinitions) {
        error(`incorrect global variable: ${variableName}`);
      }
      
      Object.entries(resourceDefinitions).forEach(([, resourceDefinition]) => {
        resourceDefinition['resourceApi'].setPath({vars: {[variableName]: value}});
      });
    });
  }  
}
