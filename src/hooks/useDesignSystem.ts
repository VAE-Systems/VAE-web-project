/**
 * Design System Hook
 * React Hook für einfache Integration des Design-Systems
 */

import { useCallback, useEffect, useState } from 'react'
import { designSystemService } from '../services/designSystem.service'
import type { DesignSystemHook, DesignSystemState } from '../types/designSystem'

export const useDesignSystem: DesignSystemHook = () => {
  const [state, setState] = useState<DesignSystemState>(designSystemService.getState())

  useEffect(() => {
    // Subscribe to state changes
    const unsubscribe = designSystemService.subscribe(newState => {
      setState(newState)
    })

    // Initial state update
    setState(designSystemService.getState())

    return unsubscribe
  }, [])

  const actions = {
    updateScaleFactor: useCallback((factor: number) => {
      designSystemService.updateScaleFactor(factor)
    }, []),

    scaleByFactor: useCallback((multiplier: number) => {
      designSystemService.scaleByFactor(multiplier)
    }, []),

    reset: useCallback(() => {
      designSystemService.reset()
    }, []),

    getCurrentScale: useCallback(() => {
      return designSystemService.getCurrentScale()
    }, []),

    generateTypographyScale: useCallback(() => {
      return designSystemService.getState().typographyScale
    }, []),

    generateSpacingScale: useCallback(() => {
      return designSystemService.getState().spacingScale
    }, []),
  }

  return { state, actions }
}

/**
 * Hook für einfache Scale Factor Überwachung
 */
export const useScaleFactor = () => {
  const [scaleFactor, setScaleFactor] = useState(designSystemService.getCurrentScale())

  useEffect(() => {
    const unsubscribe = designSystemService.subscribe(state => {
      setScaleFactor(state.currentScaleFactor)
    })

    return unsubscribe
  }, [])

  return scaleFactor
}

/**
 * Hook für Typografie-Skala
 */
export const useTypographyScale = () => {
  const [typographyScale, setTypographyScale] = useState(designSystemService.getState().typographyScale)

  useEffect(() => {
    const unsubscribe = designSystemService.subscribe(state => {
      setTypographyScale(state.typographyScale)
    })

    return unsubscribe
  }, [])

  return typographyScale
}

/**
 * Hook für Spacing-Skala
 */
export const useSpacingScale = () => {
  const [spacingScale, setSpacingScale] = useState(designSystemService.getState().spacingScale)

  useEffect(() => {
    const unsubscribe = designSystemService.subscribe(state => {
      setSpacingScale(state.spacingScale)
    })

    return unsubscribe
  }, [])

  return spacingScale
}
