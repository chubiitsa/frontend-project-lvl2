const getIndentSize = (depth) => depth * 4 - 2;
const getStartIndent = (depth) => ' '.repeat(getIndentSize(depth));
const getEndIndent = (depth) => ' '.repeat(getIndentSize(depth) - 2);

const stringify = (value, depth = 1) => {
  if (typeof value !== 'object') {
    return value;
  }
  const indent = getStartIndent(depth);
  const endIndent = getEndIndent(depth);
  const parts = Object.keys(value).map((key) => {
    if (typeof value[key] !== 'object') {
      return `${indent}  ${key}: ${value[key]}`;
    }
    return `${indent}  ${key}: ${stringify(value[key], depth + 1)}`;
  });
  return `{\n${parts.join('\n')}\n${endIndent}}`;
};

const formatStylish = (tree) => {
  const iter = (subtree, depth = 1) => {
    const indent = getStartIndent(depth);
    const endIndent = getEndIndent(depth);
    const parts = subtree.map((node) => {
      const { key, type, children } = node;
      const oldValue = stringify(node.oldValue, depth + 1);
      const newValue = stringify(node.newValue, depth + 1);
      switch (type) {
        case 'nested':
          return `${indent}  ${key}: ${iter(children, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${key}: ${oldValue}`;
        case 'added':
          return `${indent}+ ${key}: ${newValue}`;
        case 'changed':
          return `${indent}- ${key}: ${oldValue}\n${indent}+ ${key}: ${newValue}`;
        case 'unchanged':
          return `${indent}  ${key}: ${oldValue}`;
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });
    return `{\n${parts.join('\n')}\n${endIndent}}`;
  };
  return iter(tree, 1);
};

export default formatStylish;
