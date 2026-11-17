import type { StorybookConfig } from '@storybook/react-vite';

const prodBase = process.env.STORYBOOK_BASE || '/';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (viteConfig, { configType }) => {
    viteConfig.base = configType === 'PRODUCTION' ? prodBase : '/';
    return viteConfig;
  },
};

export default config;
