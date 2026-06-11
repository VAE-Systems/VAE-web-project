import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { MenuContent } from './menuData'

interface DropdownContentProps {
  content?: MenuContent
  isHeaderScrolled?: boolean
}

export const DropdownContent: React.FC<DropdownContentProps> = ({ content }) => {
  if (!content) {
    return (
      <div className="bg-bg-primary border border-black/10 p-6 text-text-secondary dark:border-white/10 dark:bg-bg-dark dark:text-text-secondary">
        <p>Inhalt wird geladen …</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      aria-live="polite"
      className="bg-bg-primary flex h-full flex-col justify-between border border-black/10 p-6 text-text-light shadow-[0_18px_40px_-26px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-bg-dark dark:text-text-light dark:shadow-none"
    >
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/80 dark:text-vae-turquoise/70">
            {content.id}
          </p>
          <h3 className="text-xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-text-light dark:text-white">
            {content.title}
          </h3>
        </div>

        {content.description && (
          <p className="text-sm leading-relaxed text-text-secondary dark:text-text-secondary">{content.description}</p>
        )}

        {content.items && (
          <ul className="mt-4 space-y-2 text-sm text-text-secondary dark:text-text-secondary">
            {content.items.map((item, index) => {
              const isObject = typeof item === 'object' && 'text' in item
              const text = isObject ? item.text : item
              const href = isObject ? item.href : undefined

              return (
                <li key={`${content.id}-${index}`} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-vae-turquoise" aria-hidden />
                  {href ? (
                    <a href={href} className="transition-colors hover:text-vae-turquoise">
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="pt-6">
        <MagneticButton intensity={0.04} scaleEffect={false} className="inline-flex">
          <a
            href={content.ctaHref}
            className="btn-secondary inline-flex items-center gap-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-bg-darker"
          >
            {content.ctaText}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </MagneticButton>
      </div>
    </motion.div>
  )
}
