import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const iniCustom = (data) => {
  const json = ini.parse(data);
  const convertToNumbers = (obj) => Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const isNumeric = !Number.isNaN(parseInt(value, 10));
    if (isNumeric) {
      acc[key] = parseInt(value, 10);
    } else if (_.isObject(value)) {
      acc[key] = convertToNumbers(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
  return convertToNumbers(json);
};

const getParser = (type) => {
  switch (type) {
    case 'yml':
    case 'yaml':
      return yaml.safeLoad;
    case 'ini':
      return iniCustom;
    case 'json':
      return JSON.parse;
    default:
      throw new Error(`Unknown file-type: '${type}'!`);
  }
};

export default getParser;
