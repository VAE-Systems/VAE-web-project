import { ArrowLeft, ArrowUpRight, ExternalLink, PenSquare } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

import Seo from '@/components/ui/Seo'
import MagneticButton from '@/components/ui/buttons/MagneticButton'

const topics = [
  {
    title: 'KI & Automatisierung',
    description: 'Operationalisierbare KI-Workflows, Prompt-Standards und Automatisierung in regulierten Umgebungen.',
  },
  {
    title: 'Open Source & Infrastruktur',
    description: 'Selfhosting, Vendor-Souveränität und Observability – mit Playbooks, die sich direkt anwenden lassen.',
  },
  {
    title: 'Produkt & Strategie',
    description: 'Research zu Produkt-Discovery, Governance sowie Lessons Learned aus VAE-Projekten.',
  },
]

const quickFacts = [
  { label: 'Tempo', value: 'Wöchentlich neue Beiträge' },
  { label: 'Format', value: 'Deep Dives, Playbooks, Recaps' },
  { label: 'Zugriff', value: 'Externe Docs – ohne Paywall' },
]

const BlogPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-bg-darker dark:text-text-light">
      <Seo
        title="Blog | VAE Systems"
        description="Knowledge Hub für KI, Open-Source-Infrastruktur und produktive Digitalisierung – kuratiert von VAE Systems."
        canonicalPath="/ressourcen/blog"
      />

      <section className="relative overflow-hidden border-b border-gray-200/80 bg-gradient-to-b from-white via-[#f2fff8] to-white py-28 dark:border-white/5 dark:from-bg-darker dark:via-[#050505] dark:to-bg-dark">
        <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(5,199,160,0.12),transparent_75%)] dark:bg-[radial-gradient(circle_at_top,rgba(var(--vae-turquoise-rgb),0.28),transparent_55%),radial-gradient(circle_at_bottom,rgba(5,248,200,0.12),transparent_75%)]" />
          <div className="absolute inset-x-0 top-0 mx-auto h-64 w-[90%] rounded-[40px] border border-gray-100/80 bg-white/60 blur-3xl dark:border-white/10 dark:bg-white/[0.02]" />
        </div>
        <div className="container-vae relative flex flex-col gap-16 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/80">
              Unser Blog
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-gray-900 dark:text-white md:text-5xl">
              Insights & Knowledge Hub für souveräne Tech-Projekte
            </h1>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-text-secondary">
              Beiträge aus echten Projekten, Workshops und internen Playbooks. Wir erklären, wie wir KI, Open Source und
              Produktentwicklung kombinieren – transparent, dokumentiert und ohne Buzzword-Overload.
            </p>
            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center lg:justify-start">
              <MagneticButton className="flex-1">
                <a
                  href="https://docs.vae.systems/s/blog"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-primary inline-flex w-full items-center justify-center gap-3 px-8 py-4 text-base font-semibold"
                >
                  Blog öffnen
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </MagneticButton>
              <MagneticButton className="flex-1">
                <Link
                  to="/referenzen"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 transition-colors hover:border-vae-turquoise/60 hover:text-white"
                >
                  Case Studies ansehen
                  <PenSquare className="h-4 w-4" />
                </Link>
              </MagneticButton>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              {quickFacts.map(fact => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-gray-200/80 bg-white px-5 py-3 text-left text-sm text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75"
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-vae-turquoise/70">{fact.label}</p>
                  <p className="mt-1 font-semibold text-gray-900 dark:text-white">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div
              aria-live="polite"
              className="rounded-[32px] border border-gray-200/80 bg-white/90 p-8 text-left shadow-[0_25px_70px_rgba(15,23,42,0.12)] transition-[height,width,opacity] duration-300 ease-out dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_25px_70px_rgba(0,0,0,0.4)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">
                Was erwartet Sie?
              </p>
              <ul className="mt-6 space-y-5 text-base leading-relaxed text-gray-700 dark:text-white/80">
                <li className="rounded-2xl border border-gray-200/80 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">
                    Deep Dives aus Projekten
                  </p>
                  <p className="mt-2 text-sm text-gray-700 dark:text-white/70">
                    Architektur-Skizzen, Repos und Entscheidungsgrundlagen – festgehalten wie in unseren Projekträumen.
                  </p>
                </li>
                <li className="rounded-2xl border border-gray-200/80 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">
                    Externer Zugang
                  </p>
                  <p className="mt-2 text-sm text-gray-700 dark:text-white/70">
                    Der Blog liegt auf unserer Dokumentationsplattform. Link öffnet in einem neuen Tab, damit Sie hier
                    bleiben können.
                  </p>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-dashed border-gray-200 px-4 py-3 text-xs text-gray-600 dark:border-white/20 dark:text-white/60">
                Hinweis: Kein Tracking, keine Paywall. Wenn Sie Fragen zu einem Beitrag haben, erreichen Sie uns direkt
                über Kontakt oder LinkedIn.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white py-20 dark:border-white/5 dark:bg-bg-dark">
        <div className="container-vae space-y-10">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Themen</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Worüber wir schreiben
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-white/70">
              Jeder Artikel beantwortet Fragen, die Kund:innen und Partner uns stellen. Wir dokumentieren
              Entscheidungen, Lessons Learned und konkrete Playbooks.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {topics.map(topic => (
              <div
                key={topic.title}
                className="group rounded-[28px] border border-gray-200 bg-white p-6 text-left shadow-[0_20px_50px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:border-vae-turquoise/50 dark:border-white/10 dark:bg-white/[0.02] dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:hover:border-vae-turquoise/40"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-vae-turquoise dark:border-white/15 dark:bg-white/[0.04]">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white/70">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 dark:border-white/5 dark:from-bg-dark dark:via-bg-darker dark:to-bg-dark">
        <div className="container-vae flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Navigation</p>
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Zurück zur Website oder direkt Kontakt aufnehmen
          </h3>
          <p className="max-w-3xl text-base leading-relaxed text-gray-700 dark:text-white/70">
            Sie können jederzeit zurück auf die Startseite oder direkt mit uns sprechen. Wir schicken Ihnen gerne
            relevante Artikel oder beantworten Detailfragen aus dem Blog.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <MagneticButton>
              <Link to="/" className="btn-outline flex items-center gap-2 text-base">
                <ArrowLeft className="h-5 w-5" />
                Zurück zur Hauptseite
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/kontakt" className="btn-primary flex items-center gap-2 text-base">
                Kontakt aufnehmen
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
