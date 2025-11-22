import React, { useEffect, useState } from 'react'

import AccordionItem from './AccordionItem'

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
        return (
          <AccordionItem
            key={item.id}
            question={item.question}
            answer={item.answer as string}
            id={item.id}
            isOpen={isOpen}
            onToggle={() => toggle(item.id)}
          />
        )
      })}
    </div>
  )
}

export default FaqAccordion
