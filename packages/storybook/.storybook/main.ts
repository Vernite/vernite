import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../../ui/src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: [],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-interactions',
  ],
  docs: {
    autodocs: true,
  },
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  babel: async (options) => ({
    // Update your babel configuration here
    ...options,
  }),

  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    // Return the altered config
    return config;
  },
};

export default config;
