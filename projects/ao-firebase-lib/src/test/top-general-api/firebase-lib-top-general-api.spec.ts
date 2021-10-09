import {libraryName, resourceCollections} from '../../lib/_lib/vars'
import {firebaseLibInitializerForAngular} from './_fixtures/firebase-lib-initializer-for-angular'

describe('Top-Level General Api', () => {
  let resources
  let cities = {
    fl: {tmp: {name: 'Tampa', population: 387_916}},
    tn: {mem: {name: 'Memphis', population: 651_932}}
  };
  
  beforeAll(async () => {
    firebaseLibInitializerForAngular();
    resources = resourceCollections['top-level'];
    await resources.cities.set({value: cities});
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
  
  describe('removeFromVariablesIndex()', () => {
    it('clears all resource definitions from global variables registry', async () => {
      resources.setPathVariables('$stateId', 'fl');
      let {value: tampa} = await resources.citiesVars.get('tmp');
      expect(tampa).toEqual(cities.fl.tmp);
      resources.removeFromVariablesIndex();
      let message = `${libraryName}: incorrect global variable: $stateId`;
      let error = new Error(message);
      expect(() => resources.setPathVariables('$stateId', 'tn')).toThrow(error);
    });
  });
});
