import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (type) => {
  if (type === '.yml') {
    return yaml.safeLoad;
  }
  if (type === '.ini') {
    return ini.parse;
  }
  return JSON.parse;
};

export default parsers;
