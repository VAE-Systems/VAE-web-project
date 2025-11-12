import React from 'react'
import { MenuContent } from './menuData'

interface DropdownContentProps {
  content?: MenuContent
}

export const DropdownContent: React.FC<DropdownContentProps> = ({ content }) => {
  if (!content) {
    return (
      <div className="rounded-2xl border border-white/5 bg-bg-darker/80 p-6 text-text-muted">
        <p>Inhalt wird geladen …</p>
      </div>
    )
  }

  return (
    <div
      aria-live="polite"
      className="flex h-full flex-col justify-between rounded-2xl border border-white/5 bg-gradient-to-br from-bg-dark/90 via-bg-darker/90 to-black/90 p-6 text-white shadow-2xl shadow-black/40"
    >
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">{content.id}</p>
          <h3 className="text-2xl font-semibold leading-snug text-white">{content.title}</h3>
        </div>

        {content.description && <p className="text-sm text-white/70">{content.description}</p>}

        {content.items && (
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {content.items.map((item, index) => (
              <li key={`${content.id}-${index}`} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vae-turquoise/70" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-6">
        <a
          href={content.ctaHref}
          className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/60 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-vae-turquoise hover:bg-vae-turquoise/10 hover:text-vae-turquoise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise"
        >
          {content.ctaText}
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  )
}
