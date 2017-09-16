const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    'index': './index',
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: ['transform-decorators-legacy'],
          },
        },
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'postcss-loader', // postcss, autoprefixer
        }, {
          loader: 'less-loader', // compiles Less to CSS
        }],
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }],
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=/[name].[ext]',
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, '/build')),
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.html',
    }),
  ],
};
