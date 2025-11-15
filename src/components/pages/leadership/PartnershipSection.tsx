import React from 'react'
import { PARTNERSHIP_SECTION } from '@/data/leadershipData'
import { useFadeIn } from '@/components/pages/values/useFadeIn'

export const PartnershipSection: React.FC = () => {
  const { ref, isVisible } = useFadeIn({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      aria-labelledby="partnership-title"
      className={`border-t border-white/5 bg-bg-dark py-20 transition duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="container-vae space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/80">Führung</p>
          <h2 id="partnership-title" className="text-3xl font-semibold text-text-light md:text-4xl">
            {PARTNERSHIP_SECTION.title}
          </h2>
          <p className="mx-auto max-w-4xl text-base text-text-light/80">{PARTNERSHIP_SECTION.intro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PARTNERSHIP_SECTION.methodology.map(item => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_15px_45px_rgba(0,0,0,0.35)]"
            >
              <h3 className="text-xl font-semibold text-text-light">{item.label}</h3>
              <p className="mt-2 text-sm text-text-light/75">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3" aria-label="SEO Schlagworte">
          {PARTNERSHIP_SECTION.seoKeywords.map(keyword => (
            <span
              key={keyword}
              className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-text-muted"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-vae-turquoise">
          {PARTNERSHIP_SECTION.links.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2"
            >
              {link.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
