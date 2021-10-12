import {resourceCollections}              from '../../lib/_lib/vars';
import {citiesData}                       from '../_fixtures/data/cities-data';
import {firebaseLibInitializerForAngular} from '../_fixtures/initializers/firebase-lib-initializer-for-angular';
import {resourceDefinitions}              from './_fixtures/angular-resource-definitions';

describe('AngularFirebase Api', () => {
  let resources;
  
  beforeAll(async () => {
    firebaseLibInitializerForAngular('angular', resourceDefinitions);
    resources = resourceCollections.angular;
  });

  describe('list()', () => {
    beforeAll(async () => {
      await resources.cities.set(undefined, citiesData);
    });
    
    it('gets an array of objects', (done) => {
      let subscription = resources.cities.list().subscribe((data) => {
        let sorter = (c1, c2) => c1.name > c2.name ? 1 : -1;
        let [city] = data.sort(sorter);
        expect(city).toEqual(citiesData.knx);
        subscription.unsubscribe();
        done();
      });
    });
    
    it('fetches a sub-array using a query', (done) => {
      let query = [
        ['orderByChild', 'state'],
        ['equalTo', 'TN']
      ];
      
      let subscription = resources.cities.list(undefined, query).subscribe((data) => {
        expect(data.length).toBe(2);
        subscription.unsubscribe();
        done();
      });
    });

    it('grabs an array of snapshots', (done) => {
      let params = {method: 'snapshotChanges'};
      let subscription = resources.cities.list(params).subscribe((snapshot) => {
        let [{payload}] = snapshot.filter((entry) => entry.key === 'knx');
        expect(payload.val()).toEqual(citiesData.knx);
        subscription.unsubscribe();
        done();
      });
    });

    it('can be configured to listen to specific events', (done) => {
      let params = {eventTypes: ['child_removed']};
      let subscription = resources.cities.list(params).subscribe((data) => {
        let tnCities = data.filter((city) => city.state === 'TN');
        expect(tnCities.length).toBe(data.length);
        subscription.unsubscribe();
      });
      
      resources.cities.remove('ny').then(done);
    });
  });
  
  describe('object()', () => {
    beforeAll(async () => {
      await resources.cities.set(undefined, citiesData);
    });
    
    it('retrieves an object of entries', (done) => {
      let subscription = resources.cities.object().subscribe((data) => {
        expect(Object.keys(data).sort()).toEqual(Object.keys(citiesData).sort());
        subscription.unsubscribe();
        done();
      });
    });
    
    it('fetches a snapshot', (done) => {
      let params = {path: 'knx', method: 'snapshotChanges'};
      let subscription = resources.cities.object(params).subscribe((snapshot) => {
        expect(snapshot.payload.val()).toEqual(citiesData.knx);
        subscription.unsubscribe();
        done();
      });
    });

    it('can listen to specific events', (done) => {
      let params = {path: 'ny', eventTypes: ['child_changed']};
      let update = {population: 8_419_000};
      let subscription = resources.cities.object(params).subscribe((data) => {
        let newData = {...update, ...citiesData.ny};
        expect(data).toEqual(newData);
        subscription.unsubscribe();
      });
      
      resources.cities.update('ny', update).then(done);
    });
    
    it('will ignore query settings (use list() for filtering and sorting)', (done) => {
      let query = [
        ['orderByChild', 'state'],
        ['equalTo', 'TN']
      ];
      let subscription = resources.cities.object({query}).subscribe((data) => {
        expect(Object.keys(data).length).toBe(Object.keys(citiesData).length);
        subscription.unsubscribe();
        done();
      });
    });
  });
});
