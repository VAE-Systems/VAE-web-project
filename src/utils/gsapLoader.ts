/**
 * GSAP Lazy Loading Utility
 *
 * Lädt GSAP + ScrollTrigger nur bei Bedarf, um Initial Bundle Size zu reduzieren
 * Verwende diese Utility statt direktem gsap import für bessere Performance
 *
 * @example
 * ```tsx
 * import { loadGsap } from '@/utils/gsapLoader'
 *
 * useEffect(() => {
 *   loadGsap().then(({ gsap, ScrollTrigger }) => {
 *     gsap.to('.element', { opacity: 1 })
 *   })
 * }, [])
 * ```
 */

let gsapInstance: typeof import('gsap') | null = null
let ScrollTriggerInstance: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null

export interface GsapModules {
  gsap: typeof import('gsap')
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
}

/**
 * Lazy-load GSAP + ScrollTrigger Plugin
 * Caches instance for subsequent calls
 */
export async function loadGsap(): Promise<GsapModules> {
  // Return cached instance if already loaded
  if (gsapInstance && ScrollTriggerInstance) {
    return {
      gsap: gsapInstance,
      ScrollTrigger: ScrollTriggerInstance,
    }
  }

  // Dynamic import - code splitting
  const [gsapModule, scrollTriggerModule] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])

  // Register plugin
  gsapModule.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger)

  // Cache for future use
  gsapInstance = gsapModule
  ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger

  return {
    gsap: gsapInstance,
    ScrollTrigger: ScrollTriggerInstance,
  }
}

/**
 * Check if GSAP is already loaded (useful for conditional logic)
 */
export function isGsapLoaded(): boolean {
  return gsapInstance !== null && ScrollTriggerInstance !== null
}

/**
 * Cleanup utility (useful in tests or hot module reload)
 */
export function resetGsapCache(): void {
  gsapInstance = null
  ScrollTriggerInstance = null
}
