import React from 'react'
import Seo from '../ui/Seo'
import { CheckCircle2, ServerCog, ShieldCheck, Users } from 'lucide-react'

const infrastructureFeatures = [
  {
    title: 'Nextcloud Business Suite',
    description: 'Dateien, Kalender, Kommunikation & Wissensräume – vollständig konfiguriert für Ihr Team.',
  },
  {
    title: 'CRM & Automationsmodule',
    description: 'Odoo oder eine passende Open-Source-Alternative – inkl. Pipelines, Automationen und Dashboards.',
  },
  {
    title: 'Security & Backup Framework',
    description: 'Härtung, Monitoring, Backup-Strategie sowie Zero-Downtime Updates sorgen für resiliente Systeme.',
  },
  {
    title: 'Team Enablement & Dokumentation',
    description: 'Runbooks, Onboarding-Sessions und Zugriff auf alle Konfigurationen sichern Ihr internes Wissen.',
  },
]

const implementationSteps = [
  'Kick-off & Systeminventar – wir erfassen bestehende Systeme, Nutzer und Sicherheitsanforderungen.',
  'Architektur & Hosting – Auswahl des passenden Hosting-Setups (dedizierter Server oder vorhandene Infrastruktur).',
  'Rollout & Migration – Datenmigration, Benutzeranlage, Rechte- & Rollenmodell sowie Branding.',
  'Testing & Übergabe – Abnahme mit Key Usern, Dokumentation, Runbooks und Onboarding des Teams.',
]

const InfrastrukturPage: React.FC = () => {
  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Arbeitsinfrastruktur einrichten – Nextcloud & Odoo | VAE Systems"
        description="Wir richten Ihre Open-Source-Arbeitsinfrastruktur produktiv ein: Nextcloud, CRM, Kommunikationstools, Security und Backups – inklusive Dokumentation und Enablement."
        canonicalPath="/infrastruktur"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-vae-turquoise/25 bg-gradient-to-br from-bg-dark via-bg-darker to-bg-dark py-28">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--vae-turquoise-rgb),0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)]" />
        </div>
        <div className="container-vae relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-vae-turquoise">
              <ServerCog className="h-4 w-4" /> Infrastruktur Setup
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Ihre komplette Arbeitsumgebung – professionell eingerichtet
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              Wir kombinieren Nextcloud, CRM, Kommunikationstools und Automationen zu einer produktiven Umgebung – mit
              Security, Backups und Dokumentation. Alles läuft auf Ihrer Infrastruktur, DSGVO-konform und ohne
              SaaS-Lock-in.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="/testphase" className="btn-primary flex items-center justify-center gap-2 text-base">
                3-Monate Testphase starten
              </a>
              <a href="/contact" className="btn-outline flex items-center justify-center gap-2 text-base">
                Strategiegespräch vereinbaren
              </a>
            </div>
            <p className="text-sm text-text-secondary">
              Projektlaufzeit: <span className="font-semibold text-text-light">2–4 Wochen</span> · Keine Setup-Gebühr in
              der Testphase – nur €89/Monat Serverkosten.
            </p>
          </div>

          <aside className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/25 p-8 text-sm text-text-secondary">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-vae-turquoise/80">
              Typisches Setup umfasst
            </h3>
            <ul className="space-y-3">
              {infrastructureFeatures.map(feature => (
                <li key={feature.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" />
                  <div>
                    <span className="block font-medium text-text-light">{feature.title}</span>
                    <span className="block text-sm text-text-secondary/90">{feature.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Implementation steps */}
      <section className="border-b border-bg-secondary py-24">
        <div className="container-vae">
          <h2 className="h2 heading-gradient mb-10 text-text-light">So läuft die Implementierung ab</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {implementationSteps.map(step => (
              <div
                key={step}
                className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/20 p-6 text-sm leading-relaxed text-text-secondary"
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container-vae">
          <h2 className="h2 heading-gradient mb-12 text-center text-text-light">
            Warum eine selbstgehostete Infrastruktur?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/20 p-6 text-sm leading-relaxed text-text-secondary">
              <ShieldCheck className="mb-4 h-8 w-8 text-vae-turquoise" />
              <h3 className="mb-2 text-base font-semibold text-text-light">Datenhoheit & Sicherheit</h3>
              <p>Alle Daten bleiben unter Ihrer Kontrolle – inklusive Audit-Logs, Zero-Trust-Konzept und Backups.</p>
            </div>
            <div className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/20 p-6 text-sm leading-relaxed text-text-secondary">
              <Users className="mb-4 h-8 w-8 text-vae-turquoise" />
              <h3 className="mb-2 text-base font-semibold text-text-light">Nahtlose Zusammenarbeit</h3>
              <p>Cloud-Kollaboration, Wissensspeicher, CRM und Support-Tools greifen ineinander – ohne Tool-Silos.</p>
            </div>
            <div className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/20 p-6 text-sm leading-relaxed text-text-secondary">
              <ServerCog className="mb-4 h-8 w-8 text-vae-turquoise" />
              <h3 className="mb-2 text-base font-semibold text-text-light">Ausbaufähig mit KI</h3>
              <p>Die Architektur ist AI-ready: Workflows, Automationen und Analytics lassen sich direkt andocken.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InfrastrukturPage
