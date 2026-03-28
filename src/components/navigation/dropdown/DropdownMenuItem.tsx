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
        className={`group flex w-full items-center justify-between border-l-4 px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#030806] ${
          isActive
            ? 'dark:bg-white/8 border-vae-turquoise bg-vae-turquoise/10 text-gray-900 dark:text-white'
            : 'border-transparent bg-transparent text-gray-600 hover:border-vae-turquoise/40 hover:bg-vae-turquoise/5 hover:text-gray-900 dark:text-white/60 dark:hover:border-vae-turquoise/40 dark:hover:bg-white/5 dark:hover:text-white'
        }`}
      >
        <span className="flex items-center gap-2">{item.label}</span>
        <span
          className={`text-xs uppercase tracking-[0.2em] transition-opacity duration-200 ${
            isActive
              ? 'text-vae-turquoise opacity-100'
              : 'text-gray-400 opacity-0 group-hover:opacity-60 dark:text-white/50 dark:group-hover:text-white/80'
          }`}
        >
          →
        </span>
      </a>
    </li>
  )
}
