/**
 * Central CTA registry and helpers
 *
 * Goals
 * - Single source of truth for all CTA destinations (routes, external, mailto)
 * - Consistent, URL-safe mailto templates with simple variable interpolation
 * - Type-safe API to build CTA href + metadata from an ID and optional context
 */

export type CtaType = 'route' | 'external' | 'mailto'

export interface CtaContext {
  // Generic context fields for templating (extend as needed)
  product?: string
  fromPage?: string
  source?: string
  intent?: string
  // Additional free-form data
  [key: string]: unknown
}

export interface CtaDefBase {
  id: string
  label?: string
  type: CtaType
}

export interface RouteCtaDef extends CtaDefBase {
  type: 'route'
  path: string // e.g. '/contact'
  // optional query parameters builder
  query?: Record<string, string | ((ctx: CtaContext) => string | undefined)>
}

export interface ExternalCtaDef extends CtaDefBase {
  type: 'external'
  url: string
  newTab?: boolean
}

export interface MailtoCtaDef extends CtaDefBase {
  type: 'mailto'
  email: string | ((ctx: CtaContext) => string)
  subject: string | ((ctx: CtaContext) => string)
  body: string | ((ctx: CtaContext) => string)
}

export type CtaDef = RouteCtaDef | ExternalCtaDef | MailtoCtaDef

export interface BuiltCta {
  id: string
  type: CtaType
  href: string
  label?: string
  target?: string
  rel?: string
}

// Central business email — adjust once, used everywhere
// Prefer kontakt@vae-systems.com (unify domain references)
const BUSINESS_EMAIL = 'kontakt@vae-systems.com'

// Utility: simple template interpolation with {{var}} syntax
const interpolate = (tpl: string, ctx: CtaContext = {}): string =>
  tpl.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
    const val = ctx[key]
    return typeof val === 'string' && val ? val : ''
  })

// Utility: encode content for mailto params
const encode = (v: string): string => encodeURIComponent(v)

const buildMailto = (def: MailtoCtaDef, ctx: CtaContext): string => {
  const email = typeof def.email === 'function' ? def.email(ctx) : def.email
  const subjectRaw = typeof def.subject === 'function' ? def.subject(ctx) : interpolate(def.subject, ctx)
  const bodyRaw = typeof def.body === 'function' ? def.body(ctx) : interpolate(def.body, ctx)

  // Normalize newlines and add optional source hint
  const lines = [bodyRaw.trim()]
  if (ctx.source || ctx.fromPage || ctx.intent || ctx.product) {
    const meta = [
      ctx.source ? `source: ${ctx.source}` : undefined,
      ctx.fromPage ? `from: ${ctx.fromPage}` : undefined,
      ctx.intent ? `intent: ${ctx.intent}` : undefined,
      ctx.product ? `product: ${ctx.product}` : undefined,
    ].filter(Boolean)
    if (meta.length) lines.push('', `— meta: ${meta.join(' | ')}`)
  }
  const body = lines.join('\n')

  return `mailto:${email}?subject=${encode(subjectRaw)}&body=${encode(body)}`
}

const buildRoute = (def: RouteCtaDef, ctx: CtaContext): string => {
  const url = new URL(def.path, 'http://local') // base ignored when reading pathname+search
  if (def.query) {
    for (const [k, v] of Object.entries(def.query)) {
      const value = typeof v === 'function' ? v(ctx) : v
      if (value) url.searchParams.set(k, value)
    }
  }
  return url.pathname + (url.search ? url.search : '')
}

