const marked = require("marked")
const path = require('path')
const webpack = require('webpack')
const babelConfig = path.join(__dirname, '/.babelrc')
const renderer = new marked.Renderer()
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (development, target) => {
  return {
    mode: development ? 'development' : 'production',
    entry: [
      'webpack/hot/dev-server',
      path.resolve(target, './src/index.js')
    ],
    output: {
      path: path.resolve(target, './.mochi'),
      filename: 'build.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'template/index.html')
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'template'),
      hot: true,
      stats: 'errors-only'
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
      }, {
        test: /\.s?[c|a]ss$/,
        use: [
          path.resolve(__dirname, 'node_modules/style-loader'),
          path.resolve(__dirname, 'node_modules/css-loader'),
          path.resolve(__dirname, 'node_modules/sass-loader')
        ]
      }]
    }
  }
}