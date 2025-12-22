/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  APP.TSX                                                                  ┃
 * ┃  Root der Anwendung. Routing, Provider-Stack, Layout-Shell.               ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ PROVIDER-STACK (außen nach innen)
 * ├── ErrorBoundary   → Crash-Handling
 * ├── ThemeProvider   → Dark/Light Mode
 * ├── HelpModeProvider → Kontexthilfe-System
 * └── Router          → React Router v6
 *
 * 🗺️ LAYOUT-SHELL
 * ├── SkipToContent   → Accessibility
 * ├── ScrollProgressBar
 * ├── Header
 * ├── NavigationSwitcher → SectionNav (Home) / ScrollProgress (andere)
 * ├── <main> mit Routes
 * ├── Footer
 * └── CookieBanner
 *
 * 📍 PAGES: Alle lazy-loaded für Code-Splitting
 */

import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'

// ── LAYOUT ──
import ErrorBoundary from '@components/ErrorBoundary'
import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'
import ScrollProgress from '@components/navigation/ScrollProgress'
import SectionNavigation from '@components/navigation/SectionNavigation'

// ── UI ──
import ScrollProgressBar from '@components/ui/ScrollProgressBar'
import SkipToContent from '@components/ui/SkipToContent'

// ── PRIVACY ──
import CookieBanner from '@components/privacy/CookieBanner'

// ── PROVIDERS ──
import { HelpModeProvider } from '@/components/ui/help'
import { ThemeProvider } from '@/contexts/ThemeContext'

// ── TUTORIALS ──
import { ThemeModeTutorial } from '@/components/ui/tutorial/ThemeModeTutorial'

// ── UTILS ──
import { initializeFocusManager } from '@/utils/focusManagement'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📦 LAZY-LOADED PAGES (Code-Splitting)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const HomePage = React.lazy(() => import('@components/pages/HomePage'))
const SetupPage = React.lazy(() => import('@components/pages/SetupPage'))
const BetreuungPage = React.lazy(() => import('@components/pages/BetreuungPage'))
const BeratungPage = React.lazy(() => import('@components/pages/BeratungPage'))
const ReferenzenPage = React.lazy(() => import('@components/pages/ReferenzenPage'))
const ContactPage = React.lazy(() => import('@components/pages/ContactPage'))
const ImpressumPage = React.lazy(() => import('@components/pages/ImpressumPage'))
const PrivacyPage = React.lazy(() => import('@components/pages/PrivacyPage'))
const PrivacySettings = React.lazy(() => import('@components/privacy/PrivacySettings'))
const ResourcesFaqPage = React.lazy(() => import('@components/pages/ResourcesFaqPage'))
const ValuesPage = React.lazy(() => import('@/components/pages/values/ValuesPage'))
const DesignHeritagePage = React.lazy(() => import('@/components/pages/values/DesignHeritagePage'))
const TransparenzPage = React.lazy(() => import('@/components/pages/values/TransparenzPage'))
const KommunikationPage = React.lazy(() => import('@/components/pages/values/KommunikationPage'))
const UnabhaengigkeitPage = React.lazy(() => import('@/components/pages/values/UnabhaengigkeitPage'))
const QualitaetPage = React.lazy(() => import('@/components/pages/values/QualitaetPage'))
const SkalierbarkeitPage = React.lazy(() => import('@/components/pages/values/SkalierbarkeitPage'))
const LeadershipPage = React.lazy(() => import('@components/pages/leadership/LeadershipPage'))
const TeamNetworkPage = React.lazy(() => import('@components/pages/TeamNetworkPage'))
const BlogPage = React.lazy(() => import('@components/pages/BlogPage'))
const NotFoundPage = React.lazy(() => import('@components/pages/NotFoundPage'))

// ── ADMIN PAGES (nur in Development) ──
const AdminDebugPage = import.meta.env.DEV ? React.lazy(() => import('@components/pages/AdminDebugPage')) : null

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎛️ HELPER COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LoadingSpinner: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-bg-darker">
    <div className="border-turquoise h-12 w-12 animate-spin rounded-full border-b-2"></div>
  </div>
)

