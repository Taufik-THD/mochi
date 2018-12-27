const path = require('path')
const babelConfig = path.join(__dirname, '/.babelrc')

module.exports = (development, target) => {
  return {
    mode: development ? 'development' : 'production',
    entry: path.resolve(target, './src/index.js'),
    output: {
      path: path.resolve(target, './.mochi'),
      filename: 'build.js',
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `babel-loader?babelrc=false&extends=${babelConfig}`
      }]
    }
  }
}