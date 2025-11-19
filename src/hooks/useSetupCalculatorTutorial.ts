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
    title: 'Netto- und Bruttovergleich',
    actionHint: 'Lesen Sie Monats- und Jahreswerte – brutto basiert auf 19% gesetzlicher USt.',
    description:
      'Wir zeigen Netto- und Bruttowerte nebeneinander, damit Sie sofort erkennen, wie stark die USt. Ihre SaaS-Gesamtkosten beeinflusst.',
    highlightTarget: '[data-calculator-tutorial="results"]',
    position: 'right',
  },
  {
    step: 4,
    title: 'Sparpotenzial anfordern',
    actionHint: 'Hover zeigt Ihnen die Vorschau, ein Klick auf „Sparpotenzial ermitteln“ öffnet die Kontaktseite.',
    description:
      'Die detaillierte Berechnung bleibt gesperrt. Mit dem CTA nehmen Sie Kontakt auf und erhalten Ihre individuelle Kalkulation inklusive Einsparung im ersten Jahr.',
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
