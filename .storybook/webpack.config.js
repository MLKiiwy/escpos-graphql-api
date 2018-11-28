// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

const autoprefixer = require('autoprefixer');

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.
  defaultConfig.module.rules.push({
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
  });
  return defaultConfig;
};
