// import * as path from 'path';
const InjectPlugin = require('webpack-inject-plugin').default;
const ThemeSwitcherPlugin = require('./theme-switcher-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-toolbars', // To remove
    '@storybook/addon-a11y',
    'storybook-dark-mode',
    'storybook-tailwind-dark-mode', // To remove (find replacement for theming switching)
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          include: [path.resolve(__dirname, '../src')],
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
  ],
  framework: '@storybook/angular',
  core: {
    'builder': '@storybook/builder-webpack5'
  },
  webpackFinal: async (config, { configType }) => {

    const entry = Array.isArray(config.entry) ? config.entry : (config.entry ? [config.entry] : []);

    config.entry = [
      ...entry,
    ];

    config.plugins = [
      ...(config.plugins || []),
      // new InjectPlugin(() => console.log(document))
      // new HtmlWebpackPlugin
    ];
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    // config.module.rules.push({
    //   test: /styles\.scss$/,
    //   use: ['style-loader', 'css-loader', 'sass-loader'],
    //   include: path.resolve(__dirname, '../src/styles/'),
    // });

    // Return the altered config
    return config;
  },
}
