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
  staticDirs: [
    '../public/assets/images/other',
    '../public/assets/images/factions',
    '../public/assets/images/trade-goods',
    '../public/assets/images/ships',
    '../public/assets/svg',
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
    if (config?.module?.rules) {
      // src: https://github.com/storybookjs/storybook/issues/18557#issuecomment-1443742296
      // makes svg import work

      // This modifies the existing image rule to exclude `.svg` files
      // since we handle those with `@svgr/webpack`.
      const imageRule = config.module.rules.find((rule) => {
        // @ts-ignore
        if (typeof rule !== 'string' && rule.test instanceof RegExp) {
          // @ts-ignore
          return rule.test.test('.svg');
        }
      });
      if (typeof imageRule !== 'string') {
        // @ts-ignore
        imageRule.exclude = /\.svg$/;
      }

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      const scssRule = config.module.rules.find((rule) => {
        // @ts-ignore
        if (typeof rule !== 'string' && rule.test instanceof RegExp) {
          // @ts-ignore
          return rule.test.test('.scss');
        }
      });
      if (typeof scssRule !== 'string') {
        // @ts-ignore
        const cssLoader = scssRule.use.find(loader => loader.loader.includes('css-loader'))
        if (cssLoader) {
          cssLoader.options = {
            url: false,
          }
        }
      }
    }

    return config;
  }
};
export default config;
