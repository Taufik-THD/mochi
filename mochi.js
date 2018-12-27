#!/usr/bin/env node

const fs      = require('fs')
const path    = require('path')
const consola = require('consola')
const program = require('commander')
const create  = require('./packages/create/index')
const serve   = require('./packages/serve/index')
const build   = require('./packages/build/index')
const source  = __dirname
const target  = process.cwd()

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
    if (!fs.existsSync(path.resolve(target, 'mochi.config.js'))) {
      consola.error('Mochi config is not define, please run mochi on valid directory.')
      process.exit(0)
    }
    return build(program.development, source, target)
  })

program.parse(process.argv)