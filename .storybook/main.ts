import type { StorybookConfig } from 'storybook'
import { fileURLToPath, URL } from 'node:url'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  viteFinal: async viteConfig => {
    viteConfig.resolve = viteConfig.resolve ?? {}
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias ?? {}),
      '@': fileURLToPath(new URL('../src', import.meta.url)),
      '@components': fileURLToPath(new URL('../src/components', import.meta.url)),
      '@styles': fileURLToPath(new URL('../src/styles', import.meta.url)),
      '@assets': fileURLToPath(new URL('../src/assets', import.meta.url)),
      '@types': fileURLToPath(new URL('../src/types', import.meta.url)),
      '@design-system': fileURLToPath(new URL('../src/design-system', import.meta.url)),
    }
    return viteConfig
  },
}

export default config
