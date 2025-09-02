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
  /** Current step for progress indicator (optional) */
  currentStep?: number
  /** Total steps for progress indicator (optional) */
  totalSteps?: number
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className, currentStep, totalSteps }) => {
  if (!items.length) return null

  const showProgress = currentStep !== undefined && totalSteps !== undefined && totalSteps > 1

  return (
    <nav aria-label="Breadcrumb" className={['container-vae py-4', className].filter(Boolean).join(' ')}>
      {showProgress && (
        <div className="mb-2 flex items-center gap-2 text-xs text-text-muted">
          <span>Schritt {currentStep} von {totalSteps}</span>
          <div className="flex-1 h-1 bg-bg-primary/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-vae-turquoise transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}
      <ol className="flex flex-wrap items-center text-xs text-text-muted">
        {items.map((item, idx) => (
          <li key={item.path} className="flex items-center">
            {idx > 0 && <span className="mx-2 text-text-muted/60">/</span>}
            {idx === items.length - 1 ? (
              <span className="text-text-secondary font-medium" aria-current="page">{item.label}</span>
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
