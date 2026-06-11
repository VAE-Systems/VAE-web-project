import { HERO_CONTENT } from '@/content/shared/leadershipData'
import { useTheme } from '@/contexts/ThemeContext'
import React from 'react'

export const LeadershipHero: React.FC = () => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <section
      className={`relative isolate overflow-hidden border-b py-20 sm:py-28 ${isLight ? 'bg-bg-primary border-text-light/10 text-text-light' : 'border-white/10 bg-[#030806] text-white'}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${isLight ? 'opacity-[0.1]' : 'opacity-[0.18]'}`}
        style={{
          backgroundImage: 'url(/images/optimized/Background-Für-Hero-Leitung-2-BW.webp)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(1)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--vae-turquoise-rgb),0.12),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-vae-turquoise" />
      <div
        className={`pointer-events-none absolute right-[-4vw] top-8 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] xl:block ${isLight ? 'text-text-light/[0.04]' : 'text-white/[0.03]'}`}
      >
        VAE
      </div>

      <div className="container-vae relative z-10">
        <div className="flex max-w-4xl flex-col gap-6">
          <div
            className={`inline-flex w-fit items-center border border-vae-turquoise/35 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.34em] text-vae-turquoise ${isLight ? 'bg-white/85' : 'bg-black'}`}
          >
            Leitung &amp; Kultur
          </div>

          <h1 className="max-w-4xl">
            <span
              className={`block text-[11vw] font-black uppercase leading-[0.88] tracking-[-0.08em] sm:text-5xl lg:text-[4.8rem] ${isLight ? 'text-text-light' : 'text-white'}`}
            >
              {HERO_CONTENT.title}
            </span>
          </h1>

          <div
            className={`max-w-2xl border-l-4 pl-4 text-base leading-relaxed sm:text-lg ${isLight ? 'border-text-light text-text-secondary' : 'border-white text-white/75'}`}
          >
            {HERO_CONTENT.subheading}
          </div>

          <div className="flex flex-wrap gap-2 pt-2" aria-label="SEO Schlagworte">
            {HERO_CONTENT.seoKeywords.map(keyword => (
              <span
                key={keyword}
                className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200 hover:border-vae-turquoise/50 hover:text-vae-turquoise ${isLight ? 'border-text-light/10 bg-white/70 text-text-secondary' : 'border-white/15 bg-white/[0.04] text-white/60'}`}
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
