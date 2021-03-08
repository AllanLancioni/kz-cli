#!/usr/bin/env node

const program = require('commander');
const package = require('./package.json');

const generate = require('./commands/generate');

program.version(package.version);

program
    .command('generate <feature> [number]')
    .description('Generate a new feature and your modules in Kruzer Api')
    .action(generate);

program
    .command('g <feature> [number]')
    .description('Allias to Generate command')
    .action(generate);


program.parse(process.argv);