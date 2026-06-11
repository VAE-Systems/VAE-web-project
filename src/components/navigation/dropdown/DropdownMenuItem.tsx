import React from 'react'
import { MenuItem } from './menuData'

interface DropdownMenuItemProps {
  item: MenuItem
  isActive: boolean
  onHover: (itemId: string) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLAnchorElement>) => void
  onClick?: () => void
  itemRef?: (node: HTMLAnchorElement | null) => void
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  item,
  isActive,
  onHover,
  onKeyDown,
  onClick,
  itemRef,
}) => {
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
        onClick={onClick}
        aria-current={isActive ? 'true' : undefined}
        className={`group flex w-full items-center justify-between rounded-xl border border-transparent px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#030806] ${
          isActive
            ? 'border-vae-turquoise/35 bg-vae-turquoise/10 text-text-light dark:border-vae-turquoise/25 dark:bg-white/5 dark:text-white'
            : 'bg-transparent text-text-secondary hover:border-vae-turquoise/30 hover:bg-vae-turquoise/5 hover:text-text-light dark:text-text-secondary dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white'
        }`}
      >
        <span className="flex items-center gap-2">{item.label}</span>
        <span
          className={`text-xs uppercase tracking-[0.2em] transition-opacity duration-200 ${
            isActive
              ? 'text-vae-turquoise opacity-100'
              : 'text-text-secondary opacity-0 group-hover:opacity-60 dark:text-text-secondary dark:group-hover:text-white/80'
          }`}
        >
          →
        </span>
      </a>
    </li>
  )
}
