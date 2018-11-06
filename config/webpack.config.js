const webpack = require('webpack');
const path = require('path');
const rules = require('./webpack.rules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8888';

// In development we want hot module reloading of styles, so need a different config for them
rules.push(
  {
    test: /\.(css|scss)$/,
    exclude: {
      test: /node_modules/,
    },
    use: [
      'style-loader?sourceMap',
      {
        loader: 'css-loader',
        options: { minimize: true },
      },
      {
        loader: 'postcss-loader',
        options: { plugins: () => [autoprefixer()] }, // Uses the .browserslistrc automatically
      },
      'sass-loader',
    ],
  },
  {
    test: /\.ico/,
    exclude: /node_modules/,
    loader: 'file-loader?name=[name].[ext]',
  }
);

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://' + HOST + ':' + PORT,
    'webpack/hot/only-dev-server',
    './src/app.js', // App entry point
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
  module: {
    rules: rules,
  },
  node: {
    fs: 'empty',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    // Do not print bundle build stats to console
    clientLogLevel: 'none',
    // Gzip assets
    compress: true,
    // Enable hot module reloading
    hot: true,
    // Embed the webpack-dev-server runtime into the bundle
    inline: true,
    // Serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST,
    open: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // Copies the index.html to the built files and inserts the js
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
