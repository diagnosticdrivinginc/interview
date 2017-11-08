var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'dist');
var fav = srcPath + "/assets/images/fav.ico";

var config = {
  entry: ["babel-polyfill" , path.join(srcPath, 'index.js')],
  output: {
      path: buildPath,
      publicPath: "/",
      filename: "mrbundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "interview",
      favicon: fav,
      inject: true,
      template: 'ejs-loader!' + srcPath + "/index.ejs"
    })
  ],
  module: {
      loaders: [
          //TODO: Use the ExtractTextPlugin to create real
          // CSS files -- this method injects css via JS
          // Not great for caching
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015']
            }
          },
          {
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: [path.join(srcPath, 'assets')]
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url?limit=40000',
            include: [path.join(srcPath, 'assets')]
          }
      ]
  }
};

module.exports = config;
