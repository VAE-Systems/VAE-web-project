import React from 'react'
import { MenuItem } from './menuData'

interface DropdownMenuItemProps {
  item: MenuItem
  isActive: boolean
  onHover: (itemId: string) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLAnchorElement>) => void
  itemRef?: (node: HTMLAnchorElement | null) => void
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ item, isActive, onHover, onKeyDown, itemRef }) => {
  const handleHover = () => onHover(item.id)

  return (
    <li>
      <a
        ref={itemRef}
        href={item.href}
        onMouseEnter={handleHover}
        onFocus={handleHover}
        onTouchStart={handleHover}
        onKeyDown={onKeyDown}
        aria-current={isActive ? 'true' : undefined}
        className={`group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-bg-darker ${isActive ? 'border-vae-turquoise/80 bg-white/5 text-white shadow-lg shadow-vae-turquoise/20' : 'border-white/5 text-text-light hover:border-white/20 hover:bg-white/5 hover:text-white'} `}
      >
        <span className="flex items-center gap-2">{item.label}</span>
        <span
          className={`text-xs uppercase tracking-[0.2em] transition-opacity duration-200 ${isActive ? 'text-vae-turquoise opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
        >
          →
        </span>
      </a>
    </li>
  )
}
