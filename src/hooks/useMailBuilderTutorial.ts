import {
  SpotlightTutorialController,
  SpotlightTutorialStepConfig,
  useSpotlightTutorial,
} from '@/hooks/useSpotlightTutorial'

export type TutorialStep = 1 | 2 | 3 | 4 | 5 | 6

export type TutorialStepConfig = SpotlightTutorialStepConfig<TutorialStep>

export type UseMailBuilderTutorialReturn = SpotlightTutorialController<TutorialStep>

export const TUTORIAL_STEPS: TutorialStepConfig[] = [
  {
    step: 1,
    title: 'Wählen Sie Ihre Themen',
    actionHint: 'Klicken Sie auf die Bereiche, die Sie interessieren. Mehrfachauswahl möglich.',
    description: 'Welche Bereiche interessieren Sie? Sie können mehrere auswählen.',
    highlightTarget: '[data-tutorial="intents"]',
    position: 'left',
  },
  {
    step: 2,
    title: 'Zeitpunkt festlegen',
    actionHint: 'Wählen Sie aus, wann Sie mit dem Projekt starten möchten.',
    description: 'Wann möchten Sie starten? Dies hilft uns bei der Priorisierung.',
    highlightTarget: '[data-tutorial="timeline"]',
    position: 'left',
  },
  {
    step: 3,
    title: 'Ihr Setup beschreiben',
    actionHint: 'Geben Sie an, welche Art von Unternehmen Sie sind.',
    description: 'Welche Art von Unternehmen sind Sie? Dies passt unsere Empfehlungen an.',
    highlightTarget: '[data-tutorial="setup"]',
    position: 'left',
  },
  {
    step: 4,
    title: 'Zusammenarbeitsmodell',
    actionHint: 'Wählen Sie Ihr bevorzugtes Engagement-Modell aus.',
    description: 'Wie möchten Sie mit uns arbeiten? Projekt, Retainer oder Sparring?',
    highlightTarget: '[data-tutorial="collaboration"]',
    position: 'left',
  },
  {
    step: 5,
    title: 'Live-Vorschau & Mail öffnen',
    actionHint: 'Prüfen Sie die generierte E-Mail rechts in der Vorschau.',
    description: 'Rechts sehen Sie die fertige E-Mail. Klicken Sie auf "Mail vorbereiten" um sie zu senden.',
    highlightTarget: '[data-tutorial="preview"]',
    position: 'left',
  },
  {
    step: 6,
    title: 'Weitere Optionen',
    actionHint: 'Links: Tutorial wiederholen. Rechts: Hilfe-Modus für detaillierte Erklärungen.',
    description:
      'Klicken Sie den Tutorial-Button (🎓) um alle Schritte zu wiederholen, oder den Hilfe-Button (?) um detaillierte Informationen zu jeder Auswahlmöglichkeit zu erhalten.',
    highlightTarget: '[data-tutorial="buttons"]',
    position: 'right',
  },
]

const STORAGE_KEY = 'vae-mail-builder-tutorial-completed'
const STORAGE_SKIP_KEY = 'vae-mail-builder-tutorial-skipped'

export function useMailBuilderTutorial(): UseMailBuilderTutorialReturn {
  return useSpotlightTutorial<TutorialStep>({
    steps: TUTORIAL_STEPS,
    storageKey: STORAGE_KEY,
    skipStorageKey: STORAGE_SKIP_KEY,
  })
}
