import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Types
export interface FAQItem { question: string; answer: string }
export interface FAQCategory { category: string; questions: FAQItem[] }
interface FAQSectionProps {
  id?: string
  title?: string
  subtitle?: string
  categories?: FAQCategory[]
  cta?: boolean
  className?: string
  dense?: boolean // kompakter Stil
}

const defaultCategories: FAQCategory[] = [
  {
    category: 'Allgemein',
    questions: [
      { question: 'Was zeichnet Ihren Ansatz aus?', answer: 'Architektur, Implementierung und Enablement verzahnt: Wir liefern nicht nur ein Artefakt, sondern schaffen betreibbare Systeme. Open Source & lokale Ausführbarkeit bleiben Grundprinzip.' },
      { question: 'Wie steigt man ein?', answer: 'Meist mit einem fokussierten Use Case (Retrieval, Automatisierung, Dokumentenraum). Wir klären Ziel, Kontext & Restriktionen, dann folgt ein kleiner evaluierbarer Sprint statt monolithischem Konzeptpapier.' },
      { question: 'Welche Laufzeiten sind typisch?', answer: 'Initiale Assessments 1–2 Wochen. MVP 3–5 Wochen. Skalierte Setups / Plattformebenen 3–6 Monate inkrementell. Frühe Teilnutzbarkeit hat Priorität.' }
    ]
  },
  {
    category: 'Technik & Betrieb',
    questions: [
      { question: 'Welche Modelle & Frameworks?', answer: 'Lokale LLMs (gguf/ollama), Embedding-Stacks, LangChain, eigene Retrieval Layer, Temporal für Orchestrierung. Austauschbarkeit und beobachtbarer Betrieb sind Kernanforderung.' },
      { question: 'Compliance & Datenschutz?', answer: 'Primär On-Prem / Sovereign Cloud. Keine stillen Dritt-API Calls. Auditable Pipelines, Zugriffsklassen, Protokollierung. DSGVO & AI Act Vororientierung werden früh mitgedacht.' },
      { question: 'Skalierung später möglich?', answer: 'Ja. Komponenten modular verschaltbar: Index, Workflow, Observability, Evaluierung. Start lean – später erweitern ohne Neuaufbau.' }
    ]
  },
  {
    category: 'Service',
    questions: [
      { question: 'Support nach Go-Live?', answer: 'Optionale Betriebs- und Verbesserungs-Sprints, SLAs für kritische Pfade, Wissensübergabe & Schulungen. Ziel: Interne Souveränität statt dauerhafte Abhängigkeit.' },
      { question: 'Trainingsumfang?', answer: 'Role-based: Operator, Developer, Data/Knowledge Steward. Praxisnahe Labs & Artefakte (Playbooks, Evaluationsets). Wiederholbar und dokumentiert.' },
      { question: 'Roadmap VAE CORE?', answer: 'Inkrementelle Module: Retrieval Hub, Policy & Access Layer, Evaluation Suite. Bestandssysteme profitieren früh via schrittweise Anbindung.' }
    ]
  }
]

