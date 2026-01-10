/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  RESOURCES FAQ PAGE                                                       ┃
 * ┃  Vollständige FAQ-Seite mit Suche, Filter und Kategorien.                 ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── faqEntries[]         → Alle FAQ-Einträge aus content/shared/faqData
 * ├── FILTERS[]            → Kategorie-Filter-Optionen
 * ├── activeCategory       → Aktueller Filter-State
 * └── searchQuery          → Suchfeld-State
 *
 * 🎨 LAYERS
 * ├── Hero Section         → Titel + Suche
 * ├── Category Pills       → Filter-Buttons
 * ├── FAQSection           → Accordion-Grid
 * └── CTA Footer
 */

import { CalendarDays, ChevronDown, Search as SearchIcon, ShieldCheck } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { FAQSection } from '@/components/sections'
import { FAQCategory } from '@/components/sections/interactive/FAQSection'
import Seo from '@/components/ui/Seo'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { FaqCategoryId, faqEntries, getCategoriesWithCounts } from '@/content/shared/faqData'

// ── 🎛️ CORE — Types & Constants ──
type CategoryFilter = 'all' | FaqCategoryId

const FILTERS: Array<{ id: CategoryFilter; label: string }> = [
  { id: 'all', label: 'Alle' },
  { id: 'technology', label: 'Technologie' },
  { id: 'business', label: 'Business' },
  { id: 'career', label: 'Karriere' },
  { id: 'projects', label: 'Projekte' },
  { id: 'general', label: 'Allgemein' },
]

const ResourcesFaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const categoriesWithCounts = useMemo(() => getCategoriesWithCounts(), [])

  const filteredFaqs = useMemo(() => {
    return faqEntries.filter(entry => {
      const matchesCategory = activeCategory === 'all' || entry.categoryId === activeCategory
      if (!matchesCategory) return false
      if (!normalizedQuery) return true
      const haystack = [entry.question, entry.answer, ...(entry.keywords || []), ...(entry.tags || [])]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [activeCategory, normalizedQuery])

  const groupedFaqs = useMemo(() => {
    if (activeCategory !== 'all') {
      const category = categoriesWithCounts.find(cat => cat.id === activeCategory)
      return category
        ? [
            {
              category,
              questions: filteredFaqs.map(entry => ({ question: entry.question, answer: entry.answer })),
            },
          ]
        : []
    }

    return categoriesWithCounts
      .map(category => ({
        category,
        questions: filteredFaqs
          .filter(entry => entry.categoryId === category.id)
          .map(entry => ({ question: entry.question, answer: entry.answer })),
      }))
      .filter(group => group.questions.length > 0)
  }, [activeCategory, filteredFaqs])

  const totalFaqs = filteredFaqs.length

  return (
    <div className="relative z-0 bg-[#f5f7f5] text-[#1a2320] dark:bg-bg-darker dark:text-text-light">
      <Seo
        title="FAQ & Knowledge Base | VAE Systems"
        description="Klare Antworten auf technische, organisatorische und Karriere-Fragen rund um VAE Systems – filterbar, suchbar, ehrlich."
        canonicalPath="/ressourcen/faq"
      />

      {/* Hero */}
      <section className="accent-section relative overflow-hidden border-b border-vae-turquoise/25 bg-vae-turquoise py-24 text-center dark:border-white/5 dark:bg-gradient-to-b dark:from-bg-darker dark:via-[#050505] dark:to-bg-dark">
        <div aria-hidden="true">
          <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.25),transparent_60%)] dark:block" />
        </div>
        <div className="container-vae relative flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/90 dark:border-vae-turquoise/30 dark:bg-vae-turquoise/10 dark:text-vae-turquoise">
            FAQ · Knowledge Base
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white dark:text-white md:text-5xl">
            Alles, was Sie wissen müssen – strukturiert, ehrlich, hilfreich
          </h1>
          <p className="max-w-3xl text-base text-white/85 dark:text-text-secondary">
            Technologie, Prozesse, Karriere, Use Cases und alles dazwischen. {faqEntries.length} Fragen, strukturiert
            wie eine echte Knowledge Base. Preise klären wir im Gespräch, weil jedes Projekt anders gebaut wird.
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm text-white/90 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
            <ShieldCheck className="h-4 w-4 text-white dark:text-vae-turquoise" />
            Individuelle Lösungen · Transparente Kommunikation
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <MagneticButton>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Kontakt aufnehmen
                <CalendarDays className="h-5 w-5" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/contact#booking" className="btn-ghost inline-flex items-center gap-2 text-base">
                Gespräch buchen
                <ChevronDown className="h-4 w-4 rotate-180 text-white dark:text-vae-turquoise" />
              </Link>
            </MagneticButton>
          </div>
          <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-[#c5ccc8] bg-white p-5 text-left shadow-[0_18px_40px_rgba(26,35,32,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#394642] dark:text-white/60">Kategorien</p>
              <p className="mt-2 text-2xl font-semibold text-[#1a2320] dark:text-white">
                {categoriesWithCounts.length} Bereiche
              </p>
              <p className="text-sm text-[#2c3834] dark:text-text-secondary">
                Technologie, Business, Karriere, Use Cases, Sonstiges.
              </p>
            </div>
            <div className="rounded-3xl border border-[#c5ccc8] bg-white p-5 text-left shadow-[0_18px_40px_rgba(26,35,32,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#394642] dark:text-white/60">Einträge</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{faqEntries.length} Fragen</p>
              <p className="text-sm text-gray-600 dark:text-text-secondary">
                Kuratiert, keine generischen SEO-Antworten.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-100/80 bg-white p-5 text-left shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/60">Philosophie</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">Lösungsorientiert</p>
              <p className="text-sm text-gray-600 dark:text-text-secondary">
                Preisfragen führen direkt zu einem CTA statt zu Ratespielen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-gray-100 bg-white/85 py-12 backdrop-blur dark:border-white/5 dark:bg-bg-dark/80">
        <div className="container-vae space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-base text-gray-700 dark:text-text-secondary">
              <p className="text-sm uppercase tracking-[0.3em] text-vae-turquoise/80">Filter · Suche</p>
              <p className="text-gray-900 dark:text-white">
                {totalFaqs} von {faqEntries.length} Antworten sichtbar
              </p>
            </div>
            <label className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-[0_12px_30px_rgba(15,23,42,0.12)] focus-within:border-vae-turquoise/60 focus-within:ring-1 focus-within:ring-vae-turquoise/60 dark:border-white/10 dark:bg-bg-darker dark:text-text-secondary dark:shadow-[0_15px_35px_rgba(3,7,18,0.45)] md:max-w-xl">
              <SearchIcon className="h-4 w-4 text-gray-500 dark:text-white/60" />
              <span className="sr-only">FAQ durchsuchen</span>
              <input
                type="search"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Keywords, Technologien oder Fragen eingeben…"
                className="w-full bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none dark:text-white dark:placeholder:text-white/40"
                aria-label="FAQ durchsuchen"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            {FILTERS.map(filter => {
              const isActive = activeCategory === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveCategory(filter.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'border-2 border-vae-turquoise bg-vae-turquoise/20 text-vae-turquoise shadow-[0_8px_18px_rgba(18,24,20,0.08)] dark:border dark:border-vae-turquoise/80 dark:bg-vae-turquoise/15 dark:text-white dark:shadow-[0_10px_30px_rgba(13,148,136,0.35)]'
                      : 'border-gray-200 bg-white text-gray-700 shadow-sm hover:border-vae-turquoise/50 hover:text-vae-turquoise dark:border-white/10 dark:bg-transparent dark:text-white/70 dark:hover:border-white/40 dark:hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories + FAQ */}
      <section className="accent-section bg-vae-turquoise py-16 dark:bg-gradient-to-b dark:from-bg-darker dark:via-[#050505] dark:to-bg-darker">
        <div className="container-vae space-y-10">
          <div className="grid gap-5 md:grid-cols-5">
            {categoriesWithCounts.map(category => (
              <div
                key={category.id}
                className="rounded-3xl border border-white/55 bg-white p-4 text-left text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.18)] transition hover:-translate-y-1 hover:border-white/80 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">{category.label}</p>
                <p className="mt-3 text-sm text-slate-700 dark:text-white/70">{category.description}</p>
                <p className="mt-5 text-xs text-slate-500 dark:text-white/40">{category.actualCount} FAQs</p>
              </div>
            ))}
          </div>

          {!totalFaqs && (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center text-sm text-white/80">
              <p>Keine Treffer. Bitte passen Sie Filter oder Suchbegriff an.</p>
            </div>
          )}

          {groupedFaqs.map(group => {
            const faqCategory: FAQCategory = {
              category: group.category.label,
              questions: group.questions,
            }

            return (
              <FAQSection
                key={group.category.id}
                title=""
                subtitle=""
                categories={[faqCategory]}
                cta={false}
                className="py-0"
                dense={true}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default ResourcesFaqPage
