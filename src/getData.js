import path from 'path';
import fs from 'fs';
import getParser from './getParser.js';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');
const getExtension = (pathToFile) => path.extname(pathToFile);
const getType = (ext) => ext.slice(1);

const getData = (pathToFile) => {
  const fileExtension = getExtension(pathToFile);
  const fileType = getType(fileExtension);
  const parse = getParser(fileType);
  const data = readFile(pathToFile);
  return parse(data);
};

export default getData;