// CTA Registry — extend as needed
export const CTA_REGISTRY: Record<string, CtaDef> = {
  // General contact routes
  'contact.general': {
    id: 'contact.general',
    type: 'route',
    path: '/contact',
    label: 'Kontakt'
  },
  'contact.demo': {
    id: 'contact.demo',
    type: 'route',
    path: '/contact',
    label: 'Demo anfragen',
    query: {
      intent: (ctx) => ctx.intent ? String(ctx.intent) : 'demo',
      product: (ctx) => (ctx.product ? String(ctx.product) : undefined),
    },
  },
  // Quick email CTA
  'contact.quick_email': {
    id: 'contact.quick_email',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'Direkte Frage per Mail',
    subject: (ctx) => `Kurzfrage zu KI Projekt${ctx.product ? ` – ${ctx.product}` : ''}`,
    body: (ctx) => `Hallo VAE Systems,

ich habe eine kurze Frage zu${ctx.product ? ` ${ctx.product}` : ' Ihrem Angebot'}.

Mein Kontext in 1–2 Sätzen:

Meine Kontaktdaten:
• Name / Rolle:
• Firma (optional):
• Erreichbarkeit (Telefon, Zeiten):

Danke & viele Grüße!

— meta: from: ${ctx.fromPage || 'unknown'} | intent: ${ctx.intent || 'quick-question'} | product: ${ctx.product || 'general'}`
  },
  // Product-specific: VAE CORE contact via email
  'product.vae-core.contact_email': {
    id: 'product.vae-core.contact_email',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'VAE CORE – Kontakt',
    subject: 'Anfrage: VAE CORE – Interesse/Demo',
    body: `Hallo VAE Systems,

ich interessiere mich für VAE CORE.

Kurz zu meinem Bedarf:
• Use Case / Ziel:
• Teamgröße / Nutzer:
• Sicherheits-/Compliance-Anforderungen:

Wunschtermin für ein 15–20 Min. Erstgespräch:

Beste Grüße

— meta: from: vae-core-page | intent: contact | product: VAE CORE`
  },
  // Product-specific: VAE CORE demo route (keeps contact form flow)
  'product.vae-core.demo': {
    id: 'product.vae-core.demo',
    type: 'route',
    path: '/contact',
    label: 'Kostenlose Demo buchen',
    query: {
      intent: () => 'demo',
      product: () => 'vae-core'
    }
  },
  // External reference kept for completeness
  'product.vae-core.github': {
    id: 'product.vae-core.github',
    type: 'external',
    url: 'https://github.com/vae-systems/vae-core',
    label: 'GitHub Repository',
    newTab: true
  },
  // Product grid: generic product contact via email
  'products.contact_email': {
    id: 'products.contact_email',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'Kontakt',
    subject: (ctx) => `Anfrage: ${ctx.product ? String(ctx.product) : 'Produkt'} – Info/Demo`,
    body: (ctx) => `Hallo VAE Systems,

ich interessiere mich für ${ctx.product || 'ein Produkt'}.

Kurz zu meinem Bedarf:
• Use Case / Ziel:
• Zeitrahmen:
• Teamgröße / Nutzer:

Beste Grüße

— meta: from: ${ctx.fromPage || 'products-grid'} | intent: ${ctx.intent || 'contact'} | product: ${ctx.product || 'general'}`
  },
  // Tools page: Early Interest (opens mail client with template)
  'products.tools.early_interest_email': {
    id: 'products.tools.early_interest_email',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'Early Interest anmelden',
    subject: (ctx) => `Ich interessiere mich für Early Access zu ${ctx.product || 'Applikationen & Modulen'}`,
    body: (ctx) => `Hallo VAE Systems,

ich möchte Early Access anmelden für ${ctx.product || 'Applikationen & Module'}.

Kurz zu meinem Kontext:
• Kurzbeschreibung / Bedarf:
• Geplanter Einsatzzeitraum:
• Teamgröße / Nutzer:
• Anforderungen (Security/Compliance):

Meine Kontaktdaten:
• Name / Rolle:
• Firma (optional):
• Erreichbarkeit (Telefon, Zeiten):

Danke & viele Grüße!

— meta: from: ${ctx.fromPage || 'unknown'} | intent: ${ctx.intent || 'early-access'} | product: ${ctx.product || 'Applikationen & Module'}`
  },
}

// Builder function
export const buildCta = (id: string, ctx: CtaContext = {}): BuiltCta => {
  const def = CTA_REGISTRY[id]
  if (!def) {
    // Fallback to general contact route
    return {
      id: 'contact.general',
      type: 'route',
      href: '/contact',
      label: 'Kontakt'
    }
  }

  switch (def.type) {
    case 'mailto': {
      return {
        id: def.id,
        type: 'mailto',
        href: buildMailto(def, ctx),
        label: def.label,
      }
    }
    case 'external': {
      return {
        id: def.id,
        type: 'external',
        href: def.url,
        label: def.label,
        target: def.newTab ? '_blank' : undefined,
        rel: def.newTab ? 'noopener noreferrer' : undefined,
      }
    }
    case 'route': {
      return {
        id: def.id,
        type: 'route',
        href: buildRoute(def, ctx),
        label: def.label,
      }
    }
    // no default: union exhaustive
  }
}