const FAQSection: React.FC<FAQSectionProps> = ({
  id = 'faq',
  title = 'Häufige Fragen',
  subtitle = 'Knappe Antworten für schnelle Einordnung.',
  categories = defaultCategories,
  cta = true,
  className = '',
  dense = false
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const answerRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = useCallback((index: number) => {
    setOpenFAQ(prev => prev === index ? null : index)
  }, [])

  // Animations (effizienter: wenige ScrollTrigger statt viele)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      if (headerRef.current) {
        gsap.from(headerRef.current, { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } })
      }
      if (listRef.current) {
        gsap.from(listRef.current.children, {
          opacity: 0,
          y: 32,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 75%' }
        })
      }
      if (cta && ctaRef.current) {
        gsap.from(ctaRef.current, { opacity: 0, y: 32, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } })
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
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: el.scrollHeight, opacity: 1, duration: 0.4, ease: 'power2.out', onComplete: () => { el.style.height = 'auto' } })
        cardRefs.current[idx]?.classList.add('ringed')
      } else {
        if (el.style.height === 'auto') el.style.height = `${el.scrollHeight}px`
        gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power1.out' })
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
  categories.forEach((cat, ci) => cat.questions.forEach((q, qi) => totalList.push({ cat: cat.category, item: q, globalIndex: ci * 100 + qi })))

  return (
    <section id={id} ref={sectionRef} className={`relative py-24 ${className}`.trim()} aria-labelledby={`${id}-title`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsla(var(--color-vae-turquoise),0.07),transparent_60%),radial-gradient(circle_at_80%_70%,hsla(var(--color-vae-turquoise),0.05),transparent_55%)]" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6">
        <header ref={headerRef} className="text-center mb-16">
          <h2 id={`${id}-title`} className="h2 heading-gradient h-space mb-4">
            {title}
          </h2>
          {subtitle && <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">{subtitle}</p>}
        </header>

        <div ref={listRef} className="space-y-14">
          {categories.map((category, categoryIndex) => (
            <div key={category.category} className="relative">
              <div className="flex items-center mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-vae-turquoise/30 to-transparent" />
                <div className="px-5 py-2 mx-4 bg-vae-turquoise/10 rounded-full border border-vae-turquoise/25">
                  <h3 className="text-sm font-semibold tracking-wider text-vae-turquoise uppercase">{category.category}</h3>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-vae-turquoise/30 to-transparent" />
              </div>
              <ul className={`space-y-3 ${dense ? 'md:space-y-2' : ''}`}>        
                {category.questions.map((faq, questionIndex) => {
                  const faqIndex = categoryIndex * 100 + questionIndex
                  const isOpen = openFAQ === faqIndex
                  return (
                    <li key={faq.question} className="list-none">
                      <div
                        ref={el => (cardRefs.current[faqIndex] = el)}
                        className={`group relative rounded-xl border border-border-primary dark:border-white/10 bg-bg-primary/5 dark:bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-bg-primary/5 dark:supports-[backdrop-filter]:bg-white/5 transition-colors duration-300 hover:border-vae-turquoise/35 focus-within:border-vae-turquoise/40 ${isOpen ? 'border-vae-turquoise/50' : ''}`}
                      >
                        <button
                          data-faq-button={faqIndex}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${faqIndex}`}
                          id={`faq-button-${faqIndex}`}
                          onClick={() => toggleFAQ(faqIndex)}
                          onKeyDown={(e) => onKey(e, faqIndex)}
                          className="w-full text-left px-6 py-5 flex items-center justify-between gap-6 outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise/60 rounded-xl"
                        >
                          <span className="text-base font-medium text-text-light dark:text-white leading-relaxed flex-1 pr-2">{faq.question}</span>
                          <span className={`relative flex items-center justify-center w-9 h-9 rounded-full bg-vae-turquoise/10 text-vae-turquoise transition-all duration-300 ${isOpen ? 'bg-vae-turquoise/20 rotate-180' : 'group-hover:bg-vae-turquoise/15'}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300">
                              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </button>
                        <div
                          id={`faq-answer-${faqIndex}`}
                          role="region"
                          aria-labelledby={`faq-button-${faqIndex}`}
                          ref={el => (answerRefs.current[faqIndex] = el)}
                          style={{ height: 0, opacity: 0 }}
                          className="overflow-hidden px-6 will-change-[height,opacity]"
                        >
                          <div className="pt-0 pb-6 border-t border-vae-turquoise/20"> 
                            <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-vae-turquoise/0 transition-all duration-500 [ &.ringed]:ring-2 [ &.ringed]:ring-vae-turquoise/40" />
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
            <div className="bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 rounded-2xl p-10 border border-vae-turquoise/20 bg-bg-primary/5 dark:bg-white/5">
              <h3 className="text-2xl font-semibold text-text-light dark:text-white mb-4">Noch Fragen offen?</h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">Kurzes Erstgespräch klärt meist 80% Ihrer offenen technische & organisatorischen Fragen. Unverbindlich & präzise.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-vae-turquoise hover:bg-vae-turquoise-dark text-bg-darker dark:text-white px-8 py-3 rounded-lg font-semibold hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-vae-turquoise/30">Gespräch anfragen</a>
                <a href="mailto:info@vae.systems" className="border border-vae-turquoise text-vae-turquoise px-8 py-3 rounded-lg font-semibold hover:bg-vae-turquoise/10 transition-all duration-300 inline-block">Direkt per Email</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FAQSection
