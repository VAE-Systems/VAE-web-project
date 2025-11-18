/**
 * Icon Test Suite für Production-Environment
 *
 * Diese Utility testet die Icon-Konsistenz zwischen Development und Production
 * und hilft bei der Diagnose von Icon-Rendering-Problemen.
 */

interface IconTestResult {
  name: string
  found: boolean
  fallback: boolean
  environment: 'development' | 'production'
}

/**
 * Testet eine Liste von Icon-Namen gegen das Icon-System
 */
export function testIconAvailability(iconNames: string[]): IconTestResult[] {
  const results: IconTestResult[] = []

  iconNames.forEach(name => {
    try {
      // Simuliere Icon-Auflösung
      const result: IconTestResult = {
        name,
        found: false,
        fallback: false,
        environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
      }

      // Test verschiedene Icon-Formate
      const variations = [
        name,
        name.toLowerCase(),
        name.charAt(0).toUpperCase() + name.slice(1),
        name.replace(/_/g, ''),
        name.replace(/-/g, ''),
      ]

      // Prüfe ob Icon verfügbar ist (würde normalerweise gegen MAP prüfen)
      result.found = variations.some(_variation => {
        // Hier würde man gegen das tatsächliche MAP-Object prüfen
        return false // Placeholder
      })

      result.fallback = !result.found
      results.push(result)
    } catch (error) {
      console.error(`Error testing icon ${name}:`, error)
    }
  })

  return results
}

/**
 * Häufig verwendete Icons im Projekt (für Tests)
 */
export const COMMON_ICONS = [
  'menu',
  'close',
  'arrow-right',
  'check',
  'warning',
  'info',
  'settings',
  'user',
  'mail',
  'phone',
  'home',
  'search',
  'filter',
  'edit',
  'delete',
  'save',
  'export',
  'import',
  'download',
  'upload',
]

/**
 * Console-Helper für Icon-Debugging in Production
 */
export function debugIconsInConsole(): void {
  if (typeof window !== 'undefined') {
    const testResults = testIconAvailability(COMMON_ICONS)

    console.group('🔍 VAE Icon System Debug')
    console.table(testResults)

    const missingIcons = testResults.filter(r => r.fallback)
    if (missingIcons.length > 0) {
      console.warn(
        '❌ Missing Icons:',
        missingIcons.map(r => r.name)
      )
    } else {
      console.log('✅ All tested icons available')
    }

    console.groupEnd()
  }
}

/**
 * Führt Icon-Test zur Runtime aus (nur in Development)
 */
if (process.env.NODE_ENV === 'development') {
  // Auto-Test beim Modul-Load
  setTimeout(debugIconsInConsole, 1000)
}
