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
    title: 'Self-Hosting & Infrastruktur',
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
    <div className="relative z-0 bg-gray-50 text-gray-900 dark:bg-bg-darker dark:text-text-light">
      <Seo
        title="Blog – Insights zu KI, Infrastruktur & Self-Hosting | VAE Systems"
        description="Knowledge Hub für KI, Self-Hosted-Infrastruktur und Open Source – kuratiert von VAE Systems."
        canonicalPath="/ressourcen/blog"
      />

      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#030806] py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--vae-turquoise-rgb),0.12),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-vae-turquoise" />
        <div className="pointer-events-none absolute right-[-4vw] top-8 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.03] xl:block">
          VAE
        </div>

        <div className="container-vae relative z-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-flex w-fit items-center gap-2 border border-vae-turquoise/35 bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.34em] text-vae-turquoise">
                <PenSquare className="h-3.5 w-3.5" /> Unser Blog
              </div>

              <h1 className="max-w-3xl">
                <span className="block text-[11vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-5xl lg:text-[4.8rem]">
                  Insights &amp;
                </span>
                <span className="mt-2 inline-block bg-vae-turquoise px-3 py-2 text-[9vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-black sm:px-5 sm:py-3 sm:text-4xl lg:text-[4rem]">
                  Knowledge Hub.
                </span>
              </h1>

              <div className="max-w-2xl border-l-4 border-white pl-4 text-base leading-relaxed text-white/75 sm:text-lg">
                Methoden, Learnings und Werkzeuge aus echten Projekten — ohne Paywall.
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate w-full sm:w-auto">
                  <a
                    href="https://docs.vae.systems/s/blog"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex w-full items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition-transform hover:-translate-y-0.5 sm:w-auto"
                  >
                    Blog öffnen
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </MagneticButton>
                <MagneticButton intensity={0.05} scaleEffect className="isolate w-full sm:w-auto">
                  <Link
                    to="/about/referenzen"
                    className="flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-vae-turquoise hover:bg-white/5 sm:w-auto"
                  >
                    Case Studies
                    <PenSquare className="h-4 w-4" />
                  </Link>
                </MagneticButton>
              </div>

              <div className="flex flex-wrap gap-3">
                {quickFacts.map(fact => (
                  <div key={fact.label} className="border border-white/10 bg-white/[0.04] px-4 py-2 text-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">
                      {fact.label}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-white">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 lg:max-w-md">
              <div aria-live="polite" className="border-2 border-white/15 bg-white/[0.03] p-8 text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-vae-turquoise">
                  Was erwartet Sie?
                </p>
                <ul className="mt-6 space-y-4 text-base leading-relaxed">
                  <li className="border border-white/10 bg-white/[0.02] px-5 py-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">
                      Deep Dives aus Projekten
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      Architektur-Skizzen, Repos und Entscheidungsgrundlagen – festgehalten wie in unseren
                      Projekträumen.
                    </p>
                  </li>
                  <li className="border border-white/10 bg-white/[0.02] px-5 py-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">
                      Übergangsweise auf Outline
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      Wir programmieren aktuell an einer eigenen Media-Plattform. Bis dahin nutzen wir Outline.
                    </p>
                  </li>
                </ul>
                <div className="mt-6 border border-dashed border-white/15 px-4 py-3 text-xs text-white/50">
                  Kein Tracking, keine Paywall.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-black/8 border-b bg-[#f4f1ec] py-20 dark:border-white/5 dark:bg-bg-dark">
        <div className="container-vae space-y-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-vae-turquoise">Themen</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
              Worüber wir schreiben
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-white/70">
              Jeder Artikel beantwortet Fragen, die Kund:innen und Partner uns stellen.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {topics.map(topic => (
              <div
                key={topic.title}
                className="group border border-vae-turquoise/25 bg-white/90 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-vae-turquoise/50 dark:border-vae-turquoise/20 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center bg-vae-turquoise/15 text-vae-turquoise">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-gray-900 dark:text-white">
                  {topic.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white/70">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-black/8 border-t bg-[#faf8f4] py-20 dark:border-white/5 dark:bg-bg-dark">
        <div className="container-vae flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-vae-turquoise">Navigation</p>
          <h3 className="text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white">
            Direkt Kontakt aufnehmen
          </h3>
          <p className="max-w-2xl text-base leading-relaxed text-gray-700 dark:text-white/70">
            Fragen zu einem Artikel oder direkter Austausch — wir sind per Mail erreichbar.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <MagneticButton intensity={0.05} scaleEffect className="isolate">
              <Link
                to="/"
                className="flex items-center gap-2 border border-gray-900 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-gray-900 transition-colors hover:bg-gray-900 hover:text-white dark:border-white/25 dark:text-white dark:hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Startseite
              </Link>
            </MagneticButton>
            <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate">
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-vae-turquoise px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition-transform hover:-translate-y-0.5"
              >
                Kontakt aufnehmen
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
