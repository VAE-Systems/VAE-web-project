import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  const answerRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = useCallback((index: number) => {
    setOpenFAQ(prev => (prev === index ? null : index))
  }, [])

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

  // Open / close height animation w/ GSAP for smoother auto height
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    Object.entries(answerRefs.current).forEach(([key, el]) => {
      if (!el) return
      const idx = Number(key)
      const isOpen = idx === openFAQ
      gsap.killTweensOf(el)
      if (isOpen) {
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height: el.scrollHeight,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              el.style.height = 'auto'
            },
            force3D: true,
          }
        )
        cardRefs.current[idx]?.classList.add('ringed')
      } else {
        if (el.style.height === 'auto') el.style.height = `${el.scrollHeight}px`
        gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power1.out', force3D: true })
        cardRefs.current[idx]?.classList.remove('ringed')
      }
    })
  }, [openFAQ])

  // Keyboard accessibility
  const onKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleFAQ(idx)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = document.querySelector<HTMLElement>(`[data-faq-button='${idx + 1}']`)
      next?.focus()
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = document.querySelector<HTMLElement>(`[data-faq-button='${idx - 1}']`)
      prev?.focus()
    }
  }

  // Flatten index mapping
  const totalList: { cat: string; item: FAQItem; globalIndex: number }[] = []
  categories.forEach((cat: FAQCategory, ci: number) =>
    cat.questions.forEach((q: FAQItem, qi: number) =>
      totalList.push({ cat: cat.category, item: q, globalIndex: ci * 100 + qi })
    )
  )

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
              <ul className={`space-y-3 ${dense ? 'md:space-y-2' : ''}`}>
                {category.questions.map((faq: FAQItem, questionIndex: number) => {
                  const faqIndex = categoryIndex * 100 + questionIndex
                  const isOpen = openFAQ === faqIndex
                  return (
                    <li key={faq.question} className="list-none">
                      <div
                        ref={el => (cardRefs.current[faqIndex] = el)}
                        className={`border-border-primary bg-bg-primary/5 supports-[backdrop-filter]:bg-bg-primary/5 group relative rounded-xl border backdrop-blur transition-colors duration-300 focus-within:border-vae-turquoise/40 hover:border-vae-turquoise/35 dark:border-white/10 dark:bg-white/5 dark:supports-[backdrop-filter]:bg-white/5 ${isOpen ? 'border-vae-turquoise/50' : ''}`}
                      >
                        <button
                          data-faq-button={faqIndex}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${faqIndex}`}
                          id={`faq-button-${faqIndex}`}
                          onClick={() => toggleFAQ(faqIndex)}
                          onKeyDown={e => onKey(e, faqIndex)}
                          className="flex w-full items-center justify-between gap-6 rounded-xl px-6 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise/60"
                        >
                          <span className="flex-1 pr-2 text-base font-medium leading-relaxed text-text-light dark:text-white">
                            {faq.question}
                          </span>
                          <span
                            className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-vae-turquoise/10 text-vae-turquoise transition-all duration-300 ${isOpen ? 'rotate-180 bg-vae-turquoise/20' : 'group-hover:bg-vae-turquoise/15'}`}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="transition-transform duration-300"
                            >
                              <path
                                d="M6 9l6 6 6-6"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                        <div
                          id={`faq-answer-${faqIndex}`}
                          role="region"
                          aria-labelledby={`faq-button-${faqIndex}`}
                          ref={el => (answerRefs.current[faqIndex] = el)}
                          className="h-0 overflow-hidden px-6 opacity-0 will-change-[height,opacity]"
                        >
                          <div className="border-t border-vae-turquoise/20 pb-6 pt-0">
                            <p className="text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
                          </div>
                        </div>
                        <div className="[ &.ringed]:ring-2 [ &.ringed]:ring-vae-turquoise/40 pointer-events-none absolute inset-0 rounded-xl ring-0 ring-vae-turquoise/0 transition-all duration-500" />
                      </div>
                    </li>
                  )
                })}
              </ul>
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
