import {falsies} from './general-api-vars';

export function difference(arr1, arr2) {
  return arr1.filter((value) => !arr2.includes(value));
}

export function isFalsey(value) {
  return falsies.includes(value);
}
