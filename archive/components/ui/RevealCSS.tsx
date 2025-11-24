import React, { useEffect, useRef, useState } from 'react'

// Simple className helper
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ')

type Preset = 'fade' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale'

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements
  preset?: Preset
  delay?: number
  once?: boolean
  threshold?: number
  rootMargin?: string
  speed?: 'fast' | 'normal' | 'slow'
}

/**
 * CSS-based Reveal component
 * Drop-in replacement for Framer Motion Reveal
 *
 * Bundle size: 0 KB (vs 108 KB Framer Motion)
 * Performance: GPU-accelerated CSS transforms
 * Accessibility: Respects prefers-reduced-motion
 */
export const RevealCSS: React.FC<RevealProps> & { Group: React.FC<RevealGroupProps> } = ({
  as: Tag = 'div',
  preset = 'fadeUp',
  delay = 0,
  once = true,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  speed = 'normal',
  children,
  className,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  // Map presets to CSS animation classes
  const animationClass =
    preset === 'fadeUp'
      ? 'animate-slide-up'
      : preset === 'fadeDown'
        ? 'animate-slide-down'
        : preset === 'fadeLeft'
          ? 'animate-slide-right'
          : preset === 'fadeRight'
            ? 'animate-slide-left'
            : preset === 'scale'
              ? 'animate-scale'
              : 'animate-fade'

  const speedClass = `animate-${speed}`

  // Create element with proper ref type
  const Component = Tag as any

  return (
    <Component
      ref={ref}
      className={cn('opacity-0', isVisible && animationClass, isVisible && speedClass, className)}
      style={
        {
          '--animation-delay': `${delay}ms`,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Component>
  )
}

interface RevealGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  stagger?: number
  delayChildren?: number
  once?: boolean
  threshold?: number
  rootMargin?: string
  speed?: 'fast' | 'normal' | 'slow'
}

const RevealGroup: React.FC<RevealGroupProps> = ({
  stagger = 60,
  delayChildren = 0,
  once = true,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  speed = 'normal',
  children,
  className,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  // Apply stagger delays to children
  const childrenWithStagger = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child

    const childDelay = delayChildren + index * stagger

    return React.cloneElement(child, {
      ...child.props,
      className: cn(
        'opacity-0',
        isVisible && 'animate-fade-up',
        isVisible && `animate-${speed}`,
        child.props.className
      ),
      style: {
        ...child.props.style,
        '--animation-delay': `${childDelay}ms`,
      },
    } as any)
  })

  return (
    <div ref={ref} className={className} {...rest}>
      {childrenWithStagger}
    </div>
  )
}

RevealCSS.Group = RevealGroup

export default RevealCSS
