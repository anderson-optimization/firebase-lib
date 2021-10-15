import {libraryName, resourceCollections}  from '../../lib/_lib/vars';
import {usersData}                         from '../_fixtures/data/users-data';
import {firebaseLibInitializerForFirebase} from '../_fixtures/initializers/firebase-lib-initializer-for-firebase';
import {resourceDefinitions}               from './_fixtures/firebase-resource-definitions';

describe('Firebase Api', () => {
  let resources;
  
  beforeAll(() => {
    firebaseLibInitializerForFirebase('firebase', resourceDefinitions);
    resources = resourceCollections.firebase;
  });

  describe('get()', () => {
    let nameData = {first: 'last'};
    
    beforeAll(async () => {
      let p1 = resources.users.userInfo.set(undefined, usersData);
      let p2 = resources.name.set(undefined, nameData);
      await Promise.all([p1, p2]);
    });
    
    it('retrieves an entirety of resource data when no path is supplied', async () => {
      let {value} = await resources.name.get();
      expect(value).toEqual(nameData);
    });
   
    it('gets a subset of a resource via a string path', async () => {
      let {value} = await resources.name.get('first');
      expect(value).toEqual(nameData.first);
    });
   
    it('obtains a subset of a resource via an array path', async () => {
      let {value} = await resources.users.userInfo.get(['a', 'name']);
      expect(value).toEqual(usersData.a.name);
    });
     
    it('fetches a subset of a resource using a query', async () => {
      let query = [
        ['orderByKey'],
        ['limitToLast', 1]
      ];
      let {value} = await resources.users.userInfo.get(null, query) as any;
      let ids = Object.keys(value);
      expect(ids).toEqual(['c']);
    });
    
    it('grabs a snapshot of a resource', async () => {
      let params = {path: 'c', options: {returnData: ['snapshot']}};
      let {snapshot} = await resources.users.userInfo.get(params);
      expect(snapshot.child('name/first').val()).toBe(usersData.c.name.first);
    });
   
    it('outputs a reference of the queried resource', async () => {
      let firstName = 'Tom';
      let options = {returnData: ['ref']};
      let query = [
        ['orderByChild', 'name/first'],
        ['equalTo', firstName]
      ];
      
      let {ref} = await resources.users.userInfo.get({query, options});
      
      function dataHandler(snapshot) {
        let firstName = snapshot.child('b/name/first').val();
        expect(firstName).toBe(firstName);
        expect(snapshot.numChildren()).toBe(1);
        ref.off('value', dataHandler);
      }
      
      ref.on('value', dataHandler);
    });
     
    it('gives key of the accessed resoruce', async () => {
      let options = {returnData: ['key']};
      let {key} = await resources.users.userInfo.get(undefined, undefined, options);
      expect(key).toBe('users');
    });

    it(`returns 'null' when path to a resource is incorrect`, async () => {
      let {value} = await resources.users.userInfo.get('incorrect');
      expect(value).toBe(null);
    });
  });
  
  describe('remove()', () => {
    beforeEach(async () => await resources.removals.set({value: {one: 'one', two: 'two'}}));
    
    it('deletes a record', async () => {
      await resources.removals.remove('one');
      let {value} = await resources.removals.get();
      expect(value).toEqual({two: 'two'});
    });
    
    it('removes a record and triggers a callback once operation is completed', async () => {
      let options = {onComplete() {}};
      spyOn(options, 'onComplete');
      await resources.removals.remove('two', options);
      let {value} = await resources.removals.get();
      expect(value).toEqual({one: 'one'});
      expect(options.onComplete).toHaveBeenCalled();
    });
  });
  
  describe('creating records', () => {
    describe('set()', () => {
      it('adds new record with custom key and returns its value', async () => {
        let value = {hex: 'FFFFFF', rgb: '255,255,255'};
        let options = {returnData: ['value']};
        let {value: color} = await resources.colors.colorInfo.set('white', value, options);
        expect(color).toEqual(value);
      });

      it('adds new record with custom key and timestamp', async () => {
        let value = {hex: '6600FF', rgb: '102,0,255'};
        let options = {addTimestamps: true, returnData: ['value']};
        let {value: record} = await resources.colors.colorInfo.set('purple', value, options);
        expect(typeof record.created).toBe('number')
        expect(typeof record.modified).toBe('number');
      });
     
      it('adds timestamp only to object values', async () => {
        let value = 'black';
        let options = {addTimestamps: true, returnData: 'value'};
        await resources.colors.colorInfo.set('black/colorName', value, options);
        let {value: record} = await resources.colors.colorInfo.get('black');
        expect(record).toEqual({colorName: 'black'} as any);
      });

      it('adds new record and triggers a callback once operation is completed', async () => {
        let value = {hex: 'FF00FF', rgb: '255,0,255'};
        let options = {onComplete() {}};
        spyOn(options, 'onComplete');
        await resources.colors.colorInfo.set('fuchsia', value, options);
        expect(options.onComplete).toHaveBeenCalled();
      });
    });
    
    describe('push()', () => {
      it('adds new record with auto-generated unique key and returns that key', async () => {
        let band = 'Cheap Trick';
        let options = {returnData: 'key'};
        let {key} = await resources.bands.push({value: band, options});
        expect(key.length).toBe(20);
        await resources.bands.remove(key);
      });
      
      it('includes timestamps for values that are objects', async () => {
        let band = {name: 'Devin Townsend Project', type: 'progressive metal'};
        let options = {returnData: 'snapshot', addTimestamps: true};
        let {snapshot} = await resources.bands.push({value: band, options});
        let record = snapshot.val();
        expect(typeof record.created).toBe('number');
        expect(typeof record.modified).toBe('number');
        await resources.bands.remove(snapshot.key);
      });
      
      it('augments auto-generated 20-character id as "key"', async () => {
        let band = {name: 'Pink Floyd'};
        let options = {returnData: 'value', includePushKey: true};
        let {value} = await resources.bands.push({value: band, options});
        expect(value.key.length).toBe(20);
        await resources.bands.remove(value.key);      
      });

      it('appends auto-generated 20-character id under custom property', async () => {
        let band = {name: 'Kensington'};
        let customKeyName = 'identifier';
        let options = {returnData: 'value', includePushKey: customKeyName};
        let {value} = await resources.bands.push({value: band, options});
        expect(value[customKeyName].length).toBe(20);
        await resources.bands.remove(value[customKeyName]);
      });
    });
  });
  
  describe('updating records', () => {
    describe('full record replacement via set()', () => {
      let colors = {
        red: {hex: "FF0000", rgb: "255,0,0"},
        blue: {hex: "0000FF", rgb: "0,0,255"},
        yellow: {hex: "FFFF00", rgb: "255,255,0"}
      };
      
      beforeAll(async () => await resources.colors.colorInfo.set(undefined, colors));
      
      it('replaces an existing record and returns its value', async () => {
        let {value: blue} = await resources.colors.colorInfo.get('blue');
        expect(colors.blue).toEqual(blue);
        let value = {hex: '0000FF'};
        let options = {returnData: 'value'};
        let {value: newBlue} = await resources.colors.colorInfo.set('blue', value, options);
        expect(newBlue).toEqual(value);
      });
      
      it('replaces an existing record and returns its snapshot', async () => {
        let {value: red} = await resources.colors.colorInfo.get('red');
        expect(colors.red).toEqual(red);        
        let value = {rgb: '255,0,0'};
        let options = {returnData: 'snapshot'};
        let {snapshot} = await resources.colors.colorInfo.set('red', value, options);
        expect(snapshot.val()).toEqual(value);
      });

      it('replaces an existing record and returns its reference', async () => {
        let {value: yellow} = await resources.colors.colorInfo.get('yellow');
        expect(colors.yellow).toEqual(yellow);   
        let value = {hex: 'FFFF00'};
        let options = {returnData: 'ref'};
        let {ref} = await resources.colors.colorInfo.set('yellow', value, options);
        ref.once('value').then((snapshot) => expect(snapshot.val()).toEqual(value));
      });      
    });
    
    describe('targeted updates', () => {
      let states = {
        fl: {name: 'Florida'},
        tx: {name: 'Texas'},
        ca: {name: 'California'},
        ny: {name: 'New York'}
      };
      
      beforeAll(async () => await resources.states.set({value: states}));
      
      describe('transaction()', () => {
        it('augments a record with new information', async () => {
          let options = {returnData: ['value']};
          let population = 21_480_000;
          let expected = Object.assign({}, states.fl, {population});
          let updater = (value) => {
            if(value === null) {
              return true;
            }
            
            return Object.assign(value, {population});
          }
          
          let {value} = await resources.states.transaction('fl', updater, options);
          expect(value).toEqual(expected);
        });
        
        it('adds only a modification timestamp to a record', async () => {
          let options = {returnData: 'value', addTimestamps: true};
          let updater = (value) => {
            if(value === null) {
              return true;
            }
            
            return value;
          };
          
          let {value} = await resources.states.transaction('tx', updater, options);
          expect(typeof value.modified).toBe('number');
          expect(value.hasOwnProperty('created')).toBe(false);
        });
      });
  
      describe('update()', () => {
        it('attaches new data to a record', async () => {
          let options = {returnData: 'value'};
          let population = 39_510_000;
          let update = {population};
          let {value} = await resources.states.update('ca', update, options);
          expect(value.population).toBe(population);
        });
        
        it('appends modification timestamp and calls callback once operation is completed', async () => {
          let options = {returnData: 'value', addTimestamps: true, onComplete(){}};
          let population = 19_450_000;
          let update = {population};
          spyOn(options, 'onComplete');
          let {value} = await resources.states.update('ny', update, options);
          expect(Object.keys(value).sort()).toEqual(['modified', 'name', 'population']);
          expect(options.onComplete).toHaveBeenCalled();
        });
      });
    });
  });
});
