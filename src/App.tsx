import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'

// Layout Components
import ErrorBoundary from '@components/ErrorBoundary'
import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'
import ScrollProgress from '@components/navigation/ScrollProgress'
import SectionNavigation from '@components/navigation/SectionNavigation'

// UI Components
import ScrollProgressBar from '@components/ui/ScrollProgressBar'
import SkipToContent from '@components/ui/SkipToContent'

// Privacy Components
import CookieBanner from '@components/privacy/CookieBanner'

// Theme Context
import { ThemeProvider } from '@/contexts/ThemeContext'

// Focus Management
import { initializeFocusManager } from '@/utils/focusManagement'

// Lazy-loaded Pages
const HomePage = React.lazy(() => import('@components/pages/HomePage'))
const ServicesPage = React.lazy(() => import('@components/pages/ServicesPage'))
const ProductsPage = React.lazy(() => import('@components/pages/ProductsPage'))
const TestphasePage = React.lazy(() => import('@components/pages/TestphasePage'))
const InfrastrukturPage = React.lazy(() => import('@components/pages/InfrastrukturPage'))
const KiOptimierungPage = React.lazy(() => import('@components/pages/KiOptimierungPage'))
const BetreuungPage = React.lazy(() => import('@components/pages/BetreuungPage'))
const ProductVaeCorePage = React.lazy(() => import('@components/pages/ProductVaeCorePage'))
const AboutPage = React.lazy(() => import('@components/pages/AboutPage'))
const ContactPage = React.lazy(() => import('@components/pages/ContactPage'))
const ImpressumPage = React.lazy(() => import('@components/pages/ImpressumPage'))
const PrivacyPage = React.lazy(() => import('@components/pages/PrivacyPage'))
const PrivacySettings = React.lazy(() => import('@components/privacy/PrivacySettings'))

// Loading Component
const LoadingSpinner: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-bg-darker">
    <div className="border-turquoise h-12 w-12 animate-spin rounded-full border-b-2"></div>
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

const App: React.FC = () => {
  // Initialize focus management on app start
  useEffect(() => {
    initializeFocusManager()
  }, [])

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-[100dvh] bg-bg-darker text-text-light">
            <SkipToContent />
            <ScrollProgressBar />
            <Header />
            <NavigationSwitcher />
            <main id="main-content" className="pt-20">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/infrastruktur" element={<InfrastrukturPage />} />
                  <Route path="/ki-optimierung" element={<KiOptimierungPage />} />
                  <Route path="/betreuung" element={<BetreuungPage />} />
                  <Route path="/testphase" element={<TestphasePage />} />
                  <Route path="/solutions" element={<ProductsPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/vae-core" element={<ProductVaeCorePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/kontakt" element={<ContactPage />} />
                  <Route path="/contact" element={<Navigate to="/kontakt" replace />} />
                  <Route path="/impressum" element={<ImpressumPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/privacy/settings" element={<PrivacySettings />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <CookieBanner />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
