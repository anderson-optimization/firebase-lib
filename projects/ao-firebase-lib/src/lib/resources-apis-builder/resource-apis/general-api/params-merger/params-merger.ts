export function paramsMerger(destinationValue, sourceValue, key) {
  if(key === 'options') {
    return Object.assign(destinationValue, sourceValue);
  }  
}
