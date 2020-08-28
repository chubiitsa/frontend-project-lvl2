import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumeric = (value) => !Number.isNaN(parseFloat(value));

const convertToNumbers = (json) => _.mapValues(json, (value) => {
  if (isNumeric(value)) {
    return parseFloat(value);
  }
  if (_.isObject(value)) {
    return convertToNumbers(value);
  }
  return value;
});

const iniCustom = (data) => {
  const json = ini.parse(data);
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
