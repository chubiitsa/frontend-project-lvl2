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

const formatPlain = (tree) => {
  const iter = (subtree, ancestry = '') => subtree.flatMap((node) => {
    const { key, type, children } = node;
    const oldValue = stringify(node.oldValue);
    const newValue = stringify(node.newValue);
    const newAncestry = `${ancestry}${key}`;
    switch (type) {
      case 'nested':
        return iter(children, `${newAncestry}.`);
      case 'deleted':
        return `Property '${newAncestry}' was removed`;
      case 'added':
        return `Property '${newAncestry}' was added with value: ${newValue}`;
      case 'changed':
        return `Property '${newAncestry}' was updated. From ${oldValue} to ${newValue}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: '${type}'!`);
    }
  }).join('\n');
  return iter(tree, '');
};

export default formatPlain;
