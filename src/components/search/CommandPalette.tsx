import { commandCenterItems, type CommandCenterGroup, type CommandCenterItem } from '@/content/commandCenter'
import {
  ArrowRight,
  Building2,
  Command,
  CornerDownLeft,
  FileText,
  Globe2,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type CommandMode = 'search' | 'ask' | 'contact'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

const groupOrder: CommandCenterGroup[] = ['Leistungen', 'Hosting', 'Wissen', 'Referenzen', 'Kontakt', 'Rechtliches']

const modeLabels: Record<CommandMode, { label: string; short: string }> = {
  search: { label: 'Suchen', short: 'Seiten finden' },
  ask: { label: 'KI fragen', short: 'In Vorbereitung' },
  contact: { label: 'Kontakt', short: 'Direkt starten' },
}

const groupMeta: Record<CommandCenterGroup, { icon: React.ElementType; tone: string }> = {
  Leistungen: { icon: Building2, tone: 'text-vae-turquoise' },
  Hosting: { icon: Globe2, tone: 'text-emerald-300' },
  Wissen: { icon: FileText, tone: 'text-sky-300' },
  Referenzen: { icon: ShieldCheck, tone: 'text-amber-200' },
  Kontakt: { icon: Mail, tone: 'text-vae-turquoise' },
  Rechtliches: { icon: ShieldCheck, tone: 'text-white/55' },
}

const suggestedQuestions = [
  'Was kostet betreutes Hosting?',
  'Wie läuft ein Infrastruktur-Projekt ab?',
  'Was bedeutet digitale Souveränität?',
  'Welche KI-Lösung passt zu uns?',
]

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const scoreItem = (item: CommandCenterItem, query: string) => {
  const q = normalize(query.trim())
  if (!q) return 1

  const title = normalize(item.title)
  const description = normalize(item.description)
  const group = normalize(item.group)
  const keywords = item.keywords.map(normalize)

  if (title === q) return 100
  if (title.startsWith(q)) return 80
  if (keywords.some(keyword => keyword === q || keyword.startsWith(q))) return 70
  if (title.includes(q)) return 55
  if (keywords.some(keyword => keyword.includes(q))) return 45
  if (description.includes(q)) return 25
  if (group.includes(q)) return 15
  return 0
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<CommandMode>('search')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const results = useMemo(() => {
    const scored = commandCenterItems
      .map(item => ({ item, score: scoreItem(item, query) }))
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score || groupOrder.indexOf(a.item.group) - groupOrder.indexOf(b.item.group))
      .map(entry => entry.item)

    return query.trim() ? scored.slice(0, 9) : commandCenterItems.slice(0, 7)
  }, [query])

  const groupedResults = useMemo(
    () =>
      groupOrder
        .map(group => ({
          group,
          items: results.filter(item => item.group === group),
        }))
        .filter(section => section.items.length > 0),
    [results]
  )

  const hasQuery = query.trim().length > 0
  const activeItem = results[activeIndex]

  useEffect(() => {
    if (!open) return undefined
    previousFocusRef.current = document.activeElement as HTMLElement | null
    setMode('search')
    setActiveIndex(0)
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30)

    return () => {
      window.clearTimeout(timer)
      previousFocusRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, mode])

  useEffect(() => {
    if (!open) return undefined
    const bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = bodyOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open || mode !== 'search') return
    itemRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [activeIndex, mode, open])

  if (!open) return null

  const cycleMode = (direction: 1 | -1) => {
    const modes: CommandMode[] = ['search', 'ask', 'contact']
    const currentIndex = modes.indexOf(mode)
    setMode(modes[(currentIndex + direction + modes.length) % modes.length])
  }

  const closeAndNavigate = (href: string) => {
    navigate(href)
    onClose()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      cycleMode(event.shiftKey ? -1 : 1)
      return
    }

    if (mode !== 'search') return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex(index => Math.min(index + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex(index => Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && activeItem) {
      event.preventDefault()
      closeAndNavigate(activeItem.href)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="spotlight-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      >
        <button
          type="button"
          className="absolute inset-0 cursor-default bg-black/28 backdrop-blur-[2px]"
          onClick={onClose}
          aria-label="VAECTRA Search schließen"
        />

        <motion.div
          className="pointer-events-none fixed inset-x-0 top-[13vh] mx-auto w-[min(92vw,680px)]"
          initial={{ opacity: 0, y: -14, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.985 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            layout
            className="pointer-events-auto overflow-hidden rounded-[1.7rem] border border-white/18 bg-white/78 text-text-light shadow-[0_24px_90px_rgba(0,0,0,0.38)] ring-1 ring-black/5 backdrop-blur-2xl dark:border-white/12 dark:bg-bg-darker/82 dark:text-white dark:ring-white/5"
            onKeyDown={handleKeyDown}
            transition={{ layout: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
          >
            <div className="relative">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-vae-turquoise/50 to-transparent" />
              <div className="flex items-center gap-3 px-5 py-4">
                <Search className="h-6 w-6 flex-shrink-0 text-text-muted dark:text-white/72" aria-hidden />
                <label id="spotlight-title" htmlFor="experience-center-input" className="sr-only">
                  VAECTRA Search
                </label>
                <input
                  ref={inputRef}
                  id="experience-center-input"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder={
                    mode === 'ask'
                      ? 'Frage vormerken, z.B. Was kostet Hosting?'
                      : 'VAECTRA Search'
                  }
                  className="min-w-0 flex-1 bg-transparent text-[1.45rem] font-medium tracking-normal text-text-light outline-none placeholder:text-text-light/42 dark:text-white dark:placeholder:text-white/38"
                  autoComplete="off"
                />
                <span className="hidden items-center gap-1 rounded-xl bg-black/7 px-2.5 py-1 text-xs font-semibold text-black/38 dark:bg-white/8 dark:text-white/38 sm:flex">
                  <Command className="h-3.5 w-3.5" />K
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-black/6 text-black/45 transition hover:bg-black/10 hover:text-black/70 dark:bg-white/8 dark:text-white/54 dark:hover:bg-white/12 dark:hover:text-white"
                  aria-label="Schließen"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-4 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  {(Object.keys(modeLabels) as CommandMode[]).map(key => {
                    const active = mode === key
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setMode(key)}
                        className={[
                          'rounded-full px-3 py-1.5 text-xs font-semibold transition duration-200 ring-1 ring-transparent',
                          active
                            ? 'bg-vae-turquoise/14 text-text-light shadow-sm ring-vae-turquoise/25 dark:bg-white dark:text-vae-black dark:ring-white/45'
                            : 'bg-black/6 text-black/48 hover:bg-black/10 hover:text-black/72 dark:bg-white/8 dark:text-white/48 dark:hover:bg-white/12 dark:hover:text-white/78',
                        ].join(' ')}
                      >
                        {modeLabels[key].label}
                        <span className="ml-1 hidden font-medium opacity-55 sm:inline">{modeLabels[key].short}</span>
                      </button>
                    )
                  })}
                  <span className="ml-auto hidden text-xs text-black/34 dark:text-white/32 sm:block">
                    Tab wechselt Modus
                  </span>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'search' && (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-black/8 dark:border-white/10"
                >
                  <div className="max-h-[48vh] overflow-y-auto px-3 py-3 [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.18)_transparent] dark:[scrollbar-color:rgba(255,255,255,0.22)_transparent]">
                    {!hasQuery && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-3 flex flex-wrap gap-2 px-1"
                      >
                        {['Hosting', 'KI-Beratung', 'Souveränität', 'Kontakt'].map(term => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setQuery(term)}
                            className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-semibold text-black/48 transition hover:bg-black/9 hover:text-black/72 dark:bg-white/7 dark:text-white/46 dark:hover:bg-white/11 dark:hover:text-white/74"
                          >
                            {term}
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {groupedResults.length > 0 ? (
                      <div className="space-y-3">
                        {groupedResults.map(section => {
                          const Icon = groupMeta[section.group].icon
                          return (
                            <div key={section.group}>
                              <div className="mb-1 flex items-center gap-2 px-2">
                                <Icon className={`h-3.5 w-3.5 ${groupMeta[section.group].tone}`} />
                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/34 dark:text-white/30">
                                  {section.group}
                                </p>
                              </div>
                              <div className="space-y-1">
                                {section.items.map(item => {
                                  const itemIndex = results.indexOf(item)
                                  const active = itemIndex === activeIndex
                                  const ItemIcon = groupMeta[item.group].icon
                                  return (
                                    <Link
                                      key={`${item.group}-${item.href}`}
                                      ref={node => {
                                        itemRefs.current[itemIndex] = node
                                      }}
                                      to={item.href}
                                      onMouseEnter={() => setActiveIndex(itemIndex)}
                                      onClick={onClose}
                                      className={[
                                        'group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition duration-150',
                                        active
                                          ? 'bg-black/9 shadow-sm dark:bg-white/10'
                                          : 'hover:bg-black/5 dark:hover:bg-white/7',
                                      ].join(' ')}
                                    >
                                      <span
                                        className={[
                                          'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition',
                                          active
                                            ? 'bg-white text-vae-turquoise shadow-sm dark:bg-white/12'
                                            : 'bg-black/5 text-black/38 dark:bg-white/7 dark:text-white/42',
                                        ].join(' ')}
                                      >
                                        <ItemIcon className="h-4 w-4" />
                                      </span>
                                      <span className="min-w-0 flex-1">
                                        <span className="flex min-w-0 items-center gap-2">
                                          <span className="truncate text-sm font-semibold text-text-light dark:text-white">
                                            {item.title}
                                          </span>
                                          {item.badge && (
                                            <span className="flex-shrink-0 rounded-full bg-vae-turquoise/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-emerald-700 dark:text-vae-turquoise">
                                              {item.badge}
                                            </span>
                                          )}
                                        </span>
                                        <span className="mt-0.5 block truncate text-xs text-black/42 dark:text-white/42">
                                          {item.description}
                                        </span>
                                      </span>
                                      {active ? (
                                        <CornerDownLeft className="hidden h-4 w-4 text-black/32 dark:text-white/35 sm:block" />
                                      ) : (
                                        <ArrowRight className="hidden h-4 w-4 text-black/18 dark:text-white/18 sm:block" />
                                      )}
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <p className="text-sm font-semibold text-text-light dark:text-white">Keine direkten Treffer.</p>
                        <p className="mt-1 text-sm text-black/46 dark:text-white/42">
                          Tab führt in den Fragen-Modus.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {mode === 'ask' && (
                <motion.div
                  key="ask"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-black/8 dark:border-white/10"
                >
                  <div className="p-4">
                    <div className="rounded-2xl bg-black/[0.04] p-4 dark:bg-white/[0.055]">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-vae-turquoise/12 text-emerald-700 dark:text-vae-turquoise">
                          <Sparkles className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-vae-turquoise">
                            KI-Funktion in Vorbereitung
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-black/58 dark:text-white/58">
                            Wir bauen einen quellenbasierten Assistenten für Leistungen, Hosting, Projektablauf und
                            Förderfähigkeit. Bis dahin beantworten wir konkrete Fragen persönlich.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {suggestedQuestions.map(question => (
                          <button
                            key={question}
                            type="button"
                            onClick={() => setQuery(question)}
                            className="rounded-xl bg-white/55 px-3 py-2 text-left text-xs font-medium text-black/58 transition hover:bg-white/80 hover:text-black/80 dark:bg-black/18 dark:text-white/56 dark:hover:bg-black/26 dark:hover:text-white/78"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <Link
                          to="/contact#booking"
                          onClick={onClose}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-vae-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-white dark:text-vae-black"
                        >
                          Erstgespräch anfragen
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                          href={`mailto:hello@vae.systems?subject=Frage%20an%20VAE&body=${encodeURIComponent(query.trim())}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black/6 px-4 py-2.5 text-sm font-semibold text-black/58 transition hover:bg-black/10 hover:text-black/78 dark:bg-white/8 dark:text-white/62 dark:hover:bg-white/12 dark:hover:text-white"
                        >
                          Frage per E-Mail senden
                          <Mail className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {mode === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-black/8 dark:border-white/10"
                >
                  <div className="grid gap-2 p-4 sm:grid-cols-2">
                    <Link
                      to="/contact#booking"
                      onClick={onClose}
                      className="rounded-2xl bg-black/[0.04] p-4 transition hover:bg-black/[0.07] dark:bg-white/[0.055] dark:hover:bg-white/[0.08]"
                    >
                      <Sparkles className="h-5 w-5 text-emerald-700 dark:text-vae-turquoise" />
                      <p className="mt-3 text-sm font-semibold">Erstgespräch buchen</p>
                      <p className="mt-1 text-xs leading-relaxed text-black/48 dark:text-white/46">
                        45 Minuten zur Einordnung von Infrastruktur, KI und Hosting.
                      </p>
                    </Link>
                    <Link
                      to="/contact"
                      onClick={onClose}
                      className="rounded-2xl bg-black/[0.04] p-4 transition hover:bg-black/[0.07] dark:bg-white/[0.055] dark:hover:bg-white/[0.08]"
                    >
                      <Mail className="h-5 w-5 text-emerald-700 dark:text-vae-turquoise" />
                      <p className="mt-3 text-sm font-semibold">Projekt anfragen</p>
                      <p className="mt-1 text-xs leading-relaxed text-black/48 dark:text-white/46">
                        Für konkrete Vorhaben, Hosting-Fragen oder Systemprobleme.
                      </p>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CommandPalette
