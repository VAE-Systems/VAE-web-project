import React from 'react'
import {
  ArrowRight, ArrowUpRight, ArrowLeft, ChevronDown, ChevronUp,
  Download, Upload, ExternalLink, X, Phone, CalendarClock, CalendarCheck,
  Headphones, Mail, MailCheck, Link as LinkIcon,
  Layers, LayoutGrid, Shapes, ShieldCheck, MapPin, Code, Info, Globe, Check,
  Menu, Sun, Moon, Rocket, Cloud, Brain, Cog, GitBranch, Cpu, Bot,
  MessageSquare, MessageCircle, Send, Users, User, Lightbulb, Sparkles,
  SlidersHorizontal, Pencil, Handshake, Home, TrendingUp, Briefcase, Settings, Boxes, HelpCircle, Puzzle, Wrench, ListTree
} from 'lucide-react'
import { Zap } from 'lucide-react'

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
  arrow_forward: ArrowRight,
  arrow_outward: ArrowUpRight,
  arrow_back: ArrowLeft,
  expand_more: ChevronDown,
  expand_less: ChevronUp,
  download: Download,
  upload: Upload,
  launch: ExternalLink,
  close: X,
  call: Phone,
  event_available: CalendarCheck,
  architecture: Layers,
  support_agent: Headphones,
  forward_to_inbox: MailCheck,
  email: Mail,
  link: LinkIcon,
  layers: Layers,
  hub: GitBranch,
  apps: LayoutGrid,
  schedule: CalendarClock,
  handshake: Handshake,
  // Material-aligned aliases
  shield: ShieldCheck,
  flash_on: Zap,
  verified_user: ShieldCheck,
  category: LayoutGrid,
  security: ShieldCheck,
  location_on: MapPin,
  code: Code,
  info: Info,
  travel_explore: Globe,
  check: Check,
  menu: Menu,
  light_mode: Sun,
  dark_mode: Moon,
  psychology: Brain,
  precision_manufacturing: Cog,
  cloud_sync: Cloud,
  rocket_launch: Rocket,
  keyboard_arrow_down: ChevronDown,
  home: Home,
  insights: TrendingUp,
  work: Briefcase,
  settings: Settings,
  timeline: ListTree,
  inventory_2: Boxes,
  help_outline: HelpCircle,
  message: MessageSquare,
  chat: MessageCircle,
  send: Send,
  people: Users,
  groups: Users,
  person: User,
  lightbulb: Lightbulb,
  auto_awesome: Sparkles,
  science: Cpu,
  build: Cog,
  smart_toy: Bot,
  tune: SlidersHorizontal,
  design_services: Pencil,
  widgets: Puzzle,
  deployed_code: Wrench,
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name?: IconName | string
  className?: string
  size?: number
}

const Icon: React.FC<IconProps> = ({ name, className, size = 20, ...rest }) => {
  const key = (name as string) || ''
  const Comp = MAP[key] || MAP[key?.toLowerCase?.()] || Shapes
  return <Comp className={className} width={size} height={size} aria-hidden="true" {...rest} />
}

export default Icon
