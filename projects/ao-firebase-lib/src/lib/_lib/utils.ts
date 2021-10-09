import {libraryName} from './vars';

export function error(errorMessage) {
  throw new Error(`${libraryName}: ${errorMessage}`);
}
