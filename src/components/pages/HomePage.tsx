import React from 'react'
import HeroSection from '../sections/HeroSection'
import ServicesSection from '../sections/ServicesSection'
import TechStackSection from '../sections/TechStackSection'
import AboutSection from '../sections/AboutSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import FAQSection from '../sections/FAQSection'
import ContactSection from '../sections/ContactSection'

/**
 * HomePage Component
 * 
 * Main landing page with all sections
 */
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* About Section */}
      <AboutSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}

export default HomePage
