import { useFadeIn } from '@/components/pages/values/useFadeIn'
import { OPEN_ROLES } from '../../data/careerData'
import { Mail } from 'lucide-react'
import React from 'react'

export const OpenRolesSection: React.FC = () => {
  const { ref, isVisible } = useFadeIn({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      aria-labelledby="roles-title"
      className={`border-t border-white/5 bg-gradient-to-b from-bg-dark via-bg-dark/95 to-bg-darker py-24 transition duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="container-vae space-y-10">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/80">Freelance Focus</p>
          <h2 id="roles-title" className="text-3xl font-semibold text-white md:text-4xl">
            Aktuelle Bedarfssignale
          </h2>
          <p className="text-base text-white/75 md:text-lg">
            Keine klassischen Stellenanzeigen. Wir sprechen mit Menschen, die projektweise Verantwortung übernehmen.
            Schwerpunkt: Backend, DevOps, UX.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {OPEN_ROLES.map(role => (
            <article
              key={role.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.4)]"
            >
              <h3 className="text-xl font-semibold text-white">{role.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {role.highlights.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-[0.35rem] h-1.5 w-1.5 rounded-full bg-vae-turquoise" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center text-sm text-white/75">
          <p>
            {`Initiativbewerbung oder Profil (PDF, GitHub, LinkedIn) an`} <strong>info@vae.systems</strong>. Bitte
            erwähne Verfügbarkeit, Tagessatz und Referenzen.
          </p>
          <a
            href="mailto:info@vae.systems?subject=Initiativbewerbung%20Freelance%20VAE"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:text-vae-turquoise"
          >
            <Mail className="h-4 w-4" /> Profil senden
          </a>
        </div>
      </div>
    </section>
  )
}
