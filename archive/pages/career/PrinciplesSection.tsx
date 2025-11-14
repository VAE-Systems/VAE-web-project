import { useFadeIn } from '@/components/pages/values/useFadeIn'
import { PRINCIPLES } from '../../data/careerData'
import React from 'react'

export const PrinciplesSection: React.FC = () => {
  const { ref, isVisible } = useFadeIn({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      aria-labelledby="principles-title"
      className={`relative overflow-hidden border-t border-white/5 bg-gradient-to-br from-bg-darker via-[#0b1519] to-bg-darker py-24 transition duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.2),transparent_65%)]" />
        <div className="absolute -left-24 bottom-8 h-60 w-60 rounded-full bg-vae-turquoise/15 blur-3xl" />
      </div>

      <div className="container-vae relative space-y-12">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">Standards</p>
          <h2 id="principles-title" className="text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
            Das ist wichtig für uns
          </h2>
          <p className="max-w-3xl text-base text-white/80 md:text-lg">
            Wenige Prinzipien, null Diskussion. Wer bei Kund:innen mit uns aufschlägt, verkörpert diesen Anspruch
            automatisch.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <article
              key={principle.title}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.4)]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-vae-turquoise/40 bg-vae-turquoise/10 text-sm font-semibold uppercase tracking-[0.3em] text-vae-turquoise/85">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-white">{principle.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {principle.bullets.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-[0.35rem] h-1.5 w-1.5 rounded-full bg-vae-turquoise" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
