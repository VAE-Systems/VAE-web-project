import React from 'react'
import { createPortal } from 'react-dom'
// Glossary utilities: Use <TermHint term="Roadmap" /> inline in text blocks for accessible hover definitions.

export type GlossaryTerm = {
  term: string
  short?: string
  definition: string
}

const TERMS: GlossaryTerm[] = [ 
  {
    term: 'Roadmap',
    short: 'Zeitlicher Fahrplan',
    definition: 'Priorisierte Abfolge von Umsetzungsschritten mit Abhängigkeiten, Verantwortlichkeiten und erwarteten Ergebnissen.'
  },
  {
    term: 'TCO',
    short: 'Total Cost of Ownership',
    definition: 'Gesamtkosten über den Lebenszyklus inkl. Entwicklung, Betrieb, Wartung, Scaling, Compliance & Abschreibungen.'
  },
  {
    term: 'Feasibility',
    short: 'Machbarkeit',
    definition: 'Bewertung ob Daten, Schnittstellen, Ressourcen & Qualitätsanforderungen ein sinnvolles erstes Inkrement erlauben.'
  },
  {
    term: 'Runbook',
    short: 'Betriebsanleitung',
    definition: 'Strukturiertes, schrittweises Vorgehen für wiederkehrende Betriebs-/Incident-Aufgaben (Deploy, Recovery, Checks).'
  },
  {
    term: 'Evaluierung',
    short: 'Bewertung',
    definition: 'Systematische Messung / Prüfung ob definierte Akzeptanz- & Qualitätskriterien erreicht werden.'
  },
  {
    term: 'Guardrails',
    short: 'Sicherungsmechanismen',
    definition: 'Technische & prozessuale Leitplanken (Filter, Validierung, Policies) zur Minimierung von Fehlverhalten / Risiko.'
  },
  {
    term: 'Adapter-Layer',
    short: 'Abstraktionsschicht',
    definition: 'Zwischenschicht die interne Logik von externen Systemen entkoppelt – vereinfacht Austausch & Erweiterbarkeit.'
  },
  {
    term: 'Ownership',
    short: 'Eigenständigkeit',
    definition: 'Fähigkeit ein System intern zu verstehen, betreiben & weiterzuentwickeln ohne externe Dauerabhängigkeit.'
  },
  {
    term: 'KPI',
    short: 'Key Performance Indicator',
    definition: 'Messbare Kennzahl zur Erfolgskontrolle (z.B. Durchlaufzeit, Kosten / Anfrage, p95 Latenz, Fehlerrate).'  
  },
  {
    term: 'Governance',
    short: 'Richtlinien & Kontrolle',
    definition: 'Strukturierter Rahmen aus Richtlinien, Verantwortlichkeiten und Prozessen für Entscheidungsfindung & Compliance.'
  },
  {
    term: 'EU AI Act',
    short: 'EU KI Regulierung',
    definition: 'Regulatorischer Rahmen der EU zur Klassifizierung von KI-Risiken und zu Anforderungen für Transparenz, Sicherheit und Aufsicht.'
  },
  {
    term: 'Observability',
    short: 'Systemeinblick',
    definition: 'Fähigkeit, internes Verhalten über Logs, Metriken, Traces zu verstehen und Anomalien schnell zu erkennen.'
  },
  {
    term: 'Vendor Lock-in',
    short: 'Abhängigkeit',
    definition: 'Erschwerte Wechselmöglichkeit durch proprietäre Schnittstellen, Formate oder fehlende Datenportabilität.'
  },
  {
    term: 'Retrieval',
    short: 'Kontextabruf',
    definition: 'Prozess relevante Dokumente / Wissenseinheiten für ein LLM bereitzustellen (z.B. über Vektorsuche + Ranking), um Antworten zu fundieren.'
  },
  {
    term: 'Halluzination',
    short: 'Falsche Ausgabe',
    definition: 'Überzeugend formulierter, aber inhaltlich inkorrekter Modell-Output ohne ausreichende faktische Grundlage.'
  },
  {
    term: 'Prompt Pattern',
    short: 'Muster',
    definition: 'Wiederverwendbare strukturelle Vorlage für Eingaben an ein Sprachmodell zur Erhöhung von Konsistenz & Qualität.'
  }
]

