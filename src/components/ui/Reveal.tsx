/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  REVEAL                                                                   ┃
 * ┃  Framer Motion Wrapper für Scroll-Reveal-Animationen.                     ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ EXPORTS
 * ├── Reveal               → Einzelnes animiertes Element
 * └── Reveal.Group         → Container für gestaggerte Children
 *
 * 🎛️ CORE
 * ├── preset               → Vordefinierte Varianten (fadeUp, fadeIn, etc.)
 * ├── customVariants       → Custom Framer Motion Variants
 * └── viewport settings    → once, amount, margin
 *
 * 📦 USAGE
 * ├── <Reveal preset="fadeUp">...</Reveal>
 * └── <Reveal.Group stagger={0.1}>...</Reveal.Group>
 */

import { DefaultViewport, Variants as PresetVariants, Springs } from '@/utils/motion'
import { motion, type Variants as FMVariants } from 'framer-motion'
import React, { useMemo } from 'react'

type Preset = keyof typeof PresetVariants

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements
  preset?: Preset
  delay?: number
  once?: boolean
  amount?: number
  margin?: string
  customVariants?: FMVariants | ((delay?: number) => FMVariants)
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — Reveal
// ═══════════════════════════════════════════════════════════════════════════
export const Reveal: React.FC<RevealProps> & { Group: React.FC<RevealGroupProps> } = ({
  as: Tag = 'div',
  preset = 'fadeUp',
  delay = 0,
  once = DefaultViewport.once,
  amount = DefaultViewport.amount,
  margin = DefaultViewport.margin,
  customVariants,
  children,
  className,
  ...rest
}) => {
  // 🎛️ CORE — Resolve variants
  const variants =
    typeof customVariants === 'function'
      ? (customVariants(delay) as any)
      : (customVariants ?? (PresetVariants[preset] as any))

  const MotionComponent = useMemo(() => motion(Tag as any), [Tag]) as unknown as React.ComponentType<any>

  return (
    <MotionComponent
      {...(rest as Record<string, unknown>)}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin }}
      variants={variants}
      custom={delay}
    >
      {children}
    </MotionComponent>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎛️ CORE — RevealGroup (Staggered Container)
// ═══════════════════════════════════════════════════════════════════════════
interface RevealGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  stagger?: number
  delayChildren?: number
  once?: boolean
  amount?: number
  margin?: string
}

const RevealGroup: React.FC<RevealGroupProps> = ({
  stagger = 0.06,
  delayChildren = 0,
  once = DefaultViewport.once,
  amount = DefaultViewport.amount,
  margin = DefaultViewport.margin,
  children,
  className,
  ...rest
}) => {
  const container: FMVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  }

  return (
    <motion.div
      {...(rest as Record<string, unknown>)}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin }}
      variants={container}
      transition={Springs.gentle as any}
    >
      {children}
    </motion.div>
  )
}

Reveal.Group = RevealGroup

export default Reveal
