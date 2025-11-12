import React from 'react'

const FAQ_ENTRIES = [
  'Was kostet eine Beratung?',
  'Wie lange dauert ein Infrastrukturprojekt?',
  'Arbeitet ihr remote oder vor Ort?',
  'Welche Branchen betreut ihr?',
  'Was bedeutet "Open Source First" in der Praxis?',
]

const ResourcesFaqPage: React.FC = () => {
  return (
    <section className="bg-bg-darker py-24 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Ressourcen</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">FAQ</h1>
        <p className="mt-6 text-lg text-white/70">
          Wir sammeln derzeit die häufigsten Fragen aus Beratungsgesprächen. Diese Seite wird laufend erweitert und in
          Zukunft mit Such- & Filterfunktionen ausgestattet.
        </p>
        <div className="mt-12 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          {FAQ_ENTRIES.map(entry => (
            <div key={entry} className="rounded-xl border border-white/5 bg-black/10 p-4 text-white/80">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResourcesFaqPage
