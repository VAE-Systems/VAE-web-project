import { gsap } from 'gsap'
import { Filter, Layers, Search, Sparkles } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import Seo from '@/components/ui/Seo'
import { TECH_FILTERS, TECH_SECTIONS, TECH_TILES, TechCategoryId, TechTile } from '@/data/techStackData'

type FilterId = 'all' | TechCategoryId

interface GroupWithTiles {
  id: string
  title?: string
  description?: string
  items: TechTile[]
}

const InteractiveTechGrid: React.FC<{ tiles: TechTile[] }> = ({ tiles }) => {
  const tileRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [pointerCoarse, setPointerCoarse] = useState(true)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setPointerCoarse(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = tiles.map(tile => tileRefs.current[tile.id]).filter((el): el is HTMLAnchorElement => Boolean(el))

    const animateTiles = () => {
      if (hasAnimatedRef.current) return
      hasAnimatedRef.current = true
      gsap.context(() => {
        elements.forEach((el, index) => {
          const angle = ((index * 30) % 360) * (Math.PI / 180)
          const radius = 180 + ((index % 4) + 1) * 35
          const x = radius * Math.cos(angle)
          const y = radius * Math.sin(angle)
          gsap.fromTo(
            el,
            { x, y, opacity: 0, scale: 0.8, filter: 'blur(18px)' },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power3.out',
              delay: index * 0.025,
            }
          )
        })
      }, containerRef)
    }

    let observer: IntersectionObserver | undefined
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current && !prefersReducedMotion) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateTiles()
              observer?.disconnect()
            }
          })
        },
        { threshold: 0.25 }
      )
      observer.observe(containerRef.current)
    } else {
      animateTiles()
    }

    const cleanups: Array<() => void> = []

    elements.forEach(el => {
      const img = el.querySelector('img') as HTMLElement | null

      const handleEnter = () => {
        ;(el as any)._fadeOutTween?.kill?.()
        gsap.to(el, { '--glow-alpha': 0.78, scale: 1.085, duration: 0.25, ease: 'power2.out' })
        if (!prefersReducedMotion && img) {
          ;(img as any)._spinTween?.kill?.()
          ;(img as any)._spinTween = gsap.to(img, {
            rotationY: '+=360',
            duration: 1.4,
            ease: 'power1.inOut',
            repeat: -1,
          })
        }
      }

      const handleLeave = () => {
        if (img) {
          const currentRot = (gsap.getProperty(img, 'rotationY') as number) || 0
          ;(img as any)._spinTween?.kill?.()
          const target = Math.ceil(currentRot / 360) * 360
          gsap.to(img, { rotationY: target, duration: 0.8, ease: 'power2.out' })
        }
        const fade = gsap.to(el, { '--glow-alpha': 0, scale: 1, duration: 3.2, ease: 'power2.out' })
        ;(el as any)._fadeOutTween = fade
      }

      let ticking = false
      const handleMove = (event: MouseEvent) => {
        if (pointerCoarse) return
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const xRel = (event.clientX - rect.left) / rect.width
          const yRel = (event.clientY - rect.top) / rect.height
          const rotX = (0.5 - yRel) * 14
          const rotY = (xRel - 0.5) * 14
          el.style.setProperty('--rx', `${rotX}deg`)
          el.style.setProperty('--ry', `${rotY}deg`)
          ticking = false
        })
      }

      const resetTilt = () => {
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
      }

      el.addEventListener('pointerenter', handleEnter)
      el.addEventListener('pointerleave', handleLeave)
      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', resetTilt)

      cleanups.push(() => {
        el.removeEventListener('pointerenter', handleEnter)
        el.removeEventListener('pointerleave', handleLeave)
        el.removeEventListener('mousemove', handleMove)
        el.removeEventListener('mouseleave', resetTilt)
      })
    })

    return () => {
      observer?.disconnect()
      cleanups.forEach(clean => clean())
    }
  }, [tiles, pointerCoarse])

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerCoarse) return
    if (!spotlightRef.current) return
    const rect = spotlightRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    spotlightRef.current.style.setProperty('--spot-x', `${x}%`)
    spotlightRef.current.style.setProperty('--spot-y', `${y}%`)
  }

  const resetSpotlight = () => {
    if (!spotlightRef.current) return
    spotlightRef.current.style.setProperty('--spot-x', '50%')
    spotlightRef.current.style.setProperty('--spot-y', '50%')
  }

  const desktopColumns = 6
  const remainder = tiles.length % desktopColumns
  const placeholderCount = remainder === 0 ? 0 : desktopColumns - remainder

  return (
    <div
      className="tech-spotlight"
      ref={spotlightRef}
      onPointerMove={handlePointer}
      onPointerLeave={resetSpotlight}
      data-pointer={pointerCoarse ? 'coarse' : 'fine'}
      aria-hidden={tiles.length === 0}
    >
      <div
        ref={containerRef}
        className="tech-stack-grid mx-auto grid max-w-6xl gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {tiles.map(tile => (
          <a
            key={tile.id}
            href={tile.link}
            target="_blank"
            rel="noopener noreferrer"
            className="tech-tile flex aspect-square flex-col items-center justify-center gap-3 p-4 text-center will-change-transform"
            ref={el => {
              if (el) {
                tileRefs.current[tile.id] = el
              } else {
                delete tileRefs.current[tile.id]
              }
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              {tile.logo ? (
                <img src={tile.logo} alt={tile.name} className="h-10 w-10 object-contain will-change-transform" />
              ) : (
                <span className="text-lg font-semibold text-white/80">{tile.name[0]}</span>
              )}
            </div>
            <span className="text-sm font-medium text-text-light">{tile.name}</span>
            {tile.description && <span className="text-xs text-white/70">{tile.description}</span>}
          </a>
        ))}
        {Array.from({ length: placeholderCount }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="tech-tile hidden aspect-square flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] opacity-0 xl:flex"
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}

type SectionWithTiles = (typeof TECH_SECTIONS)[number] & { groups: GroupWithTiles[] }

const TechStackResourcePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [searchQuery, setSearchQuery] = useState('')

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

  const sectionsWithContent: SectionWithTiles[] = useMemo(() => {
    return TECH_SECTIONS.map(section => {
      const tiles = filteredTiles.filter(tile => tile.category === section.id)
      if (!tiles.length) return null

      const baseGroups: GroupWithTiles[] =
        section.groups?.map(group => ({
          ...group,
          items: tiles.filter(tile => tile.group === group.id),
        })) ?? []

      const groupsWithItems = baseGroups.filter(group => group.items.length > 0)
      const usedGroupIds = new Set(groupsWithItems.map(group => group.id))
      const remainder = tiles.filter(tile => (tile.group ? !usedGroupIds.has(tile.group) : true))

      if (remainder.length) {
        groupsWithItems.push({
          id: 'others',
          title: groupsWithItems.length ? 'Weitere Tools' : undefined,
          items: remainder,
        })
      }
      if (!groupsWithItems.length) {
        groupsWithItems.push({ id: 'default', title: undefined, items: tiles })
      }

      return { ...section, groups: groupsWithItems }
    }).filter((section): section is SectionWithTiles => Boolean(section))
  }, [filteredTiles])

  const totalVisibleTiles = filteredTiles.length

  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Tech Stack & KI-Modelle | VAE Systems"
        description="Kompletter Überblick über Open-Source-KI-Modelle, Frameworks, Infrastruktur und Developer-Tools – filterbar, suchbar, transparent."
        canonicalPath="/ressourcen/tech-stack"
      />

      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker to-bg-dark dark:border-white/5">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.28),transparent_55%)]"
          aria-hidden="true"
        />
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
                      <span className="text-xs text-white/50">{(group as any).items?.length ?? 0} Tools</span>
                    </div>
                  )}
                  <InteractiveTechGrid tiles={(group as any).items ?? []} />
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
