/**
 * Tutorial System Components
 * Interactive step-by-step tutorials for guiding users durch komplexe Interfaces
 */

export { useSpotlightTutorial } from '@/hooks/tutorials/useSpotlightTutorial'
export type { SpotlightTutorialController, SpotlightTutorialStepConfig } from '@/hooks/tutorials/useSpotlightTutorial'

export { TUTORIAL_STEPS, useMailBuilderTutorial } from '@/hooks/tutorials/useMailBuilderTutorial'
export type {
  TutorialStep,
  TutorialStepConfig,
  UseMailBuilderTutorialReturn,
} from '@/hooks/tutorials/useMailBuilderTutorial'

export { useSetupCalculatorTutorial } from '@/hooks/tutorials/useSetupCalculatorTutorial'
export type {
  SetupCalculatorTutorialStep,
  UseSetupCalculatorTutorialReturn,
} from '@/hooks/tutorials/useSetupCalculatorTutorial'

export { SpotlightTutorialOverlay, MailBuilderTutorialOverlay } from './MailBuilderTutorialOverlay'
