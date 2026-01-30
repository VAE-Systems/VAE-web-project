import React from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'convert' | 'ghost'

// Use union of common HTML attributes to support both anchor and button
type CommonProps = Omit<React.HTMLAttributes<HTMLElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'>

interface ButtonProps extends CommonProps {
  to?: string
  href?: string
  variant?: Variant
  children: React.ReactNode
  className?: string
  'aria-label'?: string
}

/**
 * Generic Button component
 * - uses react-router Link when `to` is provided
 * - falls back to <a> when `href` is provided
 * - otherwise renders a <button> for actions
 */
const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  convert: 'btn-convert',
  ghost: 'btn-ghost',
}

const Button: React.FC<ButtonProps> = ({ to, href, variant = 'primary', children, className = '', ...rest }) => {
  const classes = `${variantClass[variant]} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
