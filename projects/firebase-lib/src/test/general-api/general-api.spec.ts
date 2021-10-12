import {libraryName, resourceCollections}  from '../../lib/_lib/vars'
import {variableToResourceDefinitions}     from '../../lib/resources-apis-builder/_lib/resources-apis-builder-vars';
import {firebaseLibInitializerForFirebase} from '../_fixtures/initializers/firebase-lib-initializer-for-firebase';
import {resourceDefinitions}               from './_fixtures/general-resource-definitions';
import {resourceDefinitionsParams}         from './_fixtures/general-params-resource-definitions';

describe('General Resource Api', () => {
  let resources;
  let teams = {
    1: {name: 'team 1'},
    2: {name: 'team 2'},
    3: {name: 'team 3'}
  };
  
  beforeAll(async () => {
    firebaseLibInitializerForFirebase('general', resourceDefinitions);
    resources = resourceCollections.general;
    await resources.teams.set(null, teams);
  });
  
  describe('clone()', () => {
    it('creates an identical copy of a resource', async () => {
      let {teamInfo} = resources.teams;
      teamInfo.updatePathTemplate([['$tid', 1]]);
      let teamClone = teamInfo.clone();
      let {value: teamOriginal} = await teamInfo.get();
      let {value: teamCloned} = await teamClone.get();
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
    
    it('deletes variable store only for global variables', () => {
      resources.teams.teamNoRemovalFromIndex.removeFromVariablesIndex();
    });
  });

  describe('Presetting Method Parameters', () => {
    let resources;
    
    beforeAll(async () => {
      let methodsParams = {
        set: {options: {returnData: ['key']}},
        get: {options: {returnData: ['snapshot']}}
      };
      
      firebaseLibInitializerForFirebase('general-params', resourceDefinitionsParams, methodsParams);
      resources = resourceCollections['general-params'];
      await resources.teams.set(null, teams);
    });
    
    describe('setMethodsParams()', async () => {
      beforeAll(() => {
        resources.teamsParams.setMethodsParams({
          get: {options: {returnData: ['value']}}
        });        
      });
      
      it('gets snapshot per top-level configs method param settings', async () => {
        let {snapshot} = await resources.teams.get(1);
        expect(snapshot.val()).toEqual(teams[1]);
      });
      
      it('receives value per resource level override', async () => {
        let {value} = await resources.teamsParams.get(1);
        expect(value).toEqual(teams[1]);
      });
      
      it('obtains ref per method call override', async () => {
        let {ref} = await resources.teamsParams.get({path: 1, options: {returnData: ['ref']}});
        ref.once('value').then((snapshot) => expect(snapshot.val()).toEqual(teams[1]));
      });
      
      it('returns ref per resource definition methods params setting', async () => {
        let {ref} = await resources.teamsParamsPreset.get({path: 2});
        ref.once('value').then((snapshot) => expect(snapshot.val()).toEqual(teams[2]));
      });
      
      it('pulls key per configs level settings', async () => {
        let {key} = await resources.teams.set(4, {name: 'team 4'});
        expect(key).toBe('4');
      });
    });
  });
  
  describe('updatePathTemplate()', () => {
    it(`is tested in its own Variable Resource Paths section`, () => {});
  })
});
