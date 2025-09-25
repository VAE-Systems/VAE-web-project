import React from 'react'
import { Link } from 'react-router-dom'

const MailTeaserCard: React.FC = () => (
  <div
    className="surface-glass-panel edge-glow-top checker-faint w-full max-w-3xl rounded-2xl p-6 shadow-lg md:p-8"
    role="region"
    aria-label="Empfehlungs‑Mail Szene"
  >
    <div className="space-y-1 font-mono text-xs text-text-muted md:text-sm">
      <div>
        <span className="mr-2 text-text-secondary">From:</span>
        <span className="text-white">{'ToldYou <toldyou@hidden.network>'}</span>
      </div>
      <div>
        <span className="mr-2 text-text-secondary">To:</span>
        <span className="text-white">{'AlwaysBusy <alwaysbusy@somewhere.work>'}</span>
      </div>
      <div>
        <span className="mr-2 text-text-secondary">Subject:</span>
        <span className="text-white">Re: The problem you told me about.</span>
      </div>
    </div>

    <div className="mt-5 text-base leading-relaxed md:mt-6 md:text-lg">
      <p className="measure-readable text-text-secondary">
        Ich muss ehrlich sein – eigentlich wollte ich’s für mich behalten.{' '}
        <span className="text-white">
          Aber ich erzähle dir jetzt von <span className="text-vae-turquoise">VAE Systems</span>.
        </span>
      </p>
      <div className="mt-3 flex h-5 items-center" aria-hidden>
        <span className="inline-block h-5 w-[10px] animate-pulse rounded-[1px] bg-vae-turquoise/80"></span>
      </div>
    </div>

    <div className="mt-6 text-xs text-text-muted">
      <span className="uppercase tracking-wide">Re: Suite</span>
      <span className="mx-2">•</span>
      Antworten auf echte Probleme – betrieben auf{' '}
      <Link to="/products/vae-core" className="text-vae-turquoise hover:underline">
        VAE CORE
      </Link>
    </div>
  </div>
)

export default MailTeaserCard
