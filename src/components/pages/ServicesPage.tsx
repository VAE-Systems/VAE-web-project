import React from 'react'
import ServicesSection from '../sections/ServicesSection'
import TechStackSection from '../sections/TechStackSection'
import FAQSection from '../sections/FAQSection'

/**
 * ServicesPage Component
 * 
 * Dedicated page for Services with related sections
 */
const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="hero-section bg-bg-darker pt-32 pb-16">
        <div className="container-vae text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-vae-turquoise mb-6">
            Unsere Services
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Entdecken Sie unsere umfassenden KI-Lösungen und Dienstleistungen
          </p>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  )
}

export default ServicesPage
