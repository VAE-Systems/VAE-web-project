/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  MANAGED REFERENCES STRIP                                                 ┃
 * ┃  Dezente Leiste: betreute Websites als Text-Chips. Keine Logo-Wand.       ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * ⚖️ GUARDS
 * ├── Rendert nur Einträge mit consent.namingAllowed === true
 * ├── Keine Logos (erst wenn consent.logoUsage dokumentiert ist)
 * └── Disclosures (Eigenbezug) erscheinen als Fußnote unter der Leiste
 *
 * 📍 CONTENT-QUELLE: src/content/managedReferences.ts
 */

import { managedReferences, managedReferencesContent, relationLabels } from '@/content/managedReferences'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const ManagedReferencesStrip: React.FC = () => {
  const visibleReferences = managedReferences.filter(ref => ref.consent.namingAllowed)
  if (visibleReferences.length === 0) return null

  const disclosures = visibleReferences.map(ref => ref.disclosure).filter((d): d is string => Boolean(d))

  return (
    <section
      id="betrieb-hosting"
      aria-label={managedReferencesContent.heading}
      className="border-border-primary relative border-t bg-white/60 py-14 dark:border-white/5 dark:bg-bg-darker sm:py-16"
    >
      <div className="container-vae">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise/70">
            {managedReferencesContent.eyebrow}
          </p>
          <h2 className="mt-3 text-xl font-semibold text-text-light sm:text-2xl">
            {managedReferencesContent.heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{managedReferencesContent.description}</p>
        </div>

        {/* ── CHIPS ── */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {visibleReferences.map(ref => {
            const chipInner = (
              <>
                <span className="font-medium text-text-light">{ref.name}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted dark:text-text-secondary/60">
                  {relationLabels[ref.relation]}
                </span>
                {ref.url && <ArrowUpRight className="h-3.5 w-3.5 text-vae-turquoise/70" aria-hidden />}
              </>
            )
            const chipClass =
              'inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm transition-colors duration-200 dark:border-white/10 dark:bg-white/[0.04]'

            return (
              <li key={ref.id}>
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${chipClass} hover:border-vae-turquoise/60 hover:bg-vae-turquoise/5`}
                  >
                    {chipInner}
                  </a>
                ) : (
                  <span className={chipClass}>{chipInner}</span>
                )}
              </li>
            )
          })}
        </ul>

        {/* ── TRANSPARENZ-FUSSNOTE ── */}
        {disclosures.length > 0 && (
          <p className="mx-auto mt-6 max-w-2xl text-center text-[11px] leading-relaxed text-text-muted dark:text-text-secondary/50">
            Transparenz: {disclosures.join(' ')}
          </p>
        )}
      </div>
    </section>
  )
}

export default ManagedReferencesStrip
