import React from 'react'

const outcomes = [
  {
    label: 'Kosten',
    before: 'Wachsende SaaS-Abos, Per-User-Pricing, unplanbare Monatsrechnungen.',
    after: 'Einmalige Setup-Investition. Hosting-Kosten planbar. Keine Preiserhöhungen.',
    metric: '∅ €2.400 / Monat weniger',
  },
  {
    label: 'Kontrolle',
    before: 'Kundendaten auf fremden Servern. Vendor entscheidet über Features und Preise.',
    after: 'Server bei Hetzner Deutschland. Volle Datenhoheit. DSGVO ohne Interpretationsspielraum.',
    metric: '100% Ihre Infrastruktur',
  },
  {
    label: 'Tempo',
    before: 'Endlose Tool-Evaluation, Proof-of-Concepts die in der Schublade landen.',
    after: 'Setup, Migration und Übergabe in 3–6 Wochen. Produktiv. Nicht fast fertig.',
    metric: '3–6 Wochen bis live',
  },
]

const OutcomesStripSection: React.FC = () => {
  return (
    <section className="bg-[#faf8f4] py-20 text-black sm:py-24">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <div className="mb-14 flex items-end justify-between gap-6 border-b-2 border-black pb-6">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.34em] text-vae-turquoise">
              Was sich wirklich ändert
            </p>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black uppercase leading-[0.95] tracking-[-0.06em]">
              Vorher. Nachher.
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-black/55 sm:block">
            Keine Features. Keine Buzzwords. Konkrete Veränderungen für Ihr Unternehmen.
          </p>
        </div>

        {/* Outcomes */}
        <div className="space-y-0">
          {outcomes.map((o, i) => (
            <div
              key={o.label}
              className="grid grid-cols-1 gap-0 border-b-2 border-black last:border-b-0 sm:grid-cols-[80px_1fr_1fr]"
            >
              {/* Nummer + Label */}
              <div className="flex items-start gap-3 bg-black px-5 py-6 sm:flex-col sm:gap-2">
                <span className="text-3xl font-black leading-none tracking-[-0.06em] text-vae-turquoise">0{i + 1}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-white/50 sm:mt-auto">
                  {o.label}
                </span>
              </div>

              {/* Vorher */}
              <div className="border-b-2 border-black bg-white px-6 py-6 sm:border-b-0 sm:border-r-2">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-red-500/70">Heute</p>
                <p className="text-sm leading-relaxed text-black/65">{o.before}</p>
              </div>

              {/* Nachher */}
              <div className="bg-vae-turquoise px-6 py-6">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-black/55">Mit VAE</p>
                <p className="text-sm leading-relaxed text-black/85">{o.after}</p>
                <p className="mt-4 inline-block border border-black/20 bg-black/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
                  {o.metric}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OutcomesStripSection
