const path = require('path')

const config = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  devServer: {
    proxy: {
      '/api': "http://localhost:3003"
    },
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
}

module.exports = config