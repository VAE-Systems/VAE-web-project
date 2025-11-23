import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'
import { testphaseBanner } from '@/content/home'
import { CheckCircle2, CalendarClock, Sparkle, ShieldCheck } from 'lucide-react'

const pilotSteps = [
  {
    title: 'Monat 1 · Setup & Übergabe',
    description:
      'Wir richten Ihre komplette Arbeitsinfrastruktur ein (Nextcloud, CRM, Kommunikation), migrieren vorhandene Daten und dokumentieren alles für Ihr Team.',
  },
  {
    title: 'Monat 2 · Optimierung & Integration',
    description:
      'Gemeinsam mit Ihren Fachbereichen bauen wir AI-gestützte Workflows, automatisieren Routineaufgaben und verbinden bestehende Tools.',
  },
  {
    title: 'Monat 3 · Erweiterung & Evaluation',
    description:
      'Wir ergänzen fortgeschrittene Features, bewerten die Ergebnisse und erarbeiten einen klaren Fahrplan für den Regelbetrieb.',
  },
]

const faq = [
  {
    q: 'Welche Voraussetzungen benötige ich?',
    a: 'Ein dedizierter Ansprechpartner, grundlegende Informationen zu Ihren Prozessen sowie Zugriff auf bestehende Systeme. Den Rest übernehmen wir.',
  },
  {
    q: 'Was passiert nach den 3 Monaten?',
    a: 'Sie entscheiden: Vollservice-Betreuung für €289/Monat, Infrastruktur-only für €89/Monat oder kostenfreie Beendigung inkl. vollständigem Datenexport.',
  },
  {
    q: 'Wie hoch sind die Serverkosten genau?',
    a: 'Die €89/Monat decken einen dedizierten Server (z. B. Hetzner CX52) inkl. Backup-Speicher. Auf Wunsch nutzen wir Ihre bestehende Infrastruktur.',
  },
  {
    q: 'Erhalte ich Zugriff auf alle Dokumentationen?',
    a: 'Ja. Runbooks, Konfigurationen und Automationen werden transparent dokumentiert, damit Sie jederzeit die volle Kontrolle behalten.',
  },
]

