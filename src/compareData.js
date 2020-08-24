import _ from 'lodash';

const compareData = (before, after) => {
  const keys = _.sortBy(_.union(Object.keys(before), Object.keys(after)));
  return keys.reduce((acc, key) => {
    const result = acc;
    result[key] = {};
    if (!_.has(before, key)) {
      result[key].newValue = after[key];
      result[key].status = 'added';
    }
    if (!_.has(after, key)) {
      result[key].oldValue = before[key];
      result[key].status = 'deleted';
    }
    if (_.has(before, key) && _.has(after, key)) {
      if (!_.isObject(before[key]) || !_.isObject(after[key])) {
        result[key].oldValue = before[key];
        result[key].newValue = after[key];
        result[key].status = before[key] === after[key] ? 'unchanged' : 'changed';
      } else {
        result[key].status = 'nested';
        result[key].children = compareData(before[key], after[key]);
      }
    }
    return result;
  }, {});
};

export default compareData;
