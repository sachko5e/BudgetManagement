var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require('./package.json');

module.exports = {
  entry: {
    app: './src/containers/app.js'
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'app.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html' }
    ]),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
     {       test: /\.woff$/,
           use: 'url-loader'
     }
    ]
  }
};
