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
      <ol className={`list-decimal ml-5 ${dense ? 'space-y-1' : 'space-y-2'} text-[11px] md:text-xs text-text-muted`}> 
        {items.map(ref => (
          <li key={ref.id} className="leading-relaxed">
            {ref.url ? (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-vae-turquoise transition-colors underline decoration-dotted underline-offset-2"
              >
                {ref.label}
              </a>
            ) : (
              <span>{ref.label}</span>
            )}
            {ref.note && <span className="text-text-muted/70 ml-1">— {ref.note}</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ReferenceList
