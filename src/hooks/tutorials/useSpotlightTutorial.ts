import { useCallback, useEffect, useState } from 'react'

export interface SpotlightTutorialStepConfig<Step extends number = number> {
  step: Step
  title: string
  actionHint: string
  description: string
  highlightTarget: string
  position: 'left' | 'right' | 'center'
}

export interface SpotlightTutorialController<Step extends number = number> {
  isActive: boolean
  currentStep: Step
  totalSteps: number
  hasCompleted: boolean
  hasSkipped: boolean
  startTutorial: () => void
  nextStep: () => void
  previousStep: () => void
  skipTutorial: () => void
  completeTutorial: () => void
  resetTutorial: () => void
  getCurrentStepConfig: () => SpotlightTutorialStepConfig<Step> | undefined
}

interface SpotlightTutorialOptions<Step extends number> {
  steps: SpotlightTutorialStepConfig<Step>[]
  storageKey: string
  skipStorageKey?: string
}

export function useSpotlightTutorial<Step extends number>({
  steps,
  storageKey,
  skipStorageKey = `${storageKey}-skipped`,
}: SpotlightTutorialOptions<Step>): SpotlightTutorialController<Step> {
  const firstStep = steps[0]?.step ?? (1 as Step)
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>(firstStep)
  const [hasCompleted, setHasCompleted] = useState(false)
  const [hasSkipped, setHasSkipped] = useState(false)

  const totalSteps = steps.length

  // Hydrate completion status from storage once the hook runs in the browser.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const completed = localStorage.getItem(storageKey) === 'true'
    const skipped = localStorage.getItem(skipStorageKey) === 'true'
    setHasCompleted(completed)
    setHasSkipped(skipped)
  }, [storageKey, skipStorageKey])

  const persistFlag = useCallback((key: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, 'true')
  }, [])

  const clearFlag = useCallback((key: string) => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }, [])

  const startTutorial = useCallback(() => {
    if (!totalSteps) return
    setIsActive(true)
    setCurrentStep(firstStep)
  }, [firstStep, totalSteps])

  const completeTutorial = useCallback(() => {
    setIsActive(false)
    setHasCompleted(true)
    persistFlag(storageKey)
  }, [persistFlag, storageKey])

  const skipTutorial = useCallback(() => {
    setIsActive(false)
    setHasSkipped(true)
    persistFlag(skipStorageKey)
  }, [persistFlag, skipStorageKey])

  const nextStep = useCallback(() => {
    if (!totalSteps) return
    const currentIndex = steps.findIndex(step => step.step === currentStep)
    if (currentIndex === -1) return
    if (currentIndex < totalSteps - 1) {
      setCurrentStep(steps[currentIndex + 1].step)
    } else {
      completeTutorial()
    }
  }, [completeTutorial, currentStep, steps, totalSteps])

  const previousStep = useCallback(() => {
    if (!totalSteps) return
    const currentIndex = steps.findIndex(step => step.step === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].step)
    }
  }, [currentStep, steps, totalSteps])

  const resetTutorial = useCallback(() => {
    setIsActive(false)
    setCurrentStep(firstStep)
    setHasCompleted(false)
    setHasSkipped(false)
    clearFlag(storageKey)
    clearFlag(skipStorageKey)
  }, [clearFlag, firstStep, storageKey, skipStorageKey])

  const getCurrentStepConfig = useCallback(() => {
    return steps.find(step => step.step === currentStep)
  }, [currentStep, steps])

  return {
    isActive,
    currentStep,
    totalSteps,
    hasCompleted,
    hasSkipped,
    startTutorial,
    nextStep,
    previousStep,
    skipTutorial,
    completeTutorial,
    resetTutorial,
    getCurrentStepConfig,
  }
}
