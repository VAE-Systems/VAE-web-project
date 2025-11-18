/**
 * Tutorial System Components
 * Interactive step-by-step tutorials for guiding users durch komplexe Interfaces
 */

export { useSpotlightTutorial } from '@/hooks/useSpotlightTutorial'
export type { SpotlightTutorialController, SpotlightTutorialStepConfig } from '@/hooks/useSpotlightTutorial'

export { TUTORIAL_STEPS, useMailBuilderTutorial } from '@/hooks/useMailBuilderTutorial'
export type { TutorialStep, TutorialStepConfig, UseMailBuilderTutorialReturn } from '@/hooks/useMailBuilderTutorial'

export { useSetupCalculatorTutorial } from '@/hooks/useSetupCalculatorTutorial'
export type { SetupCalculatorTutorialStep, UseSetupCalculatorTutorialReturn } from '@/hooks/useSetupCalculatorTutorial'

export { SpotlightTutorialOverlay, MailBuilderTutorialOverlay } from './MailBuilderTutorialOverlay'
