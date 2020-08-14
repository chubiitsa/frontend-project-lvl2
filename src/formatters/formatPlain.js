const getOutputByType = (value) => {
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

const formatPlain = (diff, i = '') => Object.keys(diff).flatMap((key) => {
  const property = !diff[key].children ? `${i}${key}` : `${i}${key}.`;
  if (!diff[key].children) {
    const oldValue = getOutputByType(diff[key].oldValue);
    const newValue = getOutputByType(diff[key].newValue);
    const { status } = diff[key];
    return generateMessage(status, property, oldValue, newValue);
  }
  return formatPlain(diff[key].children, property);
}).join('\n');

export default formatPlain;
