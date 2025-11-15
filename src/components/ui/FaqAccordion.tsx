import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export interface FaqAccordionItem {
  id: string
  question: string
  answer: React.ReactNode
  defaultOpen?: boolean
}

interface FaqAccordionProps {
  items: FaqAccordionItem[]
  allowMultiple?: boolean
  className?: string
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, allowMultiple = true, className }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    items.forEach(item => {
      if (item.defaultOpen) initial.add(item.id)
    })
    return initial
  })

  const refs = useRef<Record<string, HTMLDivElement | null>>({})
  const [heights, setHeights] = useState<Record<string, number>>({})

  const measure = useCallback(() => {
    const next: Record<string, number> = {}
    Object.entries(refs.current).forEach(([id, element]) => {
      if (element) {
        next[id] = element.scrollHeight
      }
    })
    setHeights(next)
  }, [])

  useLayoutEffect(() => {
    measure()
  }, [items, measure])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  useEffect(() => {
    setOpenItems(prev => {
      const next = new Set<string>()
      items.forEach(item => {
        if (prev.has(item.id) || item.defaultOpen) {
          next.add(item.id)
        }
      })
      return next
    })
  }, [items])

  const toggle = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!allowMultiple) next.clear()
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={className}>
      {items.map(item => {
        const isOpen = openItems.has(item.id)
        const answerId = `${item.id}-answer`
        const buttonId = `${item.id}-button`
        return (
          <article
            key={item.id}
            className={`group rounded-2xl border bg-white/5 backdrop-blur-sm transition duration-200 ${
              isOpen
                ? 'border-vae-turquoise/60 bg-white/10 shadow-lg shadow-vae-turquoise/10'
                : 'border-white/10 hover:border-vae-turquoise/40'
            }`}
          >
            <button
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={answerId}
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise/60"
            >
              <span className="flex-1 text-lg font-semibold leading-snug text-white">{item.question}</span>
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-vae-turquoise transition duration-200 group-hover:scale-110"
                >
                  <path d="M5 12h14" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-text-secondary transition duration-200 group-hover:scale-110"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              )}
            </button>
            <div
              id={answerId}
              aria-labelledby={buttonId}
              className={`overflow-hidden px-6 transition-[max-height] duration-500 ease-in-out ${
                isOpen ? 'pb-4' : 'pb-0'
              }`}
              style={{ maxHeight: isOpen ? (heights[item.id] ?? 0) : 0 }}
            >
              <div
                ref={element => {
                  refs.current[item.id] = element
                }}
                className="pt-4 text-base leading-relaxed text-text-secondary [&_>*:first-child]:mt-0 [&_>*:last-child]:mb-0 [&_li]:mt-2 [&_ol]:my-0 [&_p]:my-0 [&_ul]:my-0"
              >
                {item.answer}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default FaqAccordion
