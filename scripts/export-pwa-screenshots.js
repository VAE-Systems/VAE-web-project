import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🖼️  VAE PWA Screenshot Export\n')

const SCREENSHOTS_DIR = path.join(__dirname, 'pwa-screenshots')
const OUTPUT_DIR = path.join(__dirname, '../public/screenshots')

const SCREENS = [
  {
    name: 'desktop-hero',
    file: 'desktop-hero.html',
    width: 1280,
    height: 720,
  },
  {
    name: 'mobile-services',
    file: 'mobile-services.html',
    width: 390,
    height: 844,
  },
  {
    name: 'vae-core-dashboard',
    file: 'vae-core-dashboard.html',
    width: 1280,
    height: 720,
  },
]

;(async () => {
  // Ensure output dir exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const browser = await chromium.launch()

  for (const screen of SCREENS) {
    const htmlPath = path.join(SCREENSHOTS_DIR, screen.file)

    if (!fs.existsSync(htmlPath)) {
      console.log(`⚠️  Template not found: ${screen.file}`)
      continue
    }

    console.log(`📸 Rendering ${screen.name} (${screen.width}×${screen.height})...`)

    const page = await browser.newPage()
    await page.setViewportSize({ width: screen.width, height: screen.height })

    const url = `file://${htmlPath}`
    await page.goto(url, { waitUntil: 'networkidle' })

    // Find the .screenshot element or fallback to full page
    const screenshotEl = await page.$('.screenshot')
    const outputPath = path.join(OUTPUT_DIR, `${screen.name}.png`)

    if (screenshotEl) {
      await screenshotEl.screenshot({
        path: outputPath,
        type: 'png',
      })
    } else {
      await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: { x: 0, y: 0, width: screen.width, height: screen.height },
      })
    }

    console.log(`   ✅ Saved ${screen.name}.png`)
    await page.close()
  }

  await browser.close()
  console.log(`\n🎉 All PWA screenshots exported to public/screenshots/`)
})()
