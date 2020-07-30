import yaml from 'js-yaml';

const parsers = (type) => {
  if (type === '.yml') {
    return yaml.safeLoad;
  }
  return JSON.parse;
};

export default parsers;
