#!/usr/bin/env node

/**
 * Bildoptimierungs-Script für VAE Web Project
 *
 * Optimiert alle Bilder im /public/images/raw/ Ordner und speichert sie in /public/images/optimized/
 * - Konvertiert zu WebP für moderne Browser
 * - Erstellt auch JPEG/PNG Fallbacks
 * - Reduziert Dateigröße um 70-90%
 * - Behält Qualität bei
 */

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const INPUT_DIR = path.join(__dirname, '../public/images/raw')
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized')

// Erstelle Output-Ordner falls nicht vorhanden
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Optimierungs-Einstellungen
const QUALITY = {
  webp: 85, // WebP Qualität (modernes Format, beste Kompression)
  jpeg: 85, // JPEG Qualität (Fallback)
  png: 90, // PNG Qualität (für Transparenz)
}

const MAX_WIDTH = 1920 // Maximale Breite (Full HD)
const MAX_HEIGHT = 1080 // Maximale Höhe

/**
 * Optimiert ein einzelnes Bild
 */
async function optimizeImage(filename) {
  const inputPath = path.join(INPUT_DIR, filename)
  const ext = path.extname(filename).toLowerCase()
  const basename = path.basename(filename, ext)

  console.log(`📸 Optimiere: ${filename}`)

  try {
    const image = sharp(inputPath)
    const metadata = await image.metadata()

    console.log(`   Original: ${(fs.statSync(inputPath).size / 1024 / 1024).toFixed(2)} MB`)
    console.log(`   Dimensionen: ${metadata.width}x${metadata.height}`)

    // Resize wenn zu groß
    let pipeline = image.clone()
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      console.log(`   ↓ Resize auf max ${MAX_WIDTH}x${MAX_HEIGHT}`)
    }

    // 1. WebP (beste Kompression, modernes Format)
    const webpPath = path.join(OUTPUT_DIR, `${basename}.webp`)
    await pipeline.clone().webp({ quality: QUALITY.webp, effort: 6 }).toFile(webpPath)
    const webpSize = fs.statSync(webpPath).size / 1024 / 1024
    console.log(`   ✓ WebP: ${webpSize.toFixed(2)} MB`)

    // 2. JPEG/PNG Fallback
    if (metadata.hasAlpha || ext === '.png') {
      // PNG mit Transparenz
      const pngPath = path.join(OUTPUT_DIR, `${basename}.png`)
      await pipeline.clone().png({ quality: QUALITY.png, compressionLevel: 9 }).toFile(pngPath)
      const pngSize = fs.statSync(pngPath).size / 1024 / 1024
      console.log(`   ✓ PNG: ${pngSize.toFixed(2)} MB`)
    } else {
      // JPEG ohne Transparenz
      const jpegPath = path.join(OUTPUT_DIR, `${basename}.jpg`)
      await pipeline.clone().jpeg({ quality: QUALITY.jpeg, progressive: true }).toFile(jpegPath)
      const jpegSize = fs.statSync(jpegPath).size / 1024 / 1024
      console.log(`   ✓ JPEG: ${jpegSize.toFixed(2)} MB`)
    }

    console.log(`   ✅ Fertig!\n`)
  } catch (error) {
    console.error(`   ❌ Fehler: ${error.message}\n`)
  }
}

/**
 * Hauptfunktion
 */
async function main() {
  console.log('🚀 VAE Bildoptimierung\n')
  console.log(`Input:  ${INPUT_DIR}`)
  console.log(`Output: ${OUTPUT_DIR}\n`)

  const files = fs.readdirSync(INPUT_DIR)
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png'].includes(ext)
  })

  if (imageFiles.length === 0) {
    console.log('❌ Keine Bilder gefunden!')
    return
  }

  console.log(`📦 Gefunden: ${imageFiles.length} Bilder\n`)
  console.log('━'.repeat(60))

  // Verarbeite alle Bilder sequenziell
  for (const file of imageFiles) {
    await optimizeImage(file)
  }

  console.log('━'.repeat(60))
  console.log('\n✨ Alle Bilder optimiert!')
  console.log(`\n💡 Verwende die Bilder aus: public/images/optimized/`)
  console.log(`   Nutze WebP mit JPEG/PNG Fallback für beste Performance\n`)
}

// Script ausführen
main().catch(console.error)
