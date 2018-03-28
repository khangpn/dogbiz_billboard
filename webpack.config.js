const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'public/dist')
const APP_DIR = path.resolve(__dirname, 'front_end/')

module.exports = {
  context: APP_DIR,
  entry: {
    dogshow: [
      'core-js/fn/promise',
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
  },
  plugins: [
    new CleanWebpackPlugin([BUILD_DIR]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
    //new webpack.DefinePlugin({
    //  'process.env':{
    //    'DOC_URL': JSON.stringify('http://doc2.arag.be/doc_uat/offer/contract/')
    //  }
    //})
  ]
}