export const getGlossaryTerm = (name: string) => TERMS.find(t => t.term.toLowerCase() === name.toLowerCase())

interface TermHintProps {
  term: string
  className?: string
  variant?: 'inline' | 'chip'
}

export const TermHint: React.FC<TermHintProps> = ({ term, className, variant = 'inline' }) => {
  const data = getGlossaryTerm(term)
  const [open, setOpen] = React.useState(false)
  const [pos, setPos] = React.useState<{top:number; left:number} | null>(null)
  const ref = React.useRef<HTMLSpanElement | null>(null)
  if (!data) return <>{term}</>
  const base = variant === 'chip'
    ? 'inline-flex items-center px-2 py-1 rounded-md border border-white/10 bg-white/5 text-white/70 text-[11px] gap-1 hover:border-vae-turquoise/40 hover:text-white'
    : 'underline decoration-dotted underline-offset-2'
  return (
    <span
      ref={ref}
      className={`relative cursor-help ${base} ${className || ''}`}
      onMouseEnter={() => {
        if (ref.current) {
          const r = ref.current.getBoundingClientRect()
          const top = r.bottom + 6 + window.scrollY
          let left = r.left + window.scrollX
          const maxWidth = 280
          if (left + maxWidth > window.scrollX + window.innerWidth - 8) {
            left = window.scrollX + window.innerWidth - maxWidth - 8
          }
          setPos({ top, left })
        }
        setOpen(true)
      }}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => {
        if (ref.current) {
          const r = ref.current.getBoundingClientRect()
          setPos({ top: r.bottom + 6 + window.scrollY, left: r.left + window.scrollX })
        }
        setOpen(true)
      }}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      {data.term}
      {open && pos && typeof document !== 'undefined' && createPortal(
        <div
          style={{ position: 'absolute', top: pos.top, left: pos.left, width: 280 }}
          className="z-[200] pointer-events-none"
        >
          <div className="relative p-3 rounded-lg border border-white/10 bg-bg-darker/95 backdrop-blur-md shadow-xl text-[11px] leading-relaxed text-text-secondary animate-fade-in">
            <span className="block text-[10px] uppercase tracking-wide text-vae-turquoise mb-1">Begriff</span>
            <span className="text-white font-medium text-xs mb-1 block">{data.term}{data.short ? ` – ${data.short}` : ''}</span>
            {data.definition}
          </div>
        </div>,
        document.body
      )}
    </span>
  )
}

interface GlossarySectionProps {
  id?: string
  title?: string
  limit?: number
  className?: string
}

export const GlossarySection: React.FC<GlossarySectionProps> = ({ id='glossar', title='Glossar', limit, className }) => {
  const list = typeof limit === 'number' ? TERMS.slice(0, limit) : TERMS
  return (
    <section id={id} className={`py-24 ${className || ''}`}>
      <div className="container-vae max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">{title}</h2>
        <p className="text-sm text-text-secondary mb-10 max-w-3xl">Kurze Erläuterungen zu wiederkehrenden Fachbegriffen. Mehr Tiefe auf Anfrage – wir halten Definitionen bewusst praxisnah.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map(t => (
            <div key={t.term} className="group relative rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-vae-turquoise/40">
              <h3 className="text-sm font-semibold text-white mb-1 leading-snug">{t.term}</h3>
              {t.short && <p className="text-[10px] uppercase tracking-wide text-vae-turquoise mb-2">{t.short}</p>}
              <p className="text-[11px] text-text-secondary leading-relaxed">{t.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GlossarySection
