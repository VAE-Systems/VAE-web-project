import React from 'react'

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Sarah Weber',
      position: 'CTO',
      company: 'TechStartup GmbH',
      content: 'VAE Systems hat uns dabei geholfen, unsere KI-Infrastruktur vollständig lokal aufzubauen. Die Transparenz und der Support sind außergewöhnlich.',
      rating: 5,
      project: 'Lokale KI-Implementation'
    },
    {
      name: 'Michael Schmidt',
      position: 'IT-Leiter',
      company: 'InnovaCorp AG',
      content: 'Die Open Source Beratung war genau das, was wir brauchten. Keine Vendor-Lock-ins, volle Kontrolle über unsere Daten und deutliche Kosteneinsparungen.',
      rating: 5,
      project: 'Open Source Migration'
    },
    {
      name: 'Lisa Chen',
      position: 'Founder & CEO',
      company: 'DataFlow Systems',
      content: 'Als Startup konnten wir dank VAE Systems eine professionelle Tech-Infrastruktur aufbauen, die mit uns skaliert. Das Team versteht unsere Bedürfnisse perfekt.',
      rating: 5,
      project: 'Startup Tech Stack'
    }
  ]

  const successMetrics = [
    {
      value: '340%',
      label: 'Durchschnittlicher ROI',
      description: 'unserer KI-Implementierungen'
    },
    {
      value: '65%',
      label: 'Kostenreduktion',
      description: 'durch Open Source Migration'
    },
    {
      value: '99.9%',
      label: 'Uptime',
      description: 'bei lokalen Hosting-Lösungen'
    },
    {
      value: '24h',
      label: 'Support Response',
      description: 'Antwortzeit garantiert'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={index < rating ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        className="text-yellow-400"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))
  }

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-secondary">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, hsla(157, 100%, 47%, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsla(157, 100%, 47%, 0.04) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-vae-turquoise to-vae-turquoise bg-clip-text text-transparent">
            Erfolgsgeschichten
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Unsere Kunden vertrauen auf VAE Systems für ihre kritischen KI- und Infrastruktur-Projekte.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {successMetrics.map((metric, index) => (
            <div 
              key={index}
              className="text-center bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-vae-turquoise mb-2">
                {metric.value}
              </div>
              <div className="text-white font-semibold mb-1">
                {metric.label}
              </div>
              <div className="text-gray-400 text-sm">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-xl rounded-2xl p-8 border border-white/15 hover:border-vae-turquoise/30 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-gray-300 leading-relaxed mb-6">
                "{testimonial.content}"
              </blockquote>

              {/* Project Tag */}
              <div className="inline-block bg-vae-turquoise/10 text-vae-turquoise px-3 py-1 rounded-full text-sm font-medium mb-4">
                {testimonial.project}
              </div>

              {/* Author */}
              <div className="border-t border-white/10 pt-4">
                <div className="font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-400">
                  {testimonial.position}
                </div>
                <div className="text-sm text-vae-turquoise">
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 rounded-2xl p-8 border border-vae-turquoise/20">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Werden Sie unser nächster Erfolg
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam eine Lösung entwickeln, die Ihr Unternehmen voranbringt. 
              Kostenloses Erstgespräch und unverbindliche Beratung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-vae-turquoise hover:bg-vae-turquoise-dark text-white px-8 py-3 rounded-lg font-semibold hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-vae-turquoise/30">
                Projekt besprechen
              </button>
              <button className="border border-vae-turquoise text-vae-turquoise px-8 py-3 rounded-lg font-semibold hover:bg-vae-turquoise/10 transition-all duration-300">
                Referenzen anfordern
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
