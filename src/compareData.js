import _ from 'lodash';

const compareData = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const result = {};
    result[key] = {};
    if (!_.has(before, key)) {
      result[key].newValue = after[key];
      result[key].type = 'added';
    }
    if (!_.has(after, key)) {
      result[key].oldValue = before[key];
      result[key].type = 'deleted';
    }
    if (_.has(before, key) && _.has(after, key)) {
      if (!_.isObject(before[key]) || !_.isObject(after[key])) {
        result[key].oldValue = before[key];
        result[key].newValue = after[key];
        result[key].type = before[key] === after[key] ? 'unchanged' : 'changed';
      } else {
        result[key].type = 'nested';
        result[key].children = compareData(before[key], after[key]);
      }
    }
    return result;
  });
};

export default compareData;
