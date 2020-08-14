import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import index from '../src';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expected1 = (fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8'));
const expected2 = (fs.readFileSync(getFixturePath('expected_stylish2.txt'), 'utf-8'));
const expected3 = (fs.readFileSync(getFixturePath('expected_stylish3.txt'), 'utf-8'));
const expected4 = (fs.readFileSync(getFixturePath('expected_stylish4.txt'), 'utf-8'));

test.each([
  ['nested_before.json', 'nested_after.json', expected1],
  ['yml1.yml', 'yml2.yaml', expected2],
  ['flat.json', 'nested.ini', expected3],
  ['flat.ini', 'yml1.yml', expected4],
])('stylish format: compare (%s, %s)', (a, b, expected) => {
  expect(index(getFixturePath(a), getFixturePath(b), 'stylish')).toBe(expected);
});

const expected5 = (fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8'));

test.each([
  ['nested_before.json', 'nested_after.json', expected5],
])('plain format: compare (%s, %s)', (a, b, expected) => {
  expect(index(getFixturePath(a), getFixturePath(b), 'plain')).toBe(expected);
});

const expected6 = (fs.readFileSync(getFixturePath('expected_json.json'), 'utf-8'));

test.each([
  ['flat.json', 'nested.ini', expected6],
])('json format: compare (%s, %s)', (a, b, expected) => {
  expect(index(getFixturePath(a), getFixturePath(b), 'json')).toBe(expected);
});
