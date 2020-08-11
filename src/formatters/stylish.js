const drawObject = (obj, times = 0) => {
  const tab = ' ';
  return `{\n${Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] !== 'object') {
      acc.push(`${tab.repeat(times)}  ${key}: ${obj[key]}`);
    } else {
      acc.push(`${tab.repeat(times)}  ${key}: ${drawObject(obj[key], times + 4)}`);
    }
    return acc;
  }, []).join('\n')}\n${tab.repeat(times - 2)}}`;
};

const stylish = (diff, times = 2) => {
  const parts = [];
  const tab = ' ';
  Object.keys(diff).forEach((key) => {
    if (!diff[key].children) {
      const oldValue = (typeof diff[key].oldValue === 'object') ? drawObject(diff[key].oldValue, times + 4) : diff[key].oldValue;
      const newValue = (typeof diff[key].newValue === 'object') ? drawObject(diff[key].newValue, times + 4) : diff[key].newValue;
      const { status } = diff[key];

      if (status === 'same') {
        parts.push(`${tab.repeat(times)}  ${key}: ${oldValue}`);
      }
      if (status === 'deleted') {
        parts.push(`${tab.repeat(times)}- ${key}: ${oldValue}`);
      }
      if (status === 'added') {
        parts.push(`${tab.repeat(times)}+ ${key}: ${newValue}`);
      }
      if (status === 'changed') {
        parts.push(`${tab.repeat(times)}- ${key}: ${oldValue}`);
        parts.push(`${tab.repeat(times)}+ ${key}: ${newValue}`);
      }
    } else {
      parts.push(`${tab.repeat(times)}  ${key}: ${stylish(diff[key].children, times + 4)}`);
    }
  });
  return `{\n${parts.join('\n')}\n${tab.repeat(times - 2)}}`;
};

export default stylish;
