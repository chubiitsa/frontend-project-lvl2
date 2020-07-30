import commander from 'commander';
import path from 'path';
import fs from 'fs';
import parsers from './parsers.js';

const genDiff = (path1, path2) => {
  const fileType = path.extname(path1);
  const parse = parsers(fileType);
  const file1 = parse(fs.readFileSync(path1));
  const file2 = parse(fs.readFileSync(path2));

  const compareKeys = (obj1, obj2) => {
    const keys1 = Object.keys(obj1).map((key) => {
      if (Object.prototype.hasOwnProperty.call(obj2, key)) {
        if (obj1[key] !== obj2[key]) {
          return `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}\n`;
        }
        return `  ${key}: ${obj1[key]}\n`;
      }
      return `- ${key}: ${obj1[key]}\n`;
    });

    const keys2 = Object.keys(obj2).map((key) => {
      if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
        return `+ ${key}: ${obj2[key]}\n`;
      }
      return '';
    });

    return `{\n${keys1.concat(keys2).join('')}}`;
  };

  return compareKeys(file1, file2);
};

const { program } = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(genDiff);

export { program, genDiff };
