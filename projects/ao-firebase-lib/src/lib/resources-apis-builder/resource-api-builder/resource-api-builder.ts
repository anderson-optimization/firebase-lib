import {pathProcessor} from './path-processor/path-processor';

export function resourceApiBuilder(resourceDefinition, configs) {
  let {angularDatabase, database, apis} = configs as any;

  pathProcessor(resourceDefinition, configs);

  function ResourceApi() {
    Object.assign(this, {
      configs,
      angularDatabase,
      database,
      resourceDefinition,
      methodsParams: {}
    });
  }

  Object.assign(ResourceApi.prototype, apis);
  return resourceDefinition.resourceApi = new ResourceApi();
}
