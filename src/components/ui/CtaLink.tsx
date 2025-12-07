/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  CTA LINK                                                                 ┃
 * ┃  Zentraler Baustein für alle Call-to-Actions. Registry-basiert.           ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ FLOW
 * ├── ctaId + ctx → buildCta() → { type, href, label, target, rel }
 * ├── type='route'    → React Router <Link>
 * └── type='external' → <a> mit target="_blank"
 *
 * 📍 REGISTRY: src/config/cta.ts (alle CTAs zentral definiert)
 * 📍 VARIANTS: btn-primary, btn-secondary, btn-convert, btn-ghost, custom
 */

import { buildCta, type CtaContext } from '@/config/cta'
import React from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'convert' | 'ghost' | 'custom'

interface CtaLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  ctaId: string
  ctx?: CtaContext
  variant?: Variant
  children?: React.ReactNode
  className?: string
  'aria-label'?: string
}

const variantClass: Record<Exclude<Variant, 'custom'>, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  convert: 'btn-convert',
  ghost: 'btn-ghost',
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚪 ORCHESTRATOR: CtaLink
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CtaLink = React.forwardRef<HTMLAnchorElement, CtaLinkProps>(
  ({ ctaId, ctx, variant = 'primary', children, className = '', ...rest }, ref) => {
    const built = React.useMemo(() => buildCta(ctaId, ctx), [ctaId, ctx])
    const variantClasses = variant === 'custom' ? '' : variantClass[variant]
    const classes = [variantClasses, className].filter(Boolean).join(' ').trim()
    const label = typeof children !== 'undefined' ? children : built.label

    if (built.type === 'route') {
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} to={built.href} className={classes} {...rest}>
          {label}
        </Link>
      )
    }

    return (
      <a ref={ref} href={built.href} target={built.target} rel={built.rel} className={classes} {...rest}>
        {label}
      </a>
    )
  }
)

export default CtaLink
