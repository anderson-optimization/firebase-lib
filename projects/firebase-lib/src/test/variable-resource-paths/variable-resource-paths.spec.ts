import {libraryName, resourceCollections}  from '../../lib/_lib/vars'
import {variableToResourceDefinitions}     from '../../lib/resources-apis-builder/_lib/resources-apis-builder-vars';
import {usersData}                         from '../_fixtures/data/users-data';
import {firebaseLibInitializerForFirebase} from '../_fixtures/initializers/firebase-lib-initializer-for-firebase'
import {resourceDefinitions}               from './_fixtures/resource-paths-resource-definitions';

describe('Variable Resource Paths', () => {
  let resources;
  let hobbiesData = {c: {'-MlCLFIZRdCIINE0_qlc': 'writing'}};
  
  beforeAll(async () => {
    firebaseLibInitializerForFirebase('resource-paths', resourceDefinitions);
    resources = resourceCollections['resource-paths'];
    let p1 = resources.users.userInfo.set({value: usersData});
    let p2 = resources.users.userInfo.hobbies.set({value: hobbiesData});
    await Promise.all([p1, p2]);
  });

  describe('assigning path variables during method invocations', () => {
    it('errors if resource is accessed and some path variables are not replaced', () => {
      let message  = `${libraryName}: for 'users.userInfoVars' include the `;
          message += `following variables: #name`;
      let error = new Error(message);
      let params = {path: {vars: {$id: 'another'}}};
      expect(() => resources.users.userInfoVars.get(params)).toThrow(error);
    });
    
    it('errors if resource is accessed and incorrect path variables are specified', () => {
      let message  = `${libraryName}: resource path for 'users.userInfoVars' does not `;
          message += `define the following variables: $incorrect`;
      let error = new Error(message);
      expect(() => resources.users.userInfoVars.get([['$incorrect', false]])).toThrow(error);
    });
  
    it('replaces path variables in the call and pulls data', async () => {
      let {value} = await resources.users.userInfoData.get([{'#id': 'a'}, {'#name': 'name'}]);
      expect(value).toEqual(usersData.a.name);
    });

    it('replaces a variable that completes a field key and obtains the data', async () => {
      let {value} = await resources.users.userInfoKeyVar.get([['#users', 'users'], 'a']);
      expect(value).toEqual(usersData.a);
    });

    it('appends non-variable path at the end of the path and retrieves data', async () => {
      let path = [['#id', 'a'], ['#name', 'name'], 'last'];
      let {value} = await resources.users.userInfoData.get(path);
      expect(value).toBe(usersData.a.name.last);
    });
  });

  describe('presetting non-variable path extras', () => {
    it('sets persistent extra sub-path', async () => {
      resources.users.userInfoExtras.updatePathTemplate('c');
      let {value} = await resources.users.userInfoExtras.get();
      expect(value).toEqual(usersData.c);
    });
  });

  describe('presetting path variables', () => {
    it('will not save variable values passed during a method call', async () => {
      let path = [['#id', 'b'], ['#name', 'name'], 'first'];
      let {value} = await resources.users.userInfoData.get(path);
      expect(value).toBe(usersData.b.name.first);
      
      expect(() => resources.users.userInfoData.get()).toThrow();
    });
    
    describe('updatePathTempate()', () => {
      afterEach(() => resources.users.userInfoData.clearPathTemplate());
      
      it('sets persistent prefilled incomplete path', async () => {
        let path = {vars: {'#id': 'a'}, extras: ['last']};
        resources.users.userInfoData.updatePathTemplate(path);
        expect(() => resources.users.userInfoData.set()).toThrow();
      });
      
      it('assigns persistent prefilled complete path', async () => {
        let path = {vars: {'#id': 'a', '#name': 'name'}, extras: ['last']};
        resources.users.userInfoData.updatePathTemplate(path);
        let {value} = await resources.users.userInfoData.get();
        expect(value).toBe(usersData.a.name.last);
      });
      
      it('initializers a path whose variable parts can be altered at method call', async () => {
        let path = {vars: {'#id': 'b', '#name': 'name'}, extras: ['last']};
        resources.users.userInfoData.updatePathTemplate(path);
        let {value} = await resources.users.userInfoData.get({path: {vars: {'#id': 'c'}}});
        expect(value).toBe(usersData.c.name.last);
      });
      
      it('writes a template whose non-variable part can be changed at method call', async () => {
        let path = {vars: {'#id': 'a', '#name': 'name'}, extras: ['last']};
        resources.users.userInfoData.updatePathTemplate(path);
        let {value} = await resources.users.userInfoData.get('first');
        expect(value).toBe(usersData.a.name.first);
      });
      
      it('creates a path template whose non-variable part can be truncated', async () => {
        let path = {vars: {'#id': 'c', '#name': 'name'}, extras: ['last']};
        resources.users.userInfoData.updatePathTemplate(path);
        let {value} = await resources.users.userInfoData.get({options: {truncateExtras: true}});
        expect(value).toEqual(usersData.c.name);
      });
    });
    
    describe('clearPathTemplate()', () => {
      it('assigns original path as the template', async () => {
        let path = {vars: {'#id': 'a', '#name': 'name'}};
        resources.users.userInfoData.updatePathTemplate(path);
        let {value} = await resources.users.userInfoData.get();
        expect(value).toEqual(usersData.a.name);
        
        resources.users.userInfoData.clearPathTemplate();
        expect(() => resources.users.userInfoData.get()).toThrow();
      });
    });
  });

  describe('presetting path variables globally', () => {
    it('errors if specified global variable does not exist', () => {
      let error = new Error(`${libraryName}: incorrect global variable: $incorrect`);
      expect(() => resources.setPathVariables('$incorrect', '')).toThrow(error);
    });

    it('allows same variable multiple times in a path, but registers resource definition only once', () => {
      let ids = Object.keys(variableToResourceDefinitions['resource-paths'].$someId);
      expect(ids.length).toBe(1);
    });

    it('replaces global path variables across all resources', async () => {
      resources.setPathVariables({'$uid': 'c'});
      resources.users.userInfoGlobal.updatePathTemplate({'#name': ['name', 'last']});
      let {value: hobbies} = await resources.users.userInfo.hobbiesVars.get();
      let {value: lastName} = await resources.users.userInfoGlobal.get();
      expect(hobbies).toEqual(hobbiesData.c);
      expect(lastName).toBe(usersData.c.name.last);
    });
  });
});
