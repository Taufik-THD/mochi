const fs = require('fs-extra')
const path = require('path')
const rimraf = require('rimraf')
const webpack = require('webpack')
const defaultConfig = require('./webpack.config')
const webpackServer = require('webpack-dev-server')

const print = (stats) => {
  console.log(stats.toString({
    colors: true
  }))
}

module.exports = (development, source, target) => {
  const buildDirectory = path.resolve(target, '.mochi')
  const buildTemplate = path.resolve(__dirname, 'template')

  const options = {
    contentBase: buildTemplate,
    hot: true,
    host: 'localhost'
  }

  webpackServer.addDevServerEntrypoints(defaultConfig(development, target), options)

  const compiler = webpack(defaultConfig(development, target))

  if (development) {
    const server = new webpackServer(compiler, options)

    compiler.watch({
      aggregateTimeout: 300,
      poll: undefined
    }, (err, stats) => {
      server.listen(5000, 'localhost', () => {
        console.log('dev server listening on port 5000');
      })
    })
  } else {
    fs.copySync(buildTemplate, buildDirectory)

    compiler.run((err, stats) => {
      print(stats)
    })
  }
}