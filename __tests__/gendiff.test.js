import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import { genDiff } from '../src/genDiff.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['nested_before.json', 'nested_after.json', '{\n'
    + '    common: {\n'
    + '        setting1: Value 1\n'
    + '      - setting2: 200\n'
    + '      - setting3: true\n'
    + '      + setting3: {\n'
    + '            key: value\n'
    + '        }\n'
    + '        setting6: {\n'
    + '            key: value\n'
    + '            doge: {\n'
    + '              - wow: too much\n'
    + '              + wow: so much\n'
    + '            }\n'
    + '          + ops: vops\n'
    + '        }\n'
    + '      + follow: false\n'
    + '      + setting4: blah blah\n'
    + '      + setting5: {\n'
    + '            key5: value5\n'
    + '        }\n'
    + '    }\n'
    + '    group1: {\n'
    + '      - baz: bas\n'
    + '      + baz: bars\n'
    + '        foo: bar\n'
    + '      - nest: {\n'
    + '            key: value\n'
    + '        }\n'
    + '      + nest: str\n'
    + '    }\n'
    + '  - group2: {\n'
    + '        abc: 12345\n'
    + '        deep: {\n'
    + '            id: 45\n'
    + '        }\n'
    + '    }\n'
    + '  + group3: {\n'
    + '        fee: 100500\n'
    + '        deep: {\n'
    + '            id: {\n'
    + '                number: 45\n'
    + '            }\n'
    + '        }\n'
    + '    }\n'
    + '}'],
  ['yml1.yml', 'yml2.yml', '{\n'
    + '    env: true\n'
    + '  - parserOptions: 11\n'
    + '  + parserOptions: module\n'
    + '  - rules: no-console\n'
    + '  + rules: import/extensions\n'
    + '  + extends: airbnb-base\n'
    + '}'],
  ['flat.json', 'nested.ini', '{\n'
  + '  - host: hexlet.io\n'
  + '  - timeout: 50\n'
  + '  - proxy: 123.234.53.22\n'
  + '  - follow: false\n'
  + '    id: 33\n'
  + '  + first: {\n'
  + '        second: {\n'
  + '            env: true\n'
  + '            user: dbuser\n'
  + '            name: dan\n'
  + '        }\n'
  + '    }\n'
  + '}'],
  ['flat.ini', 'yml1.yml', '{\n'
  + '    env: true\n'
  + '  - user: agent\n'
  + '  - password: dbpassword\n'
  + '  + parserOptions: 11\n'
  + '  + rules: no-console\n'
  + '}'],
])('compare with stylish format (%s, %s)', (a, b, expected) => {
  expect(genDiff(getFixturePath(a), getFixturePath(b), 'stylish')).toBe(expected);
});

test.each([
  ['nested_before.json', 'nested_after.json', 'Property \'common.setting2\' was removed\n'
  + 'Property \'common.setting3\' was updated. From true to [complex value]\n'
  + 'Property \'common.setting6.doge.wow\' was updated. From \'too much\' to \'so much\'\n'
  + 'Property \'common.setting6.ops\' was added with value: \'vops\'\n'
  + 'Property \'common.follow\' was added with value: false\n'
  + 'Property \'common.setting4\' was added with value: \'blah blah\'\n'
  + 'Property \'common.setting5\' was added with value: [complex value]\n'
  + 'Property \'group1.baz\' was updated. From \'bas\' to \'bars\'\n'
  + 'Property \'group1.nest\' was updated. From [complex value] to \'str\'\n'
  + 'Property \'group2\' was removed\n'
  + 'Property \'group3\' was added with value: [complex value]'],
])('compare with plain format (%s, %s)', (a, b, expected) => {
  expect(genDiff(getFixturePath(a), getFixturePath(b), 'plain')).toBe(expected);
});

test.each([
  ['flat.json', 'nested.ini', '{"host":{"oldValue":"hexlet.io","status":"deleted"},"timeout":{"oldValue":50,"status":"deleted"},"proxy":{"oldValue":"123.234.53.22","status":"deleted"},"follow":{"oldValue":false,"status":"deleted"},"id":{"oldValue":33,"newValue":33,"status":"same"},"first":{"newValue":{"second":{"env":true,"user":"dbuser","name":"dan"}},"status":"added"}}'],
])('compare with json format (%s, %s)', (a, b, expected) => {
  expect(genDiff(getFixturePath(a), getFixturePath(b), 'json')).toBe(expected);
});
