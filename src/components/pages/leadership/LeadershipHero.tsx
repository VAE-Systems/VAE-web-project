import { HERO_CONTENT } from '@/content/shared/leadershipData'
import React, { useMemo } from 'react'

export const LeadershipHero: React.FC = () => {
  const bodyParagraphs = useMemo(() => HERO_CONTENT.body.split(' — ').map(chunk => chunk.trim()), [])

  return (
    <section className="relative z-0 overflow-hidden border-b border-black/5 bg-bg-darker py-24 text-text-light dark:border-white/5 lg:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <picture className="absolute inset-0">
          <source srcSet="/images/optimized/Background-Für-Hero-Leitung.webp" type="image/webp" />
          <img
            src="/images/optimized/Background-Für-Hero-Leitung.png"
            alt=""
            loading="eager"
            className="h-full w-full scale-[1.02] object-cover opacity-55 blur-[2px]"
          />
        </picture>
        <div className="via-white/82 dark:via-bg-darker/92 absolute inset-0 bg-gradient-to-br from-white/70 to-white/70 dark:from-bg-darker dark:to-bg-darker/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--color-vae-turquoise-rgb),0.18),transparent_70%)]" />
        <div className="absolute right-[-15%] top-[-10%] h-[260px] w-[260px] rounded-full bg-vae-turquoise/10 blur-3xl" />
      </div>

      <div className="container-vae relative">
        <div className="flex max-w-4xl flex-col gap-5 text-left">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-6 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-vae-turquoise/90">
            Leitung & Kultur
          </span>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">{HERO_CONTENT.title}</h1>
          <p className="max-w-2xl text-lg font-medium text-text-secondary md:text-xl">{HERO_CONTENT.subheading}</p>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-text-light/80 md:text-lg">
            {bodyParagraphs.map(paragraph => (
              <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-3" aria-label="SEO Schlagworte">
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
