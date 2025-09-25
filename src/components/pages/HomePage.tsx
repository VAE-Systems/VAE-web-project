import React from 'react'
import HeroSection from '../sections/HeroSection'
import CaseStudiesSection from '../sections/CaseStudiesSection'
import ServicesSection from '../sections/ServicesSection'
import HomeOutcomesSection from '../sections/HomeOutcomesSection'
import HomeProcessTeaserSection from '../sections/HomeProcessTeaserSection'
import ProductsSection from '../sections/ProductsSection'
import TechStackSection from '../sections/TechStackSection'
import AboutMiniSection from '../sections/AboutMiniSection'
const FAQSection = React.lazy(() => import('../sections/FAQSection'))
import ContactSection from '../sections/ContactSection'
import Seo from '../ui/Seo'

/**
 * HomePage Component
 *
 * Main landing page with all sections
 */
const HomePage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="VAE Systems – Produktionsnahe K I & Automation"
        description="Produktionsnahe KI & Automation – modular, dokumentiert, ohne Lock‑In."
        canonicalPath="/"
      />
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Outcomes / Warum (frühe Nutzen-Verankerung) */}
      <HomeOutcomesSection className="pb-24 pt-24" />

      {/* 3. Case Studies (Social Proof früh) */}
      <CaseStudiesSection />

      {/* 4. Services (Einordnung nach Problem & Proof) */}
      <ServicesSection />

      {/* 5. Prozess (Sicherheit & Transparenz des Vorgehens) */}
      <HomeProcessTeaserSection className="pt-24" />

      {/* 6. Products & Plattform (Skalierungsebene) */}
      <ProductsSection />

      {/* 7. Tech Stack (technische Tiefe nach Kontext) */}
      <TechStackSection />

      {/* 8. About (Mini Enhanced) */}
      <AboutMiniSection />

      {/* 9. FAQ (Einwandbehandlung) */}
      <React.Suspense fallback={<div className="py-24 text-center text-sm text-text-muted">Lade FAQ…</div>}>
        <FAQSection />
      </React.Suspense>

      {/* 10. Kontakt (Conversion) */}
      <ContactSection />
    </div>
  )
}

export default HomePage
