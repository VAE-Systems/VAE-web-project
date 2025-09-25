import React from 'react'

export interface ReferenceItem {
  id: string
  label: string
  url?: string
  note?: string
}

interface ReferenceListProps {
  items: ReferenceItem[]
  className?: string
  dense?: boolean
}

/**
 * ReferenceList
 * Renders a numbered, accessibility-friendly list of sources.
 * Intentionally keeps descriptions high-level; avoids unverifiable granular stats.
 */
const ReferenceList: React.FC<ReferenceListProps> = ({ items, className = '', dense = false }) => {
  if (!items?.length) return null
  return (
    <div className={`mt-6 ${className}`}>
      <ol className={`ml-5 list-decimal ${dense ? 'space-y-1' : 'space-y-2'} text-[11px] text-text-muted md:text-xs`}>
        {items.map(ref => (
          <li key={ref.id} className="leading-relaxed">
            {ref.url ? (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 transition-colors hover:text-vae-turquoise"
              >
                {ref.label}
              </a>
            ) : (
              <span>{ref.label}</span>
            )}
            {ref.note && <span className="ml-1 text-text-muted/70">— {ref.note}</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ReferenceList
