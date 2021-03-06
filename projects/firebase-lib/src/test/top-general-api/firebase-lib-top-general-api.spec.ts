import {libraryName, resourceCollections} from '../../lib/_lib/vars';
import {citiesData}                       from '../_fixtures/data/cities-data';
import {firebaseLibInitializerForAngular} from '../_fixtures/initializers/firebase-lib-initializer-for-angular';
import {resourceDefinitions}              from './_fixtures/top-general-resource-definitions';

describe('Top-Level General Api', () => {
  let resources;
  
  beforeAll(async () => {
    firebaseLibInitializerForAngular('top-level', resourceDefinitions);
    resources = resourceCollections['top-level'];
    await resources.cities.set({value: citiesData});
  });
  
  describe('getAngularDatabase()', () => {
    it('returns an instance of AngularFireDatabase', () => {
      let angularDatabase = resources.getAngularDatabase();
      expect(typeof angularDatabase.list).toBe('function');
      expect(typeof angularDatabase.object).toBe('function');
    });
  });
  
  describe('getDatabase()', () => {
    it('gives an instance of Firebase database', () => {
      let database = resources.getDatabase();
      expect(typeof database.ref).toBe('function');
    });
  });
  
  describe('getUniqueKey()', () => {
    it('produces a 20-character Firebase key', () => {
      let key = resources.getUniqueKey();
      expect(key.length).toBe(20);
      expect(key.startsWith('-')).toBe(true);
    });
  });

  describe('getResourcesByVariable()', () => {
    it('Returns path variables in the collection', () => {
      let pathVariables = Object.keys(resources.getResourcesByVariable());
      expect(pathVariables.length).toBe(1)
      expect(pathVariables[0]).toBe('$cityId')
    });
  });
  
  
  describe('removeFromVariablesIndex()', () => {
    it('clears all resource definitions from global variables registry', async () => {
      resources.setPathVariables('$cityId', 'mem');
      let {value: memphis} = await resources.citiesVars.get('name');
      expect(memphis).toEqual(citiesData.mem.name);
      resources.removeFromVariablesIndex();
      let message = `${libraryName}: incorrect global variable: $cityId`;
      let error = new Error(message);
      expect(() => resources.setPathVariables('$cityId', 'knx')).toThrow(error);
    });
  });
});
