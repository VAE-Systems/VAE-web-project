import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AccordionItem from '@/components/ui/AccordionItem'
import { defaultFAQCategories } from '@/content/faqData'

// Types
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

const FAQSection: React.FC<FAQSectionProps> = ({
  id = 'faq',
  title = 'Häufige Fragen',
  subtitle = 'Knappe Antworten für schnelle Einordnung.',
  categories = defaultFAQCategories,
  cta = true,
  className = '',
  dense = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Animations (effizienter: wenige ScrollTrigger statt viele)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
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
    return () => ctx.revert()
  }, [cta])

  return (
    <section id={id} ref={sectionRef} className={`relative py-24 ${className}`.trim()} aria-labelledby={`${id}-title`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsla(var(--color-vae-turquoise),0.07),transparent_60%),radial-gradient(circle_at_80%_70%,hsla(var(--color-vae-turquoise),0.05),transparent_55%)]" />
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
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-vae-turquoise/30 to-transparent" />
                <div className="mx-4 rounded-full border border-vae-turquoise/25 bg-vae-turquoise/10 px-6 py-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-vae-turquoise">
                    {category.category}
                  </h3>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-vae-turquoise/30 to-transparent" />
              </div>
              <div className={`space-y-3 ${dense ? 'md:space-y-2' : ''}`}>
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
                <a
                  href="/contact"
                  className="rounded-lg bg-vae-turquoise px-8 py-3 font-semibold text-bg-darker transition-all duration-300 hover:-translate-y-0.5 hover:bg-vae-turquoise-dark hover:shadow-lg hover:shadow-vae-turquoise/30 dark:text-white"
                >
                  Gespräch anfragen
                </a>
                <a
                  href="mailto:info@vae.systems"
                  className="inline-block rounded-lg border border-vae-turquoise px-8 py-3 font-semibold text-vae-turquoise transition-all duration-300 hover:bg-vae-turquoise/10"
                >
                  Direkt per Email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FAQSection
