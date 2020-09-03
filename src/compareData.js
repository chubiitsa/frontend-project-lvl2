import _ from 'lodash';

const compareData = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (!_.has(before, key)) {
      return { key, type: 'added', newValue: after[key] };
    }
    if (!_.has(after, key)) {
      return { key, type: 'deleted', oldValue: before[key] };
    }
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      const children = compareData(before[key], after[key]);
      return { key, type: 'nested', children };
    }
    if (before[key] !== after[key]) {
      return {
        key, type: 'changed', oldValue: before[key], newValue: after[key],
      };
    }
    return {
      key, type: 'unchanged', oldValue: before[key], newValue: after[key],
    };
  });
};

export default compareData;
