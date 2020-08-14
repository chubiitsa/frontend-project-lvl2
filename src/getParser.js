import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (ext) => {
  const type = ext.slice(1);
  switch (type) {
    case 'yml':
    case 'yaml':
      return yaml.safeLoad;
    case 'ini':
      return ini.parse;
    case 'json':
      return JSON.parse;
    default:
      throw new Error(`Unknown file-type: '${type}'!`);
  }
};

export default getParser;
