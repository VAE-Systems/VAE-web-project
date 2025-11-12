import { Link } from 'react-router-dom'
import React from 'react'

const TechStackResourcePage: React.FC = () => {
  return (
    <section className="bg-bg-darker py-24 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Ressourcen</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Tech-Stack</h1>
        <p className="mt-6 text-lg text-white/70">
          Dieser Bereich wird derzeit aufgebaut. Bald finden Sie hier eine detaillierte Übersicht aller
          Open-Source-Lösungen, die wir in Kundenprojekten einsetzen – inklusive Best Practices, Sicherheitsarchitektur
          und Erweiterbarkeit.
        </p>
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
          <p>
            Benötigen Sie bereits jetzt konkrete Informationen? Schreiben Sie uns über{' '}
            <Link to="/contact" className="font-semibold text-vae-turquoise">
              das Kontaktformular
            </Link>{' '}
            und wir stellen Ihnen einen kuratierten Stack zusammen.
          </p>
        </div>
      </div>
    </section>
  )
}

export default TechStackResourcePage
