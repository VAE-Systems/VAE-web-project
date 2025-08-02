import React from 'react'
import HeroSection from '../sections/HeroSection'
import ServicesSection from '../sections/ServicesSection'

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

      {/* Additional sections will be added here */}
    </div>
  )
}

export default HomePage
