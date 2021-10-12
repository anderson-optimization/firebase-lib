import {getBaseAngular} from './get-base-angular/get-base-angular';

export const angularApi = {
  list(...params) {
    return getBaseAngular.call(this, 'list', ...params);
  },
  
  object(...params) {
    return getBaseAngular.call(this, 'object', ...params);
  }
};
