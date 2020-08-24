const stringify = (obj, level = 0) => {
  const tab = ' ';
  const parts = Object.keys(obj).map((key) => {
    if (typeof obj[key] !== 'object') {
      return `${tab.repeat(level)}  ${key}: ${obj[key]}`;
    }
    return `${tab.repeat(level)}  ${key}: ${stringify(obj[key], level + 4)}`;
  });
  return `{\n${parts.join('\n')}\n${tab.repeat(level - 2)}}`;
};

const stylize = (diff, level = 2) => {
  const intend = ' '.repeat(level);
  const parts = Object.keys(diff).reduce((acc, key) => {
    const hasChildren = diff[key].status === 'nested';
    if (!hasChildren) {
      const oldValue = (typeof diff[key].oldValue === 'object') ? stringify(diff[key].oldValue, level + 4) : diff[key].oldValue;
      const newValue = (typeof diff[key].newValue === 'object') ? stringify(diff[key].newValue, level + 4) : diff[key].newValue;
      const { status } = diff[key];

      let stringToAdd;
      if (status === 'unchanged') {
        stringToAdd = `${intend}  ${key}: ${oldValue}`;
      }
      if (status === 'deleted') {
        stringToAdd = `${intend}- ${key}: ${oldValue}`;
      }
      if (status === 'added') {
        stringToAdd = `${intend}+ ${key}: ${newValue}`;
      }
      if (status === 'changed') {
        stringToAdd = `${intend}- ${key}: ${oldValue}\n${intend}+ ${key}: ${newValue}`;
      }
      return [...acc, stringToAdd];
    }
    return [...acc, `${intend}  ${key}: ${stylize(diff[key].children, level + 4)}`];
  }, []);
  return `{\n${parts.join('\n')}\n${' '.repeat(level - 2)}}`;
};

const formatStylish = (diff) => stylize(diff, 2);

export default formatStylish;
