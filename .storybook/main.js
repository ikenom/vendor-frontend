const webpack = require('webpack');

module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-knobs',
  ],
  webpackFinal: async (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      })
    );

    // Return the altered config
    return config;
  },
};
