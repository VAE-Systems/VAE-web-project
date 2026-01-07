import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Seo from '@/components/ui/Seo'
import { ArrowRight, Sparkles } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FAMILY_ARTISTS = [
  {
    name: 'Jürgen Goertz',
    role: 'Bildhauer & Künstler',
    url: 'https://www.juergen-goertz.info/work/',
  },
  {
    name: 'Christa Goertz',
    role: 'Malerin',
    url: 'https://studiochristagoertz.com/de/home/',
  },
  {
    name: 'Eva Julia Goertz',
    role: 'Designerin',
    url: 'https://www.collezionebysgd.com/',
  },
]

const DESIGN_PRINCIPLES = [
  {
    title: 'Design ist Nutzung',
    body: 'Interfaces funktionieren erst, wenn Menschen ohne Anleitung ans Ziel kommen. Wir testen Wahrnehmung und Gefühl – nicht nur technische Performance.',
  },
  {
    title: 'Werkstatt statt Blackbox',
    body: 'Prototypen und Design-Entscheidungen sind dokumentiert. Sie können nachvollziehen, warum etwas so aussieht, wie es aussieht.',
  },
  {
    title: 'Präzision als Standard',
    body: 'Skulpturen erlauben keine ungenauen Proportionen. Software auch nicht. Deshalb sind unsere Interfaces konsistent – in Farben, Abständen, Hierarchien.',
  },
]

const DESIGN_BREADCRUMBS = [
  { label: 'Home', path: '/' },
  { label: 'Über uns' },
  { label: 'Design', path: '/ueber-uns/design-handwerk' },
]

