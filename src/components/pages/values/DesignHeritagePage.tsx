import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Seo from '@/components/ui/Seo'
import { ArrowRight, Sparkles } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const DESIGN_PRINCIPLES = [
  {
    title: 'Design ist Nutzung',
    body: 'Interfaces gelten bei uns erst als fertig, wenn Menschen ohne Erklärung ans Ziel kommen. Performance-Budgets, Microcopy und Motion-Guidelines sind Teil des Briefings – nicht das Sahnehäubchen.',
  },
  {
    title: 'Werkstatt statt Blackbox',
    body: 'Prototypen, Figma-Dateien und Token-Systeme liegen in Ihren Repos. Sie können nachvollziehen, warum eine Entscheidung gefallen ist und welche Variante verworfen wurde.',
  },
  {
    title: 'Künstlerische DNA',
    body: 'Julian Goertz wuchs zwischen Skulpturen und Entwürfen auf. Präzision, Materialtreue und Geduld sind deshalb gelebte Praxis – nicht Marketingsprache.',
  },
]

const PROCESS_STEPS = [
  {
    label: '01',
    title: 'Research & Kontext',
    detail:
      'Stakeholder-Interviews, Daten aus Support-Logs und Beobachtungen aus laufenden Plattformen. Wir verstehen, welche Jobs-to-be-done Ihr Interface wirklich lösen muss.',
  },
  {
    label: '02',
    title: 'System & Tokens',
    detail:
      'Design Tokens, Komponenten und Content-Guidelines entstehen gemeinsam mit Engineering. So entstehen keine Übergabe-Brüche zwischen Figma und Code.',
  },
  {
    label: '03',
    title: 'Review & Proof',
    detail:
      'Bevor etwas live geht, testen wir Accessibility, Performance und Storybook-Stände. Erst wenn Zahlen und Gefühl stimmen, wird released.',
  },
]

const GALLERY = [
  {
    id: 'julian',
    title: 'Julian vor dem VAE-Logo',
    description:
      'Strategie-Session zur Wertekommunikation – dokumentiert in 4K und optimiert auf 2000px Breite für Web.',
    sources: {
      webp: '/images/optimized/Julian-steht-vor-VAE-Logo-Werte.webp',
      jpg: '/images/optimized/Julian-steht-vor-VAE-Logo-Werte.jpg',
      full: '/images/optimized/Julian-steht-vor-VAE-Logo-Werte.jpg',
    },
  },
  {
    id: 'apps',
    title: 'Finger zeigt auf VAE Apps',
    description:
      'Workshop-Folie mit App-Landschaft. Wir liefern Ihnen die optimierte 1920px-Version plus Zugriff auf die Originaldatei für Print.',
    sources: {
      webp: '/images/optimized/Finger-Zeigt-auf-VAE-Apps-auf-Leinwand.webp',
      jpg: '/images/optimized/Finger-Zeigt-auf-VAE-Apps-auf-Leinwand.jpg',
      full: '/images/raw/Finger-Zeigt-auf-VAE-Apps-auf-Leinwand.jpg',
    },
  },
]

