const plain = (diff, i = '') => {
  const parts = [];
  Object.keys(diff).forEach((key) => {
    let property = `${i}${key}`;
    if (!diff[key].children) {
      const oldValueType = typeof diff[key].oldValue;
      let oldValue;
      switch (oldValueType) {
        case 'boolean':
          oldValue = diff[key].oldValue;
          break;
        case 'object':
          oldValue = '[complex value]';
          break;
        default:
          oldValue = `'${diff[key].oldValue}'`;
      }

      const newValueType = typeof diff[key].newValue;
      let newValue;
      switch (newValueType) {
        case 'boolean':
          newValue = diff[key].newValue;
          break;
        case 'object':
          newValue = '[complex value]';
          break;
        default:
          newValue = `'${diff[key].newValue}'`;
      }

      const { status } = diff[key];

      if (status === 'deleted') {
        parts.push(`Property '${property}' was removed`);
      }
      if (status === 'added') {
        parts.push(`Property '${property}' was added with value: ${newValue}`);
      }
      if (status === 'changed') {
        parts.push(`Property '${property}' was updated. From ${oldValue} to ${newValue}`);
      }
    } else {
      property += '.';
      parts.push(plain(diff[key].children, property));
    }
  });
  return `${parts.join('\n')}`;
};

export default plain;
