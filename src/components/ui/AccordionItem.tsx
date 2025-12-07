/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  ACCORDION ITEM                                                           ┃
 * ┃  Einzelnes FAQ-Accordion-Element mit GSAP-Animation.                      ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── isOpen state (controlled) → Von Parent via props
 * └── onToggle callback         → Trigger für Öffnen/Schließen
 *
 * 🔁 SIDE-EFFECTS
 * └── GSAP height animation     → Smooth expand/collapse
 *
 * 🧹 CLEANUP
 * └── Kill animation on unmount/change
 */

import { gsap } from 'gsap'
import { Minus, Plus } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

interface AccordionItemProps {
  question: string
  answer: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  id: string | number
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — AccordionItem
// ═══════════════════════════════════════════════════════════════════════════
const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onToggle, id }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<ReturnType<typeof gsap.to> | null>(null)

  // ── 🔁 SIDE-EFFECT — GSAP Height Animation ──
  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    // 🧹 CLEANUP — Kill previous animation
    if (animationRef.current) animationRef.current.kill()

    if (isOpen) {
      // Set initial height to 0
      gsap.set(element, { height: 0 })
      // Animate to scrollHeight
      animationRef.current = gsap.to(element, {
        height: element.scrollHeight,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(element, { height: 'auto' })
        },
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
    <article
      className={`group relative overflow-hidden rounded-2xl border transition duration-200 ${
        isOpen
          ? 'border-white/15 bg-white/[0.06] shadow-[0_18px_45px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-white/[0.05]'
          : 'border-white/8 hover:border-white/14 bg-white/[0.03] shadow-[0_10px_28px_rgba(0,0,0,0.25)] dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-white/10'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        className="flex w-full items-center justify-between px-6 py-5 text-left text-gray-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise/60 dark:text-white"
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-white">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-vae-turquoise transition duration-200 group-hover:scale-110" />
        ) : (
          <Plus className="h-5 w-5 text-text-secondary transition duration-200 group-hover:scale-110 dark:text-white/50" />
        )}
      </button>
      <div id={`accordion-content-${id}`} ref={contentRef} className="h-0 overflow-hidden" aria-hidden={!isOpen}>
        <div className="px-6 pb-6">
          <div className="text-base leading-relaxed text-text-secondary dark:text-white/70">{answer}</div>
        </div>
      </div>
    </article>
  )
}

export default AccordionItem