const DesignHeritagePage: React.FC = () => {
  const pageTitle = 'Design als Produktfaktor | VAE Systems'
  const pageDescription =
    'Wie VAE Systems Design denkt: Werkstatt-Einblicke, hochauflösende Visuals und Prozesse, die Handwerk und Technologie verbinden.'

  return (
    <div className="relative z-0 bg-bg-darker text-text-light">
      <Seo title={pageTitle} description={pageDescription} canonicalPath="/ueber-uns/design-handwerk" />
      <Breadcrumbs items={DESIGN_BREADCRUMBS} className="mb-2" />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker via-bg-dark to-bg-darker py-24 dark:border-white/5">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.16),transparent_60%)]" />
          <div className="absolute inset-x-0 -bottom-24 h-[420px] bg-gradient-to-t from-bg-darker to-transparent" />
        </div>

        <div className="container-vae relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">
              <Sparkles className="h-4 w-4" /> Design & UX
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-text-light md:text-5xl">
              Design prägt, wie Software sich anfühlt
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              VAE Systems verbindet künstlerische Herkunft mit technischer Präzision. Julian Goertz wuchs in einer
              Familie auf, in der Skulpturen, Malerei und Design Alltag waren. Diese Perspektive prägt, wie wir Software
              gestalten — mit Fokus auf Wahrnehmung, Gefühl und User Experience.
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
              <source srcSet="/images/optimized/Julian-steht-vor-VAE-Logo-Werte.webp" type="image/webp" />
              <source srcSet="/images/optimized/Julian-steht-vor-VAE-Logo-Werte.jpg" type="image/jpeg" />
              <img
                src="/images/optimized/Julian-steht-vor-VAE-Logo-Werte.jpg"
                alt="Julian Goertz steht vor dem VAE-Logo und erklärt das Werte-Framework"
                loading="eager"
                className="h-full w-full object-cover"
                width={1600}
                height={1067}
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* KÜNSTLERISCHE WURZELN */}
      <section className="border-b border-black/5 bg-bg-dark py-20 dark:border-white/5">
        <div className="container-vae">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Künstlerische Wurzeln</h2>
              <p className="text-lg leading-relaxed text-text-secondary">
                Wenn man zwischen Ateliers, Galerien und Werkstätten aufwächst, lernt man früh: Jedes Detail zählt. Jede
                Proportion, jede Farbwahl, jede Komposition ist eine bewusste Entscheidung.
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">Julian Goertz' familiärer Hintergrund:</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {FAMILY_ARTISTS.map(artist => (
                <a
                  key={artist.name}
                  href={artist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition hover:border-vae-turquoise/30"
                >
                  <h3 className="text-xl font-semibold text-text-light group-hover:text-vae-turquoise">
                    {artist.name}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">{artist.role}</p>
                  <p className="mt-3 text-xs text-vae-turquoise group-hover:text-vae-turquoise dark:text-vae-turquoise/70">
                    Zur Website →
                  </p>
                </a>
              ))}
            </div>

            <p className="text-base leading-relaxed text-text-secondary">
              Diese Einflüsse prägen unseren Ansatz: Wir gestalten Software mit der gleichen Aufmerksamkeit für Details,
              Proportionen und Wahrnehmung, die in Skulpturen und Gemälden steckt. Was in der bildenden Kunst
              selbstverständlich ist – intensive Auseinandersetzung mit Material, Form und Wirkung – übertragen wir auf
              digitale Produkte.
            </p>
            <p className="text-base leading-relaxed text-text-secondary">
              Das bedeutet konkret: Wir hinterfragen jede Schrift, jeden Abstand, jeden Interaktionsablauf. Nicht aus
              Perfektionismus, sondern weil schlechtes Design echte Kosten verursacht – verlorene Nutzer,
              Support-Anfragen, Frustration im Team.
            </p>

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,0.4)]">
              <picture>
                <source srcSet="/images/optimized/Finger-Zeigt-auf-VAE-Apps-auf-Leinwand.webp" type="image/webp" />
                <source srcSet="/images/optimized/Finger-Zeigt-auf-VAE-Apps-auf-Leinwand.jpg" type="image/jpeg" />
                <img
                  src="/images/optimized/Finger-Zeigt-auf-VAE-Apps-auf-Leinwand.jpg"
                  alt="Workshop-Folie mit VAE App-Landschaft"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  width={1600}
                  height={1067}
                  sizes="90vw"
                />
              </picture>
            </div>

            <p className="text-base leading-relaxed text-text-secondary">
              Diese Website selbst hat über 100 Stunden Design- und Testing-Arbeit erfahren, um ein außergewöhnlich
              begründetes und herausstechendes Nutzungserlebnis zu gewährleisten. Jede Animation, jede Transition, jede
              Farbkombination wurde auf verschiedenen Geräten getestet, mit unterschiedlichen Nutzergruppen validiert
              und iterativ verfeinert.
            </p>
            <p className="text-base leading-relaxed text-text-secondary">
              Das Ergebnis: Eine Website, die nicht nur gut aussieht, sondern sich gut anfühlt – schnell, intuitiv,
              zugänglich. Genau so arbeiten wir auch an Ihren Projekten.
            </p>
          </div>
        </div>
      </section>

      {/* WIE DAS EINFLIESST */}
      <section className="border-b border-black/5 bg-gradient-to-b from-bg-dark to-bg-darker py-20 dark:border-white/5">
        <div className="container-vae">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Wie das in unsere Arbeit einfließt</h2>
              <p className="text-lg leading-relaxed text-text-secondary">
                Design ist bei VAE Systems kein nachträgliches Styling. Es ist von Anfang an Teil der Produktentwicklung
                – von der ersten Skizze bis zum finalen Release.
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                Viele Unternehmen trennen Design und Engineering – erst wird etwas schön gemacht, dann wird es gebaut.
                Wir arbeiten anders: Design und Entwicklung entstehen parallel, iterativ, in ständigem Austausch.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {DESIGN_PRINCIPLES.map(principle => (
                <article
                  key={principle.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
                >
                  <h3 className="text-xl font-semibold text-text-light">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{principle.body}</p>
                </article>
              ))}
            </div>

            <p className="text-base leading-relaxed text-text-secondary">
              Wir dokumentieren jeden Schritt in denselben Tools, die Ihr Team ohnehin nutzt. Dadurch bleiben
              Wissensübergaben nachvollziehbar – egal ob Sie das Design intern weiterführen oder mit uns ausbauen.
            </p>
            <p className="text-base leading-relaxed text-text-secondary">
              Das Ergebnis sind Produkte, die nicht nur technisch funktionieren, sondern die Menschen gerne nutzen. Die
              keine Schulungen brauchen. Die sich richtig anfühlen. Die langfristig wartbar bleiben, weil jede
              Entscheidung dokumentiert und begründet ist.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-vae-turquoise/10 bg-gradient-to-br from-bg-dark via-bg-darker to-bg-dark py-24">
        <div className="container-vae text-center">
          <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Projekt besprechen</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Lassen Sie uns prüfen, wie wir Ihre Software, Ihr Dashboard oder Ihre Plattform klarer, verständlicher und
            angenehmer machen können.
          </p>
          <MagneticButton className="mx-auto mt-10 inline-flex">
            <a
              href="https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz"
              target="_blank"
              rel="noreferrer"
              className="btn-primary flex min-w-[260px] items-center justify-center gap-3"
            >
              <ArrowRight className="h-4 w-4" /> Erstgespräch buchen
            </a>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}

export default DesignHeritagePage
