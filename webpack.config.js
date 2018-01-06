const webpack = require('webpack')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'public/dist')
const APP_DIR = path.resolve(__dirname, 'front_end/')

module.exports = {
  context: APP_DIR,
  entry: {
    dogshow: [
      './dogshow'
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.js?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }
    ]
  }
}
