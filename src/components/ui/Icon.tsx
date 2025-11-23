import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Bot,
  Boxes,
  Brain,
  Briefcase,
  Building2,
  CalendarCheck,
  CalendarClock,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cloud,
  Code,
  Cog,
  Compass,
  Cpu,
  Crosshair,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  Flag,
  Globe,
  Handshake,
  Headphones,
  HelpCircle,
  Home,
  Info,
  Layers,
  LayoutGrid,
  Lightbulb,
  Link as LinkIcon,
  ListTree,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  Moon,
  Pencil,
  Phone,
  Puzzle,
  Rocket,
  Send,
  Server,
  Settings,
  Shapes,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingUp,
  Upload,
  User,
  UserCheck,
  Users,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import React from 'react'

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
  | 'workspace_premium'
  | 'check_circle'
  | string

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

const MAP: Record<string, IconComponent> = {
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
  check_circle: CheckCircle,
  task_alt: CheckCircle2,
  assignment_turned_in: CheckCircle2,
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
  shield: Shield,
  verified_user: UserCheck,
  verified: BadgeCheck,
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
  dns: Globe,
  link: LinkIcon,
  target: Target,
  crosshair: Crosshair,
  description: FileText,
  savings: DollarSign,
  flag: Flag,
  public: Globe,

  // Theme Icons
  light_mode: Sun,
  dark_mode: Moon,

  // Navigation & Organization Icons
  home: Home,
  insights: TrendingUp,
  trending_up: TrendingUp,
  explore: Compass,
  compass_calibration: Compass,
  work: Briefcase,
  settings: Settings,
  settings_suggest: Server,
  storage: Server,
  timeline: ListTree,
  inventory_2: Boxes,
  help_outline: HelpCircle,

  // Creative & Enhancement Icons
  lightbulb: Lightbulb,
  auto_awesome: Sparkles,
  tune: SlidersHorizontal,
  design_services: Pencil,
  workspace_premium: Award,
  grade: Star,
  star: Star,

  // Fallback for energy/power icons
  bolt: Zap,
  flash_on: Zap,
  electric_bolt: Zap,
}

const missingIconWarnings = new Set<string>()

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name?: IconName | string
  className?: string
  size?: number
}

const Icon: React.FC<IconProps> = ({ name, className, size = 20, ...rest }) => {
  const fallbackClasses = [className, process.env.NODE_ENV === 'development' ? 'opacity-50' : null]
    .filter(Boolean)
    .join(' ')

  const renderFallback = () => (
    <Shapes className={fallbackClasses} width={size} height={size} aria-hidden="true" {...rest} />
  )

  const key = typeof name === 'string' ? name.trim() : ''

  if (!key) {
    return renderFallback()
  }

  const normalizedKey = key.toLowerCase()
  const IconComponent = MAP[key] || MAP[normalizedKey] || null

  if (!IconComponent) {
    if (process.env.NODE_ENV === 'development' && !missingIconWarnings.has(normalizedKey)) {
      missingIconWarnings.add(normalizedKey)
      console.warn(`Icon '${key}' not found in Icon map. Add a mapping in src/components/ui/Icon.tsx.`)
    }

    return renderFallback()
  }

  return <IconComponent className={className} width={size} height={size} aria-hidden="true" {...rest} />
}

export default Icon
