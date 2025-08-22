import React from 'react'
import { Link } from 'react-router-dom'

const MailTeaserCard: React.FC = () => (
  <div
    className="w-full max-w-3xl surface-glass-panel rounded-2xl p-6 md:p-8 shadow-lg edge-glow-top checker-faint"
    role="region"
    aria-label="Empfehlungs‑Mail Szene"
  >
    <div className="text-xs md:text-sm font-mono text-text-muted space-y-1">
      <div>
        <span className="text-text-secondary mr-2">From:</span>
        <span className="text-white">{"ToldYou <toldyou@hidden.network>"}</span>
      </div>
      <div>
        <span className="text-text-secondary mr-2">To:</span>
        <span className="text-white">{"AlwaysBusy <alwaysbusy@somewhere.work>"}</span>
      </div>
      <div>
        <span className="text-text-secondary mr-2">Subject:</span>
        <span className="text-white">Re: The problem you told me about.</span>
      </div>
    </div>

    <div className="mt-5 md:mt-6 text-base md:text-lg leading-relaxed">
      <p className="text-text-secondary measure-readable">
        Ich muss ehrlich sein – eigentlich wollte ich’s für mich behalten.{" "}
        <span className="text-white">
          Aber ich erzähle dir jetzt von <span className="text-vae-turquoise">VAE Systems</span>.
        </span>
      </p>
      <div className="mt-3 h-5 flex items-center" aria-hidden>
        <span className="inline-block w-[10px] h-5 bg-vae-turquoise/80 animate-pulse rounded-[1px]"></span>
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

