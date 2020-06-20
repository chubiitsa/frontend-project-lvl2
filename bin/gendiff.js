#!/usr/bin/env node

import commander from 'commander';

const { program } = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbq) console.log('  - bbq');

const cheese = !program.cheese ? 'no' : program.cheese;

console.log('  - %s cheese', cheese);
console.log(program.args);
