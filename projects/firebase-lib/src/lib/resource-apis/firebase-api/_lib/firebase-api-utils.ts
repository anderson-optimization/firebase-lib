export function arrayToBooleansObject(arr) {
  return arr.reduce((booleans, value) => {
    return Object.assign(booleans, {[value]: true});
  }, {});
}
