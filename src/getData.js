import path from 'path';
import fs from 'fs';
import getParser from './getParser.js';

const readFile = (name) => fs.readFileSync(name, 'utf-8');
const getType = (name) => path.extname(name);

const getData = (pathToFile) => {
  const dataType = getType(pathToFile);
  const parse = getParser(dataType);
  const data = readFile(pathToFile);
  return parse(data);
};

export default getData;
