import React from 'react'
import HeroSection from '../sections/HeroSection'
import ServicesSection from '../sections/ServicesSection'
import ProductsSection from '../sections/ProductsSection'
import TechStackSection from '../sections/TechStackSection'
import AboutSection from '../sections/AboutSection'
import CaseStudiesSection from '../sections/CaseStudiesSection'
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

  {/* Products Section */}
  <ProductsSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* About Section */}
      <AboutSection />

  {/* Case Studies Section */}
  <CaseStudiesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}

export default HomePage
