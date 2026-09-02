import { HERO_CONTENT } from '@/content/shared/leadershipData'
import React from 'react'

export const LeadershipHero: React.FC = () => {
  return (
    <section className="accent-section relative z-0 overflow-hidden border-b border-vae-turquoise/25 bg-vae-turquoise py-24 text-white dark:border-white/5 dark:bg-bg-darker dark:text-text-light lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Fixed Wallpaper Effect (no blur; green base stays visible) */}
        <div
          className="absolute inset-0 z-0 opacity-70 dark:opacity-55"
          style={{
            backgroundImage: 'url(/images/optimized/Background-Für-Hero-Leitung-2-BW.webp)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="dark:via-bg-darker/92 absolute inset-0 -z-10 bg-vae-turquoise dark:bg-gradient-to-br dark:from-bg-darker dark:to-bg-darker/75" />
      </div>

      <div className="container-vae relative z-10">
        <div className="flex max-w-4xl flex-col gap-7 text-left">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-white/90 dark:border-vae-turquoise/40 dark:bg-vae-turquoise/10 dark:text-vae-turquoise/90">
            Leitung & Kultur
          </span>

          <h1 className="text-balance text-5xl font-semibold leading-[1.05] text-white dark:text-text-light md:text-6xl lg:text-7xl">
            {HERO_CONTENT.title}
          </h1>

          {/* Subheading = die eigentliche Aussage. Groß, eine Zeile Luft. */}
          <p className="max-w-3xl text-xl font-medium leading-snug text-white dark:text-text-light/90 md:text-2xl">
            {HERO_CONTENT.subheading}
          </p>

          <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-white/85 dark:text-text-light/75 md:text-xl [&_a]:font-semibold [&_a]:underline [&_a]:decoration-white/50 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-white dark:[&_a]:decoration-vae-turquoise/60 dark:hover:[&_a]:decoration-vae-turquoise">
            {HERO_CONTENT.body.map(paragraph => (
              <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2" aria-label="SEO Schlagworte">
            {HERO_CONTENT.seoKeywords.map(keyword => (
              <span
                key={keyword}
                className="dark:border-white/12 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/20 hover:text-white dark:bg-white/5 dark:text-text-muted dark:hover:border-vae-turquoise/60 dark:hover:bg-vae-turquoise/15 dark:hover:text-text-light"
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
