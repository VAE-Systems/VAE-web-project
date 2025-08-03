import React from 'react'

interface MaterialIconProps {
  icon: string
  size?: number | string
  className?: string
  filled?: boolean
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700
  grade?: -25 | 0 | 200
  opticalSize?: 20 | 24 | 40 | 48
}

/**
 * Material Icons Component
 * 
 * Wrapper für Google Material Symbols mit TypeScript-Support
 * 
 * @param icon - Name des Material Symbol Icons
 * @param size - Größe in px oder CSS-Einheit
 * @param className - Zusätzliche CSS-Klassen
 * @param filled - Ob das Icon gefüllt sein soll
 * @param weight - Dicke der Linien (100-700)
 * @param grade - Kontrast-Anpassung (-25, 0, 200)
 * @param opticalSize - Optimale Größe für das Icon (20, 24, 40, 48)
 */
const MaterialIcon: React.FC<MaterialIconProps> = ({
  icon,
  size = 24,
  className = '',
  filled = false,
  weight = 400,
  grade = 0,
  opticalSize = 24
}) => {
  const iconClass = filled ? 'material-symbols-outlined' : 'material-symbols-outlined'
  
  const style: React.CSSProperties = {
    fontSize: typeof size === 'number' ? `${size}px` : size,
    fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`
  }

  return (
    <span 
      className={`${iconClass} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {icon}
    </span>
  )
}

export default MaterialIcon

// Häufig verwendete Icons als Shortcuts
export const Icons = {
  // Navigation
  Home: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="home" {...props} />,
  Menu: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="menu" {...props} />,
  Close: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="close" {...props} />,
  ArrowBack: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="arrow_back" {...props} />,
  ArrowForward: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="arrow_forward" {...props} />,
  
  // Communication
  Email: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="email" {...props} />,
  Phone: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="phone" {...props} />,
  Message: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="message" {...props} />,
  Chat: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="chat" {...props} />,
  Send: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="send" {...props} />,
  
  // Tech & Business
  Code: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="code" {...props} />,
  Settings: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="settings" {...props} />,
  Build: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="build" {...props} />,
  Science: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="science" {...props} />,
  Psychology: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="psychology" {...props} />,
  AutoAwesome: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="auto_awesome" {...props} />,
  
  // Users & People
  Person: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="person" {...props} />,
  People: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="people" {...props} />,
  Groups: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="groups" {...props} />,
  
  // Interface
  CheckCircle: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="check_circle" {...props} />,
  Error: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="error" {...props} />,
  Warning: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="warning" {...props} />,
  Info: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="info" {...props} />,
  HelpOutline: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="help_outline" {...props} />,
  
  // Actions
  Download: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="download" {...props} />,
  Upload: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="upload" {...props} />,
  Share: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="share" {...props} />,
  Launch: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="launch" {...props} />,
  
  // Media
  PlayArrow: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="play_arrow" {...props} />,
  Pause: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="pause" {...props} />,
  Stop: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="stop" {...props} />,
  
  // Chatbot specific
  SmartToy: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="smart_toy" {...props} />,
  Lightbulb: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="lightbulb" {...props} />,
  Mic: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="mic" {...props} />,
  MicOff: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="mic_off" {...props} />,
  ExpandMore: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="expand_more" {...props} />,
  ExpandLess: (props: Omit<MaterialIconProps, 'icon'>) => <MaterialIcon icon="expand_less" {...props} />,
}
