import React from 'react'
import { MenuContent } from './menuData'

interface DropdownContentProps {
  content?: MenuContent
  isHeaderScrolled?: boolean
}

export const DropdownContent: React.FC<DropdownContentProps> = ({ content }) => {
  if (!content) {
    return (
      <div className="rounded-2xl border bg-gray-50 p-6 text-gray-400 dark:border-white/10 dark:bg-[#0a0a0a]">
        <p>Inhalt wird geladen …</p>
      </div>
    )
  }

  return (
    <div
      aria-live="polite"
      className="dark:to-[#0a0a0a]/98 flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 bg-gradient-to-br
        from-white via-gray-50 to-gray-100/95 p-6 text-gray-900 shadow-xl
        shadow-gray-900/10 dark:border-white/10 dark:from-[#0a0a0a] dark:via-[#0d0d0d] dark:text-white dark:shadow-black/50"
    >
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/80 dark:text-vae-turquoise/70">
            {content.id}
          </p>
          <h3 className="text-2xl font-semibold leading-snug text-gray-900 dark:text-white">{content.title}</h3>
        </div>

        {content.description && (
          <p className="text-sm leading-relaxed text-gray-600 dark:text-white/75">{content.description}</p>
        )}

        {content.items && (
          <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-white/80">
            {content.items.map((item, index) => (
              <li key={`${content.id}-${index}`} className="flex items-start gap-2">
                <span
                  className="mt-1 h-1.5 w-1.5 rounded-full bg-vae-turquoise/80 dark:bg-vae-turquoise/70"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-6">
        <a
          href={content.ctaHref}
          className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/70 px-5 py-2 text-sm font-semibold text-gray-900
            transition-all duration-200 hover:-translate-y-0.5 hover:border-vae-turquoise hover:bg-vae-turquoise/15 hover:text-vae-turquoise
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise dark:border-vae-turquoise/60 dark:text-white
            dark:hover:border-vae-turquoise dark:hover:bg-vae-turquoise/10 dark:hover:text-vae-turquoise"
        >
          {content.ctaText}
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  )
}
