#!/usr/bin/env node

const program = require('commander')
const create = require('./packages/create/index')
const serve = require('./packages/serve/index')
const build = require('./packages/build/index')

program
  .command('create <project>')
  .action(project => {
    return create(project)
  })

program
  .command('serve')
  .action(() => {
    return serve('process serve')
  })

program
  .command('build')
  .option('-d, --development', 'Development build')
  .action(program => {
    return build(program.development)
  })

program.parse(process.argv)