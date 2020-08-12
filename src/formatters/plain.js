const defineOutputByType = (value) => {
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

const plain = (diff, i = '') => Object.keys(diff).reduce((acc, key) => {
  const parts = acc;
  const property = !diff[key].children ? `${i}${key}` : `${i}${key}.`;
  if (!diff[key].children) {
    const oldValue = defineOutputByType(diff[key].oldValue);
    const newValue = defineOutputByType(diff[key].newValue);
    switch (diff[key].status) {
      case 'deleted':
        parts.push(`Property '${property}' was removed`);
        break;
      case 'added':
        parts.push(`Property '${property}' was added with value: ${newValue}`);
        break;
      case 'changed':
        parts.push(`Property '${property}' was updated. From ${oldValue} to ${newValue}`);
        break;
      default:
        return parts;
    }
  } else {
    parts.push(plain(diff[key].children, property));
  }
  return parts;
}, []).join('\n');

export default plain;
