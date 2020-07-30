import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import { genDiff } from '../src/genDiff.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compare two json', () => {
  const path1 = getFixturePath('json1.json');
  const path2 = getFixturePath('json2.json');
  const diff = genDiff(path1, path2);
  expect(diff).toBe('{\n'
      + '  host: hexlet.io\n'
      + '- timeout: 50\n'
      + '+ timeout: 20\n'
      + '- proxy: 123.234.53.22\n'
      + '- follow: false\n'
      + '+ verbose: true\n'
      + '}');
});

test('compare two yml', () => {
  const path1 = getFixturePath('yml1.yml');
  const path2 = getFixturePath('yml2.yml');
  const diff = genDiff(path1, path2);
  expect(diff).toBe('{\n'
      + '  env: true\n'
      + '- parserOptions: 11\n'
      + '+ parserOptions: module\n'
      + '- rules: no-console\n'
      + '+ rules: import/extensions\n'
      + '+ extends: airbnb-base\n'
      + '}');
});
