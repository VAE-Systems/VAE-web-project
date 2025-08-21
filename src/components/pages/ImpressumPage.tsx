import React from 'react'
import Seo from '../ui/Seo'
import { impressumContent } from '../../content/impressum'

const ImpressumPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh] bg-bg-darker">
      <Seo title="Impressum | VAE Systems" description="Impressum der VAE Systems UG (haftungsbeschränkt)." canonicalPath="/impressum" />
      <section className="pt-40 pb-24 container-vae max-w-4xl">
        <h1 className="h1 heading-gradient mb-10">Impressum</h1>
        <div className="space-y-8 text-sm leading-relaxed text-text-secondary">
          {impressumContent.sections.map(section => (
            <div key={section.id}>
              <h2 className="h3 text-text-light mb-2">{section.title}</h2>
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
