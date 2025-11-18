import {
  SpotlightTutorialController,
  SpotlightTutorialStepConfig,
  useSpotlightTutorial,
} from '@/hooks/useSpotlightTutorial'

export type SetupCalculatorTutorialStep = 1 | 2 | 3 | 4

export type SetupCalculatorTutorialStepConfig = SpotlightTutorialStepConfig<SetupCalculatorTutorialStep>

export type UseSetupCalculatorTutorialReturn = SpotlightTutorialController<SetupCalculatorTutorialStep>

const STORAGE_KEY = 'vae-setup-calculator-tutorial-completed'
const STORAGE_SKIP_KEY = 'vae-setup-calculator-tutorial-skipped'

const SETUP_CALCULATOR_TUTORIAL_STEPS: SetupCalculatorTutorialStepConfig[] = [
  {
    step: 1,
    title: 'Teamgröße festlegen',
    actionHint: 'Nutzen Sie Slider oder Eingabefeld, um Ihre Mitarbeitendenzahl zu hinterlegen.',
    description:
      'Alle Berechnungen skalieren automatisch mit. Sie können jederzeit nachjustieren und Beobachten, wie sich SaaS- und Hosting-Kosten verändern.',
    highlightTarget: '[data-calculator-tutorial="team-size"]',
    position: 'left',
  },
  {
    step: 2,
    title: 'Ihre Tools auswählen',
    actionHint: 'Aktivieren Sie die SaaS-Tools, die Sie heute nutzen. Mehrfachauswahl möglich.',
    description:
      'Wir kalkulieren für jedes aktivierte Tool die monatlichen Lizenzkosten pro Nutzer:in und rechnen individuelle Zusatzkosten hinzu.',
    highlightTarget: '[data-calculator-tutorial="tools"]',
    position: 'left',
  },
  {
    step: 3,
    title: 'Netto, Brutto & Vergleich',
    actionHint: 'Passen Sie den USt.-Satz an oder blenden Sie Bruttowerte aus.',
    description:
      'Sie sehen sofort den Jahresvergleich zwischen bestehenden SaaS-Lizenzkosten und unserem Open-Source-Hosting – inklusive optionalem USt.-Anteil.',
    highlightTarget: '[data-calculator-tutorial="results"]',
    position: 'right',
  },
  {
    step: 4,
    title: 'Individuelle Berechnung öffnen',
    actionHint: 'Klicken Sie auf den CTA, um eine gesperrte Setup-Berechnung anzufordern.',
    description:
      'Die Setup-Kosten bleiben bewusst verborgen (🔒). Mit einem Klick kontaktieren Sie uns und erhalten eine individuelle Kalkulation inklusive konkreter Einsparung Jahr 1.',
    highlightTarget: '[data-calculator-tutorial="cta"]',
    position: 'right',
  },
]

export function useSetupCalculatorTutorial(): UseSetupCalculatorTutorialReturn {
  return useSpotlightTutorial<SetupCalculatorTutorialStep>({
    steps: SETUP_CALCULATOR_TUTORIAL_STEPS,
    storageKey: STORAGE_KEY,
    skipStorageKey: STORAGE_SKIP_KEY,
  })
}
