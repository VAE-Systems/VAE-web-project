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
    <div className="relative z-0 flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker dark:text-text-light">
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
          <h1 className="relative text-[10rem] font-bold leading-none text-vae-turquoise/20 dark:text-vae-turquoise/30 md:text-[14rem]">
            404
          </h1>
        </div>

        {/* Main Message */}
        <div className="relative z-10 mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
            Diese Seite existiert nicht
          </h2>
          <p className="text-base leading-relaxed text-gray-700 dark:text-text-secondary md:text-lg">
            Die aufgerufene URL konnte nicht gefunden werden. Möglicherweise wurde die Seite verschoben oder die Adresse
            ist veraltet. Nutzen Sie die Navigation oder die untenstehenden Links, um weiterzufahren.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-center">
            <MagneticButton>
              <Link to="/" className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-base">
                <Home className="h-5 w-5" />
                Zur Startseite
              </Link>
            </MagneticButton>
            <MagneticButton>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn-outline flex items-center justify-center gap-2 px-8 py-4 text-base"
              >
                <ArrowLeft className="h-5 w-5" />
                Zurück
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Suggested Links */}
        <div className="mx-auto mt-16 max-w-3xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise/70">
            Beliebte Seiten
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {suggestedPages.map(page => {
              const Icon = page.icon
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className="group flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-left transition-all hover:-translate-y-1 hover:border-vae-turquoise/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-vae-turquoise/30 dark:hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-vae-turquoise/10 text-vae-turquoise transition-colors group-hover:bg-vae-turquoise/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-text-light dark:text-white">{page.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Help Text */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-dashed border-gray-200 px-6 py-4 text-sm text-gray-600 dark:border-white/20 dark:text-white/60">
          <p>
            <strong>Brauchen Sie Hilfe?</strong> Falls Sie eine bestimmte Seite suchen oder Fragen haben, kontaktieren
            Sie uns gerne direkt über{' '}
            <Link to="/contact" className="font-semibold text-vae-turquoise hover:underline">
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
