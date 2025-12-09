import { cn } from '@/lib/classNames'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { CheckCircle2, DollarSign, MapPin, Server, Settings2, ShieldCheck, Zap } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

interface AnimatedSaaSTransformationProps {
  autoPlayDelay?: number
}

// Chaotic SaaS Tools (VORHER)
type SaaSToolCard = {
  id: string
  name: string
  position: { x: number; y: number }
  cost: string
  hasChain?: boolean
  chainTarget?: string
}

// Clean Solution Badges (NACHHER)
type SolutionBadge = {
  id: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  subtext: string
  position: { x: number; y: number }
  badge?: string
  color: string
}

// Particles for chain-breaking effect
type Particle = {
  id: string
  x: number
  y: number
  vx: number
  vy: number
}

const AnimatedSaaSTransformation: React.FC<AnimatedSaaSTransformationProps> = ({ autoPlayDelay = 3500 }) => {
  const prefersReducedMotion = useReducedMotion()
  const [state, setState] = useState<'problem' | 'solution'>('problem')
  const [showParticles, setShowParticles] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return
    const timer = setTimeout(() => {
      setShowParticles(true)
      setTimeout(() => {
        setState('solution')
        setShowParticles(false)
      }, 800)
    }, autoPlayDelay)
    return () => clearTimeout(timer)
  }, [autoPlayDelay, isInView, prefersReducedMotion])

  const isProblem = state === 'problem'

  // Chaotic SaaS Tools
  const saasTools = useMemo<SaaSToolCard[]>(
    () => [
      { id: 'slack', name: 'Slack', cost: '€8/mo', position: { x: 18, y: 25 }, hasChain: true, chainTarget: 'notion' },
      {
        id: 'notion',
        name: 'Notion',
        cost: '€10/mo',
        position: { x: 48, y: 20 },
        hasChain: true,
        chainTarget: 'hubspot',
      },
      {
        id: 'hubspot',
        name: 'HubSpot',
        cost: '€50/mo',
        position: { x: 78, y: 28 },
        hasChain: true,
        chainTarget: 'asana',
      },
      { id: 'asana', name: 'Asana', cost: '€12/mo', position: { x: 68, y: 62 }, hasChain: true, chainTarget: 'figma' },
      { id: 'figma', name: 'Figma', cost: '€15/mo', position: { x: 35, y: 68 }, hasChain: true, chainTarget: 'slack' },
      { id: 'drive', name: 'G Drive', cost: '€6/mo', position: { x: 15, y: 55 } },
    ],
    []
  )

  // Clean Solution Badges
  const solutionBadges = useMemo<SolutionBadge[]>(
    () => [
      {
        id: 'cost-fixed',
        icon: CheckCircle2,
        label: '€50/Monat',
        subtext: 'Fixkosten',
        badge: '95% günstiger',
        position: { x: -38, y: -45 },
        color: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200',
      },
      {
        id: 'dsgvo-shield',
        icon: ShieldCheck,
        label: 'DSGVO-konform',
        subtext: 'Server in DE',
        position: { x: 38, y: -45 },
        color: 'bg-blue-500/15 border-blue-400/40 text-blue-200',
      },
      {
        id: 'full-control',
        icon: Settings2,
        label: 'Volle Kontrolle',
        subtext: 'Ihre Regeln',
        position: { x: -42, y: 45 },
        color: 'bg-vae-turquoise/15 border-vae-turquoise/40 text-vae-turquoise',
      },
      {
        id: 'location',
        icon: MapPin,
        label: 'Made in Germany',
        subtext: 'Souveränität',
        position: { x: 42, y: 45 },
        color: 'bg-slate-500/15 border-slate-400/40 text-slate-200',
      },
    ],
    []
  )

  // Particles for chain-breaking effect
  const particles = useMemo<Particle[]>(() => {
    const ps: Particle[] = []
    for (let i = 0; i < 20; i++) {
      ps.push({
        id: `particle-${i}`,
        x: 50 + (Math.random() - 0.5) * 30,
        y: 50 + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 60,
        vy: (Math.random() - 0.5) * 60,
      })
    }
    return ps
  }, [])

  const renderFallbackGrid = () => (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-bg-dark/80 via-bg-darker to-bg-dark p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary">
          SaaS vs. Open Source
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setState('problem')}
            className={cn(
              'rounded-lg px-4 py-2 text-xs font-semibold transition',
              state === 'problem'
                ? 'border border-red-400/50 bg-red-500/15 text-red-200'
                : 'border border-white/10 bg-white/5 text-text-secondary'
            )}
          >
            Problem
          </button>
          <button
            type="button"
            onClick={() => setState('solution')}
            className={cn(
              'rounded-lg px-4 py-2 text-xs font-semibold transition',
              state === 'solution'
                ? 'border border-vae-turquoise/40 bg-vae-turquoise/15 text-vae-turquoise'
                : 'border border-white/10 bg-white/5 text-text-secondary'
            )}
          >
            Lösung
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {state === 'problem'
          ? saasTools.map(tool => (
              <div key={tool.id} className="rounded-2xl border border-orange-400/40 bg-orange-500/10 p-4">
                <p className="font-semibold text-text-light">{tool.name}</p>
                <p className="text-xs text-text-secondary">{tool.cost}</p>
              </div>
            ))
          : solutionBadges.map(badge => {
              const Icon = badge.icon
              return (
                <div key={badge.id} className={cn('rounded-2xl border p-4', badge.color)}>
                  <Icon className="mb-2 h-6 w-6" />
                  <p className="font-semibold text-text-light">{badge.label}</p>
                  <p className="text-xs text-text-secondary">{badge.subtext}</p>
                  {badge.badge ? (
                    <span className="mt-1 inline-block text-[11px] font-semibold text-vae-turquoise">
                      {badge.badge}
                    </span>
                  ) : null}
                </div>
              )
            })}
      </div>
    </div>
  )

  if (prefersReducedMotion) {
    return renderFallbackGrid()
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-bg-dark/85 via-bg-darker to-bg-dark p-6 shadow-[0_30px_120px_-60px_rgba(8,255,193,0.35)]"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-vae-turquoise">
            SaaS vs. Open Source
          </p>
          <p className="text-sm text-text-secondary">Vom Chaos zur souveränen Infrastruktur</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setState('problem')
              setShowParticles(false)
            }}
            className={cn(
              'rounded-lg px-4 py-2 text-xs font-semibold transition',
              isProblem
                ? 'border border-orange-400/50 bg-orange-500/15 text-orange-200 shadow-[0_0_0_1px_rgba(251,146,60,0.25)]'
                : 'border border-white/10 bg-white/5 text-text-secondary hover:border-white/20'
            )}
          >
            Chaos
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setShowParticles(true)
              setTimeout(() => {
                setState('solution')
                setShowParticles(false)
              }, 800)
            }}
            className={cn(
              'rounded-lg px-4 py-2 text-xs font-semibold transition',
              !isProblem
                ? 'border border-vae-turquoise/40 bg-vae-turquoise/15 text-vae-turquoise shadow-[0_0_0_1px_rgba(8,255,193,0.25)]'
                : 'border border-white/10 bg-white/5 text-text-secondary hover:border-white/20'
            )}
          >
            Ordnung
          </motion.button>
        </div>
      </div>

      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:h-[520px]">
        {/* Background effects */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 transition-opacity duration-700',
            isProblem ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,146,60,0.12),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.08),transparent_50%)]" />
        </div>
        <div
          className={cn(
            'pointer-events-none absolute inset-0 transition-opacity duration-700',
            !isProblem ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--vae-turquoise-rgb),0.14),transparent_55%)]" />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {isProblem ? (
            <motion.div
              key="problem"
              className="relative h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Chaotic SaaS Tool Cards */}
              {saasTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  className="absolute w-[140px] max-w-[45vw] rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 py-2.5 shadow-lg backdrop-blur-md"
                  style={{
                    left: `${tool.position.x}%`,
                    top: `${tool.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.02, 1],
                    rotate: [index % 2 === 0 ? -3 : 3, index % 2 === 0 ? 3 : -3, index % 2 === 0 ? -3 : 3],
                  }}
                  transition={{
                    opacity: { duration: 0.3, delay: index * 0.08 },
                    scale: { duration: 2.2 + index * 0.2, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 3.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                    rotate: index % 2 === 0 ? -45 : 45,
                    y: 60,
                    transition: { duration: 0.6, ease: 'easeIn' },
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-orange-200">{tool.name}</p>
                      <p className="text-[10px] text-orange-300/70">{tool.cost}</p>
                    </div>
                    <Zap className="h-4 w-4 text-orange-400" />
                  </div>
                </motion.div>
              ))}

              {/* Chain connections */}
              {saasTools
                .filter(t => t.hasChain && t.chainTarget)
                .map(tool => {
                  const target = saasTools.find(t => t.id === tool.chainTarget)
                  if (!target) return null
                  return (
                    <motion.svg
                      key={`chain-${tool.id}`}
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.line
                        x1={`${tool.position.x}%`}
                        y1={`${tool.position.y}%`}
                        x2={`${target.position.x}%`}
                        y2={`${target.position.y}%`}
                        stroke="rgba(251, 146, 60, 0.5)"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        animate={{
                          strokeDashoffset: [0, -20],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </motion.svg>
                  )
                })}

              {/* Flying money symbols */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={`money-${i}`}
                  className="absolute left-1/2 top-3/4 -translate-x-1/2"
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: [-20, -80, -140],
                    x: [(i - 1) * 30, (i - 1) * 35, (i - 1) * 40],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                >
                  <DollarSign className="h-5 w-5 text-red-400" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="solution"
              className="relative h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Central Server Icon - Large */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.3 },
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <div className="rounded-3xl border-2 border-vae-turquoise/40 bg-vae-turquoise/10 p-8 shadow-[0_0_40px_rgba(8,255,193,0.25)] backdrop-blur-md">
                  <Server className="h-16 w-16 text-vae-turquoise sm:h-20 sm:w-20" />
                </div>
              </motion.div>

              {/* Solution Badges - Clean and organized */}
              {solutionBadges.map((badge, index) => {
                const Icon = badge.icon
                return (
                  <motion.div
                    key={badge.id}
                    className={cn(
                      'absolute w-[170px] max-w-[50vw] rounded-xl border px-3 py-2.5 shadow-lg backdrop-blur-md',
                      badge.color
                    )}
                    style={{
                      left: `calc(50% + ${badge.position.x}%)`,
                      top: `calc(50% + ${badge.position.y}%)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -4, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.4, delay: 0.5 + index * 0.1 },
                      scale: { duration: 0.4, delay: 0.5 + index * 0.1 },
                      y: { duration: 3 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <div className="rounded-lg bg-white/10 p-1.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <p className="text-xs font-semibold text-white">{badge.label}</p>
                        <p className="text-[10px] text-text-secondary">{badge.subtext}</p>
                        {badge.badge ? (
                          <span className="inline-flex items-center rounded-full bg-vae-turquoise/20 px-2 py-0.5 text-[9px] font-semibold text-vae-turquoise">
                            {badge.badge}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chain-breaking particle effect */}
        <AnimatePresence>
          {showParticles && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {particles.map(p => (
                <motion.div
                  key={p.id}
                  className="absolute h-1.5 w-1.5 rounded-full bg-orange-400"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{
                    x: p.vx,
                    y: p.vy,
                    scale: [1, 0.5, 0],
                    opacity: [1, 0.8, 0],
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AnimatedSaaSTransformation
