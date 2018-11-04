const webpack = require('webpack');
const rules = require('./webpack.rules');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

rules.push({
  test: /\.(css|scss)$/,
  exclude: {
    test: /node_modules/,
  },
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { minimize: true },
    },
    {
      loader: 'postcss-loader',
      options: { plugins: () => [autoprefixer()] }, // Uses the .browserslistrc automatically.
    },
    'sass-loader',
  ],
});

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: { app: './src/index.js' },
  output: {
    filename: '[name].[contenthash:8].js',
  },
  module: {
    rules: rules,
  },
  node: {
    fs: 'empty',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    // Pulls all imported css into a separate css file.
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
};
