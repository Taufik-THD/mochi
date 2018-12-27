const fs        = require('fs-extra')
const open      = require('opn')
const path      = require('path')
const chalk     = require('chalk')
const boxen     = require('boxen')
const webpack   = require('webpack')
const consola   = require('consola')
const merged    = require('webpack-merge')
const transpile = require('./transpiler')
const webpackConfig = require('./webpack.config')
const webpackServer = require('webpack-dev-server')
const boxenString = (config) => {
  return `
  Thanks for using ${chalk.blue.bold('Mochi')},
  Project ready on ${chalk.green.bold(`http://${config.host}:${config.port}`)}  
  `
}

module.exports = (development, source, target) => {
  const mochi = require(path.resolve(target, 'mochi.config.js'))
  const sourceFile = path.resolve(__dirname, 'template/source.html')
  const targetFile = path.resolve(__dirname, 'template/index.html')
  const buildDirectory = path.resolve(target, '.mochi')
  const buildTemplate  = path.resolve(__dirname, 'template')
  const defaultConfig  = webpackConfig(development, target)

  transpile(sourceFile, targetFile, mochi)

  const config = merged(
    defaultConfig,
    {
      devServer: {
        host: 'localhost',
        port: 5000
      }
    },
    mochi.build
  )
  const validURL = `http://${config.devServer.host}:${config.devServer.port}`

  config.entry.push(
    `webpack-dev-server/client?${validURL}`
  )

  const compiler = webpack(config)

  if (development) {
    const server = new webpackServer(compiler, config.devServer)

    compiler.watch({
      aggregateTimeout: 300,
      poll: undefined
    }, (err, stats) => {
      server.listen(config.devServer.port, config.devServer.host, () => {
        open(validURL)
        console.log(
          boxen(boxenString(config.devServer), { margin: 1 })
        )
      })
    })
  } else {
    // Disable build function for testing
    // fs.copySync(buildTemplate, buildDirectory)

    // compiler.run((err, stats) => {
    //   console.log(stats.toString({
    //     colors: true
    //   }))
    // })
  }
}