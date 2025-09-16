import React from 'react'
import { motion, type Variants as FMVariants } from 'framer-motion'
import { DefaultViewport, Variants as PresetVariants, Springs } from '@/utils/motion'

type Preset = keyof typeof PresetVariants

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements
  preset?: Preset
  delay?: number
  once?: boolean
  amount?: number
  margin?: string
  customVariants?: FMVariants | ((delay?: number) => FMVariants)
}

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
  const variants = typeof customVariants === 'function'
    ? (customVariants(delay) as any)
    : (customVariants ?? (PresetVariants[preset] as any))

  return (
    <motion.div
      {...rest}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin }}
      variants={variants}
      custom={delay}
      as={Tag as any}
    >
      {children}
    </motion.div>
  )
}

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
      {...rest}
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

