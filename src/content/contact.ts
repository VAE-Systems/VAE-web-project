export interface ContactHero {
  title: string
  subtitle: string
}

export interface ContactIntro {
  title: string
  body: string
}

export interface USP {
  key: string
  title: string
  body: string
  icon: string
}

export interface ContactCta {
  title: string
  body: string
  prompt: string
}

export const contactHero: ContactHero = {
  title: 'Kontakt',
  subtitle: 'Lassen Sie uns über Ihr nächstes KI-Projekt sprechen'
}

export const contactIntro: ContactIntro = {
  title: 'Von der Idee zur Umsetzung – und darüber hinaus.',
  body: 'Wir entwickeln KI-gestützte Systeme, die aktuelle Herausforderungen lösen und gleichzeitig ein stabiles Fundament für die Zukunft Ihres Unternehmens schaffen.'
}

export const contactUsps: USP[] = [
  {
    key: 'fast',
    title: 'Schnelle Umsetzung',
    body: 'Von der Idee zum funktionierenden Prototyp in wenigen Wochen – mit klarer Kommunikation und direkten Ansprechpartnern.',
    icon: 'bolt'
  },
  {
    key: 'reliable',
    title: 'Verlässliche Systeme',
    body: 'Wir liefern Lösungen, die robust, nachvollziehbar und sicher sind – für den echten Einsatz in Ihrem Unternehmen.',
    icon: 'verified'
  },
  {
    key: 'futureproof',
    title: 'Zukunftsfähige Technologie',
    body: 'Unsere Automatisierungen legen ein Fundament, das mit Ihrem Unternehmen wächst und langfristig Mehrwert schafft.',
    icon: 'auto_awesome'
  }
]

export const contactCta: ContactCta = {
  title: 'Bereit, Ihr Projekt zu starten?',
  body: 'Senden Sie uns Ihre Anfrage – wir melden uns innerhalb von 24 Stunden.',
  prompt: 'Zum Kontaktformular'
}
