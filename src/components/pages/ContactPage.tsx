import React from 'react'
import ContactSection from '../sections/ContactSection'
const FAQSection = React.lazy(() => import('../sections/FAQSection'))

/**
 * ContactPage Component
 * 
 * Dedicated page for Contact with related sections
 */
const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="hero-section bg-bg-darker pt-32 pb-16">
        <div className="container-vae text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-vae-turquoise mb-6">
            Kontakt
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Lassen Sie uns über Ihr nächstes KI-Projekt sprechen
          </p>
        </div>
      </section>

      {/* Pre-Contact Trust Section */}
      <section className="py-24 bg-gradient-to-br from-bg-dark via-bg-secondary to-bg-darker">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, hsla(var(--color-vae-turquoise), 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, hsla(var(--color-vae-turquoise), 0.03) 0%, transparent 50%)
              `
            }}
          />
        </div>

        <div className="relative container-vae">
          {/* Element 1: Intro-Textblock */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Von der Idee zur Umsetzung – und darüber hinaus.
            </h2>
            <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Wir entwickeln KI-gestützte Systeme, die aktuelle Herausforderungen lösen und 
              gleichzeitig ein stabiles Fundament für die Zukunft Ihres Unternehmens schaffen.
            </p>
          </div>

          {/* Element 2: Drei USP-Kacheln */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* USP 1: Schnelle Umsetzung */}
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-vae-turquoise group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">
                  bolt
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Schnelle Umsetzung
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Von der Idee zum funktionierenden Prototyp in wenigen Wochen – mit klarer 
                Kommunikation und direkten Ansprechpartnern.
              </p>
            </div>

            {/* USP 2: Verlässliche Systeme */}
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-vae-turquoise group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">
                  verified
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Verlässliche Systeme
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Wir liefern Lösungen, die robust, nachvollziehbar und sicher sind – 
                für den echten Einsatz in Ihrem Unternehmen.
              </p>
            </div>

            {/* USP 3: Zukunftsfähige Technologie */}
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-vae-turquoise group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">
                  auto_awesome
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Zukunftsfähige Technologie
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Unsere Automatisierungen legen ein Fundament, das mit Ihrem Unternehmen 
                wächst und langfristig Mehrwert schafft.
              </p>
            </div>
          </div>

          {/* Element 3: Micro-CTA */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 rounded-2xl p-8 border border-vae-turquoise/20">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Bereit, Ihr Projekt zu starten?
              </h3>
              <p className="text-text-secondary mb-4">
                Senden Sie uns Ihre Anfrage – wir melden uns innerhalb von 24 Stunden.
              </p>
              <div className="flex items-center justify-center text-vae-turquoise">
                <span className="mr-2">Zum Kontaktformular</span>
                <span className="material-symbols-outlined animate-bounce">
                  keyboard_arrow_down
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* FAQ Section */}
      <React.Suspense fallback={<div className="py-24 text-center text-text-muted text-sm">Lade FAQ…</div>}>
        <FAQSection />
      </React.Suspense>
    </div>
  )
}

export default ContactPage
