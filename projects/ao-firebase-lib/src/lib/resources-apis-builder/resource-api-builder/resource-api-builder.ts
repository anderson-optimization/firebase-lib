import {pathProcessor} from './path-processor/path-processor';

export function resourceApiBuilder(resourceDefinition, configs) {
  pathProcessor(resourceDefinition, configs);
  return resourceDefinition.resourceApi = new configs.ResourceApi(resourceDefinition);
}
