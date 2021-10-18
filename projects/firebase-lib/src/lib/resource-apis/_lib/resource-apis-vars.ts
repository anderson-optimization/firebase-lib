const angularMethodParams = ['path', 'query', 'observableMethod', 'eventTypes', 'options'];
const mutatorParams = ['path', 'value', 'options'];

export const methodToParamNames = {
  get: ['path', 'query', 'options'],
  push: mutatorParams,
  set: mutatorParams,
  transaction: mutatorParams,
  update: mutatorParams,
  remove: ['path', 'options'],
  list: angularMethodParams,
  object: angularMethodParams
};
