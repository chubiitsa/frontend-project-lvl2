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
  let expectedStylish;
  let expectedPlain;
  let expectedJson;
  beforeAll(() => {
    expectedStylish = readFile(getFixturePath('expected_stylish.txt'));
    expectedPlain = readFile(getFixturePath('expected_plain.txt'));
    expectedJson = readFile(getFixturePath('expected_json.json'));
  });

  test.each([
    ['before.json', 'after.json', expectedStylish],
    ['before.ini', 'after.ini', expectedStylish],
    ['before.yml', 'after.yaml', expectedStylish],
    ['before.ini', 'after.json', expectedStylish],
  ])('stylish format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'stylish')).toBe(expectedStylish);
  });

  test.each([
    ['before.json', 'after.json', expectedPlain],
    ['before.ini', 'after.ini', expectedPlain],
    ['before.yml', 'after.yaml', expectedPlain],
    ['before.ini', 'after.json', expectedPlain],
  ])('plain format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'plain')).toBe(expectedPlain);
  });

  test.each([
    ['before.json', 'after.json', expectedJson],
    ['before.ini', 'after.ini', expectedJson],
    ['before.yml', 'after.yaml', expectedJson],
    ['before.ini', 'after.json', expectedJson],
  ])('json format: %s, %s', (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'json')).toBe(expectedJson);
  });
});
