import React from 'react'
import { TERMS } from './Glossary'

interface GlossarySectionProps {
  id?: string
  title?: string
  limit?: number
  className?: string
}

const GlossarySection: React.FC<GlossarySectionProps> = ({ id='glossar', title='Glossar', limit, className }) => {
  const list = typeof limit === 'number' ? TERMS.slice(0, limit) : TERMS
  return (
    <section id={id} className={`py-24 ${className || ''}`}>
      <div className="container-vae max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-text-light dark:text-white mb-4">{title}</h2>
        <p className="text-sm text-text-secondary mb-10 max-w-3xl">Kurze Erläuterungen zu wiederkehrenden Fachbegriffen. Mehr Tiefe auf Anfrage – wir halten Definitionen bewusst praxisnah.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map(t => (
            <div key={t.term} className="group relative rounded-2xl border border-border-primary dark:border-white/10 bg-bg-primary/5 dark:bg-white/5 p-5 transition-colors hover:border-vae-turquoise/40">
              <h3 className="text-sm font-semibold text-text-light dark:text-white mb-1 leading-snug">{t.term}</h3>
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
