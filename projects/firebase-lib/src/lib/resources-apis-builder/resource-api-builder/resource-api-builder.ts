import {globalsRegistrar} from './globals-registrar/globals-registrar';
import {pathProcessor}    from './path-processor/path-processor';

export function resourceApiBuilder(resourceDefinition, configs, skipPathProcessor = false) {
  if(!skipPathProcessor) {
    pathProcessor(resourceDefinition, configs);
  }
  
  globalsRegistrar(resourceDefinition, configs);
  return resourceDefinition.resourceApi = new configs.ResourceApi(resourceDefinition);
}
