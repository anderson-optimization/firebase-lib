const angularMethodParams = ['path', 'query', 'method', 'eventTypes', 'options'];
const mutatorParams = ['path', 'value', 'options'];

export const methodToParams = {
  get: ['path', 'query', 'options'],
  push: mutatorParams,
  set: mutatorParams,
  transaction: mutatorParams,
  update: mutatorParams,
  remove: ['path', 'options'],
  list: angularMethodParams,
  object: angularMethodParams
};
