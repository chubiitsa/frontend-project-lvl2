import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (name) => fs.readFileSync(name, 'utf-8');

describe('diff', () => {
  // вот так не работает:
  // let expected1;
  // let expected2;
  // let expected3;
  // let expected4;
  // let expected5;
  // beforeAll(() => {
  //  expected1 = readFile(getFixturePath('expected_stylish.txt'));
  //  expected2 = readFile(getFixturePath('expected_stylish2.txt'));
  //  expected4 = readFile(getFixturePath('expected_plain.txt'));
  //  expected5 = readFile(getFixturePath('expected_json.json'));
  // });
  //
  // test.each([
  // ['before.json', 'after.json', expected1],
  //     ['before.yml', 'after.yaml', expected2],
  // ])('stylish format: compare (%s, %s)', (a, b, expected) => {
  //   expect(genDiff(getFixturePath(a), getFixturePath(b), 'stylish')).toBe(expected);
  // });
  //
  // test.each([
  //   ['before.ini', 'after.json', expected4],
  // ])('plain format: compare (%s, %s)', (a, b, expected) => {
  //   expect(genDiff(getFixturePath(a), getFixturePath(b), 'plain')).toBe(expected);
  // });
  //
  // test.each([
  //   ['before.ini', 'after.json', expected5],
  // ])('json format: compare (%s, %s)', (a, b, expected) => {
  //   expect(genDiff(getFixturePath(a), getFixturePath(b), 'json')).toBe(expected);
  // });

  // без beforeAll работает:
  const expected1 = readFile(getFixturePath('expected_stylish.txt'));
  const expected2 = readFile(getFixturePath('expected_stylish2.txt'));
  const expected4 = readFile(getFixturePath('expected_plain.txt'));
  const expected5 = readFile(getFixturePath('expected_json.json'));

  test.each([
    ['before.json', 'after.json', expected1],
    ['before.yml', 'after.yaml', expected2],
  ])('stylish format: %s, %s', (a, b, expected) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'stylish')).toBe(expected);
  });

  test.each([
    ['before.ini', 'after.json', expected4],
  ])('plain format: %s, %s', (a, b, expected) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'plain')).toBe(expected);
  });

  test.each([
    ['before.ini', 'after.json', expected5],
  ])('json format: %s, %s', (a, b, expected) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'json')).toBe(expected);
  });
});
