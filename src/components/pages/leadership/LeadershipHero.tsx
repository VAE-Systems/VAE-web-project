import { HERO_CONTENT } from '@/content/shared/leadershipData'
import React from 'react'

export const LeadershipHero: React.FC = () => {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#030806] py-20 text-white sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
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
      <div className="pointer-events-none absolute right-[-4vw] top-8 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.03] xl:block">
        VAE
      </div>

      <div className="container-vae relative z-10">
        <div className="flex max-w-4xl flex-col gap-6">
          <div className="inline-flex w-fit items-center border border-vae-turquoise/35 bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.34em] text-vae-turquoise">
            Leitung &amp; Kultur
          </div>

          <h1 className="max-w-4xl">
            <span className="block text-[11vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-5xl lg:text-[4.8rem]">
              {HERO_CONTENT.title}
            </span>
          </h1>

          <div className="max-w-2xl border-l-4 border-white pl-4 text-base leading-relaxed text-white/75 sm:text-lg">
            {HERO_CONTENT.subheading}
          </div>

          <div className="flex flex-wrap gap-2 pt-2" aria-label="SEO Schlagworte">
            {HERO_CONTENT.seoKeywords.map(keyword => (
              <span
                key={keyword}
                className="border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition-all duration-200 hover:border-vae-turquoise/50 hover:text-vae-turquoise"
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
