import {libraryName, resourceCollections}  from '../../lib/_lib/vars'
import {variableToResourceDefinitions}     from '../../lib/resources-apis-builder/_lib/resources-apis-builder-vars';
import {firebaseLibInitializerForFirebase} from '../_fixtures/initializers/firebase-lib-initializer-for-firebase';
import {namespace}                         from './_fixtures/namespace-general';

describe('General Resource Api', () => {
  let resources;
  let teams = {
    1: {name: 'team 1'},
    2: {name: 'team 2'},
    3: {name: 'team 3'}
  };
  
  beforeAll(async () => {
    firebaseLibInitializerForFirebase('general', namespace);
    resources = resourceCollections.general;
    await resources.teams.set(null, teams);
  });
  
  describe('clone()', () => {
    it('creates an identical copy of a resource', async () => {
      let {teamInfo} = resources.teams;
      teamInfo.updatePathTemplate([['$tid', 1]]);
      let teamClone = teamInfo.clone();
      let {value: teamOriginal} = teamInfo.get();
      let {value: teamCloned} = teamClone.get();
      expect(teamOriginal).toEqual(teamCloned);
    });

    it(`it will register cloned resource's global variables`, async () => {
      let {teamInfo} = resources.teams;
      let teamClone = teamInfo.clone();
      resources.setPathVariables('$tid', 2);
      let namePromise1 = teamInfo.get('name');
      let namePromise2 = teamClone.get('name');
      let [{value: name1}, {value: name2}] = await Promise.all([namePromise1, namePromise2]);
      expect(name1).toBe(name2);
    });
  });

  describe('removeFromVariablesIndex()', () => {
    it(`removes resource's definition reference from varaibles index`, () => {
      let $settingIdResources = Object.keys(variableToResourceDefinitions.general.$settingId);
      expect($settingIdResources.length).toBe(2);
      resources.teams.teamProjects.removeFromVariablesIndex();
      $settingIdResources = Object.keys(variableToResourceDefinitions.general.$settingId);
      expect($settingIdResources.length).toBe(1);
    });
    
    it(`deletes variable store if empty`, () => {
      let $configIdResources = Object.keys(variableToResourceDefinitions.general.$configId);
      expect($configIdResources.length).toBe(1);
      resources.teams.teamConfig.removeFromVariablesIndex();
      expect(variableToResourceDefinitions.general.$configId).toBe(undefined);
    });
  });

  describe('setMethodsParams()', () => {
    
  });
  
  describe('setPath()', () => {
    it(`is tested in Firebase Api's configurable path section`, () => {});
  })
});
