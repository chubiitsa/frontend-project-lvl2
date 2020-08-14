import path from 'path';
import fs from 'fs';
import getParser from './getParser';

const getData = (address) => {
  const fileType = path.extname(address);
  const parser = getParser(fileType);
  return parser(fs.readFileSync(address, 'utf-8'));
};

export default getData;
