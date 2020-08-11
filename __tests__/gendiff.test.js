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
  ['nested1.json', 'nested2.json', '{\n'
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
  ['flat1.json', 'flat2.json', '{\n'
    + '    host: hexlet.io\n'
    + '  - timeout: 50\n'
    + '  + timeout: 20\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - follow: false\n'
    + '  + verbose: true\n'
    + '}'],
  ['yml1.yml', 'yml2.yml', '{\n'
    + '    env: true\n'
    + '  - parserOptions: 11\n'
    + '  + parserOptions: module\n'
    + '  - rules: no-console\n'
    + '  + rules: import/extensions\n'
    + '  + extends: airbnb-base\n'
    + '}'],
  ['ini1.ini', 'ini2.ini', '{\n'
  + '    env: true\n'
  + '  - user: agent\n'
  + '  + user: dbuser\n'
  + '  - password: dbpassword\n'
  + '  + name: dan\n'
  + '}'],
  ['ini1.ini', 'yml1.yml', '{\n'
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
  ['nested1.json', 'nested2.json', 'Property \'common.setting2\' was removed\n'
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

// const path1 = getFixturePath('nested1.ini');
// const path2 = getFixturePath('nested2.ini');
// const diff = genDiff(path1, path2);
// // console.log(diff);
