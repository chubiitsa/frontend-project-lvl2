import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getFormatter = (name) => {
  switch (name) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      return json;
  }
};

export default getFormatter;
