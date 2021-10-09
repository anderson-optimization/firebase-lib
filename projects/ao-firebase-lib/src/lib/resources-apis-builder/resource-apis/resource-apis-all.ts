import {angularApi, firebaseApi, generalApi}  from './resource-apis';

export const resourceApisAll = {
  ...angularApi,
  ...firebaseApi,
  ...generalApi
};
