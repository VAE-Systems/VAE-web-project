/**
 * Validierung für Typografie-Konfiguration
 * Stellt sicher, dass die modularen Skalen korrekt funktionieren
 */

import { TYPOGRAPHY_CONFIG, generateClamp } from '../typography'

// Einfache Validierungsfunktionen (ohne externe Test-Frameworks)
export const validateTypographyConfig = () => {
  console.log('Validating Typography Configuration...')

  // Prüfe scale ratio
  if (TYPOGRAPHY_CONFIG.scaleRatio !== 1.25) {
    console.warn('Scale ratio should be 1.25 for Major Third')
  }

  // Prüfe clamp function generation
  const testClamp = generateClamp(16, 18, 16)
  if (!testClamp.includes('clamp') || !testClamp.includes('rem')) {
    console.error('Clamp function generation failed')
  }

  // Prüfe scale progression
  const sizes = Object.keys(TYPOGRAPHY_CONFIG.scale)
  for (let i = 1; i < sizes.length; i++) {
    const prev = TYPOGRAPHY_CONFIG.scale[sizes[i - 1] as keyof typeof TYPOGRAPHY_CONFIG.scale]
    const curr = TYPOGRAPHY_CONFIG.scale[sizes[i] as keyof typeof TYPOGRAPHY_CONFIG.scale]
    if (curr.min <= prev.min || curr.max <= prev.max) {
      console.warn(`Scale progression issue between ${sizes[i - 1]} and ${sizes[i]}`)
    }
  }

  console.log('Typography validation complete')
}

// Auto-validate beim Import (nur in Entwicklung)
if (process.env.NODE_ENV === 'development') {
  validateTypographyConfig()
}
