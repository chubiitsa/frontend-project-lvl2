const drawObject = (obj, times = 0) => {
  const tab = ' ';
  return `{\n${Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] !== 'object') {
      return [...acc, (`${tab.repeat(times)}  ${key}: ${obj[key]}`)];
    }
    return [...acc, (`${tab.repeat(times)}  ${key}: ${drawObject(obj[key], times + 4)}`)];
  }, []).join('\n')}\n${tab.repeat(times - 2)}}`;
};

const formatStylish = (diff, times = 2) => {
  const intend = ' '.repeat(times);
  const parts = Object.keys(diff).reduce((acc, key) => {
    if (!diff[key].children) {
      const oldValue = (typeof diff[key].oldValue === 'object') ? drawObject(diff[key].oldValue, times + 4) : diff[key].oldValue;
      const newValue = (typeof diff[key].newValue === 'object') ? drawObject(diff[key].newValue, times + 4) : diff[key].newValue;
      const { status } = diff[key];

      let stringToAdd;
      if (status === 'same') {
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
    return [...acc, `${intend}  ${key}: ${formatStylish(diff[key].children, times + 4)}`];
  }, []);
  return `{\n${parts.join('\n')}\n${' '.repeat(times - 2)}}`;
};

export default formatStylish;