/** 🔁 SIDE-EFFECT: Scroll to Top bei Route-Wechsel */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 10)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash])
  return null
}

/** 🎛️ CORE: Navigation-Switch basierend auf Route */
const NavigationSwitcher: React.FC = () => {
  const { pathname } = useLocation()
  return pathname === '/' ? <SectionNavigation /> : <ScrollProgress />
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚪 ORCHESTRATOR: App
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const App: React.FC = () => {
  // 🔁 SIDE-EFFECT: Focus Management initialisieren
  useEffect(() => {
    initializeFocusManager()
  }, [])

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HelpModeProvider>
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <ScrollToTop />
            <div className="relative min-h-[100dvh] bg-bg-darker text-text-light">
              <SkipToContent />
              <ScrollProgressBar />
              <Header />
              <ThemeModeTutorial />
              <NavigationSwitcher />
              <main id="main-content" className="relative z-0 pt-20">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* Homepage */}
                    <Route path="/" element={<HomePage />} />

                    {/* Services */}
                    <Route path="/services/setup" element={<SetupPage />} />
                    <Route path="/services/betreuung" element={<BetreuungPage />} />
                    <Route path="/services/beratung" element={<BeratungPage />} />
                    <Route path="/leistungen/strategie" element={<BeratungPage />} />
                    <Route path="/leistungen/infrastruktur" element={<SetupPage />} />
                    <Route path="/leistungen/betreuung" element={<BetreuungPage />} />

                    {/* Redirects from old URLs */}
                    <Route path="/infrastruktur" element={<Navigate to="/services/setup" replace />} />
                    <Route path="/betreuung" element={<Navigate to="/services/betreuung" replace />} />

                    {/* Main Pages */}
                    <Route path="/about" element={<Navigate to="/ueber-uns/werte" replace />} />
                    <Route path="/about/referenzen" element={<ReferenzenPage />} />
                    <Route path="/case-studies" element={<ReferenzenPage />} />
                    <Route path="/ressourcen/case-studies" element={<ReferenzenPage />} />

                    <Route path="/ressourcen/blog" element={<BlogPage />} />
                    <Route path="/ressourcen/faq" element={<ResourcesFaqPage />} />
                    <Route path="/ueber-uns/werte" element={<ValuesPage />} />
                    <Route path="/ueber-uns/design-handwerk" element={<DesignHeritagePage />} />
                    <Route path="/wissen/transparenz-open-source" element={<TransparenzPage />} />
                    <Route path="/wissen/klare-projektkommunikation" element={<KommunikationPage />} />
                    <Route path="/wissen/vendor-lock-in-vermeiden" element={<UnabhaengigkeitPage />} />
                    <Route path="/wissen/handwerkskunst-statt-schnellschuss" element={<QualitaetPage />} />
                    <Route path="/wissen/skalierbare-architektur" element={<SkalierbarkeitPage />} />
                    <Route path="/ueber-uns/leitung" element={<LeadershipPage />} />
                    <Route path="/ueber-uns/team" element={<TeamNetworkPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/termin-buchen" element={<Navigate to="/contact#booking" replace />} />

                    {/* Redirects */}
                    <Route path="/kontakt" element={<Navigate to="/contact" replace />} />
                    <Route path="/resources/referenzen" element={<Navigate to="/ressourcen/case-studies" replace />} />

                    {/* Legal */}
                    <Route path="/impressum" element={<ImpressumPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/datenschutz" element={<Navigate to="/privacy" replace />} />
                    <Route path="/privacy/settings" element={<PrivacySettings />} />

                    {/* Admin Pages (Development only) */}
                    {AdminDebugPage && <Route path="/admin/debug" element={<AdminDebugPage />} />}

                    {/* Catch-all 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <CookieBanner />
            </div>
          </Router>
        </HelpModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
