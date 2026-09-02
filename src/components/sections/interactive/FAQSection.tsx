/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  FAQ SECTION                                                              ┃
 * ┃  Kategorisiertes Accordion für häufige Fragen → schnelle Einordnung.      ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── categories[]         → FAQ-Daten gruppiert nach Kategorie
 * ├── openItems{}          → State-Map für Accordion-Expansion
 * └── AccordionItem        → UI-Komponente für einzelne Q&A
 *
 * ⛓️ GATES
 * └── prefers-reduced-motion → Skip GSAP animations
 *
 * 🔁 SIDE-EFFECTS
 * └── GSAP ScrollTrigger   → Staggered entrance animations
 *
 * 🎨 LAYERS
 * ├── Header (title/subtitle)
 * ├── Category columns     → 2-spaltig, je Kategorie ein Block
 * └── Optional CTA footer
 */

import AccordionItem from '@/components/ui/AccordionItem'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { faqEntries } from '@/content/shared/faqData'
import { cn } from '@/lib/classNames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// ═══════════════════════════════════════════════════════════════════════════
// 🎛️ CORE — Types
// ═══════════════════════════════════════════════════════════════════════════
export interface FAQItem {
  question: string
  answer: string
}
export interface FAQCategory {
  category: string
  questions: FAQItem[]
}
interface FAQSectionProps {
  id?: string
  title?: string
  subtitle?: string
  categories?: FAQCategory[]
  cta?: boolean
  className?: string
  dense?: boolean // kompakter Stil
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — FAQSection
// ═══════════════════════════════════════════════════════════════════════════
const FAQSection: React.FC<FAQSectionProps> = ({
  id = 'faq',
  title = 'Häufige Fragen',
  subtitle = 'Knappe Antworten für schnelle Einordnung.',
  categories = [
    {
      category: 'Allgemein',
      questions: faqEntries
        .filter(e => e.categoryId === 'general')
        .slice(0, 3)
        .map(e => ({ question: e.question, answer: e.answer })),
    },
    {
      category: 'Technologie',
      questions: faqEntries
        .filter(e => e.categoryId === 'technology')
        .slice(0, 3)
        .map(e => ({ question: e.question, answer: e.answer })),
    },
  ],
  cta = true,
  className = '',
  dense = false,
}) => {
  // ── 🎛️ CORE — Refs & State ──
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // ── 🔁 SIDE-EFFECT — GSAP ScrollTrigger Animations ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // ⛓️ GATE — Accessibility Check
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          force3D: true,
        })
      }
      if (listRef.current) {
        gsap.from(listRef.current.children, {
          opacity: 0,
          y: 32,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 75%' },
          force3D: true,
        })
      }
      if (cta && ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 32,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
          force3D: true,
        })
      }
    }, sectionRef)
    // 🧹 CLEANUP
    return () => ctx.revert()
  }, [cta])

  return (
    <section id={id} ref={sectionRef} className={cn('relative py-24', className)} aria-labelledby={`${id}-title`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--color-vae-turquoise)/0.07),transparent_60%),radial-gradient(circle_at_80%_70%,hsl(var(--color-vae-turquoise)/0.05),transparent_55%)]" />
      </div>
      <div className="relative mx-auto max-w-5xl px-6">
        <header ref={headerRef} className="mb-16 text-center">
          <h2 id={`${id}-title`} className="h2 heading-gradient h-space mb-4">
            {title}
          </h2>
          {subtitle && <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">{subtitle}</p>}
        </header>

        <div ref={listRef} className="space-y-14">
          {categories.map((category: FAQCategory, categoryIndex: number) => (
            <div key={category.category} className="relative">
              <div className="mb-6 flex items-center">
                <div className="faq-divider h-px flex-1 bg-gradient-to-r from-transparent via-vae-turquoise/30 to-transparent" />
                <div className="faq-pill mx-4 rounded-full border border-vae-turquoise/25 bg-vae-turquoise/10 px-6 py-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-vae-turquoise">
                    {category.category}
                  </h3>
                </div>
                <div className="faq-divider h-px flex-1 bg-gradient-to-r from-transparent via-vae-turquoise/30 to-transparent" />
              </div>
              <div className={cn('space-y-3', dense && 'md:space-y-2')}>
                {category.questions.map((faq: FAQItem, questionIndex: number) => (
                  <AccordionItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    id={`${categoryIndex}-${questionIndex}`}
                    isOpen={!!openItems[`${categoryIndex}-${questionIndex}`]}
                    onToggle={() => toggle(`${categoryIndex}-${questionIndex}`)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {cta && (
          <div ref={ctaRef} className="mt-20 text-center">
            <div className="bg-bg-primary/5 rounded-2xl border border-vae-turquoise/20 bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 p-10 dark:bg-white/5">
              <h3 className="mb-4 text-2xl font-semibold text-text-light dark:text-white">Noch Fragen offen?</h3>
              <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
                Kurzes Erstgespräch klärt meist 80% Ihrer offenen technische & organisatorischen Fragen. Unverbindlich &
                präzise.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <MagneticButton>
                  <Link to="/contact" className="btn-primary">
                    Gespräch anfragen
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a href="mailto:info@vae.systems" className="btn-secondary">
                    Direkt per Email
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FAQSection
