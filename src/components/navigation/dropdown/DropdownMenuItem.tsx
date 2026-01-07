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
        className={`group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-bg-darker ${
          isActive
            ? 'border-2 border-vae-turquoise bg-vae-turquoise/10 text-gray-900 shadow-[0_8px_18px_rgba(18,24,20,0.08)] dark:border-vae-turquoise/70 dark:bg-white/10 dark:text-white dark:shadow-none'
            : 'border-gray-200/80 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white'
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
