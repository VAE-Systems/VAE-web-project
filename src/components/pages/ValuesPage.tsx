import React from 'react'

const VALUES = [
  {
    title: 'Transparenz',
    description: 'Wir arbeiten Open Source First und dokumentieren jede Entscheidungsgrundlage.',
  },
  {
    title: 'Ownership',
    description: 'Eigenverantwortliche Teams mit klarem Qualitätsanspruch.',
  },
  {
    title: 'Zukunftsfähigkeit',
    description: 'Lösungen sind modular, auditierbar und skalierbar.',
  },
  {
    title: 'Kundenfokus',
    description: 'Wir liefern nachvollziehbare Strategien statt Black-Box-Magie.',
  },
]

const ValuesPage: React.FC = () => {
  return (
    <section className="bg-bg-darker py-24 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Über uns</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Unsere Werte</h1>
        <p className="mt-6 text-lg text-white/70">
          Diese Seite dient als Einstieg für das spätere Culture Deck. Hier halten wir bereits fest, wofür VAE Systems
          in Projekten steht.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {VALUES.map(value => (
            <article key={value.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold">{value.title}</h2>
              <p className="mt-3 text-white/70">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesPage
