import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Layout Components
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import SectionNavigation from '@components/navigation/SectionNavigation'

// Pages
import HomePage from '@components/pages/HomePage'
import ServicesPage from '@components/pages/ServicesPage'
import ProductsPage from '@components/pages/ProductsPage'
import AboutPage from '@components/pages/AboutPage'
import ContactPage from '@components/pages/ContactPage'

/**
 * Main App Component
 * 
 * Provides routing structure and layout for VAE Systems website
 * Uses React Router for client-side navigation
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // If there's a hash (anchor) let the browser handle it after slight delay
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 10)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash])
  return null
}

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <div className="min-h-screen bg-bg-darker text-text-light">
      <Header />
      <SectionNavigation />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
)

export default App
