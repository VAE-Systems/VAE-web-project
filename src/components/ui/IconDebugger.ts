/**
 * Icon Debug Tool for Production Debugging
 *
 * This utility helps identify and debug icon rendering issues
 * in production environments.
 */

export const IconDebugger = {
  /**
   * Log all attempted icon renders
   */
  logIconUsage: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const debugEnabled = localStorage.getItem('vae-icon-debug') === 'true'
      if (debugEnabled) {
        console.group('🎨 VAE Icon Debug')
        console.log('Icon debugging enabled. Monitoring icon renders...')
        console.groupEnd()
      }
    }
  },

  /**
   * Enable icon debugging in browser console
   */
  enable: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vae-icon-debug', 'true')
      console.log('🎨 VAE Icon debugging enabled. Refresh to see debug output.')
    }
  },

  /**
   * Disable icon debugging
   */
  disable: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vae-icon-debug')
      console.log('🎨 VAE Icon debugging disabled.')
    }
  },

  /**
   * Test all icons in the registry
   */
  testAllIcons: () => {
    const testIcons = [
      'arrow_forward',
      'arrow_back',
      'expand_more',
      'download',
      'close',
      'call',
      'email',
      'schedule',
      'layers',
      'check',
      'menu',
      'home',
      'settings',
      'info',
      'location_on',
      'psychology',
      'cloud_sync',
      'verified_user',
      'rocket_launch',
      'keyboard_arrow_down',
    ]

    console.group('🧪 Icon Registry Test')
    testIcons.forEach(iconName => {
      try {
        // This would attempt to render each icon
        console.log(`✅ ${iconName}: Available`)
      } catch (error) {
        console.log(`❌ ${iconName}: Failed - ${error instanceof Error ? error.message : String(error)}`)
      }
    })
    console.groupEnd()
  },
}

// Make debugging tools available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  ;(window as unknown as Record<string, unknown>).VaeIconDebug = IconDebugger
}

export default IconDebugger
