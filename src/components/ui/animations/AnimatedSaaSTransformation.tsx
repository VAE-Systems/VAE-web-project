import { cn } from '@/lib/classNames'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { BookOpen, DollarSign, MessageSquare, Server, Shield, Users, Zap } from 'lucide-react'
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

// Clean Solution Badges (NACHHER) - System Clusters
type SystemCluster = {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  systems: string
  position: { x: number; y: number }
  color: string
}

// Connection lines between systems
type SystemConnection = {
  from: string
  to: string
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

  // Chaotic SaaS Tools - designed chaos (looks wild but balanced)
  const saasTools = useMemo<SaaSToolCard[]>(
    () => [
      { id: 'slack', name: 'Slack', cost: '€8/mo', position: { x: 22, y: 18 }, hasChain: true, chainTarget: 'notion' },
      {
        id: 'notion',
        name: 'Notion',
        cost: '€10/mo',
        position: { x: 52, y: 15 },
        hasChain: true,
        chainTarget: 'hubspot',
      },
      {
        id: 'hubspot',
        name: 'HubSpot',
        cost: '€50/mo',
        position: { x: 78, y: 22 },
        hasChain: true,
        chainTarget: 'asana',
      },
      { id: 'asana', name: 'Asana', cost: '€12/mo', position: { x: 72, y: 58 }, hasChain: true, chainTarget: 'figma' },
      { id: 'figma', name: 'Figma', cost: '€15/mo', position: { x: 38, y: 72 }, hasChain: true, chainTarget: 'slack' },
      { id: 'drive', name: 'G Drive', cost: '€6/mo', position: { x: 18, y: 48 } },
    ],
    []
  )

  // System Clusters - responsive positioning für alle Screen-Größen
  const systemClusters = useMemo<SystemCluster[]>(
    () => [
      {
        id: 'communication',
        icon: MessageSquare,
        title: 'Communication',
        systems: 'Chat • Files • Mail',
        position: { x: -28, y: -32 }, // Optimiert für Desktop/Tablet/Mobile
        color: 'bg-blue-500/20 border-blue-600/60 text-blue-900 dark:text-blue-200',
      },
      {
        id: 'crm',
        icon: Users,
        title: 'CRM & Contacts',
        systems: 'Contacts • Deals • Support',
        position: { x: 28, y: -32 },
        color: 'bg-purple-500/20 border-purple-600/60 text-purple-900 dark:text-purple-200',
      },
      {
        id: 'knowledge',
        icon: BookOpen,
        title: 'Knowledge Base',
        systems: 'Docs • Wiki • Playbooks',
        position: { x: -28, y: 32 },
        color: 'bg-emerald-500/20 border-emerald-600/60 text-emerald-900 dark:text-emerald-200',
      },
      {
        id: 'governance',
        icon: Shield,
        title: 'Governance',
        systems: 'Security • Compliance • Audit',
        position: { x: 28, y: 32 },
        color: 'bg-amber-500/20 border-amber-600/60 text-amber-900 dark:text-amber-200',
      },
    ],
    []
  )

  // System connections - shows orchestration
  const systemConnections = useMemo<SystemConnection[]>(
    () => [
      // Server to all clusters (vertical/diagonal lines)
      { from: 'server', to: 'communication' },
      { from: 'server', to: 'crm' },
      { from: 'server', to: 'knowledge' },
      { from: 'server', to: 'governance' },
      // Horizontal connections between clusters
      { from: 'communication', to: 'crm' },
      { from: 'knowledge', to: 'governance' },
      // Diagonal cross-connections
      { from: 'communication', to: 'knowledge' },
      { from: 'crm', to: 'governance' },
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
            Infrastruktur
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
          : systemClusters.map(cluster => {
              const Icon = cluster.icon
              return (
                <div key={cluster.id} className={cn('rounded-2xl border p-4', cluster.color)}>
                  <Icon className="mb-2 h-6 w-6" />
                  <p className="font-semibold text-text-light">{cluster.title}</p>
                  <p className="text-xs text-text-secondary">{cluster.systems}</p>
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
            Infrastruktur
          </motion.button>
        </div>
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 sm:h-[480px] sm:p-4 lg:h-[540px]">
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
                  className="absolute w-[140px] max-w-[45vw] rounded-xl border border-orange-600/60 bg-orange-600/25 px-3 py-2.5 shadow-lg backdrop-blur-md dark:border-orange-400/40 dark:bg-orange-500/10"
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
                      <p className="text-xs font-semibold text-orange-900 dark:text-orange-100">{tool.name}</p>
                      <p className="text-[10px] text-orange-800 dark:text-orange-300/70">{tool.cost}</p>
                    </div>
                    <Zap className="h-4 w-4 text-orange-700 dark:text-orange-400" />
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
                        stroke="rgba(234, 88, 12, 0.6)"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        className="dark:stroke-orange-500/50"
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
              {/* Central Server Icon - Exakt zentriert ohne translate */}
              <motion.div
                className="group absolute cursor-pointer"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.02, 1],
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.3 },
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <div className="rounded-[20px] border-[3px] border-vae-turquoise/60 bg-gradient-to-br from-vae-turquoise/20 via-vae-turquoise/15 to-vae-turquoise/10 p-4 shadow-[0_8px_32px_rgba(8,255,193,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-shadow duration-300 group-hover:shadow-[0_12px_48px_rgba(8,255,193,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] sm:rounded-[24px] sm:p-5 lg:p-6">
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <Server className="h-10 w-10 text-vae-turquoise drop-shadow-[0_2px_8px_rgba(8,255,193,0.6)] sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
                    <div className="text-center">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-vae-turquoise sm:text-[10px]">
                        Unified Stack
                      </p>
                      <p className="text-[7px] uppercase tracking-wide text-vae-turquoise/60 sm:text-[8px]">
                        Central System
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* System Clusters - Zentren exakt auf Linien-Enden */}
              {systemClusters.map((cluster, index) => {
                const Icon = cluster.icon
                // Berechne exakte Pixel-Position für SVG-Match
                const centerX = 50 + cluster.position.x // z.B. 50 + (-28) = 22
                const centerY = 50 + cluster.position.y // z.B. 50 + (-32) = 18

                return (
                  <motion.div
                    key={cluster.id}
                    className={cn(
                      'group absolute w-[140px] max-w-[42vw] cursor-pointer rounded-[16px] border-[2.5px] px-2.5 py-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] sm:w-[155px] sm:rounded-[18px] sm:px-3 sm:py-3 lg:w-[170px]',
                      cluster.color
                    )}
                    style={{
                      left: `${centerX}%`,
                      top: `${centerY}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 5,
                    }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      opacity: { duration: 0.45, delay: 0.6 + index * 0.12 },
                      scale: { duration: 0.45, delay: 0.6 + index * 0.12 },
                    }}
                  >
                    {/* Inner container für Float-Animation (beeinflusst Position nicht) */}
                    <motion.div
                      animate={{
                        y: [0, -2.5, 0],
                      }}
                      transition={{
                        y: { duration: 3.5 + index * 0.4, repeat: Infinity, ease: 'easeInOut' },
                      }}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-2">
                          <div className="rounded-[10px] bg-white/20 p-1.5 shadow-inner dark:bg-white/15">
                            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </div>
                          <div className="flex-1 space-y-0.5">
                            <p className="text-[10px] font-bold leading-tight sm:text-[11px]">{cluster.title}</p>
                            <p className="text-[8px] leading-tight opacity-80 sm:text-[9px]">{cluster.systems}</p>
                          </div>
                        </div>
                        <div className="border-current/10 border-t pt-1">
                          <p className="text-[7px] font-semibold uppercase tracking-wide opacity-50 sm:text-[8px]">
                            System Module
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}

              {/* Connection lines with animated data flow - IMPROVED: Multiple data packets per line */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(8, 255, 193, 0.15)" />
                    <stop offset="50%" stopColor="rgba(8, 255, 193, 0.6)" />
                    <stop offset="100%" stopColor="rgba(8, 255, 193, 0.15)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {systemConnections.map((conn, idx) => {
                  const serverX = 50
                  const serverY = 50

                  let fromX, fromY, toX, toY

                  if (conn.from === 'server') {
                    const toCluster = systemClusters.find(c => c.id === conn.to)
                    if (!toCluster) return null

                    fromX = serverX
                    fromY = serverY
                    toX = 50 + toCluster.position.x
                    toY = 50 + toCluster.position.y
                  } else {
                    const fromCluster = systemClusters.find(c => c.id === conn.from)
                    const toCluster = systemClusters.find(c => c.id === conn.to)
                    if (!fromCluster || !toCluster) return null

                    fromX = 50 + fromCluster.position.x
                    fromY = 50 + fromCluster.position.y
                    toX = 50 + toCluster.position.x
                    toY = 50 + toCluster.position.y
                  }

                  const isServerConnection = conn.from === 'server'

                  return (
                    <g key={`${conn.from}-${conn.to}`}>
                      {/* Connection line - thicker with stronger glow */}
                      <motion.line
                        x1={`${fromX}%`}
                        y1={`${fromY}%`}
                        x2={`${toX}%`}
                        y2={`${toY}%`}
                        stroke="url(#lineGradient)"
                        strokeWidth={isServerConnection ? '3' : '2'}
                        strokeLinecap="round"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{
                          opacity: isServerConnection ? 0.7 : 0.5,
                          pathLength: 1,
                        }}
                        transition={{
                          opacity: { duration: 0.6, delay: 0.5 + idx * 0.15 },
                          pathLength: { duration: 1.4, delay: 0.5 + idx * 0.15 },
                        }}
                        filter="url(#glow)"
                      />

                      {/* TWO animated data packets per line - like Fastlane design */}
                      {[0, 0.5].map((offset, packetIdx) => (
                        <motion.circle
                          key={`packet-${packetIdx}`}
                          r={isServerConnection ? '4' : '3'}
                          fill="rgba(8, 255, 193, 1)"
                          filter="url(#strongGlow)"
                          initial={{ opacity: 0 }}
                          animate={{
                            cx: [`${fromX}%`, `${toX}%`],
                            cy: [`${fromY}%`, `${toY}%`],
                            opacity: [0, 1, 1, 1, 0],
                          }}
                          transition={{
                            duration: isServerConnection ? 2.5 : 3,
                            delay: 1.2 + idx * 0.3 + offset * 1.5,
                            repeat: Infinity,
                            repeatDelay: isServerConnection ? 1.5 : 2,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </g>
                  )
                })}
              </svg>
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
