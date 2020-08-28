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
  let expectedStylish1;
  let expectedStylish2;
  let expectedPlain;
  let expectedJson;
  beforeAll(() => {
    expectedStylish1 = readFile(getFixturePath('expected_stylish.txt'));
    expectedStylish2 = readFile(getFixturePath('expected_stylish2.txt'));
    expectedPlain = readFile(getFixturePath('expected_plain.txt'));
    expectedJson = readFile(getFixturePath('expected_json.json'));
  });

  test.each([
    ['before.json', 'after.json'],
  ])('stylish format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'stylish')).toBe(expectedStylish1);
  });

  test.each([
    ['before.yml', 'after.yaml'],
  ])('stylish format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'stylish')).toBe(expectedStylish2);
  });

  test.each([
    ['before.ini', 'after.json'],
  ])('plain format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'plain')).toBe(expectedPlain);
  });

  test.each([
    ['before.ini', 'after.json'],
  ])('json format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'json')).toBe(expectedJson);
  });
});
