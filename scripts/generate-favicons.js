import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const publicDir = join(__dirname, '..', 'public')

// VAE Logo SVG als Basis
const svgPath = join(publicDir, 'App_Logo_light.svg')
const svgBuffer = readFileSync(svgPath)

// Favicon-Größen generieren
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
]

console.log('🎨 Generiere Favicons aus VAE Logo...\n')

async function generateFavicons() {
  for (const { size, name } of sizes) {
    try {
      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparenter Hintergrund
        })
        .png()
        .toFile(join(publicDir, name))

      console.log(`✓ ${name} (${size}×${size})`)
    } catch (error) {
      console.error(`✗ Fehler bei ${name}:`, error.message)
    }
  }

  // ICO-Format: Kombiniere 16x16 und 32x32 in eine .ico-Datei
  // Sharp kann kein ICO nativ erstellen, also nehmen wir 32x32 als favicon.ico
  try {
    await sharp(svgBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(join(publicDir, 'favicon.ico'))

    console.log(`✓ favicon.ico (32×32 als PNG)`)
  } catch (error) {
    console.error(`✗ Fehler bei favicon.ico:`, error.message)
  }

  console.log('\n✅ Alle Favicons generiert!\n')
  console.log('📋 Nächste Schritte:')
  console.log('   1. index.html mit korrekten Favicon-Links updaten')
  console.log('   2. manifest.json mit PNG-Icons statt SVG updaten')
}

generateFavicons()
