/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  STORY SECTION — Movie-Style, 3 Akte                                      ┃
 * ┃  Scroll-driven Storytelling nach Chris' Pitch-Struktur                    ┃
 * ┃                                                                            ┃
 * ┃  Akt 1: Der Schmerz      — Preis-Eskalation, Sie zahlen mehr              ┃
 * ┃  Akt 2: Die Erkenntnis   — Bank vs. Server (interaktiv)                   ┃
 * ┃  Akt 3: Die Lösung       — Der maßgeschneiderte Anzug                     ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 */

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  Building2,
  Server,
  Clock,
  Eye,
  TrendingUp,
  Lock,
  Package,
  CheckCircle2,
  Key,
  TrendingDown,
  Infinity,
  Scissors,
} from 'lucide-react'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AKT 1: PREIS-ESKALATION — animierter Graph
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PriceEscalationSVG: React.FC<{ triggered: boolean }> = ({ triggered }) => {
  const pathRef = useRef<SVGPathElement>(null)
  const fillRef = useRef<SVGPathElement>(null)
  const labelsRef = useRef<(SVGGElement | null)[]>([])
  const dotsRef = useRef<(SVGCircleElement | null)[]>([])

  useEffect(() => {
    if (!triggered) return
    // Linie zeichnen
    {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength()
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' })
      }
      // Fill erscheint
      if (fillRef.current) {
        gsap.from(fillRef.current, { opacity: 0, duration: 1.5, delay: 0.5 })
      }
      // Punkte und Labels erscheinen nacheinander
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return
        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          delay: 0.3 + i * 0.35,
          transformOrigin: 'center',
          ease: 'back.out(2)',
        })
      })
      labelsRef.current.forEach((label, i) => {
        if (!label) return
        gsap.from(label, { opacity: 0, y: 10, duration: 0.4, delay: 0.5 + i * 0.35 })
      })
    }
  }, [triggered])

  const months = ['Jan', 'Apr', 'Jul', 'Okt', 'Jan', 'Apr', 'Jul']
  const prices = [490, 680, 890, 1200, 1650, 2100, 2800]
  const points = prices.map((p, i) => ({
    x: 40 + i * 52,
    y: 200 - ((p - 490) / 2310) * 150,
  }))

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const fillPath = `${linePath} L ${points[points.length - 1].x} 200 L ${points[0].x} 200 Z`

  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none">
      {/* Grid-Linien */}
      {[50, 100, 150, 200].map(y => (
        <line key={y} x1="30" y1={y} x2="390" y2={y} stroke="#ffffff08" strokeWidth="1" strokeDasharray="4 4" />
      ))}

      {/* Achsen */}
      <line x1="30" y1="200" x2="390" y2="200" stroke="#ffffff20" strokeWidth="1.5" />
      <line x1="30" y1="30" x2="30" y2="200" stroke="#ffffff20" strokeWidth="1.5" />

      {/* Fill unter Linie */}
      <path ref={fillRef} d={fillPath} fill="url(#priceGrad)" opacity="0.25" />

      {/* Linie */}
      <path
        ref={pathRef}
        d={linePath}
        stroke="#ff4444"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Gradient */}
      <defs>
        <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff4444" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff4444" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Datenpunkte + Labels */}
      {points.map((p, i) => (
        <g key={i}>
          <circle
            ref={el => {
              dotsRef.current[i] = el
            }}
            cx={p.x}
            cy={p.y}
            r="5"
            fill="#ff4444"
            stroke="#1a0a0a"
            strokeWidth="2"
          />
          <g
            ref={el => {
              labelsRef.current[i] = el
            }}
          >
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              fill="#ff6666"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {prices[i]}€
            </text>
            <text x={p.x} y="215" textAnchor="middle" fill="#ffffff40" fontSize="8" fontFamily="monospace">
              {months[i]}
            </text>
          </g>
        </g>
      ))}

      {/* Label oben rechts */}
      <text x="385" y="25" textAnchor="end" fill="#ff4444" fontSize="9" fontFamily="monospace" opacity="0.8">
        +472% IN 18 MONATEN
      </text>
    </svg>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AKT 2: BANK VS SERVER — interaktiv, hover
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BankVsServerInteractive: React.FC = () => {
  const [hover, setHover] = useState<'bank' | 'server' | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-2xl items-stretch gap-0 overflow-hidden rounded-2xl border border-white/10">
      {/* BANK SEITE */}
      <div
        className="relative flex-1 cursor-pointer select-none p-6 transition-all duration-500"
        style={{ background: hover === 'server' ? '#0a0a0a' : hover === 'bank' ? '#1a0a0a' : '#0f0a0a' }}
        onMouseEnter={() => setHover('bank')}
        onMouseLeave={() => setHover(null)}
      >
        <div className={`transition-all duration-500 ${hover === 'server' ? 'opacity-20' : 'opacity-100'}`}>
          <div className="mb-4">
            <Building2 className="h-9 w-9" style={{ color: hover === 'bank' ? '#ff6666' : '#555' }} />
          </div>
          <h3 className="mb-3 text-lg font-bold" style={{ color: hover === 'bank' ? '#ff6666' : '#888' }}>
            Cloud / SaaS
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { icon: Clock, label: 'Öffnungszeiten & Ausfälle' },
              { icon: Eye, label: 'Anbieter sieht Ihre Daten' },
              { icon: TrendingUp, label: 'Preis steigt mit Nutzern' },
              { icon: Lock, label: 'Kündigung = Datenverlust' },
              { icon: Package, label: 'Features die Sie nicht brauchen' },
            ].map(({ icon: Icon, label }, i) => (
              <li
                key={i}
                className="flex items-center gap-2 transition-all duration-300"
                style={{
                  color: hover === 'bank' ? '#ff6666cc' : '#55555588',
                  transform: hover === 'bank' ? 'translateX(4px)' : 'none',
                }}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
        {hover === 'bank' && (
          <div
            className="pointer-events-none absolute inset-0 rounded-none"
            style={{ boxShadow: 'inset 0 0 40px rgba(255,68,68,0.08)' }}
          />
        )}
      </div>

      {/* DIVIDER */}
      <div className="z-10 flex flex-col items-center justify-center gap-2 bg-black/40 px-3">
        <span
          className="text-xs font-bold uppercase tracking-widest text-white/20"
          style={{ writingMode: 'vertical-rl' }}
        >
          oder
        </span>
      </div>

      {/* SERVER SEITE */}
      <div
        className="relative flex-1 cursor-pointer select-none p-6 transition-all duration-500"
        style={{ background: hover === 'bank' ? '#0a0a0a' : hover === 'server' ? '#001a14' : '#0a0f0d' }}
        onMouseEnter={() => setHover('server')}
        onMouseLeave={() => setHover(null)}
      >
        <div className={`transition-all duration-500 ${hover === 'bank' ? 'opacity-20' : 'opacity-100'}`}>
          <div className="mb-4">
            <Server className="h-9 w-9" style={{ color: hover === 'server' ? '#00d4aa' : '#444' }} />
          </div>
          <h3 className="mb-3 text-lg font-bold" style={{ color: hover === 'server' ? '#00d4aa' : '#666' }}>
            Self-Hosted
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { icon: CheckCircle2, label: '24/7 verfügbar, kein Einblick' },
              { icon: Key, label: 'Nur Sie haben den Schlüssel' },
              { icon: TrendingDown, label: 'Fixe Kosten, keine Überraschungen' },
              { icon: Infinity, label: 'Ihre Daten bleiben bei Ihnen' },
              { icon: Scissors, label: 'Nur zahlen was Sie nutzen' },
            ].map(({ icon: Icon, label }, i) => (
              <li
                key={i}
                className="flex items-center gap-2 transition-all duration-300"
                style={{
                  color: hover === 'server' ? '#00d4aacc' : '#44444488',
                  transform: hover === 'server' ? 'translateX(4px)' : 'none',
                }}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
        {hover === 'server' && (
          <div
            className="pointer-events-none absolute inset-0 rounded-none"
            style={{ boxShadow: 'inset 0 0 40px rgba(0,212,170,0.08)' }}
          />
        )}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AKT 3: DER MAßGESCHNEIDERTE ANZUG
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TailoredSuitSVG: React.FC<{ triggered: boolean }> = ({ triggered }) => {
  const konfRef = useRef<SVGGElement>(null)
  const suitRef = useRef<SVGGElement>(null)
  const arrowRef = useRef<SVGGElement>(null)
  const checkRefs = useRef<(SVGGElement | null)[]>([])

  useEffect(() => {
    if (!triggered) return
    {
      // Konfektions-Anzug verblasst
      if (konfRef.current) {
        gsap.to(konfRef.current, { opacity: 0.25, x: -10, duration: 1, ease: 'power2.inOut', delay: 0.3 })
      }
      // Pfeil erscheint
      if (arrowRef.current) {
        gsap.from(arrowRef.current, { opacity: 0, x: -20, duration: 0.6, delay: 0.8 })
      }
      // Maßgeschneiderter Anzug erscheint
      if (suitRef.current) {
        gsap.from(suitRef.current, {
          opacity: 0,
          x: 20,
          scale: 0.9,
          duration: 1,
          delay: 1,
          transformOrigin: 'center bottom',
          ease: 'back.out(1.5)',
        })
      }
      // Checkmarks erscheinen
      checkRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, { opacity: 0, x: -10, duration: 0.4, delay: 1.5 + i * 0.2 })
      })
    }
  }, [triggered])

  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none">
      {/* KONFEKTIONS-ANZUG (links) */}
      <g ref={konfRef}>
        {/* Jacke Body */}
        <rect x="30" y="80" width="90" height="120" rx="4" fill="#2a2a3a" stroke="#3a3a5a" strokeWidth="1.5" />
        {/* Revers links */}
        <path d="M30 80 L55 80 L75 110 L55 115 Z" fill="#22223a" stroke="#3a3a5a" strokeWidth="1" />
        {/* Revers rechts */}
        <path d="M120 80 L95 80 L75 110 L95 115 Z" fill="#22223a" stroke="#3a3a5a" strokeWidth="1" />
        {/* Krawatte */}
        <path d="M72 80 L78 80 L80 100 L75 110 L70 100 Z" fill="#3a3a5a" />
        {/* Ärmel zu kurz */}
        <rect
          x="15"
          y="85"
          width="18"
          height="60"
          rx="3"
          fill="#2a2a3a"
          stroke="#ff444444"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <rect
          x="117"
          y="85"
          width="18"
          height="60"
          rx="3"
          fill="#2a2a3a"
          stroke="#ff444444"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        {/* Label: falsch proportioniert */}
        <text x="75" y="215" textAnchor="middle" fill="#ff444466" fontSize="9" fontFamily="monospace">
          STANDARD · PASST NICHT
        </text>
        {/* X-Markierungen */}
        <text x="24" y="155" fill="#ff4444" fontSize="12" opacity="0.6">
          ×
        </text>
        <text x="121" y="155" fill="#ff4444" fontSize="12" opacity="0.6">
          ×
        </text>
      </g>

      {/* PFEIL */}
      <g ref={arrowRef}>
        <path
          d="M135 140 L175 140 M162 130 L177 140 L162 150"
          stroke="#00d4aa"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* MAßGESCHNEIDERTER ANZUG (rechts) */}
      <g ref={suitRef}>
        {/* Jacke Body */}
        <rect x="188" y="70" width="100" height="130" rx="5" fill="#001a14" stroke="#00d4aa" strokeWidth="1.5" />
        {/* Revers links */}
        <path d="M188 70 L215 70 L235 105 L213 110 Z" fill="#00120e" stroke="#00d4aa88" strokeWidth="1" />
        {/* Revers rechts */}
        <path d="M288 70 L261 70 L241 105 L263 110 Z" fill="#00120e" stroke="#00d4aa88" strokeWidth="1" />
        {/* Krawatte VAE-türkis */}
        <path d="M232 70 L244 70 L247 95 L238 108 L229 95 Z" fill="#00d4aa33" stroke="#00d4aa" strokeWidth="1" />
        {/* Pocket square */}
        <path d="M255 80 L268 80 L268 88 L261 84 L255 88 Z" fill="#00d4aa" opacity="0.6" />
        {/* Ärmel perfekt */}
        <rect x="172" y="75" width="19" height="75" rx="4" fill="#001a14" stroke="#00d4aa" strokeWidth="1.5" />
        <rect x="285" y="75" width="19" height="75" rx="4" fill="#001a14" stroke="#00d4aa" strokeWidth="1.5" />
        {/* Glow */}
        <rect
          x="188"
          y="70"
          width="100"
          height="130"
          rx="5"
          fill="none"
          stroke="#00d4aa"
          strokeWidth="0.5"
          opacity="0.3"
        />
        {/* Label */}
        <text x="238" y="215" textAnchor="middle" fill="#00d4aa88" fontSize="9" fontFamily="monospace">
          MAßGESCHNEIDERT
        </text>

        {/* Checkmarks rechts */}
        {['Nur was Sie nutzen', 'Passt zu Ihren Prozessen', 'Kein Feature-Ballast'].map((label, i) => (
          <g
            key={i}
            ref={el => {
              checkRefs.current[i] = el
            }}
          >
            <circle cx="320" cy={85 + i * 28} r="8" fill="#00d4aa22" stroke="#00d4aa" strokeWidth="1" />
            <path
              d={`M316 ${85 + i * 28} L319 ${88 + i * 28} L324 ${82 + i * 28}`}
              stroke="#00d4aa"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="332" y={89 + i * 28} fill="#00d4aa88" fontSize="7.5" fontFamily="monospace">
              {label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AKT-DIVIDER — satter teal Akzentbalken
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ActDivider: React.FC = () => <div className="mb-10 h-[3px] w-full bg-vae-turquoise" />

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AKT-CONTAINER — mit Intersection Observer für Trigger
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const Act: React.FC<{
  number: string
  eyebrow: string
  title: string
  subtitle: string
  visual: React.ReactNode
  side?: 'left' | 'right'
}> = ({ number, eyebrow, title, subtitle, visual, side = 'left' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const textBlock = (
    <div
      className={`flex flex-col justify-center gap-4 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.4em] text-vae-turquoise/50">{eyebrow}</span>
        <span className="select-none text-6xl font-black leading-none text-white/5">{number}</span>
      </div>
      <h2 className="text-4xl font-black leading-tight text-text-light md:text-5xl">{title}</h2>
      <p className="max-w-md text-base leading-relaxed text-text-secondary">{subtitle}</p>
    </div>
  )

  const visualBlock = (
    <div
      className={`transition-all delay-200 duration-1000 ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
    >
      {visual}
    </div>
  )

  return (
    <div ref={ref} className="py-16 md:py-24">
      <ActDivider />
      <div className="grid grid-cols-1 items-center gap-12 border-b border-white/5 pb-8 lg:grid-cols-2 lg:gap-20">
        {side === 'left' ? (
          <>
            {textBlock}
            {visualBlock}
          </>
        ) : (
          <>
            {visualBlock}
            {textBlock}
          </>
        )}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HAUPT-EXPORT: StorySection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const StorySection: React.FC = () => {
  const [act1Triggered, setAct1Triggered] = useState(false)
  const [act3Triggered, setAct3Triggered] = useState(false)
  const act1Ref = useRef<HTMLDivElement>(null)
  const act3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const makeObserver = (el: HTMLDivElement | null, setter: (v: boolean) => void) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true)
            obs.disconnect()
          }
        },
        { threshold: 0.2 }
      )
      obs.observe(el)
      observers.push(obs)
    }

    makeObserver(act1Ref.current, setAct1Triggered)
    makeObserver(act3Ref.current, setAct3Triggered)

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <section
      id="story"
      className="dark relative overflow-hidden"
      style={{
        background: '#060d0b',
        clipPath: 'polygon(0 0, 100% 0, 100% 96%, 0 100%)',
        marginBottom: '-4vw',
        paddingBottom: 'calc(var(--section-pad, 5rem) + 4vw)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Subtiler Hintergrund-Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,170,0.03),transparent_60%)]" />

      <div className="container-vae relative z-10">
        {/* Section-Header */}
        <div className="pb-4 pt-20 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-vae-turquoise/60">
            Die Wahrheit über Ihre Infrastruktur
          </p>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-text-light sm:text-4xl">
            Drei Fragen, die jedes Unternehmen stellen sollte
          </h2>
        </div>

        {/* ── INTRO VISUAL: Cloud vs. Self-Hosted placeholder ── */}
        <div className="border-b border-white/5 pb-8">
          <div
            style={{
              background: '#060d0b',
              border: '1px solid rgba(0,212,170,0.15)',
              borderRadius: '16px',
              padding: '32px 24px',
              maxWidth: '420px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#00d4aa',
                margin: 0,
                letterSpacing: '0.04em',
              }}
            >
              Cloud vs. Self-Hosted
            </h3>
          </div>
        </div>

        {/* ── AKT 1: PREIS-ESKALATION ── */}
        <div ref={act1Ref}>
          <Act
            number="01"
            eyebrow="Der Schmerz"
            title="Warum wird Ihre Cloud-Rechnung jeden Monat teurer?"
            subtitle="Per-User-Pricing. Per-GB-Pricing. Feature-Pakete, die Sie zwingen, für Dinge zu zahlen, die Sie nie nutzen. Jedes Wachstum Ihres Teams bedeutet automatisch mehr Kosten — ohne dass Sie etwas entschieden haben."
            visual={
              <div className="aspect-[2/1] overflow-hidden rounded-xl border border-white/5 bg-black/30 p-4">
                <PriceEscalationSVG triggered={act1Triggered} />
              </div>
            }
            side="right"
          />
        </div>

        {/* ── AKT 2: BANK VS SERVER ── */}
        <div
          style={{
            background: '#080e0c',
            border: '1px solid rgba(0,212,170,0.1)',
            borderRadius: 0,
            padding: '0 32px 32px',
          }}
        >
          <Act
            number="02"
            eyebrow="Die Erkenntnis"
            title="Gehören Ihre Daten wirklich Ihnen?"
            subtitle="Stellen Sie sich vor: Sie kaufen einen Tresor. Aber der Tresor steht bei der Bank. Die Bank hat Öffnungszeiten. Sie sieht, was rein- und rausgeht. Sie kann die Konditionen ändern. — Oder: der Tresor steht bei Ihnen."
            visual={<BankVsServerInteractive />}
            side="left"
          />
        </div>

        {/* ── AKT 3: DER ANZUG ── */}
        <div ref={act3Ref}>
          <Act
            number="03"
            eyebrow="Die Lösung"
            title="Software wie ein maßgeschneiderter Anzug."
            subtitle="Kein Unternehmen ist wie das andere. Warum sollte Ihre Infrastruktur von der Stange sein? Wir bauen genau das, was Sie brauchen — nicht mehr, nicht weniger."
            visual={
              <div className="space-y-3">
                <div className="aspect-[2/1] overflow-hidden rounded-xl border border-white/5 bg-black/30 p-4">
                  <TailoredSuitSVG triggered={act3Triggered} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'CRM & Dokumentation', sub: 'Statt Salesforce & SharePoint' },
                    { label: 'KI auf Ihrem Server', sub: 'Statt OpenAI-Abo' },
                    { label: 'Automatisierte Abläufe', sub: 'Statt manuelle Prozesse' },
                  ].map(({ label, sub }) => (
                    <div key={label} className="border-white/8 rounded-lg border bg-white/[0.03] p-3 text-center">
                      <p className="text-xs font-bold text-vae-turquoise">{label}</p>
                      <p className="mt-1 text-[10px] leading-tight text-white/40">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
            side="right"
          />
        </div>

        {/* Bottom CTA */}
        <div className="py-16 text-center">
          <p className="mb-6 text-lg text-text-secondary">Bereit, Ihre Infrastruktur in Ihre Hände zu nehmen?</p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-base font-semibold">
            Kostenloses Erstgespräch buchen
          </a>
        </div>
      </div>
    </section>
  )
}

export default StorySection
