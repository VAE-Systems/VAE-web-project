/**
 * @copyright 2025 VAE Systems UG (haftungsbeschränkt)
 * @license PROPRIETARY
 *
 * Unauthorized copying, modification, or use for training AI models is prohibited.
 * All rights reserved.
 *
 * Contact: juliangoertz@vae.systems
 */

import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/classNames'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { AlertCircle, BookOpen, DollarSign, Lightbulb, MessageSquare, Server, Shield, Users, Zap } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MagneticButton from '../MagneticButton'

// CSS Keyframes for optimized animations (GPU-accelerated, browser-native)
const glowAnimationStyles = `
@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1.6) translateZ(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.75) translateZ(0);
  }
}

@keyframes pulse-scale {
  0%, 100% {
    transform: scale(1) translateZ(0);
  }
  50% {
    transform: scale(1.015) translateZ(0);
  }
}
`

interface AnimatedSaaSTransformationProps {
  autoPlayDelay?: number
}

// Chaotic SaaS Tools (VORHER)
type SaaSToolCard = {
  id: string
  name: string
  position: { x: number; y: number }
  mobilePosition?: { x: number; y: number }
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
  mobilePosition?: { x: number; y: number } // Optional für Mobile-spezifisch
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

const AnimatedSaaSTransformation: React.FC<AnimatedSaaSTransformationProps> = React.memo(
  ({ autoPlayDelay = 20000 }) => {
    const prefersReducedMotion = useReducedMotion()
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [state, setState] = useState<'problem' | 'solution'>('problem')
    const [showParticles, setShowParticles] = useState(false)
    const [currentUSPIndex, setCurrentUSPIndex] = useState(0)
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
    const [visibleToolsCount, setVisibleToolsCount] = useState(6)
    const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
    const [isInViewport, setIsInViewport] = useState(true) // Intersection Observer state
    const particleTimerRef = useRef<number | null>(null)
    const autoPlayTimerRef = useRef<number | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.5 })

    const lineGradientStops = isDark
      ? ['rgba(8, 255, 193, 0.15)', 'rgba(8, 255, 193, 0.6)', 'rgba(8, 255, 193, 0.15)']
      : ['rgba(8, 255, 193, 0.35)', 'rgba(8, 255, 193, 0.85)', 'rgba(8, 255, 193, 0.35)']
    const aiLineGradientStops = isDark
      ? ['rgba(236, 72, 153, 0.4)', 'rgba(236, 72, 153, 0.9)', 'rgba(236, 72, 153, 0.4)']
      : ['rgba(236, 72, 153, 0.6)', 'rgba(236, 72, 153, 1)', 'rgba(236, 72, 153, 0.6)']
    const serverLineOpacity = isDark ? 0.7 : 0.9
    const moduleLineOpacity = isDark ? 0.5 : 0.75
    const aiPacketOpacity = isDark ? [0, 0.9, 1, 0.9, 0] : [0, 1, 1, 1, 0]
    const packetOpacity = isDark ? [0, 0.8, 1, 0.8, 0] : [0, 1, 1, 1, 0]

    // Intersection Observer: Pausiere Animationen wenn nicht sichtbar
    useEffect(() => {
      if (!containerRef.current) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInViewport(entry.isIntersecting)
        },
        { threshold: 0.1 }
      )

      observer.observe(containerRef.current)
      return () => observer.disconnect()
    }, [])

    // USPs für rotating text
    const usps = [
      'AI-ready konzipiert ist',
      'unabhängig macht',
      'Self-Hosted-First ist',
      'langfristig konzipiert ist',
      'preiswert bleibt',
      'übersichtlich ist',
      'Ihnen gehört',
      'transparent ist',
      'frei skalierbar ist',
      'keine Limits hat',
      'zukunftssicher ist',
      'DSGVO-konform ist',
    ]

    // Problem-Texte für rotating text
    const problems = [
      'abhängig macht',
      'teuer wird',
      'unübersichtlich ist',
      'versteckte Kosten hat',
      'nicht mitwächst',
      'Sie einschränkt',
      'ständig teurer wird',
      'intransparent ist',
      'keine Kontrolle gibt',
      'Vendor-Lock-in hat',
      'nicht erweiterbar ist',
    ]

    // Auto-Play: Nur einmal beim ersten Laden
    useEffect(() => {
      if (prefersReducedMotion || !isInView || hasAutoPlayed) return
      autoPlayTimerRef.current = window.setTimeout(() => {
        setHasAutoPlayed(true)
        setShowParticles(true)
        particleTimerRef.current = window.setTimeout(() => {
          setState('solution')
          setShowParticles(false)
          particleTimerRef.current = null
        }, 800)
      }, autoPlayDelay)
      return () => {
        if (autoPlayTimerRef.current) {
          clearTimeout(autoPlayTimerRef.current)
          autoPlayTimerRef.current = null
        }
        if (particleTimerRef.current) {
          clearTimeout(particleTimerRef.current)
          particleTimerRef.current = null
        }
      }
    }, [autoPlayDelay, isInView, prefersReducedMotion, hasAutoPlayed])

    // Rotating USP text effect (pause wenn nicht sichtbar)
    useEffect(() => {
      if (state !== 'solution' || !isInViewport) return
      const interval = setInterval(() => {
        setCurrentUSPIndex(prev => (prev + 1) % usps.length)
      }, 2500)
      return () => clearInterval(interval)
    }, [state, usps.length, isInViewport])

    // Rotating Problem text effect (pause wenn nicht sichtbar)
    useEffect(() => {
      if (state !== 'problem' || !isInViewport) return
      const interval = setInterval(() => {
        setCurrentProblemIndex(prev => (prev + 1) % problems.length)
      }, 2500)
      return () => clearInterval(interval)
    }, [state, problems.length, isInViewport])

    // Unkontrolliertes Wachstum - Tools kommen schrittweise hinzu
    useEffect(() => {
      if (state !== 'problem' || !isInView) return

      // Phase 1: Start mit 6 Tools (sofort)
      setVisibleToolsCount(6)

      // Phase 2: Nach 2,5s: HubSpot → Salesforce + Marketing-Tools (7-9)
      const timer1 = setTimeout(() => setVisibleToolsCount(9), 2500)

      // Phase 3: Nach 5s kommen +2 Tools (Support & Storage) = Chaos
      const timer2 = setTimeout(() => setVisibleToolsCount(11), 5000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }, [state, isInView])

    const isProblem = state === 'problem'

    // Memoize handlers to prevent re-renders
    const handleProblemClick = useCallback(() => {
      // Brich SOFORT alle laufenden Animationen ab
      setHasAutoPlayed(true)
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current)
        autoPlayTimerRef.current = null
      }
      if (particleTimerRef.current) {
        clearTimeout(particleTimerRef.current)
        particleTimerRef.current = null
      }
      // Sofortiger State-Wechsel ohne Animation - IMMER ausführbar
      setShowParticles(false)
      setState('problem')
      setVisibleToolsCount(6) // Reset Tool-Count
    }, [])

    const handleSolutionClick = useCallback(() => {
      // Brich SOFORT alle laufenden Animationen ab
      setHasAutoPlayed(true)
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current)
        autoPlayTimerRef.current = null
      }
      if (particleTimerRef.current) {
        clearTimeout(particleTimerRef.current)
        particleTimerRef.current = null
      }
      // Sofortiger State-Wechsel - keine Verzögerung
      setState('solution')
      setShowParticles(false)
    }, [])

    // Alle SaaS Tools - Realistischer Stack-Wachstum (11 Tools total)
    const allSaasTools = useMemo<SaaSToolCard[]>(
      () => [
        // Phase 1: Start-Stack (6 Tools) - organischer verteilt
        {
          id: 'slack',
          name: 'Slack',
          cost: '€8/mo',
          position: { x: 28, y: 22 }, // Cluster links oben
          mobilePosition: { x: 19, y: 22 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'notion',
        },
        {
          id: 'notion',
          name: 'Notion',
          cost: '€10/mo',
          position: { x: 38, y: 18 }, // Nahe bei Slack
          mobilePosition: { x: 29, y: 18 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'hubspot',
        },
        {
          id: 'hubspot',
          name: 'HubSpot',
          cost: '€50/mo',
          position: { x: 68, y: 28 }, // Rechts oben, isolierter
          mobilePosition: { x: 59, y: 28 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'asana',
        },
        {
          id: 'asana',
          name: 'Asana',
          cost: '€12/mo',
          position: { x: 62, y: 52 }, // Rechts mittig
          mobilePosition: { x: 53, y: 52 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'figma',
        },
        {
          id: 'figma',
          name: 'Figma',
          cost: '€15/mo',
          position: { x: 35, y: 55 }, // Links unten, Cluster mit Drive
          mobilePosition: { x: 26, y: 55 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'drive',
        },
        {
          id: 'drive',
          name: 'G Drive',
          cost: '€6/mo',
          position: { x: 45, y: 62 }, // Nahe bei Figma
          mobilePosition: { x: 36, y: 62 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'slack',
        },

        // Phase 2: Marketing wächst + HubSpot wird durch Salesforce ersetzt (Upgrade)
        {
          id: 'mailchimp',
          name: 'Mailchimp',
          cost: '€25/mo',
          position: { x: 25, y: 38 }, // Links mittig, etwas isoliert
          mobilePosition: { x: 16, y: 38 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'salesforce',
        },
        {
          id: 'salesforce',
          name: 'Salesforce',
          cost: '€75/mo',
          position: { x: 70, y: 26 }, // Ersetzt HubSpot Position (leicht verschoben)
          mobilePosition: { x: 61, y: 26 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'zendesk',
        },
        {
          id: 'zapier',
          name: 'Zapier',
          cost: '€20/mo',
          position: { x: 52, y: 42 }, // Zentral, verbindet alles
          mobilePosition: { x: 43, y: 42 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'mailchimp',
        },

        // Phase 3: Chaos +3 Tools (Support & Storage)
        {
          id: 'zendesk',
          name: 'Zendesk',
          cost: '€49/mo',
          position: { x: 48, y: 28 }, // Oben mittig
          mobilePosition: { x: 39, y: 28 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'dropbox',
        },
        {
          id: 'dropbox',
          name: 'Dropbox',
          cost: '€16/mo',
          position: { x: 58, y: 68 }, // Rechts unten
          mobilePosition: { x: 49, y: 68 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'intercom',
        },
        {
          id: 'intercom',
          name: 'Intercom',
          cost: '€39/mo',
          position: { x: 72, y: 58 }, // Rechts, weiter weg
          mobilePosition: { x: 63, y: 58 }, // Mobile: weiter links
          hasChain: true,
          chainTarget: 'zapier',
        },
      ],
      []
    )

    // Zeige nur die aktuell relevanten Tools (HubSpot verschwindet ab Phase 2)
    const saasTools = useMemo(
      () =>
        allSaasTools.filter((tool, index) => {
          // Phase 1 (6 Tools): Zeige erste 6
          if (visibleToolsCount <= 6) return index < 6
          // Phase 2+ (9+ Tools): Verstecke HubSpot (index 2), zeige Rest
          if (tool.id === 'hubspot') return false
          return index < visibleToolsCount
        }),
      [allSaasTools, visibleToolsCount]
    )

    // System Clusters - responsive Positionen
    const systemClusters = useMemo<SystemCluster[]>(
      () => [
        {
          id: 'communication',
          icon: MessageSquare,
          title: 'Communicate',
          systems: 'Chat • Files • Mail',
          position: { x: -30, y: -26 },
          mobilePosition: { x: -27, y: -30 },
          color:
            'bg-amber-500/[0.98] border-amber-600/[0.98] text-amber-900 dark:bg-amber-500/20 dark:border-amber-600/60 dark:text-amber-200',
        },
        {
          id: 'crm',
          icon: Users,
          title: 'CRM & Contacts',
          systems: 'Contacts • Deals • Support',
          position: { x: 30.5, y: -25.8 },
          mobilePosition: { x: 27, y: -30 },
          color:
            'bg-purple-500/[0.98] border-purple-600/[0.98] text-purple-900 dark:bg-purple-500/20 dark:border-purple-600/60 dark:text-purple-200',
        },
        {
          id: 'knowledge',
          icon: BookOpen,
          title: 'Knowledge Base',
          systems: 'Docs • Wiki • Playbooks',
          position: { x: -29.5, y: 26 },
          mobilePosition: { x: -27, y: 18 },
          color:
            'bg-blue-500/[0.98] border-blue-600/[0.98] text-blue-900 dark:bg-blue-500/20 dark:border-blue-600/60 dark:text-blue-200',
        },
        {
          id: 'governance',
          icon: Shield,
          title: 'Governance',
          systems: 'Security • Compliance • Audit',
          position: { x: 30, y: 25.8 },
          mobilePosition: { x: 27, y: 18 },
          color:
            'bg-emerald-500/[0.98] border-emerald-600/[0.98] text-emerald-900 dark:bg-emerald-500/20 dark:border-emerald-600/60 dark:text-emerald-200',
        },
        {
          id: 'ai-agents',
          icon: Zap,
          title: 'AI Agents',
          systems: 'Automation • Analysis • Support',
          position: { x: 0.5, y: 38 },
          mobilePosition: { x: 0, y: 38 },
          color:
            'bg-pink-500/[0.98] border-pink-600/[0.98] text-pink-900 dark:bg-pink-500/20 dark:border-pink-600/60 dark:text-pink-200',
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
        { from: 'server', to: 'ai-agents' },
        // Horizontal connections between clusters
        { from: 'communication', to: 'crm' },
        { from: 'knowledge', to: 'governance' },
        // Diagonal cross-connections
        { from: 'communication', to: 'knowledge' },
        { from: 'crm', to: 'governance' },
        // AI Agents connections - learns from all modules
        { from: 'ai-agents', to: 'communication' },
        { from: 'ai-agents', to: 'crm' },
        { from: 'ai-agents', to: 'knowledge' },
        { from: 'ai-agents', to: 'governance' },
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

    // Memoize money symbols count array
    const moneySymbolsArray = useMemo(
      () => Array.from({ length: Math.min(visibleToolsCount, 12) }, (_, i) => i),
      [visibleToolsCount]
    )

    const renderFallbackGrid = () => (
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-bg-dark/80 via-bg-darker to-bg-dark p-8">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary">
            SaaS vs. Self-Hosted
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
        className={cn(
          'relative overflow-hidden rounded-2xl border-2 p-4 sm:rounded-3xl sm:p-6',
          isProblem
            ? 'border-orange-300 bg-orange-50/80 shadow-[0_10px_24px_rgba(18,24,20,0.08)]'
            : 'border-vae-turquoise/60 bg-vae-turquoise/10 shadow-[0_10px_24px_rgba(18,24,20,0.08)]',
          'dark:border dark:border-white/10 dark:bg-gradient-to-br dark:from-bg-dark/85 dark:via-bg-darker dark:to-bg-dark dark:shadow-[0_30px_120px_-60px_rgba(8,255,193,0.35)]'
        )}
      >
        <div className="mb-3 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-shrink-0 space-y-0.5">
            <p className="text-[10px] font-bold uppercase leading-tight tracking-wider sm:text-base sm:tracking-[0.24em]">
              <span className="text-red-400">SaaS</span>
              <span className="mx-1 text-text-secondary/40 sm:mx-2">vs.</span>
              <span className="text-emerald-400">Self-Hosted</span>
            </p>
            <p className="text-[9px] font-medium uppercase leading-tight tracking-wide text-text-secondary/70 sm:text-sm">
              VAE orchestriert mit Open Source als Werkzeug
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
            <MagneticButton intensity={0.08}>
              <button
                type="button"
                onClick={handleProblemClick}
                className={cn(
                  'group flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all duration-300 ease-out hover:scale-105 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm',
                  isProblem
                    ? 'border-2 border-orange-600/80 bg-gradient-to-br from-orange-600/40 to-red-600/30 text-orange-950 shadow-[0_0_20px_rgba(251,146,60,0.4),0_0_0_1px_rgba(251,146,60,0.3)] dark:border-orange-400/60 dark:from-orange-500/20 dark:to-red-500/10 dark:text-orange-200'
                    : 'border border-white/10 bg-white/5 text-text-secondary hover:border-orange-400/40 hover:bg-orange-500/5 hover:text-orange-300 hover:shadow-[0_0_15px_rgba(251,146,60,0.2)]'
                )}
              >
                <AlertCircle
                  className={cn(
                    'h-3 w-3 transition-transform duration-300 ease-out sm:h-4 sm:w-4',
                    isProblem ? 'rotate-0' : 'group-hover:rotate-12'
                  )}
                />
                <span className="whitespace-nowrap">Das Problem</span>
              </button>
            </MagneticButton>
            <MagneticButton intensity={0.08}>
              <button
                type="button"
                onClick={handleSolutionClick}
                className={cn(
                  'group flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all duration-300 ease-out hover:scale-105 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm',
                  !isProblem
                    ? 'border-2 border-vae-turquoise/60 bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 text-vae-turquoise shadow-[0_0_20px_rgba(8,255,193,0.4),0_0_0_1px_rgba(8,255,193,0.3)]'
                    : 'border border-white/10 bg-white/5 text-text-secondary hover:border-vae-turquoise/40 hover:bg-vae-turquoise/5 hover:text-vae-turquoise hover:shadow-[0_0_15px_rgba(8,255,193,0.2)]'
                )}
              >
                <Lightbulb
                  className={cn(
                    'h-3 w-3 transition-transform duration-300 ease-out sm:h-4 sm:w-4',
                    !isProblem ? 'rotate-0' : 'group-hover:rotate-12'
                  )}
                />
                <span className="whitespace-nowrap">Die Lösung</span>
                {isProblem && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="ml-1 flex h-2 w-2 items-center justify-center"
                  >
                    <span className="absolute h-2 w-2 animate-ping rounded-full bg-vae-turquoise/50" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-vae-turquoise" />
                  </motion.span>
                )}
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Container für beide Headlines - beide am gleichen Platz */}
        <div className="relative mb-6" style={{ minHeight: '4rem' }}>
          {/* Animierte Headline mit rotierenden Problemen - nur im Problem-Modus */}
          <AnimatePresence mode="wait">
            {state === 'problem' && (
              <motion.div
                key="problem-headline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:justify-center sm:gap-3">
                  {/* Fixer Teil */}
                  <h2 className="text-xl font-bold text-text-light sm:text-3xl lg:text-4xl">SaaS-Chaos, das</h2>

                  {/* Rotierender Teil mit Overlay */}
                  <div
                    className="relative inline-block text-center text-xl font-bold sm:text-3xl lg:text-4xl"
                    style={{ minHeight: '1.2em' }}
                  >
                    {/* Invisible spacer - hält Container-Breite konstant */}
                    <span className="invisible whitespace-nowrap">unübersichtlich ist</span>

                    {/* Alle Problem-Texte übereinander - nur Opacity wechselt */}
                    {problems.map((problem, index) => (
                      <span key={problem} className="absolute left-0 top-0 whitespace-nowrap">
                        <motion.span
                          animate={{
                            opacity: index === currentProblemIndex ? 1 : 0,
                            y: index === currentProblemIndex ? 0 : 5,
                          }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          className="relative inline-block text-red-400"
                          style={{ pointerEvents: index === currentProblemIndex ? 'auto' : 'none' }}
                        >
                          {problem}
                          {/* Underline direkt am jeweiligen Text - passt sich der Textlänge an */}
                          {index === currentProblemIndex && (
                            <motion.span
                              key={`underline-problem-${currentProblemIndex}`}
                              className="absolute bottom-0 left-0 h-[2px] w-full bg-red-400"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              style={{ transformOrigin: 'left' }}
                            />
                          )}
                        </motion.span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animierte Headline mit rotierenden USPs - nur im Solution-Modus */}
          <AnimatePresence mode="wait">
            {state === 'solution' && (
              <motion.div
                key="solution-headline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:justify-center sm:gap-3">
                  {/* Fixer Teil */}
                  <h2 className="text-xl font-bold text-text-light sm:text-3xl lg:text-4xl">Infrastruktur, die</h2>

                  {/* Rotierender Teil mit Overlay */}
                  <div
                    className="relative inline-block text-center text-xl font-bold sm:text-3xl lg:text-4xl"
                    style={{ minHeight: '1.2em' }}
                  >
                    {/* Invisible spacer - hält Container-Breite konstant */}
                    <span className="invisible whitespace-nowrap">viele Schnittstellen hat</span>

                    {/* Alle USPs übereinander - nur Opacity wechselt */}
                    {usps.map((usp, index) => (
                      <span key={usp} className="absolute left-0 top-0 whitespace-nowrap">
                        <motion.span
                          animate={{
                            opacity: index === currentUSPIndex ? 1 : 0,
                            y: index === currentUSPIndex ? 0 : 5,
                          }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          className="relative inline-block text-vae-turquoise"
                          style={{ pointerEvents: index === currentUSPIndex ? 'auto' : 'none' }}
                        >
                          {usp}
                          {/* Underline direkt am jeweiligen Text - passt sich der Textlänge an */}
                          {index === currentUSPIndex && (
                            <motion.span
                              key={`underline-${currentUSPIndex}`}
                              className="absolute bottom-0 left-0 h-[2px] w-full bg-vae-turquoise"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              style={{ transformOrigin: 'left' }}
                            />
                          )}
                        </motion.span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={cn(
            'relative h-[580px] overflow-hidden rounded-2xl border-2 sm:h-[600px] md:h-[640px] lg:h-[680px]',
            isProblem
              ? 'border-orange-300 bg-orange-50 shadow-[0_10px_24px_rgba(18,24,20,0.08)]'
              : 'border-vae-turquoise/60 bg-vae-turquoise/5 shadow-[0_10px_24px_rgba(18,24,20,0.08)]',
            'dark:border dark:border-white/10 dark:bg-white/5 dark:shadow-none'
          )}
          style={{ contain: 'layout style paint' }}
        >
          {/* Background effects */}
          <div
            className={cn(
              'pointer-events-none absolute inset-0 transition-opacity duration-700',
              isProblem ? 'opacity-100' : 'opacity-0'
            )}
            style={{ willChange: 'opacity' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,146,60,0.12),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.08),transparent_50%)]" />
          </div>
          <div
            className={cn(
              'pointer-events-none absolute inset-0 transition-opacity duration-700',
              !isProblem ? 'opacity-100' : 'opacity-0'
            )}
            style={{ willChange: 'opacity' }}
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
                style={{
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Chaotic SaaS Tool Cards */}
                {saasTools.map((tool, index) => {
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
                  const xPos = isMobile && tool.mobilePosition ? tool.mobilePosition.x : tool.position.x
                  const yPos = isMobile && tool.mobilePosition ? tool.mobilePosition.y : tool.position.y
                  return (
                    <motion.div
                      key={tool.id}
                      className="absolute w-[160px] max-w-[48vw] rounded-xl border border-orange-600/60 bg-orange-600/25 px-4 py-3 shadow-lg backdrop-blur-md dark:border-orange-400/40 dark:bg-orange-500/10 sm:w-[180px]"
                      style={{
                        left: `${xPos}%`,
                        top: `${yPos}%`,
                        transform: 'translate(-50%, -50%) translateZ(0)',
                        willChange: 'transform, opacity',
                        pointerEvents: 'none',
                      }}
                      initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                      animate={{
                        opacity: 1,
                        scale: [1, 1.04, 1],
                        rotate: [index % 2 === 0 ? -5 : 5, index % 2 === 0 ? 5 : -5, index % 2 === 0 ? -5 : 5],
                        y: [0, -3, 0, 3, 0],
                      }}
                      transition={{
                        opacity: { duration: 0.3, delay: index * 0.08 },
                        scale: { duration: 2 + index * 0.15, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 3 + index * 0.25, repeat: Infinity, ease: 'easeInOut' },
                        y: { duration: 2.5 + index * 0.2, repeat: Infinity, ease: 'easeInOut' },
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
                          <p className="text-base font-semibold text-orange-900 dark:text-orange-100 sm:text-base">
                            {tool.name}
                          </p>
                          <p className="text-sm text-orange-800 dark:text-orange-300/70">{tool.cost}</p>
                        </div>
                        <Zap className="h-5 w-5 text-orange-700 dark:text-orange-400" />
                      </div>
                    </motion.div>
                  )
                })}

                {/* Chain connections - fragmentiert und chaotisch */}
                {saasTools
                  .filter(t => t.hasChain && t.chainTarget)
                  .map(tool => {
                    const target = saasTools.find(t => t.id === tool.chainTarget)
                    if (!target) return null
                    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
                    const toolX = isMobile && tool.mobilePosition ? tool.mobilePosition.x : tool.position.x
                    const toolY = isMobile && tool.mobilePosition ? tool.mobilePosition.y : tool.position.y
                    const targetX = isMobile && target.mobilePosition ? target.mobilePosition.x : target.position.x
                    const targetY = isMobile && target.mobilePosition ? target.mobilePosition.y : target.position.y
                    return (
                      <motion.svg
                        key={`chain-${tool.id}`}
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        shapeRendering="optimizeSpeed"
                      >
                        {/* Fragmentierte Linie - mehrere Segmente */}
                        <motion.line
                          x1={`${toolX}%`}
                          y1={`${toolY}%`}
                          x2={`${targetX}%`}
                          y2={`${targetY}%`}
                          stroke="rgba(234, 88, 12, 0.7)"
                          strokeWidth="2.5"
                          strokeDasharray="8 6 3 6"
                          strokeLinecap="round"
                          className="dark:stroke-orange-500/60"
                          animate={{
                            strokeDashoffset: [0, -30],
                            opacity: [0.5, 0.7, 0.5],
                          }}
                          transition={{
                            strokeDashoffset: { duration: 3, repeat: Infinity, ease: 'linear' },
                            opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                          }}
                        />
                        {/* Zusätzliche fragmentierte Linie (Chaos-Effekt) */}
                        <motion.line
                          x1={`${toolX}%`}
                          y1={`${toolY}%`}
                          x2={`${targetX}%`}
                          y2={`${targetY}%`}
                          stroke="rgba(234, 88, 12, 0.3)"
                          strokeWidth="1.5"
                          strokeDasharray="4 8"
                          strokeLinecap="round"
                          className="dark:stroke-orange-400/30"
                          animate={{
                            strokeDashoffset: [0, 20],
                            opacity: [0.3, 0.5, 0.3],
                          }}
                          transition={{
                            strokeDashoffset: { duration: 2.5, repeat: Infinity, ease: 'linear' },
                            opacity: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                          }}
                        />
                      </motion.svg>
                    )
                  })}

                {/* Flying money symbols - Mehr Dollar je mehr Tools */}
                {moneySymbolsArray.map(i => (
                  <motion.div
                    key={`money-${i}`}
                    className="absolute"
                    style={{
                      left: `${35 + (i % 4) * 10}%`,
                      top: `${55 + Math.floor(i / 4) * 12}%`,
                      willChange: 'transform, opacity',
                      transform: 'translateZ(0)',
                    }}
                    initial={{ y: 0, opacity: 0, scale: 0.8 }}
                    animate={{
                      y: [-10, -60, -110, -160],
                      x: [(i % 2 === 0 ? -1 : 1) * (10 + i * 3), (i % 2 === 0 ? -1 : 1) * (15 + i * 3)],
                      opacity: [0, 0.8, 0.9, 0],
                      scale: [0.8, 1, 1.1, 0.6],
                      rotate: [0, i % 2 === 0 ? -15 : 15, 0],
                    }}
                    transition={{
                      duration: 2.5 + (i % 3) * 0.5,
                      delay: i * 0.3 + (visibleToolsCount > 6 ? (i - 6) * 0.2 : 0),
                      repeat: Infinity,
                      repeatDelay: 0.2,
                      ease: 'easeOut',
                    }}
                  >
                    <DollarSign className="h-5 w-5 text-red-400 drop-shadow-[0_2px_8px_rgba(239,68,68,0.6)]" />
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
                style={{
                  backfaceVisibility: 'hidden',
                }}
              >
                <style>{glowAnimationStyles}</style>
                {/* Central Server Icon - Zentriert */}
                <motion.div
                  className="group absolute cursor-pointer hover:will-change-transform"
                  style={{
                    left: typeof window !== 'undefined' && window.innerWidth < 640 ? '50.1%' : '49.9%',
                    top: typeof window !== 'undefined' && window.innerWidth < 640 ? '46%' : '50%',
                    marginLeft: '-60px',
                    marginTop: '-60px',
                    zIndex: 3,
                    transform: 'translateZ(0)',
                    animation: isInViewport ? 'pulse-scale 3.5s ease-in-out infinite' : 'none',
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.3 },
                  }}
                >
                  {/* Blur-Glow Background */}
                  <div
                    className="absolute inset-0 -z-10 hidden dark:block"
                    style={{
                      background: 'radial-gradient(100% 100%, rgba(8, 255, 193, 0.35) 0%, rgba(8, 255, 193, 0) 70%)',
                      filter: 'blur(20px)',
                      transform: 'scale(1.8)',
                    }}
                  />
                  <div className="rounded-[20px] border-[2px] border-vae-turquoise/35 bg-white/95 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.10)] backdrop-blur-md transition-shadow duration-300 group-hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)] dark:border-vae-turquoise/60 dark:bg-gradient-to-br dark:from-vae-turquoise/20 dark:via-vae-turquoise/15 dark:to-vae-turquoise/10 dark:shadow-[0_8px_32px_rgba(8,255,193,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] dark:group-hover:shadow-[0_12px_48px_rgba(8,255,193,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] sm:rounded-[24px] sm:p-6 lg:p-7">
                    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                      <Server className="h-10 w-10 text-slate-900 dark:text-vae-turquoise dark:drop-shadow-[0_2px_8px_rgba(8,255,193,0.6)] sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
                      <div className="text-center">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-900 dark:text-vae-turquoise sm:text-[10px]">
                          Unified Stack
                        </p>
                        <p className="text-[7px] uppercase tracking-wide text-slate-500 dark:text-vae-turquoise/60 sm:text-[8px]">
                          Central System
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* System Clusters - responsive Positionen mit Blur-Glow */}
                {systemClusters.map(cluster => {
                  const Icon = cluster.icon
                  // Use mobilePosition on small screens (<640px), else desktop position
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
                  const activePosition = isMobile && cluster.mobilePosition ? cluster.mobilePosition : cluster.position
                  const centerX = 50 + activePosition.x
                  const centerY = 50 + activePosition.y

                  // Individuelle Glow-Farben pro Cluster
                  const glowColors = {
                    communication: 'rgba(245, 158, 11, 0.3)', // amber (gelb)
                    crm: 'rgba(168, 85, 247, 0.3)', // purple
                    knowledge: 'rgba(59, 130, 246, 0.3)', // blue
                    governance: 'rgba(16, 185, 129, 0.3)', // emerald (grün)
                    'ai-agents': 'rgba(236, 72, 153, 0.4)', // pink - stärker als andere
                  }

                  // AI-Agents Bubble erscheint später (zeigt modulare Erweiterbarkeit)
                  const isAIAgents = cluster.id === 'ai-agents'
                  // Sync with Server→AI connection line animation (starts at 2.5s)
                  const baseDelay = isAIAgents ? 2.5 : 0.5

                  return (
                    <motion.div
                      key={cluster.id}
                      className={cn(
                        'group absolute cursor-pointer rounded-[12px] border-[1.5px] shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-shadow duration-300 sm:rounded-[14px]',
                        cluster.color
                      )}
                      style={{
                        left: `${centerX}%`,
                        top: `${centerY}%`,
                        width: 'clamp(88px, 20vw, 125px)',
                        height: 'clamp(88px, 20vw, 125px)',
                        padding: 'clamp(6px, 1.3vw, 10px)',
                        marginLeft: 'calc(-0.5 * clamp(88px, 20vw, 125px))',
                        marginTop: 'calc(-0.5 * clamp(88px, 20vw, 125px))',
                        zIndex: 2,
                        transform: 'translateZ(0)',
                      }}
                      initial={{ opacity: 0, scale: 0.9, y: 8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      whileHover={{
                        scale: 1.04,
                        y: -3,
                      }}
                    >
                      {/* Blur-Glow Background per Cluster */}
                      <div
                        className="pointer-events-none absolute inset-0 -z-10 hidden transition-transform duration-[150ms] ease-out group-hover:scale-105 group-hover:will-change-transform dark:block"
                        style={{
                          background: `radial-gradient(100% 100%, ${glowColors[cluster.id as keyof typeof glowColors]} 0%, rgba(0,0,0,0) 70%)`,
                          filter: isAIAgents ? 'blur(20px)' : 'blur(18px)',
                          transform: 'scale(1.5)',
                          animation: isAIAgents && isInViewport ? 'pulse-glow 2.5s ease-in-out infinite' : 'none',
                          animationDelay: isAIAgents ? `${baseDelay + 1.5}s` : '0s',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'clamp(4px, 1vw, 6px)',
                          height: '100%',
                        }}
                      >
                        {/* Header: Icon + Title */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 1vw, 6px)' }}>
                          <motion.div
                            className="rounded-[8px] bg-white/20 shadow-inner dark:bg-white/15"
                            style={{ padding: 'clamp(3px, 0.8vw, 5px)' }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              duration: 0.2,
                              delay: baseDelay,
                              ease: 'easeOut',
                            }}
                          >
                            <Icon className="h-[clamp(12px,3vw,16px)] w-[clamp(12px,3vw,16px)]" />
                          </motion.div>
                          <motion.p
                            style={{ fontSize: 'clamp(8px, 2vw, 10px)', fontWeight: 700, lineHeight: 1.2, flex: 1 }}
                            initial={{ opacity: 0, x: -3 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: baseDelay,
                              ease: 'easeOut',
                            }}
                          >
                            {cluster.title}
                          </motion.p>
                        </div>

                        {/* Stacked Systems List */}
                        <motion.div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'clamp(1px, 0.3vw, 2px)',
                            paddingLeft: 'clamp(16px, 4vw, 22px)',
                            flex: 1,
                          }}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: baseDelay + 0.1,
                            ease: 'easeOut',
                          }}
                        >
                          {cluster.systems.split(' • ').map((system, idx) => (
                            <p
                              key={idx}
                              style={{
                                fontSize: 'clamp(7px, 1.8vw, 10px)',
                                lineHeight: 1.3,
                                opacity: 0.75,
                              }}
                            >
                              {system}
                            </p>
                          ))}
                        </motion.div>

                        <div className="border-current/10 border-t" style={{ paddingTop: 'clamp(2px, 0.5vw, 3px)' }}>
                          <p
                            style={{
                              fontSize: 'clamp(5px, 1.2vw, 7px)',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              opacity: 0.4,
                            }}
                          >
                            System Module
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}

                {/* Connection lines with animated data flow - Linien verbinden Zentren */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  style={{ zIndex: 1 }}
                  shapeRendering="optimizeSpeed"
                >
                  <defs>
                    {/* Türkis Gradient für normale Linien */}
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={lineGradientStops[0]} />
                      <stop offset="50%" stopColor={lineGradientStops[1]} />
                      <stop offset="100%" stopColor={lineGradientStops[2]} />
                    </linearGradient>
                    {/* Pink Gradient für AI-Linien - VERSTÄRKT */}
                    <linearGradient id="aiLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={aiLineGradientStops[0]} />
                      <stop offset="50%" stopColor={aiLineGradientStops[1]} />
                      <stop offset="100%" stopColor={aiLineGradientStops[2]} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="strongGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {systemConnections.map((conn, idx) => {
                    const serverX = 50
                    const serverY = 50
                    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

                    let fromX, fromY, toX, toY

                    if (conn.from === 'server') {
                      const toCluster = systemClusters.find(c => c.id === conn.to)
                      if (!toCluster) return null

                      fromX = serverX
                      fromY = serverY
                      // Use responsive position
                      const toPos = isMobile && toCluster.mobilePosition ? toCluster.mobilePosition : toCluster.position
                      toX = 50 + toPos.x
                      toY = 50 + toPos.y
                    } else {
                      const fromCluster = systemClusters.find(c => c.id === conn.from)
                      const toCluster = systemClusters.find(c => c.id === conn.to)
                      if (!fromCluster || !toCluster) return null

                      // Use responsive positions
                      const fromPos =
                        isMobile && fromCluster.mobilePosition ? fromCluster.mobilePosition : fromCluster.position
                      const toPos = isMobile && toCluster.mobilePosition ? toCluster.mobilePosition : toCluster.position
                      fromX = 50 + fromPos.x
                      fromY = 50 + fromPos.y
                      toX = 50 + toPos.x
                      toY = 50 + toPos.y
                    }

                    const isServerConnection = conn.from === 'server'
                    const isAIConnection = conn.from === 'ai-agents' || conn.to === 'ai-agents'
                    const isAIServerConnection =
                      (conn.from === 'server' && conn.to === 'ai-agents') ||
                      (conn.from === 'ai-agents' && conn.to === 'server')

                    // Linien-Hierarchie: Server-AI (dickste) > Server-Module > AI-Module = Module-Module
                    let strokeWidth = '2'
                    if (isAIServerConnection) strokeWidth = '4'
                    else if (isServerConnection) strokeWidth = '3'

                    // Server-AI benutzt pink Gradient, rest wie vorher
                    const lineStroke = isAIServerConnection
                      ? 'url(#aiLineGradient)'
                      : isAIConnection
                        ? 'url(#aiLineGradient)'
                        : 'url(#lineGradient)'

                    return (
                      <g key={`${conn.from}-${conn.to}`}>
                        {/* Connection line - AI lines are pink and dashed */}
                        <motion.line
                          x1={`${fromX}%`}
                          y1={`${fromY}%`}
                          x2={`${toX}%`}
                          y2={`${toY}%`}
                          stroke={lineStroke}
                          strokeWidth={strokeWidth}
                          strokeLinecap="round"
                          strokeDasharray={isAIConnection && !isAIServerConnection ? '6 4' : 'none'}
                          strokeOpacity={isAIServerConnection ? 1 : undefined}
                          style={{ mixBlendMode: isAIServerConnection ? 'screen' : 'normal' }}
                          initial={{ opacity: 0, pathLength: 0 }}
                          animate={{
                            opacity: isAIServerConnection
                              ? 1
                              : isServerConnection
                                ? serverLineOpacity
                                : moduleLineOpacity,
                            pathLength: 1,
                          }}
                          transition={{
                            opacity: { duration: 0.6, delay: isAIConnection ? 2.5 + idx * 0.2 : 0.5 + idx * 0.15 },
                            pathLength: { duration: 1.4, delay: isAIConnection ? 2.5 + idx * 0.2 : 0.5 + idx * 0.15 },
                          }}
                          filter="url(#glow)"
                        />

                        {/* Data packets - AI connections have only 1 packet with PINK color */}
                        {isAIConnection ? (
                          <motion.circle
                            r={isAIServerConnection ? '5' : '4'}
                            fill="rgba(236, 72, 153, 1)"
                            filter="url(#strongGlow)"
                            initial={{ opacity: 0 }}
                            animate={{
                              cx: [`${fromX}%`, `${toX}%`],
                              cy: [`${fromY}%`, `${toY}%`],
                              opacity: aiPacketOpacity,
                            }}
                            transition={{
                              duration: isAIServerConnection ? 2.8 : 3.2,
                              delay: 3 + idx * 0.3,
                              repeat: Infinity,
                              repeatDelay: 2.0,
                              ease: 'linear',
                            }}
                          />
                        ) : (
                          /* Regular connections have TWO turquoise packets */
                          [0, 0.6].map((offset, packetIdx) => (
                            <motion.circle
                              key={`packet-${packetIdx}`}
                              r={isServerConnection ? '4.5' : '3.5'}
                              fill="rgba(8, 255, 193, 1)"
                              filter="url(#strongGlow)"
                              initial={{ opacity: 0 }}
                              animate={{
                                cx: [`${fromX}%`, `${toX}%`],
                                cy: [`${fromY}%`, `${toY}%`],
                                opacity: packetOpacity,
                              }}
                              transition={{
                                duration: isServerConnection ? 2.2 : 2.8,
                                delay: 1 + idx * 0.2 + offset * 1.3,
                                repeat: Infinity,
                                repeatDelay: isServerConnection ? 1.2 : 1.6,
                                ease: 'linear',
                              }}
                            />
                          ))
                        )}
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
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      willChange: 'transform, opacity',
                      transform: 'translateZ(0)',
                    }}
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
)

AnimatedSaaSTransformation.displayName = 'AnimatedSaaSTransformation'

export default AnimatedSaaSTransformation
