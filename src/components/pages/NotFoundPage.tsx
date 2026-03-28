import { ArrowLeft, Home, Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Seo from '@/components/ui/Seo'

const suggestedPages = [
  { label: 'Startseite', path: '/', icon: Home },
  { label: 'Strategieberatung', path: '/leistungen/strategie', icon: Search },
  { label: 'Infrastruktur Design', path: '/leistungen/infrastruktur', icon: Search },
  { label: 'Langfristige Betreuung', path: '/leistungen/betreuung', icon: Search },
  { label: 'Kontakt', path: '/contact', icon: Search },
]

const NotFoundPage: React.FC = () => {
  return (
    <div className="relative z-0 flex min-h-[100dvh] flex-col items-center justify-center bg-[#030806] text-white">
      <Seo
        title="404 – Seite nicht gefunden | VAE Systems"
        description="Die gesuchte Seite konnte nicht gefunden werden. Zurück zur Startseite oder direkt Kontakt aufnehmen."
        canonicalPath="/404"
      />

      <div className="container-vae py-20 text-center">
        {/* Error Code */}
        <div className="relative mb-8">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
            <div className="h-96 w-96 rounded-full bg-vae-turquoise/20 blur-[120px]" />
          </div>
          <h1 className="relative text-[10rem] font-black leading-none tracking-[-0.08em] text-vae-turquoise/30 md:text-[14rem]">
            404
          </h1>
        </div>

        {/* Main Message */}
        <div className="relative z-10 mx-auto max-w-2xl space-y-6">
          <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white md:text-5xl">
            Diese Seite existiert nicht
          </h2>
          <p className="text-base leading-relaxed text-white/65 md:text-lg">
            Die aufgerufene URL konnte nicht gefunden werden. Möglicherweise wurde die Seite verschoben oder die Adresse
            ist veraltet. Nutzen Sie die Navigation oder die untenstehenden Links, um weiterzufahren.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-center">
            <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 bg-vae-turquoise px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition-transform hover:-translate-y-0.5"
              >
                <Home className="h-4 w-4" />
                Zur Startseite
              </Link>
            </MagneticButton>
            <MagneticButton intensity={0.05} scaleEffect className="isolate">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 border border-white/20 bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-vae-turquoise hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Suggested Links */}
        <div className="mx-auto mt-16 max-w-3xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.35em] text-vae-turquoise">Beliebte Seiten</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {suggestedPages.map(page => {
              const Icon = page.icon
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className="group flex items-center gap-3 border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition-all hover:-translate-y-1 hover:border-vae-turquoise/40"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-vae-turquoise/15 text-vae-turquoise transition-colors group-hover:bg-vae-turquoise/25">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-[0.1em] text-white/80 group-hover:text-white">
                    {page.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Help Text */}
        <div className="mx-auto mt-12 max-w-2xl border border-dashed border-white/15 px-6 py-4 text-sm text-white/50">
          <p>
            Brauchen Sie Hilfe? Kontaktieren Sie uns direkt über{' '}
            <Link to="/contact" className="font-bold text-vae-turquoise hover:underline">
              unser Kontaktformular
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
