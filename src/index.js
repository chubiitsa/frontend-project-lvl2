import getFormat from './formatters/index.js';
import compareData from './compareData.js';
import getData from './getData.js';

const index = (path1, path2, format = 'stylish') => {
  const data1 = getData(path1);
  const data2 = getData(path2);
  const formatter = getFormat(format);
  return formatter(compareData(data1, data2));
};

export default index;
