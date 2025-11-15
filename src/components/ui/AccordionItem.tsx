import React, { useEffect, useRef } from 'react'
import { Minus, Plus } from 'lucide-react'
import { gsap } from 'gsap'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  id: string | number
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onToggle, id }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<ReturnType<typeof gsap.to> | null>(null)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    // Kill previous animation
    if (animationRef.current) animationRef.current.kill()

    if (isOpen) {
      // Set initial height to 0
      gsap.set(element, { height: 0 })
      // Animate to scrollHeight
      animationRef.current = gsap.to(element, {
        height: element.scrollHeight,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => gsap.set(element, { height: 'auto' }),
        force3D: true,
      })
    } else {
      // Set height explicitly if auto
      if (element.style.height === 'auto') element.style.height = `${element.scrollHeight}px`
      // Animate to 0 from current height
      animationRef.current = gsap.to(element, {
        height: 0,
        duration: 0.3,
        ease: 'power1.out',
        force3D: true,
      })
    }

    return () => {
      if (animationRef.current) animationRef.current.kill()
    }
  }, [isOpen])

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        className="flex w-full items-center justify-between px-6 py-5 text-left text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise/60"
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        {isOpen ? <Minus className="h-5 w-5 text-text-secondary" /> : <Plus className="h-5 w-5 text-text-secondary" />}
      </button>
      <div id={`accordion-content-${id}`} ref={contentRef} className="h-0 overflow-hidden" aria-hidden={!isOpen}>
        <div className="px-6 pb-6">
          <p className="text-base leading-relaxed text-text-secondary">{answer}</p>
        </div>
      </div>
    </article>
  )
}

export default AccordionItem
