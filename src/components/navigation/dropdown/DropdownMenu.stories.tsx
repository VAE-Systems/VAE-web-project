import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu } from './DropdownMenu'
import { MENU_DATA } from './menuData'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Navigation/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    menus: MENU_DATA,
  },
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

export const LeistungenDefault: Story = {
  name: 'Leistungen',
  args: {
    initialOpenMenuId: 'leistungen',
  },
}

export const RessourcenState: Story = {
  name: 'Ressourcen',
  args: {
    initialOpenMenuId: 'ressourcen',
  },
}

export const UeberUnsState: Story = {
  name: 'Über Uns',
  args: {
    initialOpenMenuId: 'ueber-uns',
  },
}

export const MobileMenu: Story = {
  name: 'Mobile Accordion',
  parameters: {
    viewport: {
      defaultViewport: 'iphone14',
    },
  },
}
