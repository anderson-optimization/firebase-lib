const mutatorParams = ['path', 'value', 'options'];

export const methodToParamNames = {
  get: ['path', 'query', 'options'],
  push: mutatorParams,
  set: mutatorParams,
  transaction: mutatorParams,
  update: mutatorParams,
  remove: ['path', 'options'],
  list: ['path', 'query', 'observableMethod', 'eventTypes', 'options'],
  object: ['path', 'observableMethod', 'eventTypes', 'options']
};
