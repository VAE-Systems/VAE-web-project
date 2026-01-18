// PWA Manifest Configuration for VAE Systems
// This file generates the manifest.json based on actual routes and content

export const manifestConfig = {
  // Basic App Info
  app: {
    name: 'VAE Systems - DSGVO-konforme KI-Automatisierung',
    shortName: 'VAE Systems',
    description:
      'DSGVO-konforme KI-Automatisierung und Workflow-Engines für deutsche Unternehmen. Self-Hosted, Open Source als Werkzeug, ohne Vendor Lock-in.',
    lang: 'de',
    startUrl: '/',
    scope: '/',
  },

  // Visual Appearance
  display: {
    mode: 'standalone',
    orientation: 'portrait-primary',
    backgroundColor: '#0a0a0a', // --bg-darker
    themeColor: '#00ffa5', // --vae-turquoise
  },

  // App Categories for App Stores
  categories: ['business', 'productivity', 'utilities', 'developer'],

  // Main shortcuts based on actual important routes
  shortcuts: [
    {
      name: 'Services',
      shortName: 'Services',
      description: 'Consulting-Portfolio entdecken',
      url: '/services',
    },
    {
      name: 'Lösungen',
      shortName: 'Lösungen',
      description: 'Self-Hosted Infrastruktur & Open Source AI Automation',
      url: '/solutions',
    },
    {
      name: 'Über uns',
      shortName: 'Über uns',
      description: 'Team & Arbeitsweise kennenlernen',
      url: '/about',
    },
    {
      name: 'Kontakt',
      shortName: 'Kontakt',
      description: '30-Min Strategie-Gespräch vereinbaren',
      url: '/contact',
    },
  ],

  // Icons - using consistent naming
  icons: [
    {
      src: '/App_Logo_light.svg',
      sizes: 'any',
      type: 'image/svg+xml',
      purpose: 'any maskable',
    },
    {
      src: '/App_Logo_light.svg',
      sizes: '192x192',
      type: 'image/svg+xml',
      purpose: 'any maskable',
    },
    {
      src: '/App_Logo_light.svg',
      sizes: '512x512',
      type: 'image/svg+xml',
      purpose: 'any maskable',
    },
  ],

  // Screenshots for richer install experience
  screenshots: [
    {
      src: '/screenshots/desktop-hero.png',
      sizes: '1280x720', // 16:9 aspect ratio for wide displays
      type: 'image/png',
      platform: 'wide',
      label: 'VAE Systems - KI-Automatisierung für deutsche Unternehmen',
    },
    {
      src: '/screenshots/mobile-services.png',
      sizes: '390x844', // iPhone 12/13/14 dimensions
      type: 'image/png',
      platform: 'narrow',
      label: 'Services-Übersicht: Beratung, Infrastruktur, Automation',
    },
    {
      src: '/screenshots/vae-core-overview.png',
      sizes: '1280x720',
      type: 'image/png',
      platform: 'wide',
      label: 'Self-Hosted Infrastruktur & Open Source AI Automation Cockpit',
    },
  ],
}

// Generate the actual manifest.json
export function generateManifest() {
  return {
    name: manifestConfig.app.name,
    short_name: manifestConfig.app.shortName,
    description: manifestConfig.app.description,
    start_url: manifestConfig.app.startUrl,
    display: manifestConfig.display.mode,
    background_color: manifestConfig.display.backgroundColor,
    theme_color: manifestConfig.display.themeColor,
    orientation: manifestConfig.display.orientation,
    scope: manifestConfig.app.scope,
    lang: manifestConfig.app.lang,
    categories: manifestConfig.categories,
    shortcuts: manifestConfig.shortcuts.map(shortcut => ({
      name: shortcut.name,
      short_name: shortcut.shortName,
      description: shortcut.description,
      url: shortcut.url,
      icons: [
        {
          src: '/App_Logo_light.svg',
          sizes: '96x96',
          type: 'image/svg+xml',
        },
      ],
    })),
    icons: manifestConfig.icons,
    screenshots: manifestConfig.screenshots,
  }
}
