import { Value } from '@/data/valuesData'
import React from 'react'
import { useFadeIn } from './useFadeIn'

interface ValueSectionProps {
  value: Value
  index: number
}

export const ValueSection: React.FC<ValueSectionProps> = ({ value, index }) => {
  const { ref, isVisible } = useFadeIn({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      aria-labelledby={`${value.id}-title`}
      className={`relative overflow-hidden border-t border-white/5 bg-gradient-to-br from-bg-darker via-[#0a1317] to-bg-darker py-20 transition duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.18),transparent_65%)]" />
        <div className="absolute -left-32 bottom-10 h-64 w-64 rounded-full bg-vae-turquoise/15 blur-3xl" />
      </div>

      <div className="container-vae relative grid gap-12 lg:grid-cols-[1.05fr_1.15fr] lg:items-start">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-sm font-semibold uppercase tracking-[0.35em] text-vae-turquoise/90">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/80">Wert {index + 1}</p>
          </div>
          <h2 id={`${value.id}-title`} className="text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
            {value.title}
          </h2>
          <p className="max-w-2xl text-base text-white/75 md:text-lg">{value.intro}</p>
          {value.link && (
            <a
              href={value.link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-vae-turquoise transition hover:border-vae-turquoise/60 hover:text-vae-turquoise/70"
            >
              {value.link.text}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          )}
        </div>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur">
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.08)_0%,transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative space-y-4">
            <p className="whitespace-pre-line text-base leading-relaxed text-white/85">{value.deepDive}</p>
            <div className="flex flex-wrap gap-2 pt-4" aria-label="SEO-Schlagworte">
              {value.seoKeywords.map(keyword => (
                <span
                  key={keyword}
                  className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
