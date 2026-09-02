import React from 'react'

const PRINCIPLES = [
  {
    title: 'Material ernst nehmen',
    body: 'Software ist unser Steinblock: Wir bearbeiten sie, bis Struktur und Oberfläche zusammenpassen. Entscheidungen sind bewusst, nicht zufällig.',
  },
  {
    title: 'Tempo mit Präzision koppeln',
    body: 'Wir arbeiten schnell, aber nie hektisch. Jedes Artefakt – vom Wireframe bis zur Migration – folgt klaren Qualitätsritualen.',
  },
  {
    title: 'Form folgt Nutzung',
    body: 'Design ist fertig, wenn Nutzer:innen ohne Anleitung ans Ziel kommen. Performance, Accessibility und Emotion werden gleichermaßen geplant.',
  },
  {
    title: 'Offen legen, wie es entsteht',
    body: 'Werkstatt statt Blackbox: Sie sehen Prozesse, Werkzeuge und Zwischenschritte. Nur so kann Vertrauen wachsen.',
  },
]

export const HeritageSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-t border-black/5 bg-gradient-to-b from-bg-dark to-bg-darker py-24 dark:border-white/5">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_70%)] mix-blend-soft-light" />
      </div>
      <div className="container-vae relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise/70">
            Unsere Geschichte
          </p>
          <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Design als Familienhandwerk</h2>
          <p className="text-base leading-relaxed text-text-secondary">
            VAE Systems entstand in einer Werkstatt, in der Kunst genauso präzise geplant wird wie Architektur. Julian
            Goertz wuchs zwischen den Ateliers seiner Familie auf – Designerin Eva Julia Goertz, Malerin Christa Goertz
            und Bildhauer Jürgen Goertz. Form, Material und Geduld sind dort keine Buzzwords, sondern tägliche Praxis.
          </p>
          <p className="text-base leading-relaxed text-text-secondary">
            Diese Herkunft prägt unsere Arbeit in Produktentwicklung, Design und Engineering. Wir dokumentieren Prozesse
            offen, iterieren sichtbar und geben jedem Detail einen Zweck. Deshalb fühlt sich Software von VAE immer wie
            Handwerk an – nachvollziehbar, langlebig und charaktervoll.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/ueber-uns/design-handwerk" className="btn-outline inline-flex items-center gap-2">
              Mehr über das Designhandwerk
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map(principle => (
            <div
              key={principle.title}
              className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 text-text-light shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise/70">
                Prinzip
              </p>
              <h3 className="mt-2 text-lg font-semibold text-text-light">{principle.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
