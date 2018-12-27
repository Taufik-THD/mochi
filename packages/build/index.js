const fs = require('fs-extra')
const open = require('opn')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackDevServer = require('webpack-dev-server')

module.exports = (development, source, target) => {
  const { HOST, PORT, VALID_URL } = {
    HOST: 'localhost',
    PORT: 5000,
    VALID_URL: 'http://localhost:5000'
  }
  const buildDirectory = path.resolve(target, '.mochi')
  const buildTemplate = path.resolve(__dirname, 'template')
  const defaultConfig = webpackConfig(development, target, VALID_URL)
  const compiler = webpack(defaultConfig)
  const server = new webpackDevServer(compiler, defaultConfig.devServer)

  if (development) {
    compiler.watch({
      aggregateTimeout: 300,
      poll: undefined
    }, (err, stats) => {
      server.listen(PORT, HOST, () => {
        open(VALID_URL)
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