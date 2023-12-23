import type { StorybookConfig } from '@storybook/react-webpack5';
import * as path from 'path';

const aliases = {
  'commonStyles': path.resolve(__dirname, '../', 'src', 'commonStyles'),
  '@types': path.resolve(__dirname, '../', 'src', 'types'),
  '@constants': path.resolve(__dirname, '../', 'src', 'constants'),
  '@shared': path.resolve(__dirname, '../', 'src', 'shared'),
  '@services': path.resolve(__dirname, '../', 'src', 'services'),
  '@features': path.resolve(__dirname, '../', 'src', 'features'),
  '@utils': path.resolve(__dirname, '../', 'src', 'utils'),
  '@zustand': path.resolve(__dirname, '../', 'src', 'zustand'),
  '@svgs': path.resolve(__dirname, '../', 'public', 'assets', 'svg'),
};

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-styling-webpack',
    '@storybook/preset-scss'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...aliases,
      };
    }

    return config;
  }
};
export default config;
