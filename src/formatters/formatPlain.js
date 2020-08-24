const stringify = (value) => {
  const valueType = typeof value;
  switch (valueType) {
    case 'boolean':
      return value;
    case 'object':
      return '[complex value]';
    default:
      return `'${value}'`;
  }
};

const generateMessage = (status, property, oldValue, newValue) => {
  switch (status) {
    case 'deleted':
      return `Property '${property}' was removed`;
    case 'added':
      return `Property '${property}' was added with value: ${newValue}`;
    case 'changed':
      return `Property '${property}' was updated. From ${oldValue} to ${newValue}`;
    default:
      return [];
  }
};

const plain = (diff, i = '') => Object.keys(diff).flatMap((key) => {
  const property = !diff[key].children ? `${i}${key}` : `${i}${key}.`;
  const hasChildren = diff[key].status === 'nested';
  if (!hasChildren) {
    const oldValue = stringify(diff[key].oldValue);
    const newValue = stringify(diff[key].newValue);
    const { status } = diff[key];
    return generateMessage(status, property, oldValue, newValue);
  }
  return plain(diff[key].children, property);
}).join('\n');

const formatPlain = (diff) => plain(diff, '');

export default formatPlain;
