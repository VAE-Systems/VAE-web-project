import { Link } from 'react-router-dom'
import React from 'react'

const CareerPage: React.FC = () => {
  return (
    <section className="bg-bg-darker py-24 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Über uns</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Karriere & Netzwerk</h1>
        <p className="mt-6 text-lg text-white/70">
          Wir erweitern unser Expertennetzwerk laufend. Diese Seite wird später Use-Cases, Projektstrukturen und
          Anforderungen an Freelancer:innen beinhalten.
        </p>
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/80">
            Wenn du Teil des Netzwerks werden möchtest, schick uns eine kurze Nachricht über{' '}
            <Link to="/contact" className="font-semibold text-vae-turquoise">
              das Kontaktformular
            </Link>
            . Wir melden uns mit den nächsten Schritten.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CareerPage
