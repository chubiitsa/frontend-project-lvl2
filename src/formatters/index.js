import formatPlain from './formatPlain.js';
import formatStylish from './formatStylish.js';
import formatJson from './formatJson.js';

const getFormat = (name) => {
  switch (name) {
    case 'json':
      return formatJson;
    case 'plain':
      return formatPlain;
    case 'stylish':
      return formatStylish;
    default:
      throw new Error(`Unknown format: '${name}'!`);
  }
};

export default getFormat;
