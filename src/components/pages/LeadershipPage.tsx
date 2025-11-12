import React from 'react'

const LeadershipPage: React.FC = () => {
  return (
    <section className="bg-bg-darker py-24 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Über uns</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Leitung</h1>
        <p className="mt-6 text-lg text-white/70">
          Die ausführlichen Profile von Julian Goertz Dini & Jakob Dünnebeil werden hier vorbereitet. Bis zum Launch der
          Content-Serie finden Sie die wichtigsten Stationen, Rollen und Empfehlungen gebündelt.
        </p>
        <div className="mt-12 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">CEO</p>
            <h2 className="text-2xl font-semibold">Julian Goertz Dini</h2>
            <p className="mt-2 text-white/70">Strategie, Operations, Kundenbeirat.</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">CTO</p>
            <h2 className="text-2xl font-semibold">Jakob Dünnebeil</h2>
            <p className="mt-2 text-white/70">Architektur, Automatisierung, KI-Integrationen.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadershipPage
