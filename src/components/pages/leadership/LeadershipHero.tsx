import { HERO_CONTENT } from '@/data/leadershipData'
import React, { useMemo } from 'react'

export const LeadershipHero: React.FC = () => {
  const bodyParagraphs = useMemo(() => HERO_CONTENT.body.split(' — ').map(chunk => chunk.trim()), [])

  return (
    <section className="relative overflow-hidden border-b border-black/5 bg-bg-darker py-28 text-text-light dark:border-white/5">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.15),transparent_65%)]" />
      </div>

      <div className="container-vae relative">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-6 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-vae-turquoise/90">
            Leitung & Kultur
          </span>
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            {HERO_CONTENT.title}
          </h1>
          <p className="max-w-2xl text-lg font-medium text-text-secondary md:text-xl">{HERO_CONTENT.subheading}</p>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-text-light/80 md:text-lg">
            {bodyParagraphs.map(paragraph => (
              <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-4" aria-label="SEO Schlagworte">
            {HERO_CONTENT.seoKeywords.map(keyword => (
              <span
                key={keyword}
                className="border-white/12 rounded-full border bg-white/5 px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-vae-turquoise/60 hover:bg-vae-turquoise/15 hover:text-text-light"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
