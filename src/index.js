import getFormat from './formatters/index.js';
import compareData from './compareData.js';
import getData from './getData.js';

const genDiff = (path1, path2, style = 'stylish') => {
  const data1 = getData(path1);
  // console.log(data1);
  const data2 = getData(path2);
  const format = getFormat(style);
  return format(compareData(data1, data2));
};

export default genDiff;
