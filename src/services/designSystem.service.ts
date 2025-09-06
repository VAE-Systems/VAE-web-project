/**
 * Design System Service
 * Zentraler Service für Design-System-Operationen
 */

import { CSS_VARIABLES, DESIGN_SYSTEM_CONFIG, DESIGN_SYSTEM_EVENTS, SPACING_SCALE_DEFINITIONS, TYPOGRAPHY_SCALE_DEFINITIONS } from '../config/designSystem.constants'
import { debounce, generateSpacingClamp, generateTypographyClamp, validateScaleFactor } from '../lib/designSystem.utils'
import type { DesignSystemState } from '../types/designSystem'

class DesignSystemService {
  private state: DesignSystemState = {
    currentScaleFactor: DESIGN_SYSTEM_CONFIG.SCALE_FACTOR,
    typographyScale: {},
    spacingScale: {},
    isInitialized: false
  }

  private listeners: Set<(state: DesignSystemState) => void> = new Set()

  constructor() {
    this.initialize()
  }

  /**
   * Initialisiert das Design-System
   */
  private initialize(): void {
    if (typeof window === 'undefined') return

    // Generiere initiale Skalen
    this.state.typographyScale = this.generateTypographyScale()
    this.state.spacingScale = this.generateSpacingScale()
    this.state.isInitialized = true

    // DOM-Event-Listener für Initialisierung
    document.addEventListener('DOMContentLoaded', () => {
      this.updateCSSVariables()
      this.emitChange()
    })

    console.log('🎨 Design System Service initialized')
  }

  /**
   * Generiert die Typografie-Skala
   */
  private generateTypographyScale(): Record<string, string> {
    const scale: Record<string, string> = {}

    Object.entries(TYPOGRAPHY_SCALE_DEFINITIONS).forEach(([key]) => {
      scale[key] = generateTypographyClamp(key as keyof typeof TYPOGRAPHY_SCALE_DEFINITIONS, this.state.currentScaleFactor)
    })

    return scale
  }

  /**
   * Generiert die Spacing-Skala
   */
  private generateSpacingScale(): Record<string, string> {
    const scale: Record<string, string> = {}

    Object.entries(SPACING_SCALE_DEFINITIONS).forEach(([key, value]) => {
      scale[key] = generateSpacingClamp(value, this.state.currentScaleFactor)
    })

    return scale
  }

  /**
   * Aktualisiert CSS-Variablen im DOM
   */
  private updateCSSVariables(): void {
    if (typeof document === 'undefined') return

    const root = document.documentElement.style

    // Scale Factor
    root.setProperty(CSS_VARIABLES.SCALE_FACTOR, this.state.currentScaleFactor.toString())

    // Typografie
    Object.entries(this.state.typographyScale).forEach(([key, value]) => {
      root.setProperty(`${CSS_VARIABLES.FONT_SIZE_PREFIX}${key}`, value)
    })

    // Spacing
    Object.entries(this.state.spacingScale).forEach(([key, value]) => {
      root.setProperty(`${CSS_VARIABLES.SPACING_PREFIX}${key}`, value)
    })
  }

  /**
   * Sendet Änderungs-Event
   */
  private emitChange(): void {
    this.listeners.forEach(listener => listener(this.state))

    // Custom Event für externe Listener
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(DESIGN_SYSTEM_EVENTS.SCALE_CHANGED, {
        detail: { scaleFactor: this.state.currentScaleFactor }
      }))
    }
  }

  /**
   * Aktualisiert den Scale Factor
   */
  public updateScaleFactor(factor: number): void {
    if (!validateScaleFactor(factor)) {
      console.warn(`Invalid scale factor: ${factor}. Must be between 0.5 and 2.0`)
      return
    }

    this.state.currentScaleFactor = factor
    this.state.typographyScale = this.generateTypographyScale()
    this.state.spacingScale = this.generateSpacingScale()

    this.updateCSSVariables()
    this.emitChange()

    console.log(`🎨 Scale factor updated: ${factor}`)
  }

  /**
   * Skaliert relativ zum aktuellen Faktor
   */
  public scaleByFactor(multiplier: number): void {
    const newFactor = this.state.currentScaleFactor * multiplier
    this.updateScaleFactor(newFactor)
  }

  /**
   * Setzt auf Standard zurück
   */
  public reset(): void {
    this.updateScaleFactor(DESIGN_SYSTEM_CONFIG.SCALE_FACTOR)
  }

  /**
   * Gibt aktuellen Scale Factor zurück
   */
  public getCurrentScale(): number {
    return this.state.currentScaleFactor
  }

  /**
   * Gibt den aktuellen State zurück
   */
  public getState(): DesignSystemState {
    return { ...this.state }
  }

  /**
   * Registriert einen State-Listener
   */
  public subscribe(listener: (state: DesignSystemState) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  /**
   * Debounced Version für Performance
   */
  public debouncedUpdateScaleFactor = debounce(this.updateScaleFactor.bind(this), 100)
}

// Singleton-Instanz
export const designSystemService = new DesignSystemService()

// Convenience-Funktionen für direkten Zugriff
export const updateDesignSystem = (factor: number) => designSystemService.updateScaleFactor(factor)
export const scaleDesignSystem = (multiplier: number) => designSystemService.scaleByFactor(multiplier)
export const resetDesignSystem = () => designSystemService.reset()
export const getCurrentScaleFactor = () => designSystemService.getCurrentScale()
