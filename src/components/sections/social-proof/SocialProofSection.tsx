import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { referenceInsights, referenceProjects } from '@/content/home'
import { ArrowRight, Briefcase } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const caseStudyAnchors: Record<string, string> = {
  'lukas-sosnowski': '/about/referenzen#lukas-sosnowski-consulting',
  'aktiv-kollektiv': '/about/referenzen#aktiv-kollektiv',
  'qr-mail': '/about/referenzen#art-affair-qr',
}

const SocialProofSection: React.FC = () => {
  return (
    <section
      id="social-proof"
      className="relative overflow-hidden border-t-2 border-black bg-[#060a08] py-20 text-white dark:border-white sm:py-28"
    >
      <div className="pointer-events-none absolute left-[-2vw] top-6 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.04] lg:block">
        05
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-vae-turquoise" />

      <div className="container-vae relative z-10">
        <header className="max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-vae-turquoise">
            Beweise statt Behauptungen
          </p>
          <h2 className="mt-4 text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
            Nicht Theorie.
            <br />
            Gebaute Systeme.
          </h2>
          <p className="text-white/72 mt-6 max-w-2xl border-l-4 border-white pl-4 text-base leading-relaxed sm:text-lg">
            Vertrauen entsteht nicht durch Versprechen, sondern durch konkrete Projekte, echte Kundenkontexte und
            sichtbare Ergebnisse.
          </p>
        </header>

        <div className="mt-10 grid gap-0 border-2 border-white/20 lg:grid-cols-4">
          {referenceInsights.map((insight, index) => (
            <article
              key={insight.id}
              className={`${index % 2 === 0 ? 'bg-white text-black' : 'bg-vae-turquoise text-black'} border-b-2 border-black p-6 lg:border-b-0 lg:border-r-2 lg:last:border-r-0`}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-black/50">{insight.title}</p>
              {insight.value && (
                <p className="mt-3 text-5xl font-black leading-none tracking-[-0.07em] sm:text-6xl">{insight.value}</p>
              )}
              <p className="text-black/72 mt-4 text-sm leading-relaxed">{insight.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-3">
          {referenceProjects.map((project, index) => (
            <article
              key={project.id}
              className="border-white/14 flex h-full flex-col border-2 bg-white/[0.04] p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">
                    Projekt {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="text-white/54 mt-3 text-sm font-bold uppercase tracking-[0.18em]">{project.client}</p>
                </div>
                <span className="bg-vae-turquoise px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-black">
                  {project.badge}
                </span>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <h3 className="max-w-[18rem] text-3xl font-black uppercase leading-[0.94] tracking-[-0.05em]">
                  {project.title}
                </h3>
                <span className="text-5xl font-black leading-none tracking-[-0.08em] text-white/10">0{index + 1}</span>
              </div>

              <p className="text-white/74 mt-4 text-sm leading-relaxed sm:text-base">{project.description}</p>

              {project.logo ? (
                <div className="border-white/12 mt-5 flex min-h-[90px] items-center justify-center border bg-white p-4">
                  <img
                    src={project.logo}
                    alt={`${project.client} Logo`}
                    className={[
                      'max-h-12 w-auto max-w-[180px] object-contain',
                      (project.invertOnDark || project.invertOnLight) && 'filter',
                      project.invertOnDark && 'dark:invert',
                      project.invertOnLight && 'invert',
                      project.invertOnLight && 'dark:invert-0',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="border-white/12 mt-5 flex min-h-[90px] items-center justify-center border bg-white/5 text-vae-turquoise">
                  <Briefcase className="h-8 w-8" />
                </div>
              )}

              <ul className="text-white/78 mt-5 space-y-2 border-t border-white/10 pt-5 text-sm leading-relaxed">
                {project.highlights.map(highlight => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-vae-turquoise" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {project.role && <p className="text-white/48 mt-4 text-xs leading-relaxed">{project.role}</p>}

              <div className="mt-auto pt-6">
                <MagneticButton className="w-full">
                  <Link
                    to={caseStudyAnchors[project.id] ?? '/about/referenzen'}
                    className="flex w-full items-center justify-between bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-vae-turquoise"
                  >
                    <span>Case ansehen</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 border-2 border-white/20 bg-black/40 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">Kurz gesagt</p>
            <p className="mt-3 max-w-2xl text-2xl font-black uppercase leading-[0.95] tracking-[-0.05em] sm:text-3xl">
              Wir verkaufen keine Vision ohne Substanz. Wir bauen Systeme, die im Alltag benutzt werden.
            </p>
          </div>
          <MagneticButton className="w-full">
            <Link
              to="/about/referenzen"
              className="border-white/16 flex w-full items-center justify-between border px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:border-vae-turquoise hover:bg-vae-turquoise hover:text-black"
            >
              <span>Alle Referenzen</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

export default SocialProofSection
