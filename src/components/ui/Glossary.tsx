import React from 'react'
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
  }
  ,{
    term: 'Retrieval',
    short: 'Kontextabruf',
    definition: 'Prozess relevante Dokumente / Wissenseinheiten für ein LLM bereitzustellen (z.B. über Vektorsuche + Ranking), um Antworten zu fundieren.'
  }
  ,{
    term: 'Halluzination',
    short: 'Falsche Ausgabe',
    definition: 'Überzeugend formulierter, aber inhaltlich inkorrekter Modell-Output ohne ausreichende faktische Grundlage.'
  }
  ,{
    term: 'Prompt Pattern',
    short: 'Muster',
    definition: 'Wiederverwendbare strukturelle Vorlage für Eingaben an ein Sprachmodell zur Erhöhung von Konsistenz & Qualität.'
  }
]

export const getGlossaryTerm = (name: string) => TERMS.find(t => t.term.toLowerCase() === name.toLowerCase())

interface TermHintProps {
  term: string
  className?: string
}

export const TermHint: React.FC<TermHintProps> = ({ term, className }) => {
  const data = getGlossaryTerm(term)
  if (!data) return <>{term}</>
  return (
    <span className={`relative group cursor-help underline decoration-dotted underline-offset-2 ${className || ''}`}> 
      {data.term}
      <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2 w-64 p-3 rounded-lg border border-white/10 bg-bg-darker/95 backdrop-blur-md shadow-xl text-[11px] leading-relaxed text-text-secondary">
        <span className="block text-[10px] uppercase tracking-wide text-vae-turquoise mb-1">Begriff</span>
        <span className="text-white font-medium text-xs mb-1 block">{data.term}{data.short ? ` – ${data.short}` : ''}</span>
        {data.definition}
      </span>
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
