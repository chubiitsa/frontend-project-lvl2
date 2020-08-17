import _ from 'lodash';

const comparePlain = (value1, value2) => {
  const areEqual = value1.toString() === value2.toString();
  const oneIsNumber = typeof value1 === 'number' || typeof value2 === 'number';
  const status = value1.toString() === value2.toString() ? 'same' : 'changed';
  const oldValue = areEqual && oneIsNumber ? parseInt(value1, 10) : value1;
  const newValue = areEqual && oneIsNumber ? parseInt(value2, 10) : value2;
  return { oldValue, newValue, status };
};

const containBoth = (key, obj1, obj2) => {
  const isInFirstObj = Object.prototype.hasOwnProperty.call(obj1, key);
  const isInSecondObj = Object.prototype.hasOwnProperty.call(obj2, key);
  return isInFirstObj && isInSecondObj;
};

const compareData = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));
  return keys.reduce((acc, key) => {
    const result = acc;
    result[key] = {};
    if (containBoth(key, before, after)) {
      if (typeof before[key] !== 'object' || typeof after[key] !== 'object') {
        result[key] = comparePlain(before[key], after[key]);
      } else {
        result[key].children = compareData(before[key], after[key]);
      }
    } else if (!Object.prototype.hasOwnProperty.call(before, key)) {
      result[key].newValue = after[key];
      result[key].status = 'added';
    } else {
      result[key].oldValue = before[key];
      result[key].status = 'deleted';
    }
    return result;
  }, {});
};

export default compareData;
