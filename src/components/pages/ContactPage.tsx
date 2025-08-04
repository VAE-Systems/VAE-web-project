import React from 'react'
import ContactSection from '../sections/ContactSection'
import ServicesSection from '../sections/ServicesSection'
import FAQSection from '../sections/FAQSection'

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

      {/* Contact Section */}
      <ContactSection />

      {/* Services Section */}
      <ServicesSection />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  )
}

export default ContactPage
