import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Breadcrumbs
 *
 * Lightweight breadcrumb navigation for internal pages.
 * Expects an ordered list of items; last item is rendered as plain text
 * to denote the current page. Prior items are links for easy back‑navigation.
 */
export interface BreadcrumbItem {
  /** Visible label for the breadcrumb entry */
  label: string
  /** Target path; final item uses this only as key */
  path: string
}

interface BreadcrumbsProps {
  /** Ordered breadcrumb items from root to current page */
  items: BreadcrumbItem[]
  /** Optional additional classes for outer nav container */
  className?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className={['container-vae py-4', className].filter(Boolean).join(' ')}>
      <ol className="flex flex-wrap items-center text-xs text-text-muted">
        {items.map((item, idx) => (
          <li key={item.path} className="flex items-center">
            {idx > 0 && <span className="mx-2 text-text-muted/60">/</span>}
            {idx === items.length - 1 ? (
              <span className="text-text-secondary" aria-current="page">{item.label}</span>
            ) : (
              <Link to={item.path} className="text-vae-turquoise hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