const TestphasePage: React.FC = () => {
  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="3-Monate Testphase – Arbeitsinfrastruktur & AI testen | VAE Systems"
        description="Komplette Open-Source-Arbeitsinfrastruktur in drei Monaten einführen, mit KI optimieren und für nur die Serverkosten testen. Danach frei entscheiden."
        canonicalPath="/testphase"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-vae-turquoise/30 bg-gradient-to-br from-vae-turquoise via-vae-turquoise/95 to-vae-turquoise-dark py-28 text-bg-darker">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.4),transparent_60%),radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.28),transparent_60%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.25),transparent_65%)]" />
        </div>
        <div className="container-vae relative">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              <Sparkle className="h-4 w-4" /> Pilotprogramm
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">{testphaseBanner.headline}</h1>
            <p className="text-lg leading-relaxed text-white/90">{testphaseBanner.description}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/contact" className="btn-primary flex items-center justify-center gap-2 text-base">
                <Sparkle className="h-5 w-5" />
                {testphaseBanner.primaryCta}
              </Link>
              <Link
                to="/infrastruktur"
                className="btn-outline flex items-center justify-center gap-2 text-base text-white"
              >
                {testphaseBanner.secondaryCta}
              </Link>
            </div>
            <p className="text-sm text-white/80">
              Testphase gesamt: <span className="font-semibold">€267</span>. Danach frei wählbar: Vollservice für
              €289/Monat, Infrastruktur-only für €89/Monat oder kostenfreie Beendigung mit Datenexport.
            </p>
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section id="leistungen" className="border-b border-bg-secondary py-24">
        <div className="container-vae grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="h2 heading-gradient mb-6 text-text-light">Was in den 3 Monaten enthalten ist</h2>
            <p className="mb-8 text-lg leading-relaxed text-text-secondary">
              Wir liefern eine vollständig eingerichtete Arbeitsumgebung auf Open-Source-Basis – inklusive AI-Workflows,
              Dokumentation und Enablement Ihres Teams.
            </p>
            <div className="grid gap-3 text-sm text-text-secondary sm:grid-cols-2">
              {testphaseBanner.inclusions.map(item => (
                <div
                  key={item}
                  className="bg-bg-primary/10 flex items-start gap-3 rounded-xl border border-vae-turquoise/20 px-4 py-3"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-bg-primary/20 space-y-5 rounded-2xl border border-vae-turquoise/30 p-8 text-sm text-text-secondary">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-vae-turquoise">Kostenstruktur</h3>
            <p className="text-lg font-medium text-text-light">{testphaseBanner.pricingDetails}</p>
            <ul className="space-y-3">
              <li>Kein Setup-Honorar – nur Serverkosten während der Pilotphase.</li>
              <li>Vollservice-Tarif deckt Wartung, Optimierung, Support & Feature-Releases ab.</li>
              <li>Sie behalten jederzeit die volle Datenhoheit und können den Betrieb übernehmen.</li>
            </ul>
            <Link to="/contact" className="btn-secondary inline-flex items-center justify-center gap-2">
              <CalendarClock className="h-4 w-4" /> Strategiegespräch buchen
            </Link>
          </aside>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container-vae">
          <h2 className="h2 heading-gradient mb-10 text-center text-text-light">Ablauf der Testphase</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {pilotSteps.map(step => (
              <div
                key={step.title}
                className="bg-bg-primary/10 relative rounded-2xl border border-vae-turquoise/20 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-vae-turquoise/50 hover:shadow-[0_8px_28px_-12px_rgba(var(--vae-turquoise-rgb),0.4)]"
              >
                <span className="mb-3 block text-xs font-semibold uppercase tracking-wide text-vae-turquoise/80">
                  {step.title}
                </span>
                <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS Comparison */}
      <section className="border-y border-bg-secondary py-24">
        <div className="container-vae">
          <div className="mb-10 text-center">
            <h2 className="h2 heading-gradient text-text-light">Vergleich zu typischen SaaS-Kosten</h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-secondary">
              Für ein Team mit 10 Mitarbeitenden liegen die monatlichen SaaS-Kosten schnell bei über €900. Mit VAE
              behalten Sie die volle Kontrolle – inklusive AI-Optimierung und Betreuung.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 p-6 text-sm text-rose-100">
              <h3 className="mb-4 text-lg font-semibold text-rose-100">SaaS-Abos (typische Auswahl)</h3>
              <ul className="space-y-2">
                <li>Microsoft 365 Business Premium – €540/Monat</li>
                <li>Dropbox Business Advanced – €150/Monat</li>
                <li>Slack Pro – €75/Monat</li>
                <li>CRM (HubSpot / Pipedrive) – €200/Monat</li>
              </ul>
              <p className="mt-6 text-base font-semibold text-rose-50">Gesamt: €965/Monat</p>
            </div>
            <div className="rounded-2xl border border-vae-turquoise/40 bg-vae-turquoise/10 p-6 text-sm text-text-secondary">
              <h3 className="mb-4 text-lg font-semibold text-text-light">VAE Systems Infrastruktur</h3>
              <ul className="space-y-2">
                <li>Server & Backups – €89/Monat (Pilotphase & Infrastruktur Only)</li>
                <li>Vollservice inkl. AI-Optimierung – €289/Monat</li>
                <li>Kein Lizenz-Lock-in, volle Datenhoheit</li>
                <li>Kontinuierliche Weiterentwicklung & Support enthalten</li>
              </ul>
              <p className="mt-6 text-base font-semibold text-text-light">Gesamt Vollservice: €289/Monat</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container-vae max-w-4xl">
          <h2 className="h2 heading-gradient mb-10 text-text-light">Häufige Fragen</h2>
          <div className="space-y-6">
            {faq.map(item => (
              <div key={item.q} className="border-border-primary bg-bg-primary/5 rounded-2xl border p-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-vae-turquoise/80">{item.q}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/contact" className="btn-primary flex flex-1 items-center justify-center gap-2">
              <CalendarClock className="h-4 w-4" />
              Strategiegespräch buchen
            </Link>
            <Link to="/vae-core" className="btn-outline flex flex-1 items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Mehr zur Plattform erfahren
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TestphasePage
