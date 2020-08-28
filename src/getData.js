import path from 'path';
import fs from 'fs';
import getParser from './getParser.js';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const getFormat = (pathToFile) => {
  const fileExtension = path.extname(pathToFile);
  return fileExtension.slice(1);
};

const getData = (pathToFile) => {
  const fileType = getFormat(pathToFile);
  const parse = getParser(fileType);
  const data = readFile(pathToFile);
  return parse(data);
};

export default getData;
