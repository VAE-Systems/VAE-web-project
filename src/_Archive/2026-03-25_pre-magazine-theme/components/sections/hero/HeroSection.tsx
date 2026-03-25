import MagneticButton from '@/components/ui/buttons/MagneticButton'
import CtaLink from '@/components/ui/CtaLink'
import Icon from '@/components/ui/Icon'
import { heroBenefits, heroDescription, heroEyebrow, heroTitle } from '@/content/home'
import { useTheme } from '@/contexts/ThemeContext'
import { gsap } from 'gsap'
import { ArrowRight, CalendarClock, ChevronDown } from 'lucide-react'
import React from 'react'
import GeometricBackground from '../effects/GeometricBackground'

const NeuralNetworkBackground = React.lazy(() => import('../effects/NeuralNetworkBackground'))

const TIMING = {
  bgActivationDelay: 150,
  bgThreshold: 0.35,
}

const HeroSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const reducedMotion = React.useMemo(
    () =>
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
    []
  )

  const [enableBg, setEnableBg] = React.useState(false)

  // Refs for Balken entrance animation
  const eyebrowRef = React.useRef<HTMLDivElement>(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const descRef = React.useRef<HTMLDivElement>(null)
  const badgesRef = React.useRef<HTMLDivElement>(null)
  const ctasRef = React.useRef<HTMLDivElement>(null)
  const cardRef = React.useRef<HTMLDivElement>(null)

  // Refs for film-split scroll exit
  const topCoverRef = React.useRef<HTMLDivElement>(null)
  const bottomCoverRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (reducedMotion) return
    if (typeof window === 'undefined') return

    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      const timeout = window.setTimeout(() => setEnableBg(true), 120)
      return () => window.clearTimeout(timeout)
    }

    let timeout: number | null = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect()
          timeout = window.setTimeout(() => setEnableBg(true), TIMING.bgActivationDelay)
        }
      },
      { threshold: TIMING.bgThreshold }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timeout) window.clearTimeout(timeout)
    }
  }, [reducedMotion])

  // Balken entrance animation
  React.useEffect(() => {
    if (reducedMotion) return
    const els = [
      eyebrowRef.current,
      titleRef.current,
      descRef.current,
      badgesRef.current,
      ctasRef.current,
      cardRef.current,
    ]
    gsap.set(els, { x: -48, opacity: 0 })
    const tl = gsap.timeline({ delay: 0.15 })
    tl.to(eyebrowRef.current, { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' })
      .to(titleRef.current, { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, '-=0.38')
      .to(descRef.current, { x: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, '-=0.38')
      .to(badgesRef.current, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.32')
      .to(ctasRef.current, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.28')
      .to(cardRef.current, { x: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, '-=0.45')
    return () => {
      tl.kill()
    }
  }, [reducedMotion])

  // Film-split scroll exit
  React.useEffect(() => {
    if (reducedMotion) return
    let st: unknown
    void (async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (!sectionRef.current || !topCoverRef.current || !bottomCoverRef.current) return
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 90%',
          end: 'bottom 10%',
          scrub: 0.8,
        },
      })
      tl.to(topCoverRef.current, { xPercent: -100, ease: 'none' }, 0)
      tl.to(bottomCoverRef.current, { xPercent: 100, ease: 'none' }, 0)
      st = ScrollTrigger
    })()
    return () => {
      if (st && typeof (st as { getAll?: () => Array<{ kill: () => void }> }).getAll === 'function') {
        ;(st as { getAll: () => Array<{ kill: () => void }> }).getAll().forEach(t => t.kill())
      }
    }
  }, [reducedMotion])

  const scrollToServices = React.useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#030806] text-white"
    >
      {/* Film-split cover panels */}
      <div
        ref={topCoverRef}
        className="from-bg-primary via-bg-primary/90 pointer-events-none absolute left-0 right-0 top-0 z-30 h-1/2 bg-gradient-to-b to-bg-secondary dark:from-bg-darker dark:via-bg-dark/80 dark:to-bg-darker"
        style={{ transform: 'translateX(100%)' }}
      />
      <div
        ref={bottomCoverRef}
        className="from-bg-primary via-bg-primary/90 pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-1/2 bg-gradient-to-b to-bg-secondary dark:from-bg-darker dark:via-bg-dark/80 dark:to-bg-darker"
        style={{ transform: 'translateX(-100%)' }}
      />

      {!reducedMotion &&
        enableBg &&
        (isLight ? (
          <GeometricBackground />
        ) : (
          <React.Suspense fallback={null}>
            <NeuralNetworkBackground />
          </React.Suspense>
        ))}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--vae-turquoise-rgb),0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-vae-turquoise" />
      <div className="pointer-events-none absolute right-[-6vw] top-10 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.04] xl:block">
        VAE
      </div>

      <div className="container-vae relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:gap-12">
          <div className="flex flex-col gap-8">
            <div
              ref={eyebrowRef}
              className="inline-flex w-fit items-center border border-vae-turquoise/35 bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.34em] text-vae-turquoise shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
            >
              {heroEyebrow}
            </div>

            <div ref={titleRef} className="space-y-5">
              <h1 className="max-w-5xl text-balance">
                <span className="block text-[15vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-7xl lg:text-[5.8rem] xl:text-[6.7rem]">
                  {heroTitle[0]}
                </span>
                <span className="mt-3 inline-block bg-vae-turquoise px-3 py-2 text-[12vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-black sm:px-5 sm:py-3 sm:text-6xl lg:text-[5.1rem] xl:text-[5.8rem]">
                  {heroTitle[1]}
                </span>
              </h1>

              <div
                ref={descRef}
                className="max-w-2xl border-l-4 border-white pl-4 text-base leading-relaxed text-white/80 sm:text-lg lg:text-[1.12rem]"
              >
                {heroDescription}
              </div>
            </div>

            <div ref={ctasRef} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
              <MagneticButton className="w-full">
                <CtaLink
                  ctaId="contact.schedule_call"
                  ctx={{ fromPage: 'home', intent: 'calendly-hero' }}
                  variant="custom"
                  className="flex w-full items-center justify-center gap-3 bg-white px-8 py-5 text-base font-black uppercase tracking-[0.12em] text-black shadow-[0_18px_50px_-24px_rgba(255,255,255,0.45)] transition-transform hover:-translate-y-0.5"
                >
                  <CalendarClock className="h-5 w-5" />
                  Erstgespräch buchen
                </CtaLink>
              </MagneticButton>

              <MagneticButton className="w-full">
                <button
                  type="button"
                  onClick={scrollToServices}
                  className="flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent px-6 py-5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-vae-turquoise hover:bg-white/5"
                >
                  Leistungen
                  <ChevronDown className="h-5 w-5" />
                </button>
              </MagneticButton>
            </div>

            <div ref={badgesRef} className="grid gap-3 sm:grid-cols-3">
              {heroBenefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`${index === 1 ? 'bg-vae-turquoise text-black' : 'border border-white/10 bg-white/[0.04] text-white'} p-4`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em]">
                      {index === 0 ? 'Tempo' : index === 1 ? 'Kontrolle' : 'Setup'}
                    </span>
                    <div
                      className={`${index === 1 ? 'bg-black/10 text-black' : 'bg-vae-turquoise/10 text-vae-turquoise'} flex h-10 w-10 items-center justify-center`}
                    >
                      <Icon name={benefit.icon} size={18} />
                    </div>
                  </div>
                  <p className="text-2xl font-black uppercase leading-tight tracking-[-0.04em]">{benefit.title}</p>
                  <p className={`${index === 1 ? 'text-black/75' : 'text-white/70'} mt-2 text-sm leading-relaxed`}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div ref={cardRef} className="grid gap-4 self-end">
            <div className="border border-white/10 bg-white text-black">
              <div className="border-b border-black/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-black/65">
                Magazin-Ansicht
              </div>
              <div className="grid gap-4 p-5">
                <div className="flex items-end justify-between gap-4 border-b border-black/10 pb-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-black/55">Use Case</p>
                    <p className="mt-2 text-2xl font-black uppercase leading-none tracking-[-0.05em]">
                      Raus aus dem SaaS-Stapel.
                    </p>
                  </div>
                  <span className="text-6xl font-black leading-none tracking-[-0.08em] text-vae-turquoise">01</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="bg-black p-4 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55">Problem</p>
                    <p className="mt-2 text-lg font-black uppercase leading-tight">
                      Zu viele Tools. Zu wenig Kontrolle.
                    </p>
                  </div>
                  <div className="bg-vae-turquoise p-4 text-black">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/55">Ergebnis</p>
                    <p className="mt-2 text-lg font-black uppercase leading-tight">Ein System, das Ihnen gehört.</p>
                  </div>
                </div>

                <div className="border border-black/10 bg-[#f1f5f3] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/55">
                    Was wir konkret ersetzen
                  </p>
                  <ul className="text-black/78 mt-3 space-y-2 text-sm leading-relaxed">
                    <li>Fragmentierte SaaS-Stacks ohne klaren Datenfluss</li>
                    <li>Wachsende Monatskosten ohne echten Infrastrukturwert</li>
                    <li>KI-Pläne ohne sauberes Fundament</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={scrollToServices}
                  className="inline-flex items-center gap-2 self-start text-sm font-bold uppercase tracking-[0.16em] text-black transition-colors hover:text-vae-turquoise"
                >
                  Drei Wege ansehen
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
