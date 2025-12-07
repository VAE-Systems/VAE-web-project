/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  SECTIONS BARREL                                                          ┃
 * ┃  Zentrale Export-Datei für alle Section-Komponenten.                      ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ KATEGORIEN
 * ├── Hero       → Landing-Bereiche (animated, attention-grabbing)
 * ├── Content    → Informative Blöcke (Process, TechStack, WhyOpenSource)
 * ├── Social Proof → Vertrauensaufbau (CaseStudies, Testimonials)
 * ├── CTA        → Conversion-Trigger (FinalCta, ServicesOverview)
 * ├── Interactive → User-Engagement (FAQ, TechShowcase)
 * └── Effects    → Visuelle Effekte (NeuralNetwork, Parallax, Particles)
 */

// ── HERO ──
export { default as HeroSection } from './hero/HeroSection'
export { default as ProductsHeroSection } from './hero/ProductsHeroSection'
export { default as ServicesHeroSection } from './hero/ServicesHeroSection'

// ── CONTENT ──
export { default as HomeOutcomesSection } from './content/HomeOutcomesSection'
export { default as HomeProcessTeaserSection } from './content/HomeProcessTeaserSection'
export { default as ProcessSection } from './content/ProcessSection'
export { default as ProductsSection } from './content/ProductsSection'
export { default as ServicesSection } from './content/ServicesSection'
export { default as TechStackSection } from './content/TechStackSection'
export { default as WhyOpenSourceSection } from './content/WhyOpenSourceSection'
export { default as WhyOutcomesSection } from './content/WhyOutcomesSection'

// ── SOCIAL PROOF ──
export { default as CaseStudiesSection } from './social-proof/CaseStudiesSection'
export { default as SocialProofSection } from './social-proof/SocialProofSection'
export { default as StoryTeamSection } from './social-proof/StoryTeamSection'

// ── CTA ──
export { default as FinalCtaSection } from './cta/FinalCtaSection'
export { default as ServicesOverviewSection } from './cta/ServicesOverviewSection'

// ── INTERACTIVE ──
export { default as FAQSection } from './interactive/FAQSection'
export { default as ProductsCardsGrid } from './interactive/ProductsCardsGrid'
export { default as TechShowcaseSection } from './interactive/TechShowcaseSection'

// ── EFFECTS ──
export { ParallaxBackdrop, ParticleField } from './effects/BackgroundEffects'
export { default as NeuralNetworkBackground } from './effects/NeuralNetworkBackground'
