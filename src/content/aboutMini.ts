// Compact content model for homepage AboutSection (mini version of full About page)
import { badges } from './aboutWhy'

export interface MiniOutcome {
  key: string
  title: string
  body: string
  icon: string
}

export interface MiniProcessStep {
  key: string
  label: string
  hint: string
  icon?: string
}

export const miniTagline = 'Substanz statt KI‑Hype'
export const miniSubline = 'Produktionsnahe KI & Automation – modular, dokumentiert, ohne Lock‑In.'

export const miniOutcomes: MiniOutcome[] = [
  {
    key: 'early-impact',
    title: 'Frühe interne Nutzung',
    body: 'Akzeptanzkriterien + produktionsnaher Pilot in Wochen statt Quartalen.',
    icon: 'rocket_launch'
  },
  {
    key: 'extensible-foundation',
    title: 'Erweiterbares Fundament',
    body: 'Modularer Stack + Runbooks sichern Ownership & spätere Ausbaustufen.',
    icon: 'architecture'
  }
]

export const miniProcess: MiniProcessStep[] = [
  { key: 'focus', label: 'Fokus', hint: 'Ziel & Use‑Case Schärfung', icon: 'target' },
  { key: 'arch', label: 'Architektur', hint: 'Stack & Feasibility', icon: 'hub' },
  { key: 'pilot', label: 'Pilot', hint: 'Produktionsnahes Inkrement', icon: 'rocket' },
  { key: 'handover', label: 'Übergabe', hint: 'Runbooks & Ownership', icon: 'assignment_turned_in' }
]

export const miniMetrics: string[] = [
  '< 5 Tage Fokus / Schärfung',
  '1–2 Wochen Architektur Sprint',
  '2–4 Wochen produktionsnaher Pilot'
]

export { badges } // re-export for convenience
