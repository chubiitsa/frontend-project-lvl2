import _ from 'lodash';

const compareData = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));
  return keys.reduce((acc, key) => {
    const result = acc;
    result[key] = {};
    if (!Object.prototype.hasOwnProperty.call(before, key)) {
      result[key].newValue = after[key];
      result[key].status = 'added';
    } else if (!Object.prototype.hasOwnProperty.call(after, key)) {
      result[key].oldValue = before[key];
      result[key].status = 'deleted';
    } else if (typeof before[key] !== 'object' || typeof after[key] !== 'object') {
      const areEqual = before[key].toString() === after[key].toString();
      const oneIsNumber = typeof before[key] === 'number' || typeof after[key] === 'number';
      if (areEqual && oneIsNumber) {
        result[key].oldValue = parseInt(before[key], 10);
        result[key].newValue = parseInt(after[key], 10);
      } else {
        result[key].oldValue = before[key];
        result[key].newValue = after[key];
      }
      result[key].status = before[key].toString() === after[key].toString() ? 'same' : 'changed';
    } else {
      result[key].children = compareData(before[key], after[key]);
    }
    return result;
  }, {});
};

export default compareData;