const DesignHeritagePage: React.FC = () => {
  const pageTitle = 'Design als Produktfaktor | VAE Systems'
  const pageDescription =
    'Wie VAE Systems Design denkt: Werkstatt-Einblicke, hochauflösende Visuals und Prozesse, die Handwerk und Technologie verbinden.'

  return (
    <div className="bg-bg-darker text-text-light">
      <Seo title={pageTitle} description={pageDescription} canonicalPath="/ueber-uns/design-handwerk" />

      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker via-bg-dark to-bg-darker py-24 dark:border-white/5">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.16),transparent_60%)]" />
          <div className="absolute inset-x-0 -bottom-24 h-[420px] bg-gradient-to-t from-bg-darker to-transparent" />
        </div>

        <div className="container-vae relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">
              <Sparkles className="h-4 w-4" /> Design Mehr erfahren
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-text-light md:text-5xl">
              Design als Werkstatt – nicht als Dekoration
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              Wir verbinden künstlerische Herkunft mit belastbarer Produktentwicklung. Jede Visualisierung – vom
              Werteplakat bis zur App-Landkarte – wird in hoher Auflösung produziert, versioniert und in Ihre Systeme
              eingebunden.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton className="inline-flex">
                <Link to="/contact" className="btn-primary flex items-center gap-3">
                  <ArrowRight className="h-4 w-4" /> Projekt besprechen
                </Link>
              </MagneticButton>
              <Link to="/ueber-uns/werte" className="btn-ghost inline-flex items-center gap-2">
                Zurück zu den Werten
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <picture>
              <source srcSet={GALLERY[0].sources.webp} type="image/webp" />
              <source srcSet={GALLERY[0].sources.jpg} type="image/jpeg" />
              <img
                src={GALLERY[0].sources.jpg}
                alt="Julian Goertz steht vor dem VAE-Logo und erklärt das Werte-Framework"
                loading="eager"
                className="h-full w-full object-cover"
                width={1600}
                height={1067}
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </picture>
            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-black/50 p-4 text-sm text-white backdrop-blur">
              <p className="font-semibold">Julian vor dem neuen Werte-Canvas</p>
              <p className="text-white/80">Aufgenommen in 4K · Export auf 2000px Breite optimiert für Web & Retina</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-bg-dark py-20 dark:border-white/5">
        <div className="container-vae grid gap-8 md:grid-cols-3">
          {DESIGN_PRINCIPLES.map(principle => (
            <article
              key={principle.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Prinzip</p>
              <h2 className="mt-3 text-xl font-semibold text-text-light">{principle.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-black/5 bg-gradient-to-b from-bg-dark to-bg-darker py-24 dark:border-white/5">
        <div className="container-vae grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Ablauf</p>
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">
              Vom ersten Scribble bis zum Release begleitet
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Wir dokumentieren jeden Schritt in denselben Tools, die Ihr Team ohnehin nutzt. Dadurch bleiben
              Wissensübergaben nachvollziehbar – egal ob Sie das Design intern weiterführen oder mit uns ausbauen
              möchtest.
            </p>
          </div>
          <div className="space-y-6">
            {PROCESS_STEPS.map(step => (
              <div key={step.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/60">{step.label}</p>
                <h3 className="mt-2 text-2xl font-semibold text-text-light">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-darker py-24">
        <div className="container-vae">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Bildmaterial</p>
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">
              Optimierte Assets zum direkten Einsatz
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-text-secondary">
              Jede Aufnahme liegt als performante WebP-Version und als hochauflösender Export vor. Für Druck oder
              Keynotes können Sie die Vollversion (bis zu 4000px Breite) jederzeit aus unserem Asset-Ordner abrufen.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {GALLERY.map(image => (
              <figure
                key={image.id}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] shadow-[0_25px_70px_rgba(0,0,0,0.4)]"
              >
                <picture>
                  <source srcSet={image.sources.webp} type="image/webp" />
                  <source srcSet={image.sources.jpg} type="image/jpeg" />
                  <img
                    src={image.sources.jpg}
                    alt={image.title}
                    loading="lazy"
                    className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    width={1600}
                    height={1067}
                    sizes="(min-width: 768px) 50vw, 90vw"
                  />
                </picture>
                <figcaption className="flex flex-col gap-1 border-t border-white/10 bg-black/50 px-6 py-4 text-left text-sm text-white backdrop-blur">
                  <p className="font-semibold">{image.title}</p>
                  <p className="text-white/80">{image.description}</p>
                  <a
                    href={image.sources.full}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80 transition hover:text-vae-turquoise"
                  >
                    Vollauflösung öffnen
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-vae-turquoise/10 bg-gradient-to-br from-bg-dark via-bg-darker to-bg-dark py-24">
        <div className="container-vae text-center">
          <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Next Step: Ihr Designsystem aufwerten</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Lassen Sie uns prüfen, wie wir Ihre Marke, Ihre Produkte oder Ihr internes Tooling sichtbarer, schneller und
            verständlicher machen können – inklusive dokumentierter Assets und klarer Handovers.
          </p>
          <MagneticButton className="mx-auto mt-10 inline-flex">
            <Link to="/contact" className="btn-primary flex min-w-[260px] items-center justify-center gap-3">
              <ArrowRight className="h-4 w-4" /> Erstgespräch buchen
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}

export default DesignHeritagePage
