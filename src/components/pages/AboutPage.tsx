import React from 'react'
import AboutSection from '../sections/AboutSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import TechStackSection from '../sections/TechStackSection'

/**
 * AboutPage Component
 * 
 * Dedicated page for About Us with related sections
 */
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="hero-section bg-bg-darker pt-32 pb-16">
        <div className="container-vae text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-vae-turquoise mb-6">
            Über uns
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Lernen Sie das Team und die Vision hinter VAE Systems kennen
          </p>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Tech Stack Section */}
      <TechStackSection />
    </div>
  )
}

export default AboutPage
