const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackDevServer = require('webpack-dev-server')

module.exports = (development, source, target) => {
  const buildDirectory = path.resolve(target, '.mochi')
  const buildTemplate = path.resolve(__dirname, 'template')
  const defaultConfig = webpackConfig(development, target)
  const compiler = webpack(defaultConfig)
  const server = new webpackDevServer(compiler, defaultConfig.devServer)

  if (development) {
    compiler.watch({
      aggregateTimeout: 300,
      poll: undefined
    }, (err, stats) => {
      server.listen(5000, 'localhost', () => {
        console.log('server on port 5000')
      })
    })
  } else {
    fs.copySync(buildTemplate, buildDirectory)

    compiler.run((err, stats) => {
      console.log(stats.toString({
        colors: true
      }))
    })
  }
}