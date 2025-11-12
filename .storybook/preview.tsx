import type { Preview } from 'storybook'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
import React from 'react'
import '../src/styles/globals.css'

const customViewports = {
  ...MINIMAL_VIEWPORTS,
  iphone14: {
    name: 'iPhone 14',
    styles: {
      width: '390px',
      height: '844px',
    },
    type: 'mobile',
  },
}

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#050505' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    viewport: {
      viewports: customViewports,
    },
  },
  decorators: [
    Story => (
      <div className="min-h-screen bg-[#050505] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <Story />
        </div>
      </div>
    ),
  ],
}

export default preview
