const webpack = require('webpack')
const { exec } = require('child_process')
const path = require('path')
const defaultConfig = require('./webpack.config')

module.exports = (development, source, target) => {
  const compiler = webpack(defaultConfig(development, target))

  if (development) {
    const buildDevelopment = compiler.watch({
      // Example watchOptions
      aggregateTimeout: 300,
      poll: undefined
    }, (err, stats) => {
      // Print watch/build result here...
      console.log(stats.toString({
        // Add console colors
        colors: true
      }));
    })
  } else {
    const buildProduction = compiler.run((err, stats) => {
      console.log(stats.toString({
        // Add console colors
        colors: true
      }))
    })
  }
}