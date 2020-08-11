import commander from 'commander';
import path from 'path';
import fs from 'fs';
import parsers from './parsers.js';
import stylish from './formatter.js';

const diff = (obj1, obj2) => {
  const result = {};
  Object.keys(obj1).forEach((key) => {
    result[key] = {};
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      result[key].oldValue = obj1[key];
      result[key].status = 'deleted';
    } else if (typeof obj1[key] !== 'object' || typeof obj2[key] !== 'object') {
      result[key].oldValue = obj1[key];
      result[key].newValue = obj2[key];
      result[key].status = obj1[key] === obj2[key] ? 'same' : 'changed';
    } else {
      result[key].children = diff(obj1[key], obj2[key]);
    }
  });

  Object.keys(obj2).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
      result[key] = {};
      result[key].newValue = obj2[key];
      result[key].status = 'added';
    }
  });
  return result;
};

const genDiff = (path1, path2, format = stylish) => {
  const parse1 = parsers(path.extname(path1));
  const parse2 = parsers(path.extname(path2));
  const file1 = parse1(fs.readFileSync(path1, 'utf-8'));
  const file2 = parse2(fs.readFileSync(path2, 'utf-8'));
  console.log(format(diff(file1, file2)));
  return format(diff(file1, file2));
};

const { program } = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2> [program.option]')
  .action(genDiff);

export { program, genDiff };
