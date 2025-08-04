import React from 'react'
import TestimonialsSection from '../sections/TestimonialsSection'
import TechStackSection from '../sections/TechStackSection'

/**
 * AboutPage Component
 * 
 * Dedicated page for About Us with related sections
 */
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="hero-section bg-bg-darker pt-32 pb-16">
        <div className="container-vae text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-vae-turquoise mb-6">
            Über uns
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Lernen Sie das Team und die Vision hinter VAE Systems kennen
          </p>
        </div>
      </section>

      {/* Extended About Content */}
      <section className="relative py-32 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-secondary overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 25% 25%, hsla(var(--color-vae-turquoise), 0.08) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, hsla(var(--color-vae-turquoise), 0.06) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, hsla(var(--color-vae-turquoise), 0.02) 0%, transparent 70%)
              `
            }}
          />
          {/* Floating particles effect */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-vae-turquoise/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-vae-turquoise/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-vae-turquoise/25 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative container-vae">
          {/* 1. Hero-Statement - Magazine Style */}
          <div className="mb-40">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text Content */}
              <div className="lg:pr-8">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                  Wir entwickeln Systeme, die <span className="text-gradient">denken</span>
                </h2>
                <p className="text-xl md:text-2xl text-vae-turquoise font-medium mb-6">
                  Für Unternehmen, die unabhängig und zukunftsfähig sein wollen.
                </p>
                <div className="flex items-center space-x-4 text-lg text-text-secondary mb-8">
                  <span className="material-symbols-outlined text-vae-turquoise">
                    location_on
                  </span>
                  <span>KI, Automation und Infrastruktur aus Heidelberg</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                  <span className="bg-white/10 px-4 py-2 rounded-full">pragmatisch</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full">offen</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full">partnerschaftlich</span>
                </div>
              </div>
              
              {/* Right: Visual Element */}
              <div className="relative">
                <div className="card-vae">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          psychology
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white">KI-Systeme</div>
                      <div className="text-sm text-text-secondary">Intelligent</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          precision_manufacturing
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white">Automation</div>
                      <div className="text-sm text-text-secondary">Effizient</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          cloud_sync
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white">Infrastruktur</div>
                      <div className="text-sm text-text-secondary">Skalierbar</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          verified_user
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white">Open Source</div>
                      <div className="text-sm text-text-secondary">Transparent</div>
                    </div>
                  </div>
                </div>
                {/* Floating decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-vae-turquoise/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* 2. Unsere Story - Magazine Layout (Right-aligned) */}
          <div className="mb-40">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Visual Timeline */}
              <div className="lg:order-2 lg:pl-8">
                <div className="relative">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-12">
                    Unsere Geschichte
                  </h3>
                  
                  {/* Timeline */}
                  <div className="space-y-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-vae-turquoise">
                          school
                        </span>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white mb-2">Universität Heidelberg</div>
                        <div className="text-text-secondary">Gründung durch Studierende aus Mathematik, Informatik und VWL</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-vae-turquoise">
                          rocket_launch
                        </span>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white mb-2">Junges Tech-Unternehmen</div>
                        <div className="text-text-secondary">Individuelle KI- und Automatisierungssysteme</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-vae-turquoise">
                          integration_instructions
                        </span>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white mb-2">Praxisorientiert</div>
                        <div className="text-text-secondary">Akademische Tiefe + Startup-Energie</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Text Content */}
              <div className="lg:order-1">
                <div className="card-vae">
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed text-text-secondary">
                      <strong className="text-vae-turquoise">VAE Systems</strong> wurde von Studierenden der Universität Heidelberg aus den Bereichen 
                      Mathematik, Informatik und Volkswirtschaftslehre gegründet.
                    </p>
                    <p className="text-lg leading-relaxed text-text-secondary">
                      Als <strong className="text-white">junges Technologieunternehmen</strong> entwickeln wir individuelle KI- und 
                      Automatisierungssysteme, die Unternehmen von heute fit für die Anforderungen von morgen machen.
                    </p>
                    <p className="text-lg leading-relaxed text-text-secondary">
                      Wir kombinieren <strong className="text-vae-turquoise">akademische Tiefe, Startup-Energie</strong> und praxisorientierte Umsetzung, 
                      um digitale Transformation wirklich greifbar zu machen.
                    </p>
                  </div>
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-vae-turquoise">50+</div>
                      <div className="text-sm text-text-secondary">Projekte</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-vae-turquoise">95%</div>
                      <div className="text-sm text-text-secondary">Zufriedenheit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-vae-turquoise">5+</div>
                      <div className="text-sm text-text-secondary">Jahre</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Unsere Mission - Magazine Layout (Left-aligned) */}
          <div className="mb-40">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text Content */}
              <div className="lg:pr-8">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Unsere Mission
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-vae-turquoise/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined text-vae-turquoise text-sm">
                        lock_open
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Datenkontrolle</h4>
                      <p className="text-text-secondary leading-relaxed">
                        Wir glauben daran, dass Unternehmen <strong className="text-white">Kontrolle über ihre Systeme und Daten</strong> behalten müssen. 
                        Deshalb setzen wir auf Open Source, saubere Projektdokumentation und keine Vendor-Lock-ins.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-vae-turquoise/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined text-vae-turquoise text-sm">
                        groups
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Langfristige Nutzbarkeit</h4>
                      <p className="text-text-secondary leading-relaxed">
                        Unsere Systeme sind so gebaut, dass sie auch ohne uns <strong className="text-white">langfristig nutzbar bleiben</strong> – 
                        weil wir an Qualität und freiwillige Partnerschaft glauben, nicht an Zwang.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-vae-turquoise/20 to-vae-turquoise/10 rounded-2xl p-6 border border-vae-turquoise/30">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-vae-turquoise/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="material-symbols-outlined text-vae-turquoise text-sm">
                          public
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">Europäische Zukunft</h4>
                        <p className="text-white leading-relaxed">
                          Unser Ziel ist es, die <strong className="text-vae-turquoise">Unternehmenslandschaft in Deutschland und Europa</strong> zukunftsfähig zu machen – 
                          mit Lösungen, die heute entlasten und morgen tragen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Visual Element */}
              <div className="relative">
                <div className="card-vae">
                  {/* Infographic Style */}
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-vae-turquoise/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-3xl text-vae-turquoise">
                        public
                      </span>
                    </div>
                    <div className="text-xl font-bold text-white">Deutschland & Europa</div>
                    <div className="text-text-secondary">Zukunftsfähige Systeme</div>
                  </div>
                  
                  {/* Connection Lines */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-vae-turquoise/20 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-vae-turquoise text-sm">
                            code
                          </span>
                        </div>
                        <span className="text-white text-sm">Open Source</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-vae-turquoise/50 to-transparent mx-4"></div>
                      <div className="text-vae-turquoise text-sm">100%</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-vae-turquoise/20 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-vae-turquoise text-sm">
                            description
                          </span>
                        </div>
                        <span className="text-white text-sm">Dokumentation</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-vae-turquoise/50 to-transparent mx-4"></div>
                      <div className="text-vae-turquoise text-sm">Vollständig</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-vae-turquoise/20 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-vae-turquoise text-sm">
                            shield
                          </span>
                        </div>
                        <span className="text-white text-sm">Vendor Lock-ins</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent mx-4"></div>
                      <div className="text-red-400 text-sm">0%</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating decoration */}
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-vae-turquoise/20 rounded-full blur-2xl animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* 4. Unsere Werte - Magazine Layout (Right-aligned) */}
          <div className="mb-40">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Interactive Values Grid */}
              <div className="lg:order-2 lg:pl-8">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Unsere Werte
                </h3>
                <p className="text-xl text-text-secondary mb-12">
                  Diese Prinzipien leiten uns in jedem Projekt
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Wert 1 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-vae-turquoise/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-xl text-vae-turquoise">
                        code
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                      Technische Kompetenz
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                      Von Chatbots bis Prozessautomation – moderne KI mit sauberem Engineering.
                    </p>
                  </div>

                  {/* Wert 2 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-vae-turquoise/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-xl text-vae-turquoise">
                        verified_user
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                      Open Source & Unabhängigkeit
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                      Keine Vendor-Lock-ins. Volle Kontrolle. Software Made in Germany.
                    </p>
                  </div>

                  {/* Wert 3 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-vae-turquoise/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-xl text-vae-turquoise">
                        handshake
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                      Langfristige Partnerschaft
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                      Dokumentierte, nachhaltige Systeme für freiwillige Zusammenarbeit.
                    </p>
                  </div>

                  {/* Wert 4 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-vae-turquoise/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-xl text-vae-turquoise">
                        palette
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                      Ästhetik & UX
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                      Design und Klarheit als Teil des ROI. Systeme, die begeistern.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right: Feature Highlight */}
              <div className="lg:order-1">
                <div className="card-vae">
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-vae-turquoise/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-4xl text-vae-turquoise">
                        psychology
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Wertebasierte Entwicklung</h4>
                    <p className="text-text-secondary leading-relaxed mb-8">
                      Unsere Prinzipien fließen in jeden Code, jede Architektur-Entscheidung 
                      und jeden Kundenkontakt ein.
                    </p>
                  </div>
                  
                  {/* Values Circle */}
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-3xl font-bold text-vae-turquoise mb-1">100%</div>
                        <div className="text-xs text-text-secondary">Open Source</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-3xl font-bold text-vae-turquoise mb-1">0</div>
                        <div className="text-xs text-text-secondary">Lock-ins</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-3xl font-bold text-vae-turquoise mb-1">24/7</div>
                        <div className="text-xs text-text-secondary">Support</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-3xl font-bold text-vae-turquoise mb-1">∞</div>
                        <div className="text-xs text-text-secondary">Skalierbar</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating decoration */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-vae-turquoise/10 rounded-full blur-3xl animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* 5. Warum VAE? - Magazine Layout (Left-aligned with masonry) */}
          <div className="mb-40">
            <div className="grid lg:grid-cols-3 gap-16 items-start">
              {/* Left: Header & Description */}
              <div className="lg:col-span-1">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Warum Unternehmen mit uns arbeiten
                </h3>
                <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                  Fünf überzeugende Gründe für eine Partnerschaft mit VAE Systems
                </p>
                
                <div className="bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 rounded-2xl p-6 border border-vae-turquoise/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="material-symbols-outlined text-vae-turquoise">
                      trending_up
                    </span>
                    <span className="font-semibold text-white">Messbare Erfolge</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-vae-turquoise">95%</div>
                      <div className="text-xs text-text-secondary">Zufriedenheit</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-vae-turquoise">24h</div>
                      <div className="text-xs text-text-secondary">Response</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Reasons Grid */}
              <div className="lg:col-span-2">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Grund 1 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-vae-turquoise/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-vae-turquoise">
                          trending_up
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                          Moderne Projektansätze & faire Kosten
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                          MVP-Entwicklung & Beratung ohne unnötige Überteuerung – Sie zahlen für echte Usability.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Grund 2 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-vae-turquoise/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-vae-turquoise">
                          support_agent
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                          Beratung inklusive
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                          Wir begleiten aktiv und geben Tipps über unsere Kernkompetenzen hinaus.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Grund 3 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-vae-turquoise/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-vae-turquoise">
                          hub
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                          Starkes Netzwerk
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                          Tief in der Szene vernetzt mit den Unternehmern von morgen.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Grund 4 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-vae-turquoise/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-vae-turquoise">
                          lightbulb
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                          Immer am Puls der Zeit
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                          Konferenzen wie DCYPHR, frische Perspektiven in jedem Projekt.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Grund 5 - Featured */}
                  <div className="md:col-span-2 group bg-gradient-to-br from-vae-turquoise/15 to-vae-turquoise/10 backdrop-blur-xl rounded-2xl p-8 border border-vae-turquoise/30 hover:border-vae-turquoise/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-vae-turquoise/50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-vae-turquoise text-xl">
                          description
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-4 group-hover:text-vae-turquoise transition-colors duration-300">
                          Offene Systeme, saubere Dokumentation
                        </h4>
                        <p className="text-text-secondary leading-relaxed group-hover:text-white transition-colors duration-300">
                          Ihre Systeme bleiben nutzbar – auch unabhängig von uns. Wir setzen auf freiwillige Bindung durch Qualität, 
                          nicht auf technische Abhängigkeiten.
                        </p>
                        <div className="flex items-center space-x-4 mt-4 text-sm">
                          <span className="bg-white/10 px-3 py-1 rounded-full text-vae-turquoise">Open Source</span>
                          <span className="bg-white/10 px-3 py-1 rounded-full text-white">Dokumentiert</span>
                          <span className="bg-white/10 px-3 py-1 rounded-full text-white">Erweiterbar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Enhanced Micro-CTA with premium styling */}
          <div className="text-center">
            <div className="relative inline-block">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-vae-turquoise/20 to-vae-turquoise/20 rounded-3xl blur-2xl opacity-75"></div>
              
              <div className="relative card-vae transform hover:scale-105 transition-all duration-500 hover:shadow-vae-turquoise/40">
                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-vae-turquoise/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-vae-turquoise/30 rounded-full animate-ping"></div>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-vae-turquoise/30 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-vae-turquoise animate-pulse">
                      rocket_launch
                    </span>
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Bereit, Ihre digitale Transformation zu starten?
                </h3>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                  Lassen Sie uns Ihr Projekt besprechen – wir melden uns innerhalb von 24 Stunden.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href="/contact"
                    className="btn-primary"
                  >
                    Jetzt Kontakt aufnehmen
                    <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform duration-300">
                      arrow_forward
                    </span>
                  </a>
                  
                  <div className="flex items-center text-text-secondary">
                    <span className="material-symbols-outlined mr-2 text-vae-turquoise">
                      schedule
                    </span>
                    <span className="text-sm">24h Antwortzeit garantiert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Tech Stack Section */}
      <TechStackSection />
    </div>
  )
}

export default AboutPage
