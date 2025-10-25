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

// Utility: normalize line breaks for email compatibility (force CRLF)
const normalizeEmailBody = (body: string): string => {
  // Collapse mixed newlines to \n first
  const unified = body.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  // Remove trailing spaces on each line
  const cleaned = unified
    .split('\n')
    .map(l => l.replace(/\s+$/, ''))
    .join('\n')
  // Ensure single blank lines (no triples)
  const compact = cleaned.replace(/\n{3,}/g, '\n\n')
  // Convert to CRLF
  return compact.replace(/\n/g, '\r\n')
}

const buildMailto = (def: MailtoCtaDef, ctx: CtaContext): string => {
  const email = typeof def.email === 'function' ? def.email(ctx) : def.email
  const subjectRaw = typeof def.subject === 'function' ? def.subject(ctx) : interpolate(def.subject, ctx)
  const bodyRaw = typeof def.body === 'function' ? def.body(ctx) : interpolate(def.body, ctx)

  // Normalize line breaks for email client compatibility
  const body = normalizeEmailBody(bodyRaw.trim())

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
    label: 'Kontakt',
  },
  'contact.demo': {
    id: 'contact.demo',
    type: 'route',
    path: '/contact',
    label: 'Demo anfragen',
    query: {
      intent: ctx => (ctx.intent ? String(ctx.intent) : 'demo'),
      product: ctx => (ctx.product ? String(ctx.product) : undefined),
    },
  },
  // Direct scheduling (Notion booking link)
  'contact.schedule_call': {
    id: 'contact.schedule_call',
    type: 'external',
    url: 'https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz',
    label: 'Kostenloses Erstgespräch',
    newTab: true,
  },
  // Quick email CTA
  'contact.quick_email': {
    id: 'contact.quick_email',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'Direkte Frage per Mail',
    subject: ctx => `Kurzfrage zu KI Projekt${ctx.product ? ` – ${ctx.product}` : ''}`,
    body: ctx =>
      `Hallo VAE Systems,\n\nich habe eine kurze Frage zu${ctx.product ? ` ${ctx.product}` : ' Ihrem Angebot'}.\n\nFRAGE / THEMA:\n[Bitte kurz schildern]\n\nKONTEXT (1–2 Sätze):\n[Projekt / Situation]\n\nMEINE KONTAKTDATEN:\n• Name / Rolle: [ ]\n• Firma (optional): [ ]\n• Telefon / Erreichbarkeit (Zeiten): [ ]\n\nOPTIONAL – WEITERE HINWEISE:\n[ ]\n\nVielen Dank & beste Grüße\n[Ihr Name]\n\n— meta: from: ${ctx.fromPage || 'unknown'} | intent: ${ctx.intent || 'quick-question'} | product: ${ctx.product || 'general'}`,
  },
  // Product-specific: VAE CORE contact via email
  'product.vae-core.contact_email': {
    id: 'product.vae-core.contact_email',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'VAE CORE – Kontakt',
    subject: 'Anfrage: VAE CORE – Interesse/Demo',
    body: `Hallo VAE Systems,\n\nich interessiere mich für VAE CORE und hätte gern ein kurzes Erstgespräch.\n\nKURZER BEDARF / ZIEL:\n[ ]\n\nTECHNISCHE / ORGANISATORISCHE ANFORDERUNGEN:\n• Sicherheit / Compliance: [ ]\n• Betriebsmodell / Hosting: [ ]\n\nTEAM & UMGEBUNG:\n• Teamgröße / Nutzer: [ ]\n• Rollen / Stakeholder: [ ]\n\nWUNSCHTERMIN(E) FÜR 15–20 MIN ERSTGESPRÄCH:\n[Bitte 2–3 Zeitfenster anbieten]\n\nOPTIONALE ZUSÄTZLICHE HINWEISE:\n[ ]\n\nKONTAKT:\n• Name / Rolle: [ ]\n• Firma: [ ]\n• Telefon / Erreichbarkeit: [ ]\n\nVielen Dank & beste Grüße\n[Ihr Name]\n\n— meta: from: vae-core-page | intent: contact | product: VAE CORE`,
  },
  // Product-specific: VAE CORE demo route (keeps contact form flow)
  'product.vae-core.demo': {
    id: 'product.vae-core.demo',
    type: 'route',
    path: '/contact',
    label: 'Kostenlose Demo buchen',
    query: {
      intent: () => 'demo',
      product: () => 'vae-core',
    },
  },
  // External reference kept for completeness
  'product.vae-core.github': {
    id: 'product.vae-core.github',
    type: 'external',
    url: 'https://github.com/vae-systems/vae-core',
    label: 'GitHub Repository',
    newTab: true,
  },
  // Product grid: generic product contact via email
  'products.contact_email': {
    id: 'products.contact_email',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'Kontakt',
    subject: ctx => `Anfrage: ${ctx.product ? String(ctx.product) : 'Produkt'} – Info/Demo`,
    body: ctx =>
      `Hallo VAE Systems,\n\nich interessiere mich für ${ctx.product || 'ein Produkt'} und bitte um weitere Informationen.\n\nKURZER BEDARF / USE CASE:\n[ ]\n\nZEITRAHMEN / PRIORITÄT:\n[ ]\n\nTEAM & NUTZER:\n• Teamgröße: [ ]\n• Hauptnutzer / Rollen: [ ]\n\nANFORDERUNGEN / RANDBEDINGUNGEN:\n• Sicherheit / Compliance: [ ]\n• Integration / Schnittstellen: [ ]\n\nOPTIONALE WEITERE HINWEISE:\n[ ]\n\nKONTAKT:\n• Name / Rolle: [ ]\n• Firma (optional): [ ]\n• Telefon / Erreichbarkeit: [ ]\n\nVielen Dank & beste Grüße\n[Ihr Name]\n\n— meta: from: ${ctx.fromPage || 'products-grid'} | intent: ${ctx.intent || 'contact'} | product: ${ctx.product || 'general'}`,
  },
  // Tools page: Early Interest (opens mail client with template)
  'products.tools.early_interest_email': {
    id: 'products.tools.early_interest_email',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'Early Interest anmelden',
    subject: ctx => `Ich interessiere mich für Early Access zu ${ctx.product || 'Applikationen & Modulen'}`,
    body: ctx =>
      `Hallo VAE Systems,\n\nich möchte Early Access anmelden für ${ctx.product || 'Applikationen & Module'}.\n\nKURZBESCHREIBUNG / BEDARF:\n[ ]\n\nGEPLANTER EINSATZZEITRAUM:\n[ ]\n\nTEAM / NUTZER:\n• Teamgröße: [ ]\n• Nutzergruppen / Rollen: [ ]\n\nSECURITY / COMPLIANCE ANFORDERUNGEN:\n[ ]\n\nOPTIONALE WEITERE HINWEISE:\n[ ]\n\nKONTAKT:\n• Name / Rolle: [ ]\n• Firma (optional): [ ]\n• Telefon / Erreichbarkeit: [ ]\n\nDanke & viele Grüße\n[Ihr Name]\n\n— meta: from: ${ctx.fromPage || 'unknown'} | intent: ${ctx.intent || 'early-access'} | product: ${ctx.product || 'Applikationen & Module'}`,
  },
  // Consulting: 2 Days On-Site Workshop
  'consulting.two_days_workshop': {
    id: 'consulting.two_days_workshop',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'Beratung anfragen',
    subject: 'Anfrage: 2 Tage Vor Ort Intensiv-Workshop',
    body: `Hallo VAE Systems,\n\nich interessiere mich für Ihren 2 TAGE VOR ORT INTENSIV-WORKSHOP.\n\nAKTUELLER BEDARF / AUSGANGSLAGE:\n[ ]\n\nHERAUSFORDERUNGEN / SCHMERZPUNKTE:\n[ ]\n\nERWARTETE ERGEBNISSE / ZIELE NACH DEN 2 TAGEN:\n[ ]\n\nVERFÜGBARE TERMINE (2–3 Optionen):\n[ ]\n\nKONTAKT & ORGANISATION:\n• Name / Rolle: [ ]\n• Firma: [ ]\n• Standort (Vor-Ort): [ ]\n• Telefon / Erreichbarkeit: [ ]\n\nBUDGETRAHMEN BESTÄTIGUNG: 3.800 € (Standard)\n\nOPTIONALE WEITERE HINWEISE:\n[ ]\n\nVielen Dank & beste Grüße\n[Ihr Name]\n\n— meta: from: consulting-page | intent: workshop-booking | service: 2-days-workshop | price: 3800`,
  },
  // Consulting: 2 Days On-Site Workshop (Form Route)
  'consulting.two_days_workshop.route': {
    id: 'consulting.two_days_workshop.route',
    type: 'route',
    path: '/contact',
    label: 'Workshop Formular',
    query: {
      intent: () => 'workshop',
      service: () => '2-days-workshop',
    },
  },
  // Consulting: Deep-Dive Architecture & Governance
  'consulting.deep_dive_architecture': {
    id: 'consulting.deep_dive_architecture',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'Beratung anfragen',
    subject: 'Anfrage: Deep-Dive Architektur & Governance',
    body: `Hallo VAE Systems,\n\nich interessiere mich für Ihren DEEP-DIVE: ARCHITEKTUR & GOVERNANCE (Entscheidungsvorlage).\n\nAKTUELLER BEDARF / FRAGESTELLUNG:\n[ ]\n\nTECHNISCHE / ORGANISATORISCHE HERAUSFORDERUNGEN:\n[ ]\n\nZIEL / ERWARTETE ENTSCHEIDUNG / OUTCOME:\n[ ]\n\nZEITRAHMEN FÜR ENTSCHEIDUNGSVORLAGE:\n[ ]\n\nKONTAKT:\n• Name / Rolle: [ ]\n• Firma: [ ]\n• Telefon / Erreichbarkeit: [ ]\n\nBUDGETRAHMEN: Auf Anfrage (bitte Optionen senden)\n\nOPTIONALE WEITERE HINWEISE:\n[ ]\n\nVielen Dank & beste Grüße\n[Ihr Name]\n\n— meta: from: consulting-page | intent: deep-dive-booking | service: architecture-governance | price: on-request`,
  },
  // Consulting: Deep-Dive Architecture & Governance (Form Route)
  'consulting.deep_dive_architecture.route': {
    id: 'consulting.deep_dive_architecture.route',
    type: 'route',
    path: '/contact',
    label: 'Deep-Dive Formular',
    query: {
      intent: () => 'deep-dive',
      service: () => 'architecture-governance',
    },
  },
  // Consulting: Monthly Support
  'consulting.monthly_support': {
    id: 'consulting.monthly_support',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'Beratung anfragen',
    subject: 'Anfrage: Monatliche Begleitung & Support',
    body: `Hallo VAE Systems,\n\nich interessiere mich für Ihre MONATLICHE BEGLEITUNG (Reviews, Vendor-Auswahl, Architektur & KPI Monitoring).\n\nAKTUELLER BEDARF / FOKUS:\n[ ]\n\nHERAUSFORDERUNGEN / RISIKEN:\n[ ]\n\nERWARTETE ZIELE / KPIs:\n[ ]\n\nGEWÜNSCHTE LAUFZEIT / START:\n[ ]\n\nKONTAKT:\n• Name / Rolle: [ ]\n• Firma: [ ]\n• Telefon / Erreichbarkeit: [ ]\n\nBUDGETRAHMEN: ab 5.000 € monatlich (bitte Staffelung senden)\n\nOPTIONALE WEITERE HINWEISE:\n[ ]\n\nVielen Dank & beste Grüße\n[Ihr Name]\n\n— meta: from: consulting-page | intent: monthly-support-booking | service: monthly-support | price: 5000+`,
  },
  // Consulting: Monthly Support (Form Route)
  'consulting.monthly_support.route': {
    id: 'consulting.monthly_support.route',
    type: 'route',
    path: '/contact',
    label: 'Begleitung Formular',
    query: {
      intent: () => 'monthly-support',
      service: () => 'monthly-support',
    },
  },

  // Generic initial consultation (Erstgespräch) mailto
  'consulting.initial_call': {
    id: 'consulting.initial_call',
    type: 'mailto',
    email: BUSINESS_EMAIL,
    label: 'Erstgespräch buchen',
    subject: 'Anfrage: Erstgespräch (15–20 Min)',
    body: `Hallo VAE Systems,\n\nich würde gern ein unverbindliches ERSTGESPRÄCH (15–20 Min) vereinbaren.\n\nKURZER KONTEXT / THEMENSTELLUNG:\n[ ]\n\nZIELE DES GESPRÄCHS:\n[ ]\n\nAKTUELLE PHASE / STATUS IM PROJEKT:\n[ ]\n\nWUNSCHTERMIN(E) – BITTE 2–3 OPTIONEN:\n[ ]\n\nKONTAKT:\n• Name / Rolle: [ ]\n• Firma (optional): [ ]\n• Telefon / Erreichbarkeit: [ ]\n\nOPTIONALE HINWEISE / LINKS:\n[ ]\n\nVielen Dank & beste Grüße\n[Ihr Name]\n\n— meta: from: consulting-page | intent: initial-call | service: initial-call`,
  },
  // Consulting: Initial Call (Form Route)
  'consulting.initial_call.route': {
    id: 'consulting.initial_call.route',
    type: 'route',
    path: '/contact',
    label: 'Erstgespräch Formular',
    query: {
      intent: () => 'initial-call',
      service: () => 'initial-call',
    },
  },
}

// Builder function
export const buildCta = (id: string, ctx: CtaContext = {}): BuiltCta => {
  const def = CTA_REGISTRY[id]
  if (!def) {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`[CTA] Unknown id '${id}' – fallback zu /contact`)
    }
    // Fallback to general contact route
    return {
      id: 'contact.general',
      type: 'route',
      href: '/contact',
      label: 'Kontakt',
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
