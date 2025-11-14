import React, { useMemo, useState } from 'react'
import { ChevronDown, Filter, Layers, Search, Sparkles } from 'lucide-react'

import Seo from '@/components/ui/Seo'
import { TECH_FILTERS, TECH_SECTIONS, TECH_TILES, TechTile, TechCategoryId } from '@/data/techStackData'

type FilterId = 'all' | TechCategoryId

const TechStackTile: React.FC<{ tile: TechTile }> = ({ tile }) => {
  return (
    <a
      href={tile.link}
      target="_blank"
      rel="noreferrer noopener"
      className="border-white/8 group relative flex h-full flex-col items-center justify-center gap-3 rounded-3xl border bg-white/[0.03] p-4 text-center text-white transition duration-300 hover:-translate-y-1 hover:border-vae-turquoise/50 hover:bg-white/10"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        {tile.logo ? (
          <img
            src={tile.logo}
            alt={tile.name}
            loading="lazy"
            className="h-10 w-10 object-contain"
            onError={event => {
              event.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <span className="text-xl font-semibold text-white/80">{tile.name[0]}</span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-white">{tile.name}</p>
        {tile.description && <p className="text-xs text-white/70">{tile.description}</p>}
        {tile.organization && (
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">{tile.organization}</p>
        )}
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-vae-turquoise/80 opacity-0 transition group-hover:opacity-100">
        Öffnen →
      </span>
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5 opacity-0 transition group-hover:opacity-60" />
    </a>
  )
}

const TechStackResourcePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [spotlight, setSpotlight] = useState({ x: '50%', y: '50%' })

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredTiles = useMemo(() => {
    return TECH_TILES.filter(tile => {
      const matchesFilter = activeFilter === 'all' || tile.category === activeFilter
      if (!matchesFilter) return false
      if (!normalizedQuery) return true
      const haystack = [tile.name, tile.description ?? '', tile.organization ?? ''].join(' ').toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [activeFilter, normalizedQuery])

  const sectionsWithContent = useMemo(() => {
    return TECH_SECTIONS.map(section => {
      const tiles = filteredTiles.filter(tile => tile.category === section.id)
      if (!tiles.length) return null

      const grouped =
        section.groups?.map(group => ({
          ...group,
          items: tiles.filter(tile => tile.group === group.id),
        })) ?? []

      const usedGroupIds = new Set(grouped.flatMap(group => (group.items.length ? [group.id] : [])))
      const remainder = tiles.filter(tile => (tile.group ? !usedGroupIds.has(tile.group) : true))

      const groupsWithItems = grouped.filter(group => group.items.length > 0)
      if (remainder.length) {
        groupsWithItems.push({ id: 'others', title: 'Weitere Tools', items: remainder })
      }

      if (!groupsWithItems.length) {
        groupsWithItems.push({ id: 'default', title: undefined, items: tiles })
      }

      return { ...section, groups: groupsWithItems }
    }).filter((section): section is NonNullable<typeof section> => Boolean(section))
  }, [filteredTiles])

  const totalVisibleTiles = filteredTiles.length

  const handleSpotlightMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setSpotlight({ x: `${x}%`, y: `${y}%` })
  }

  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Tech Stack & KI-Modelle | VAE Systems"
        description="Kompletter Überblick über Open-Source-KI-Modelle, Frameworks, Infrastruktur und Developer-Tools – filterbar, suchbar, transparent."
        canonicalPath="/ressourcen/tech-stack"
      />

      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-bg-darker to-[#050505] py-24">
        <div className="absolute inset-0 opacity-70" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.2),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(99,102,241,0.18),transparent_60%)]" />
        </div>
        <div className="container-vae relative space-y-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/90">
            Open Source Systeme & KI-Modelle
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold text-white md:text-5xl">VAE Tech Stack · Komplettübersicht</h1>
            <p className="mx-auto max-w-3xl text-lg text-white/80">
              Arbeitssysteme (Nextcloud, Temporal, Docker) + KI-Frameworks (LangChain, Open-Source-LLMs) – unsere
              Doppel-Kompetenz. Filterbar, suchbar, sofort einsatzbereit.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-vae-turquoise" />
              Open Source first
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
              <Layers className="h-4 w-4 text-vae-turquoise" />
              10 Kategorien · {TECH_TILES.length} Tools
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
              <Filter className="h-4 w-4 text-vae-turquoise" />
              Suche + Filter inklusive
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 bg-bg-dark/80 py-10 backdrop-blur">
        <div className="container-vae space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/80">Filter & Suche</p>
              <p className="text-sm text-white/70">
                {totalVisibleTiles} von {TECH_TILES.length} Tools sichtbar
              </p>
            </div>
            <label className="flex w-full items-center gap-3 rounded-full border border-white/10 bg-bg-darker px-4 py-3 text-sm text-white/70 focus-within:border-vae-turquoise md:max-w-xl">
              <Search className="h-4 w-4 text-white/50" />
              <span className="sr-only">Tech Stack durchsuchen</span>
              <input
                type="search"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Nach Tool, Modell oder Organisation suchen…"
                className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
                aria-label="Tech Stack durchsuchen"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            {TECH_FILTERS.map(filter => {
              const isActive = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    isActive
                      ? 'border-vae-turquoise bg-vae-turquoise/20 text-white shadow-[0_10px_30px_rgba(13,148,136,0.4)]'
                      : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-vae space-y-16">
          {!sectionsWithContent.length && (
            <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 px-6 py-10 text-center text-sm text-white/80">
              Keine Treffer für diese Kombination. Passe Filter oder Suchbegriff an.
            </div>
          )}

          {sectionsWithContent.map(section => (
            <div key={section.id} className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
                  {section.badge}
                </div>
                <h2 className="text-3xl font-semibold text-white">{section.heading}</h2>
                {section.subheading && <p className="text-base text-white/70">{section.subheading}</p>}
              </div>

              {section.groups?.map(group => (
                <div key={group.id} className="space-y-4">
                  {group.title && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-vae-turquoise/80">
                        {group.title}
                      </p>
                      <span className="text-xs text-white/50">{group.items?.length ?? 0} Tools</span>
                    </div>
                  )}
                  <div
                    className="rounded-[40px] border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-6"
                    onMouseMove={handleSpotlightMove}
                    onMouseLeave={() => setSpotlight({ x: '50%', y: '50%' })}
                    style={{
                      backgroundImage: `radial-gradient(circle at ${spotlight.x} ${spotlight.y}, rgba(13,148,136,0.15), transparent 55%)`,
                    }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {group.items?.map(tile => (
                        <TechStackTile key={tile.id} tile={tile} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TechStackResourcePage
