import React from 'react'

type Props = {
  icon?: React.ReactNode
  children: React.ReactNode
  special?: boolean
  className?: string
}

/**
 * List item that displays either a normal check icon (green) or a special gold icon.
 * Use `special` for the highlighted feature (e.g. Kundenaccount).
 */
export const ListItemWithIcon: React.FC<Props> = ({ icon, children, special = false, className = '' }) => {
  const normalIcon = (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  const specialIcon = (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l2.6 5.3L20 8.1l-4 3.6L17 18l-5-2.6L7 18l1-6.3L4 8.1l5.4-.8L12 2z" fill="currentColor" />
    </svg>
  )

  return (
    <li className={`flex items-start gap-3 ${className}`}>
      <span className={`mt-0.5 flex-shrink-0 ${special ? 'text-amber-400' : 'text-emerald-400'}`}>
        {icon ?? (special ? specialIcon : normalIcon)}
      </span>
      <span className={`${special ? 'font-medium text-white' : 'text-white/80'}`}>{children}</span>
    </li>
  )
}

export default ListItemWithIcon
