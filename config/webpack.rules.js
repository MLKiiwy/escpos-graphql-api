module.exports = [
  {
    test: /\.js$/,
    exclude: {
      test: /node_modules/,
    },
    loader: 'babel-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'file-loader',
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: {
      test: /node_modules/,
    },
    loader: 'url-loader?name=assets/fonts/[name].[ext]',
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
  },
  {
    test: /\.gif/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&mimetype=image/gif',
  },
  {
    test: /\.jpg/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&mimetype=image/jpg',
  },
  {
    test: /\.png/,
    exclude: {
      test: /node_modules/,
    },
    loader: 'url-loader?limit=10000&mimetype=image/png',
  },
];
