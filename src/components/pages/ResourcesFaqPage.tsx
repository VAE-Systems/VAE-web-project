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

import { CalendarDays, Search as SearchIcon, ShieldCheck } from 'lucide-react'
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
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#030806] py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--vae-turquoise-rgb),0.12),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-vae-turquoise" />
        <div className="pointer-events-none absolute right-[-4vw] top-8 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.03] xl:block">
          VAE
        </div>

        <div className="container-vae relative z-10">
          <div className="flex flex-col items-start gap-8">
            <div className="inline-flex w-fit items-center gap-2 border border-vae-turquoise/35 bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.34em] text-vae-turquoise">
              <ShieldCheck className="h-3.5 w-3.5" /> FAQ · Knowledge Base
            </div>

            <h1 className="max-w-4xl">
              <span className="block text-[11vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-5xl lg:text-[4.8rem]">
                Fragen &amp;
              </span>
              <span className="mt-2 inline-block bg-vae-turquoise px-3 py-2 text-[9vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-black sm:px-5 sm:py-3 sm:text-4xl lg:text-[4rem]">
                Antworten.
              </span>
            </h1>

            <div className="max-w-2xl border-l-4 border-white pl-4 text-base leading-relaxed text-white/75 sm:text-lg">
              {faqEntries.length} Fragen zu Technologie, Prozessen und Projekten — ehrlich, strukturiert, ohne
              Buzzwords.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="flex w-full items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition-transform hover:-translate-y-0.5 sm:w-auto"
                >
                  Kontakt aufnehmen
                  <CalendarDays className="h-4 w-4" />
                </Link>
              </MagneticButton>
              <MagneticButton intensity={0.05} scaleEffect className="isolate w-full sm:w-auto">
                <Link
                  to="/contact#booking"
                  className="flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-vae-turquoise hover:bg-white/5 sm:w-auto"
                >
                  Gespräch buchen
                </Link>
              </MagneticButton>
            </div>

            <div className="grid w-full gap-4 md:grid-cols-3">
              <div className="border border-white/10 bg-white/[0.03] p-5 text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">Kategorien</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-white">
                  {categoriesWithCounts.length} Bereiche
                </p>
                <p className="mt-1 text-sm text-white/55">Technologie, Business, Karriere, Use Cases, Sonstiges.</p>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-5 text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">Einträge</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-white">{faqEntries.length} Fragen</p>
                <p className="mt-1 text-sm text-white/55">Kuratiert, keine generischen SEO-Antworten.</p>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-5 text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">Philosophie</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-white">Lösungs-orientiert</p>
                <p className="mt-1 text-sm text-white/55">Preisfragen führen direkt zu einem Gespräch.</p>
              </div>
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
