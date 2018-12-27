const marked = require("marked")
const path = require('path')
const babelConfig = path.join(__dirname, '/.babelrc')
const renderer = new marked.Renderer()

module.exports = (development, target) => {
  return {
    mode: development ? 'development' : 'production',
    entry: path.resolve(target, './src/index.js'),
    output: {
      path: path.resolve(target, './.mochi'),
      filename: 'build.js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'template'),
      host: 'localhost',
      hot: true,
      inline: false,
      overlay: {
        errors: true,
        warnings: true,
      },
      port: 500,
      stats: 'errors-only',
      watchContentBase: true
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: path.resolve(__dirname, `node_modules/babel-loader?babelrc=false&extends=${babelConfig}`)
      }, {
        test: /\.md$/,
        use: [{
          loader: path.resolve(__dirname, 'node_modules/html-loader')
        }, {
          loader: path.resolve(__dirname, 'node_modules/markdown-loader'),
          options: {
            pedantic: true,
            renderer
          }
        }]
    }]
    }
  }
}