const stringify = (obj, depth = 1) => {
  const shift = depth * 4 - 2;
  const indent = ' '.repeat(shift);
  const endIndent = ' '.repeat(shift - 2);
  const parts = Object.keys(obj).map((key) => {
    if (typeof obj[key] !== 'object') {
      return `${indent}  ${key}: ${obj[key]}`;
    }
    return `${indent}  ${key}: ${stringify(obj[key], depth + 1)}`;
  });
  return `{\n${parts.join('\n')}\n${endIndent}}`;
};

const formatStylish = (keys) => {
  const iter = (array, depth = 1) => {
    const size = depth * 4 - 2;
    const indent = ' '.repeat(size);
    const endIndent = ' '.repeat(size - 2);
    const parts = array.map((item) => {
      const key = Object.keys(item);
      const { type, children } = item[key];
      if (type === 'nested') {
        return `${indent}  ${key}: ${iter(children, depth + 1)}`;
      }
      const oldValue = (typeof item[key].oldValue === 'object') ? stringify(item[key].oldValue, depth + 1) : item[key].oldValue;
      const newValue = (typeof item[key].newValue === 'object') ? stringify(item[key].newValue, depth + 1) : item[key].newValue;

      if (type === 'unchanged') {
        return `${indent}  ${key}: ${oldValue}`;
      }
      if (type === 'deleted') {
        return `${indent}- ${key}: ${oldValue}`;
      }
      if (type === 'added') {
        return `${indent}+ ${key}: ${newValue}`;
      }
      if (type === 'changed') {
        return `${indent}- ${key}: ${oldValue}\n${indent}+ ${key}: ${newValue}`;
      }
    });
    return `{\n${parts.join('\n')}\n${endIndent}}`;
  };
  return iter(keys, 1);
};

export default formatStylish;
