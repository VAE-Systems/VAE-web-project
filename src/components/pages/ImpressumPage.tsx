import React from 'react'
import { impressumContent } from '../../content/impressum'
import Seo from '../ui/Seo'

const ImpressumPage: React.FC = () => {
  return (
    <div className="relative z-0 min-h-[100dvh] bg-bg-darker">
      <Seo
        title="Impressum | VAE Systems"
        description="Impressum der VAE Systems UG (haftungsbeschränkt)."
        canonicalPath="/impressum"
      />
      <section className="container-vae max-w-4xl pb-24 pt-40">
        <h1 className="h1 heading-gradient mb-10">Impressum</h1>
        <div className="space-y-8 text-sm leading-relaxed text-text-secondary">
          {impressumContent.sections.map(section => (
            <div key={section.id}>
              <h2 className="h3 mb-2 text-text-light">{section.title}</h2>
              <p className={section.bodyClassName}>{section.body}</p>
            </div>
          ))}
          <p className="text-[11px] text-text-muted">Stand: {impressumContent.updated}</p>
        </div>
      </section>
    </div>
  )
}

export default ImpressumPage
