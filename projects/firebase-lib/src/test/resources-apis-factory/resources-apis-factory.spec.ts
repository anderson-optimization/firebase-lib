import {resourcesApisFactory}             from '../../lib/firebase-lib';
import {libraryName, resourceCollections} from '../../lib/_lib/vars';

describe('resourcesApisFactory()', () => {
  it(`generates apis under 'default' collection name if none are provided`, () => {
    let resourceDefinitions = {users: 'users'};
    resourcesApisFactory({database: {}, resourceDefinitions});
    expect(typeof resourceCollections.default.users.get).toBe('function');
    delete resourceCollections.default;
  });
  
  it('errors when resources api is built again under the same name', () => {
    let resourceDefinitions = {users: 'users'};
    let params = {database: {}, resourceDefinitions, collectionName: 'resources-1'};
    resourcesApisFactory(params);
    let message  = `${libraryName}: resources collection 'resources-1' `;
        message += `already exists`;
    let error = new Error(message);
    expect(() => resourcesApisFactory(params)).toThrow(error);
  });
  
  it('errors when no angular or firebase database instances are provided', () => {
    let resourceDefinitions = {users: 'users'};
    let message  = `${libraryName}: provide angular or regular firebase instance`;
    let error = new Error(message);
    expect(() => resourcesApisFactory({resourceDefinitions})).toThrow(error);
  });    

  it('errors when a key in resource definitions conflicts with api methods', () => {
    let resourceDefinitions = {users: {get: {}}};
    let message  = `${libraryName}: declaration for 'users.get' conflicts with `;
        message += `'get' api method`;
    let error = new Error(message);
    let params = {database: {}, resourceDefinitions, name: 'misc'};
    expect(() => resourcesApisFactory(params)).toThrow(error);
  });

  it('errors when resource path includes primitive other than strings', () => {
    let resourceDefinitions = {users: {info: [0, 23]}};
    let message  = `${libraryName}: path for 'users.info' must be a string or an `
        message += `array of strings`;
    let error = new Error(message);
    let params = {database: {}, resourceDefinitions, name: 'misc'};
    expect(() => resourcesApisFactory(params)).toThrow(error);
  });
  
  it('errors when resource path includes empty array', () => {
    let resourceDefinitions = {colors: []};
    let message  = `${libraryName}: path for 'colors' must be a string or an `;
        message += `array of strings`;
    let error = new Error(message);
    let params = {database: {}, resourceDefinitions, name: 'misc'};
    expect(() => resourcesApisFactory(params)).toThrow(error);
  });
  
  it('errors when resource path is something other than array or a string', () => {
    let resourceDefinitions = {colors: () => {}};
    let message  = `${libraryName}: path for 'colors' must be a string or an `;
        message += `array of strings`;
    let error = new Error(message);
    let params = {database: {}, resourceDefinitions, collectionName: 'misc'};
    expect(() => resourcesApisFactory(params)).toThrow(error);
  });

  it('errors when an invalid property is accessed on resources api', () => {
    let resourceDefinitions = {users: 'users'};
    resourcesApisFactory({database: {}, resourceDefinitions, collectionName: 'tester'});
    let message = `${libraryName}: property 'someInvalidMethod' does not exist`;
    let error = new Error(message);
    expect(() => resourceCollections.tester.users.someInvalidMethod()).toThrow(error);  
  });
  
  it('errors when an invalid top api method is specified', () => {
    let resourceDefinitions = {users: 'users'};
    resourcesApisFactory({database: {}, resourceDefinitions, collectionName: 'tester1'});
    let message = `${libraryName}: property 'someInvalidMethod' does not exist`;
    let error = new Error(message);
    expect(() => resourceCollections.tester1.someInvalidMethod()).toThrow(error);     
  });
  
  it('errors when resource path is an empty string', () => {
    let resourceDefinitions = {cities: ''};
    let message  = `${libraryName}: path for 'cities' must be a string or an `
        message += `array of strings`;
    let error = new Error(message);
    let params = {database: {}, resourceDefinitions, collectionName: 'misc'};
    expect(() => resourcesApisFactory(params)).toThrow(error);    
  });
  
  it('errors when an invalid top general api method is specified', () => {
    let resourceDefinitions = {users: 'users'};
    resourcesApisFactory({database: {}, resourceDefinitions, collectionName: 'tester2'});
    let message = `${libraryName}: property 'someInvalidMethod' does not exist`;
    let error = new Error(message);
    expect(() => resourceCollections.tester2.someInvalidMethod()).toThrow(error);     
  });
});
