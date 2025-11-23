import React, { useMemo } from 'react'
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
  /** Target path; optional for current/last item */
  path?: string
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
  const showProgress = currentStep !== undefined && totalSteps !== undefined && totalSteps > 1
  const progressStyle = useMemo(
    () => (showProgress ? { width: `${(currentStep! / totalSteps!) * 100}%` } : {}),
    [showProgress, currentStep, totalSteps]
  )

  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className={['container-vae py-4', className].filter(Boolean).join(' ')}>
      {showProgress && (
        <div className="mb-2 flex items-center gap-2 text-xs text-text-muted">
          <span>
            Schritt {currentStep} von {totalSteps}
          </span>
          <div className="bg-bg-primary/20 h-1 flex-1 overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-vae-turquoise transition-all duration-500 ease-out"
              style={progressStyle}
            />
          </div>
        </div>
      )}
      <ol className="flex flex-wrap items-center text-xs">
        {items.map((item, idx) => (
          <li key={item.path} className="flex items-center">
            {idx > 0 && <span className="mx-2 text-text-muted/50">/</span>}
            {idx === items.length - 1 ? (
              <span className="font-medium text-text-light" aria-current="page">
                {item.label}
              </span>
            ) : item.path ? (
              <Link
                to={item.path}
                className="text-vae-turquoise transition-all duration-200 hover:text-vae-turquoise/80 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text-secondary">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
