import React from 'react'
import { TERMS } from './Glossary'

interface GlossarySectionProps {
  id?: string
  title?: string
  limit?: number
  className?: string
}

const GlossarySection: React.FC<GlossarySectionProps> = ({ id = 'glossar', title = 'Glossar', limit, className }) => {
  const list = typeof limit === 'number' ? TERMS.slice(0, limit) : TERMS
  return (
    <section id={id} className={`py-24 ${className || ''}`}>
      <div className="container-vae max-w-5xl">
        <h2 className="mb-4 text-2xl font-semibold text-text-light dark:text-white md:text-3xl">{title}</h2>
        <p className="mb-10 max-w-3xl text-sm text-text-secondary">
          Kurze Erläuterungen zu wiederkehrenden Fachbegriffen. Mehr Tiefe auf Anfrage – wir halten Definitionen bewusst
          praxisnah.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {list.map(t => (
            <div
              key={t.term}
              className="group relative rounded-2xl border border-[#c5ccc8] bg-white/90 p-5 transition-colors hover:border-vae-turquoise/40 dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="mb-1 text-sm font-semibold leading-snug text-text-light dark:text-white">{t.term}</h3>
              {t.short && <p className="mb-2 text-[10px] uppercase tracking-wide text-vae-turquoise">{t.short}</p>}
              <p className="text-[11px] leading-relaxed text-text-secondary">{t.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GlossarySection
