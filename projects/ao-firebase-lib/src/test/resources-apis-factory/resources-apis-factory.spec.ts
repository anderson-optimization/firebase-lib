import {resourcesApisFactory}             from '../../lib/ao-firebase-lib';
import {libraryName, resourceCollections} from '../../lib/_lib/vars';

describe('resourcesApisFactory()', () => {
  it(`generates apis under 'default' collection name if none are provided`, () => {
    let namespace = {users: 'users'};
    resourcesApisFactory({database: {}, namespace});
    expect(typeof resourceCollections.default.users.get).toBe('function');
    delete resourceCollections.default;
  });
  
  it('errors when resources api is built again under the same name', () => {
    let namespace = {users: 'users'};
    let params = {database: {}, namespace, collectionName: 'resources-1'};
    resourcesApisFactory(params);
    let message  = `${libraryName}: resources collection 'resources-1' `;
        message += `already exists`;
    let error = new Error(message);
    expect(() => resourcesApisFactory(params)).toThrow(error);
  });
  
  it('errors when no angular or firebase database instances are provided', () => {
    let namespace = {users: 'users'};
    let message  = `${libraryName}: provide angular or regular firebase instance`;
    let error = new Error(message);
    expect(() => resourcesApisFactory({namespace})).toThrow(error);
  });    

  it('errors when a key in namespace definition conflicts with api methods', () => {
    let namespace = {users: {get: {}}};
    let message  = `${libraryName}: declaration for 'users.get' conflicts with `;
        message += `'get' api method`;
    let error = new Error(message);
    let params = {database: {}, namespace, name: 'misc'};
    expect(() => resourcesApisFactory(params)).toThrow(error);
  });

  it('errors when resource path includes primitive other than strings', () => {
    let namespace = {users: {info: [0, 23]}};
    let message  = `${libraryName}: path for 'users.info' must be a string or an `
        message += `array of strings`;
    let error = new Error(message);
    let params = {database: {}, namespace, name: 'misc'};
    expect(() => resourcesApisFactory(params)).toThrow(error);
  });
  
  it('errors when resource path includes empty array', () => {
    let namespace = {colors: []};
    let message  = `${libraryName}: path for 'colors' must be a string or an `;
        message += `array of strings`;
    let error = new Error(message);
    let params = {database: {}, namespace, name: 'misc'};
    expect(() => resourcesApisFactory(params)).toThrow(error);
  });
  
  it('errors when resource path is something other than array or a string', () => {
    let namespace = {colors: () => {}};
    let message  = `${libraryName}: path for 'colors' must be a string or an `;
        message += `array of strings`;
    let error = new Error(message);
    let params = {database: {}, namespace, collectionName: 'misc'};
    expect(() => resourcesApisFactory(params)).toThrow(error);
  });

  it('errors when an invalid property is accessed on resources api', () => {
    let namespace = {users: 'users'};
    resourcesApisFactory({database: {}, namespace, collectionName: 'tester'});
    let message = `${libraryName}: property 'someInvalidMethod' does not exist`;
    let error = new Error(message);
    expect(() => resourceCollections.tester.users.someInvalidMethod()).toThrow(error);  
  });
  
  it('errors when an invalid top api method is specified', () => {
    let namespace = {users: 'users'};
    resourcesApisFactory({database: {}, namespace, collectionName: 'tester1'});
    let message = `${libraryName}: property 'someInvalidMethod' does not exist`;
    let error = new Error(message);
    expect(() => resourceCollections.tester1.someInvalidMethod()).toThrow(error);     
  });
  
  it('errors when resource path is an empty string', () => {
    let namespace = {cities: ''};
    let message  = `${libraryName}: path for 'cities' must be a string or an `
        message += `array of strings`;
    let error = new Error(message);
    let params = {database: {}, namespace, collectionName: 'misc'};
    expect(() => resourcesApisFactory(params)).toThrow(error);    
  });
  
  it('errors when an invalid top general api method is specified', () => {
    let namespace = {users: 'users'};
    resourcesApisFactory({database: {}, namespace, collectionName: 'tester2'});
    let message = `${libraryName}: property 'someInvalidMethod' does not exist`;
    let error = new Error(message);
    expect(() => resourceCollections.tester2.someInvalidMethod()).toThrow(error);     
  });
});
