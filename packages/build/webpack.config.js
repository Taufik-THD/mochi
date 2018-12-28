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
    resolve: {
      alias: {
        assets: path.resolve(target, 'assets/'),
        components: path.resolve(target, 'components/'),
        src: path.resolve(target, 'src/'),
        pages: path.resolve(target, 'src/pages/'),
        static: path.resolve(target, 'static/'),
        root: path.resolve(target, '/')
      }
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
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/mochi-router)/,
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