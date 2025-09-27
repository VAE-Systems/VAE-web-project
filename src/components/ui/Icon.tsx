import React from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  Upload,
  ExternalLink,
  X,
  Phone,
  CalendarClock,
  CalendarCheck,
  Headphones,
  Mail,
  Link as LinkIcon,
  Layers,
  LayoutGrid,
  Shapes,
  ShieldCheck,
  MapPin,
  Code,
  Info,
  Globe,
  Check,
  Menu,
  Sun,
  Moon,
  Rocket,
  Cloud,
  Brain,
  Cog,
  Cpu,
  Bot,
  MessageSquare,
  MessageCircle,
  Send,
  Users,
  User,
  Lightbulb,
  Sparkles,
  SlidersHorizontal,
  Pencil,
  Handshake,
  Home,
  TrendingUp,
  Briefcase,
  Settings,
  Boxes,
  HelpCircle,
  Puzzle,
  Wrench,
  ListTree,
  Building2,
  UserCheck,
  Zap,
} from 'lucide-react'

export type IconName =
  | 'arrow_forward'
  | 'arrow_outward'
  | 'arrow_back'
  | 'expand_more'
  | 'expand_less'
  | 'download'
  | 'upload'
  | 'launch'
  | 'close'
  | 'call'
  | 'event_available'
  | 'architecture'
  | 'support_agent'
  | 'forward_to_inbox'
  | 'email'
  | 'link'
  | 'layers'
  | 'hub'
  | 'apps'
  | 'schedule'
  | 'handshake'
  | 'category'
  | 'security'
  | 'location_on'
  | 'code'
  | 'info'
  | 'travel_explore'
  | 'check'
  | 'menu'
  | 'light_mode'
  | 'dark_mode'
  | 'psychology'
  | 'precision_manufacturing'
  | 'cloud_sync'
  | 'verified_user'
  | 'rocket_launch'
  | 'keyboard_arrow_down'
  | 'home'
  | 'insights'
  | 'work'
  | 'settings'
  | 'timeline'
  | 'inventory_2'
  | 'help_outline'
  | 'message'
  | 'chat'
  | 'send'
  | 'people'
  | 'groups'
  | 'person'
  | 'lightbulb'
  | 'auto_awesome'
  | 'science'
  | 'build'
  | 'smart_toy'
  | 'tune'
  | 'design_services'
  | 'widgets'
  | 'deployed_code'
  | string

const MAP: Record<string, React.ComponentType<any>> = {
  // Arrow & Navigation Icons
  arrow_forward: ArrowRight,
  arrow_outward: ArrowUpRight,
  arrow_back: ArrowLeft,
  expand_more: ChevronDown,
  expand_less: ChevronUp,
  keyboard_arrow_down: ChevronDown,
  launch: ExternalLink,

  // Action Icons
  download: Download,
  upload: Upload,
  close: X,
  check: Check,
  menu: Menu,

  // Communication Icons
  call: Phone,
  forward_to_inbox: Mail,
  email: Mail,
  support_agent: Headphones,
  message: MessageSquare,
  chat: MessageCircle,
  send: Send,

  // Calendar & Time Icons
  event_available: CalendarCheck,
  schedule: CalendarClock,

  // Structure & Organization Icons
  architecture: Building2,
  layers: Layers,
  hub: LayoutGrid,
  apps: LayoutGrid,
  category: Shapes,
  widgets: Puzzle,

  // People & Social Icons
  handshake: Handshake,
  people: Users,
  groups: Users,
  person: User,

  // Security & Technology Icons
  security: ShieldCheck,
  verified_user: UserCheck,
  psychology: Brain,
  precision_manufacturing: Cog,
  cloud_sync: Cloud,
  rocket_launch: Rocket,
  science: Cpu,
  build: Cog,
  smart_toy: Bot,
  deployed_code: Wrench,

  // Location & Info Icons
  location_on: MapPin,
  code: Code,
  info: Info,
  travel_explore: Globe,
  link: LinkIcon,

  // Theme Icons
  light_mode: Sun,
  dark_mode: Moon,

  // Navigation & Organization Icons
  home: Home,
  insights: TrendingUp,
  work: Briefcase,
  settings: Settings,
  timeline: ListTree,
  inventory_2: Boxes,
  help_outline: HelpCircle,

  // Creative & Enhancement Icons
  lightbulb: Lightbulb,
  auto_awesome: Sparkles,
  tune: SlidersHorizontal,
  design_services: Pencil,

  // Fallback for energy/power icons
  bolt: Zap,
  flash_on: Zap,
  electric_bolt: Zap,
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name?: IconName | string
  className?: string
  size?: number
}

const Icon: React.FC<IconProps> = ({ name, className, size = 20, ...rest }) => {
  const key = (name as string) || ''

  // Versuche verschiedene Varianten des Icon-Namens
  const normalizedKey = key.toLowerCase()
  const IconComponent = MAP[key] || MAP[normalizedKey] || null

  // Debug-Logging nur im Development-Modus
  if (!IconComponent && process.env.NODE_ENV === 'development') {
    console.warn(`Icon '${name}' not found in Icon map. Available icons:`, Object.keys(MAP))
  }

  // Fallback mit unterschiedlichen Strategien für Dev vs Prod
  if (!IconComponent) {
    // Verwende Shapes als Fallback-Icon
    return (
      <Shapes
        className={`${className} ${process.env.NODE_ENV === 'development' ? 'opacity-50' : ''}`}
        width={size}
        height={size}
        aria-hidden="true"
        {...rest}
      />
    )
  }

  return <IconComponent className={className} width={size} height={size} aria-hidden="true" {...rest} />
}

export default Icon
