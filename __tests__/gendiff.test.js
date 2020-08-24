import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { beforeAll } from '@jest/globals';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (name) => fs.readFileSync(name, 'utf-8');

describe('diff', () => {
  let expected1;
  let expected2;
  let expected4;
  let expected5;
  beforeAll(() => {
    expected1 = readFile(getFixturePath('expected_stylish.txt'));
    expected2 = readFile(getFixturePath('expected_stylish2.txt'));
    expected4 = readFile(getFixturePath('expected_plain.txt'));
    expected5 = readFile(getFixturePath('expected_json.json'));
  });

  test.each([
    ['before.json', 'after.json'],
  ])('stylish format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'stylish')).toBe(expected1);
  });

  test.each([
    ['before.yml', 'after.yaml'],
  ])('stylish format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'stylish')).toBe(expected2);
  });

  test.each([
    ['before.ini', 'after.json'],
  ])('plain format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'plain')).toBe(expected4);
  });

  test.each([
    ['before.ini', 'after.json'],
  ])('json format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'json')).toBe(expected5);
  });
});
