import { Command, Search, Sparkles, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CommandPalette from './CommandPalette'

const CommandCenterLauncher: React.FC = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const tagName = target?.tagName?.toLowerCase()
      const typing = tagName === 'input' || tagName === 'textarea' || target?.isContentEditable

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(prev => !prev)
        return
      }

      if (!typing && event.key === '/' && !open) {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <>
      <div className="fixed bottom-5 right-4 z-[1040] sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/92 p-2 pr-3 text-gray-900 shadow-[0_18px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-vae-turquoise/60 dark:hover:shadow-[0_18px_80px_rgba(0,255,165,0.22)] focus:outline-none focus:ring-2 focus:ring-vae-turquoise/50 dark:border-white/12 dark:bg-bg-darker/92 dark:text-white dark:shadow-[0_18px_60px_rgba(0,0,0,0.38)] dark:hover:bg-bg-darker sm:pr-4"
          aria-label={open ? 'VAECTRA Search schließen' : 'VAECTRA Search öffnen'}
          aria-expanded={open}
        >
          {/* Logo-Kachel: dunkles Logo auf hellem Grund – in beiden Modi sichtbar */}
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-vae-turquoise/30 bg-gradient-to-br from-white to-vae-turquoise/15 text-text-light shadow-inner shadow-vae-turquoise/10">
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <img src="/App_Logo_dark.svg" alt="" className="h-6 w-auto" aria-hidden />
            )}
            <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-vae-turquoise dark:shadow-[0_0_10px_rgba(0,255,165,0.9)]" />
          </span>
          <span className="hidden min-w-0 text-left sm:block">
            <span className="flex items-center gap-1.5 text-sm font-semibold leading-tight">
              VAECTRA
              <Sparkles className="h-3.5 w-3.5 text-vae-turquoise" />
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/50">
              <Search className="h-3 w-3" />
              Search · Ask · Start
            </span>
          </span>
          <span className="hidden items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[11px] font-semibold text-gray-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/45 lg:flex">
            <Command className="h-3 w-3" />K
          </span>
        </button>
      </div>

      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default CommandCenterLauncher
