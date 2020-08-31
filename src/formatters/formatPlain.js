const stringify = (value) => {
  const valueType = typeof value;
  switch (valueType) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const formatPlain = (keys) => {
  const iter = (array, ancestry = '') => array.flatMap((item) => {
    const key = Object.keys(item);
    const property = `${ancestry}${key}`;
    const oldValue = stringify(item[key].oldValue);
    const newValue = stringify(item[key].newValue);
    const { type, children } = item[key];
    switch (type) {
      case 'deleted':
        return `Property '${property}' was removed`;
      case 'added':
        return `Property '${property}' was added with value: ${newValue}`;
      case 'changed':
        return `Property '${property}' was updated. From ${oldValue} to ${newValue}`;
      case 'nested':
        return iter(children, `${property}.`);
      default:
        return [];
    }
  }).join('\n');
  return iter(keys, '');
};

export default formatPlain;
