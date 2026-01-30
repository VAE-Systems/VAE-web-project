#!/usr/bin/env node

/**
 * Build Script for VAE Systems Website
 * Generates manifest.json and validates configuration
 */

import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

// Direct manifest configuration (instead of importing from TypeScript)
const manifestConfig = {
  app: {
    name: 'VAE Systems - DSGVO-konforme KI-Automatisierung',
    shortName: 'VAE Systems',
    description:
      'DSGVO-konforme KI-Automatisierung und Workflow-Engines für deutsche Unternehmen. Open Source, lokal gehostet, ohne Vendor Lock-in.',
    lang: 'de',
    startUrl: '/',
    scope: '/',
  },

  display: {
    mode: 'standalone',
    orientation: 'portrait-primary',
    backgroundColor: '#0a0a0a',
    themeColor: '#00ffa5',
  },

  categories: ['business', 'productivity', 'utilities', 'developer'],

  shortcuts: [
    {
      name: 'Services',
      shortName: 'Services',
      description: 'KI-Services & Consulting entdecken',
      url: '/services',
    },
    {
      name: 'VAE CORE',
      shortName: 'VAE CORE',
      description: 'Enterprise KI-Plattform',
      url: '/products/vae-core',
    },
    {
      name: 'Re: Suite',
      shortName: 'Re: Suite',
      description: 'Modulare KI-Bausteine (Re:spond, Re:search, Re:port)',
      url: '/products/solutions',
    },
    {
      name: 'Strategie-Call',
      shortName: 'Kontakt',
      description: '30-Min Strategie-Gespräch buchen',
      url: '/contact',
    },
  ],

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

  screenshots: [
    {
      src: '/screenshots/desktop-hero.png',
      sizes: '1280x720',
      type: 'image/png',
      platform: 'wide',
      label: 'VAE Systems - KI-Automatisierung für deutsche Unternehmen',
    },
    {
      src: '/screenshots/mobile-services.png',
      sizes: '390x844',
      type: 'image/png',
      platform: 'narrow',
      label: 'Services: Consulting, Training, Custom Solutions',
    },
    {
      src: '/screenshots/vae-core-dashboard.png',
      sizes: '1280x720',
      type: 'image/png',
      platform: 'wide',
      label: 'VAE CORE Enterprise KI-Plattform Dashboard',
    },
  ],
}

function generateManifest() {
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

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'manifest.json')

async function fileExists(absolutePath) {
  try {
    await fs.access(absolutePath)
    return true
  } catch {
    return false
  }
}

async function ensurePwaScreenshots() {
  const sourceOgImage = path.join(PUBLIC_DIR, 'og', 'vae-og.png')

  if (!(await fileExists(sourceOgImage))) {
    console.log('⚠️  Could not generate screenshots: public/og/vae-og.png not found')
    return
  }

  const targets = [
    {
      src: '/screenshots/desktop-hero.png',
      width: 1280,
      height: 720,
    },
    {
      src: '/screenshots/mobile-services.png',
      width: 390,
      height: 844,
    },
    {
      src: '/screenshots/vae-core-dashboard.png',
      width: 1280,
      height: 720,
    },
  ]

  for (const target of targets) {
    const absoluteTargetPath = path.join(PUBLIC_DIR, target.src)
    if (await fileExists(absoluteTargetPath)) continue

    await fs.mkdir(path.dirname(absoluteTargetPath), { recursive: true })
    await sharp(sourceOgImage)
      .resize(target.width, target.height, {
        fit: 'cover',
        position: 'centre',
        background: '#0a0a0a',
      })
      .png({ compressionLevel: 9 })
      .toFile(absoluteTargetPath)

    console.log(`🖼️  Generated ${target.src} (${target.width}x${target.height}) from og/vae-og.png`)
  }
}

async function buildManifest() {
  try {
    console.log('🔧 Generating manifest.json...')

    const manifest = generateManifest()

    // Validate required fields
    const requiredFields = ['name', 'short_name', 'start_url', 'display', 'theme_color']
    const missing = requiredFields.filter(field => !manifest[field])

    if (missing.length > 0) {
      throw new Error(`Missing required manifest fields: ${missing.join(', ')}`)
    }

    // Write manifest
    await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8')

    console.log('✅ Generated manifest.json successfully')

    // Log shortcuts for verification
    console.log('\n📱 PWA Shortcuts:')
    manifest.shortcuts?.forEach((shortcut, i) => {
      console.log(`  ${i + 1}. ${shortcut.name} → ${shortcut.url}`)
    })
  } catch (error) {
    console.error('❌ Failed to generate manifest:', error.message)
    process.exit(1)
  }
}

async function validateScreenshots() {
  try {
    console.log('\n📸 Validating screenshots...')

    // Best-effort: auto-generate placeholders so the PWA manifest stays consistent
    await ensurePwaScreenshots()

    const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf8'))
    const screenshots = manifest.screenshots || []

    for (const screenshot of screenshots) {
      const screenshotPath = path.join(PUBLIC_DIR, screenshot.src)
      try {
        await fs.access(screenshotPath)
        console.log(`✅ ${screenshot.src} exists`)
      } catch {
        console.log(`⚠️  ${screenshot.src} missing - consider adding for better PWA experience`)
      }
    }
  } catch (error) {
    console.log('⚠️  Could not validate screenshots:', error.message)
  }
}

async function generateSitemap() {
  console.log('\n🗺️  Sitemap is manually maintained in public/sitemap.xml')
  console.log('   Consider using a sitemap generator for automatic updates')
}

// Main build process
async function build() {
  console.log('🚀 Building VAE Systems Website Assets\n')

  await buildManifest()
  await validateScreenshots()
  await generateSitemap()

  console.log('\n✨ Build completed successfully!')
  console.log('\nNext steps:')
  console.log('  - Run: npm run dev (to test)')
  console.log('  - Run: npm run analyze (to check bundle size)')
  console.log('  - Run: npm run format (to format code)')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  build().catch(console.error)
}
