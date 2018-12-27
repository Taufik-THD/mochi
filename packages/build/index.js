const fs = require('fs-extra')
const path = require('path')
const rimraf = require('rimraf')
const webpack = require('webpack')
const defaultConfig = require('./webpack.config')

const build = (development, target, buildTemplate, buildDirectory) => {
  fs.mkdirSync(buildDirectory)
  fs.copySync(buildTemplate, buildDirectory)

  const compiler = webpack(defaultConfig(development, target))

  if (development) {
    const buildDevelopment = compiler.watch({
      aggregateTimeout: 300,
      poll: undefined
    }, (err, stats) => {
      if (err) {
        buildDevelopment.close(() => {
          console.log('Watching Ended')
        })
      }

      print(stats)
    })
  } else {
    compiler.run((err, stats) => {
      print(stats)
    })
  }
}

const print = (stats) => {
  console.log(stats.toString({
    colors: true
  }))
}

module.exports = (development, source, target) => {
  const buildDirectory = path.resolve(target, '.mochi')
  const buildTemplate = path.resolve(__dirname, 'template')

  if (fs.pathExistsSync(buildDirectory)) {
    rimraf(buildDirectory,(error) => {
      build(development, target, buildTemplate, buildDirectory)
    })
  } else {
    build(development, target, buildTemplate, buildDirectory)
  }
}