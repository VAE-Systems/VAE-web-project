import { Link } from 'react-router-dom'
import React from 'react'

const ResourcesBlogPage: React.FC = () => {
  return (
    <section className="bg-bg-darker py-24 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Ressourcen</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Blog & Insights</h1>
        <p className="mt-6 text-lg text-white/70">
          Hier entsteht unser Knowledge Hub mit Artikeln zu KI-Integration, Open-Source-Governance und VAEKTRA CORE. Wir
          veröffentlichen demnächst die ersten Beiträge und stellen Leseproben zur Verfügung.
        </p>
        <div className="mt-12 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
          <p>Abonnieren Sie den Newsletter und erhalten Sie frühzeitig Updates zu neuen Artikeln.</p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-vae-turquoise px-5 py-2 text-sm font-semibold text-vae-turquoise"
          >
            Newsletter anfragen
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ResourcesBlogPage
