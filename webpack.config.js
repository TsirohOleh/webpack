'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, process.env.NODE_ENV === 'development' ? 'public' : 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ChatBot',
      template: './index.html',
      templateParameters: true,
      filename: 'index.html'
    }),
    extractSass,
    new CopyWebpackPlugin([
      {
        from:'src/assets',
        to: 'assets'
      } 
    ]),
  ],
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query: {
          presets: ['es2015'] 
        }
      },
      {
        test: /\.scss$/,
        exclude:'/node_modules',
        use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
 resolve: {
   extensions: ['.js']
 }
}