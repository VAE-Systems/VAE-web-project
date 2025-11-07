import React from 'react'
import { Link } from 'react-router-dom'
import { buildCta, type CtaContext } from '@/config/cta'

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

/**
 * CtaLink
 * Renders a CTA by id using the centralized registry.
 * - route => <Link to="..." />
 * - external / mailto => <a href="..." target rel />
 */
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
