import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Layout Components
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import SectionNavigation from '@components/navigation/SectionNavigation'

// Pages
import HomePage from '@components/pages/HomePage'
import ServicesPage from '@components/pages/ServicesPage'
import AboutPage from '@components/pages/AboutPage'
import ContactPage from '@components/pages/ContactPage'

/**
 * Main App Component
 * 
 * Provides routing structure and layout for VAE Systems website
 * Uses React Router for client-side navigation
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-bg-darker text-text-light">
        <Header />
        <SectionNavigation />
        
        <main className="pt-20"> {/* Account for fixed header */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App
