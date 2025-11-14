import { CalendarDays, ChevronDown, Search as SearchIcon, ShieldCheck } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import Seo from '@/components/ui/Seo'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { faqCategories, FaqCategoryId, faqEntries, FaqEntry } from '@/data/faqData'

type CategoryFilter = 'all' | FaqCategoryId

const FILTERS: Array<{ id: CategoryFilter; label: string }> = [
  { id: 'all', label: 'Alle' },
  ...faqCategories.map(category => ({ id: category.id, label: category.label })),
]

const ResourcesFaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<string[]>([])

  const normalizedQuery = searchQuery.trim().toLowerCase()

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

  useEffect(() => {
    setOpenItems(prev => {
      const next = prev.filter(id => filteredFaqs.some(entry => entry.id === id))
      return next.length === prev.length ? prev : next
    })
  }, [filteredFaqs])

  const groupedFaqs = useMemo(() => {
    if (!filteredFaqs.length) return []
    if (activeCategory !== 'all') {
      const category = faqCategories.find(cat => cat.id === activeCategory)
      return category ? [{ category, entries: filteredFaqs }] : []
    }
    return faqCategories
      .map(category => ({
        category,
        entries: filteredFaqs.filter(entry => entry.categoryId === category.id),
      }))
      .filter(group => group.entries.length > 0)
  }, [activeCategory, filteredFaqs])

  const totalFaqs = filteredFaqs.length

  const toggleItem = (id: string) => {
    setOpenItems(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  const renderAnswer = (entry: FaqEntry) => (
    <>
      <p className="text-sm leading-relaxed text-text-secondary">{entry.answer}</p>
      {entry.cta && (
        <div className="mt-4">
          <Link to={entry.cta.href} className="btn-ghost inline-flex items-center gap-2 text-sm">
            {entry.cta.label}
            <ChevronDown className="h-4 w-4 rotate-180 text-vae-turquoise" />
          </Link>
        </div>
      )}
    </>
  )

  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="FAQ & Knowledge Base | VAE Systems"
        description="Klare Antworten auf technische, organisatorische und Karriere-Fragen rund um VAE Systems – filterbar, suchbar, ehrlich."
        canonicalPath="/ressourcen/faq"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker to-bg-dark py-24 text-center dark:border-white/5">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.25),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="container-vae relative flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise">
            FAQ · Knowledge Base
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            Antworten ohne Fluff – direkt aus Projekten
          </h1>
          <p className="max-w-3xl text-base text-text-secondary">
            Technologie, Prozesse, Karriere, Use Cases und alles dazwischen. 64 Fragen, sortiert wie eine echte
            Knowledge Base. Preise? Die besprechen wir im Gespräch – weil jedes Projekt anders gebaut wird.
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <ShieldCheck className="h-4 w-4 text-vae-turquoise" />
            Keine Standardpakete · 100% transparente Kommunikation
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
                <ChevronDown className="h-4 w-4 rotate-180 text-vae-turquoise" />
              </Link>
            </MagneticButton>
          </div>
          <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Kategorien</p>
              <p className="mt-2 text-2xl font-semibold text-white">5 Bereiche</p>
              <p className="text-sm text-text-secondary">Technologie, Business, Karriere, Use Cases, Sonstiges.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Einträge</p>
              <p className="mt-2 text-2xl font-semibold text-white">{faqEntries.length} Fragen</p>
              <p className="text-sm text-text-secondary">Kuratiert. Keine generischen SEO-Antworten.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Philosophie</p>
              <p className="mt-2 text-2xl font-semibold text-white">Lösungsorientiert</p>
              <p className="text-sm text-text-secondary">Preisfragen triggern direkte CTA statt Ratespiel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-black/5 bg-bg-dark/80 py-12 backdrop-blur dark:border-white/5">
        <div className="container-vae space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-base text-text-secondary">
              <p className="text-sm uppercase tracking-[0.3em] text-vae-turquoise/80">Filter · Suche</p>
              <p className="text-white">
                {totalFaqs} von {faqEntries.length} Antworten sichtbar
              </p>
            </div>
            <label className="flex w-full items-center gap-3 rounded-full border border-white/10 bg-bg-darker px-4 py-3 text-sm text-text-secondary shadow-[0_15px_35px_rgba(3,7,18,0.45)] focus-within:border-vae-turquoise/80 md:max-w-xl">
              <SearchIcon className="h-4 w-4 text-white/60" />
              <span className="sr-only">FAQ durchsuchen</span>
              <input
                type="search"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Keywords, Technologien oder Fragen eingeben…"
                className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
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
                      ? 'border-vae-turquoise bg-vae-turquoise/15 text-white shadow-[0_10px_30px_rgba(13,148,136,0.35)]'
                      : 'border-white/10 text-white/70 hover:border-white/40 hover:text-white'
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
      <section className="bg-gradient-to-b from-bg-darker via-[#050505] to-bg-darker py-16">
        <div className="container-vae space-y-10">
          <div className="grid gap-5 md:grid-cols-5">
            {faqCategories.map(category => (
              <div
                key={category.id}
                className="rounded-3xl border border-black/5 bg-white/95 p-4 text-left text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition hover:-translate-y-1 hover:border-vae-turquoise/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">{category.label}</p>
                <p className="mt-3 text-sm text-slate-600 dark:text-white/70">{category.description}</p>
                <p className="mt-5 text-xs text-slate-400 dark:text-white/40">{category.range}</p>
              </div>
            ))}
          </div>

          {!totalFaqs && (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center text-sm text-white/80">
              <p>Keine Treffer. Passe Filter oder Suchbegriff an.</p>
            </div>
          )}

          {groupedFaqs.map(group => (
            <div key={group.category.id} className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-2">
                <div>
                  <p className="text-sm font-semibold text-white">{group.category.label}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">Knowledge Base</p>
                </div>
                <p className="text-xs text-white/60">{group.entries.length} Antworten</p>
              </div>
              <div className="space-y-3">
                {group.entries.map(entry => {
                  const isOpen = openItems.includes(entry.id)
                  return (
                    <article
                      key={entry.id}
                      className="rounded-3xl border border-white/10 bg-gradient-to-br from-bg-dark via-bg-dark/80 to-black/40 p-5 transition hover:border-vae-turquoise/40"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(entry.id)}
                        aria-expanded={isOpen}
                        aria-controls={`${entry.id}-content`}
                        className="flex w-full items-center justify-between gap-6 text-left"
                      >
                        <div>
                          <p className="text-lg font-medium text-white">{entry.question}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-vae-turquoise/70">
                            {group.category.label}
                          </p>
                        </div>
                        <span
                          className={`rounded-full border border-white/10 p-2 transition ${
                            isOpen ? 'rotate-180 border-vae-turquoise text-vae-turquoise' : 'text-white/70'
                          }`}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </button>
                      <div
                        id={`${entry.id}-content`}
                        className={`grid overflow-hidden transition-all ${isOpen ? 'mt-4 grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                      >
                        <div className="overflow-hidden border-t border-white/5 pt-4">{renderAnswer(entry)}</div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ResourcesFaqPage
