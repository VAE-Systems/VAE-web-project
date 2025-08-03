import React from 'react'

const AboutSection: React.FC = () => {
  const stats = [
    { value: '50+', label: 'Erfolgreiche Projekte' },
    { value: '95%', label: 'Kundenzufriedenheit' },
    { value: '24/7', label: 'Support' },
    { value: '5+', label: 'Jahre Erfahrung' }
  ]

  const values = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Transparenz',
      description: 'Open Source first - volle Einsicht in alle Prozesse und Technologien für maximales Vertrauen.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 5c0 1.66-4 3-9 3S3 6.66 3 5s4-3 9-3 9 1.34 9 3z" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Datensouveränität',
      description: 'Ihre Daten bleiben bei Ihnen - lokale Hosting-Lösungen ohne Cloud-Abhängigkeiten.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Innovation',
      description: 'Cutting-edge KI-Technologien mit bewährten Open-Source-Tools für zukunftssichere Lösungen.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Partnership',
      description: 'Langfristige Partnerschaften statt einmaliger Projekte - wir wachsen mit Ihrem Unternehmen.'
    }
  ]

  return (
    <section id="about" className="relative py-24 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-secondary">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, hsla(var(--color-vae-turquoise), 0.06) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, hsla(var(--color-vae-turquoise), 0.04) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-vae-turquoise to-vae-turquoise bg-clip-text text-transparent">
            Über VAE Systems
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Wir sind Ihr Partner für innovative KI-Lösungen und moderne Infrastruktur. 
            Mit Fokus auf Open Source, Datensouveränität und langfristige Partnerschaften.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Unsere Mission
            </h3>
            <p className="text-gray-300 leading-relaxed">
              VAE Systems steht für <strong className="text-vae-turquoise">VERSATILE AI/ENHANCED/SYSTEMS_</strong> - 
              vielseitige, KI-erweiterte Systeme, die Unternehmen dabei helfen, ihre digitale Transformation 
              erfolgreich zu meistern.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Wir glauben an die Kraft von Open Source Technologien und lokaler Infrastruktur. 
              Unsere Lösungen sind transparent, erweiterbar und geben Ihnen die volle Kontrolle 
              über Ihre Daten und Prozesse.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Von startup-freundlichen MVP-Lösungen bis hin zu enterprise-grade KI-Infrastrukturen - 
              wir skalieren mit Ihren Anforderungen und unterstützen Sie langfristig.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center"
              >
                <div className="text-3xl font-bold text-vae-turquoise mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <div>
          <h3 className="text-2xl font-semibold text-white text-center mb-12">
            Unsere Werte
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-vae-turquoise group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-4">
                  {value.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 rounded-2xl p-8 border border-vae-turquoise/20">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Bereit für Ihre digitale Transformation?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam eine maßgeschneiderte Lösung entwickeln, 
              die perfekt zu Ihren Anforderungen passt.
            </p>
            <button className="bg-vae-turquoise hover:bg-vae-turquoise-dark text-white px-8 py-3 rounded-lg font-semibold hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-vae-turquoise/30">
              Kostenloses Beratungsgespräch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
