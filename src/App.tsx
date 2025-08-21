import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Layout Components
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import SectionNavigation from '@components/navigation/SectionNavigation'
import ScrollProgress from '@components/navigation/ScrollProgress'

// Pages
import HomePage from '@components/pages/HomePage'
import ServicesPage from '@components/pages/ServicesPage'
import ServiceTrainingsPage from '@components/pages/ServiceTrainingsPage'
import ServiceConsultingPage from '@components/pages/ServiceConsultingPage'
import ServiceCustomSolutionsPage from '@components/pages/ServiceCustomSolutionsPage'
import ProductsPage from '@components/pages/ProductsPage'
import ProductSolutionsPage from '@components/pages/ProductSolutionsPage'
import ProductToolsPage from '@components/pages/ProductToolsPage'
import ProductVaeCorePage from '@components/pages/ProductVaeCorePage'
import ProductShowcasesPage from '@components/pages/ProductShowcasesPage'
import AboutPage from '@components/pages/AboutPage'
import ContactPage from '@components/pages/ContactPage'
import ImpressumPage from '@components/pages/ImpressumPage'
import PrivacyPage from '@components/pages/PrivacyPage'

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

const NavigationSwitcher: React.FC = () => {
  const { pathname } = useLocation()
  return pathname === '/' ? <SectionNavigation /> : <ScrollProgress />
}

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <div className="min-h-[100dvh] bg-bg-darker text-text-light">
      <Header />
      <NavigationSwitcher />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/trainings" element={<ServiceTrainingsPage />} />
          <Route path="/services/consulting" element={<ServiceConsultingPage />} />
          <Route path="/services/custom-solutions" element={<ServiceCustomSolutionsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/solutions" element={<ProductSolutionsPage />} />
          <Route path="/products/tools" element={<ProductToolsPage />} />
          <Route path="/products/vae-core" element={<ProductVaeCorePage />} />
          <Route path="/products/showcases" element={<ProductShowcasesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
)

export default App
