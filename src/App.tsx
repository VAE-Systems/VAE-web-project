import React, { useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Layout Components
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import SectionNavigation from '@components/navigation/SectionNavigation'
import ScrollProgress from '@components/navigation/ScrollProgress'
import ErrorBoundary from '@components/ErrorBoundary'

// Theme Context
import { ThemeProvider } from '@/contexts/ThemeContext'

// Lazy-loaded Pages
const HomePage = React.lazy(() => import('@components/pages/HomePage'))
const ServicesPage = React.lazy(() => import('@components/pages/ServicesPage'))
const ServiceTrainingsPage = React.lazy(() => import('@components/pages/ServiceTrainingsPage'))
const ServiceConsultingPage = React.lazy(() => import('@components/pages/ServiceConsultingPage'))
const ServiceCustomSolutionsPage = React.lazy(() => import('@components/pages/ServiceCustomSolutionsPage'))
const ProductsPage = React.lazy(() => import('@components/pages/ProductsPage'))
const ProductSolutionsPage = React.lazy(() => import('@components/pages/ProductSolutionsPage'))
const ProductToolsPage = React.lazy(() => import('@components/pages/ProductToolsPage'))
const ProductVaeCorePage = React.lazy(() => import('@components/pages/ProductVaeCorePage'))
const ProductShowcasesPage = React.lazy(() => import('@components/pages/ProductShowcasesPage'))
const AboutPage = React.lazy(() => import('@components/pages/AboutPage'))
const ContactPage = React.lazy(() => import('@components/pages/ContactPage'))
const ImpressumPage = React.lazy(() => import('@components/pages/ImpressumPage'))
const PrivacyPage = React.lazy(() => import('@components/pages/PrivacyPage'))

// Loading Component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg-darker">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise"></div>
  </div>
)

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
  <ErrorBoundary>
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-[100dvh] bg-bg-darker text-text-light">
          <Header />
          <NavigationSwitcher />
          <main className="pt-20">
            <Suspense fallback={<LoadingSpinner />}>
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
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
