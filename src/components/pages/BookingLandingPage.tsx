import { ArrowRight, BookOpen, CalendarDays, Compass, HelpCircle } from 'lucide-react'
import React from 'react'

import MagneticButton from '../ui/buttons/MagneticButton'
import Seo from '../ui/Seo'

const RESOURCE_LINKS = [
  {
    title: 'Was erwartet Sie?',
    href: 'https://docs.vae.systems/s/erstberatung-ablauf',
    description:
      'Transparenter Ablauf, Agenda und Ergebnisse des 30-minütigen Calls – damit Sie genau wissen, was kommt.',
    icon: Compass,
  },
  {
    title: 'Vorbereitung',
    href: 'https://docs.vae.systems/s/vorbereitung-erstberatung',
    description:
      'Die wichtigsten Unterlagen & Fragen, damit wir sofort tief einsteigen können – optional, aber hilfreich.',
    icon: BookOpen,
  },
  {
    title: 'FAQ',
    href: 'https://docs.vae.systems/s/erstberatung-faq',
    description: 'Antworten auf Budget-, Timeline- und Security-Fragen, die uns am häufigsten gestellt werden.',
    icon: HelpCircle,
  },
]

const BOOKING_URL = 'https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz'

const BookingLandingPage: React.FC = () => {
  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Kostenlose Erstberatung | VAE Systems"
        description="Buchen Sie Ihre kostenlose 30-minütige Erstberatung mit VAE Systems. Überblick über Ablauf, Vorbereitung und FAQ – inklusive direkter Terminbuchung."
        canonicalPath="/termin-buchen"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-bg-darker to-[#050505]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(var(--color-vae-turquoise)_/_0.25),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(0,80,255,0.12),transparent_45%)]" />
        </div>
        <div className="container-vae relative flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
          <img
            src="/App_Logo_light.svg"
            alt="VAE Systems"
            className="h-20 w-auto drop-shadow-[0_15px_80px_rgba(0,0,0,0.35)]"
            loading="lazy"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
            VAE Systems
          </span>
          <div className="space-y-5">
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">Kostenlose Erstberatung</h1>
            <p className="text-lg text-text-secondary md:text-xl">
              30 Minuten Video-Call mit unserem Strategy & Infrastructure Team.
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-bg-darker py-20">
        <div className="container-vae">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <p className="text-lg text-white/90 md:text-xl">
              Willkommen bei VAE Systems – Versatile AI Enhanced Systems. In diesem 30-minütigen Video-Call skizzieren
              wir die Ausgangslage, bewerten Infrastruktur & Prozesse und geben Ihnen konkrete nächste Schritte an die
              Hand.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {RESOURCE_LINKS.map(link => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex flex-col gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 transition hover:border-vae-turquoise/50"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
                    <link.icon className="h-5 w-5 text-white" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">{link.title}</h3>
                    <p className="text-sm text-white/70">{link.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">
                    Öffnen
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-8 text-sm text-white/70">
              Die Beratung ist kostenlos &amp; unverbindlich. Alle Angaben werden vertraulich behandelt.
            </p>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="border-t border-white/5 bg-gradient-to-b from-[#050505] to-bg-darker py-20">
        <div className="container-vae flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/80">Termin</p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Termin jetzt buchen</h2>
          <p className="max-w-2xl text-base text-text-secondary">
            Wir blocken 30 Minuten für Ihren Use Case, priorisieren Fragen vorab und geben ein klares Go/No-Go nach dem
            Call.
          </p>
          <MagneticButton intensity={0.08} className="w-full sm:w-auto">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary inline-flex w-full items-center justify-center gap-3 px-10 py-4 text-base font-semibold uppercase tracking-[0.25em]"
            >
              Jetzt Termin wählen
              <CalendarDays className="h-5 w-5" />
            </a>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}

export default BookingLandingPage
