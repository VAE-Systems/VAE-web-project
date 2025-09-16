import React from 'react'
import Icon from './Icon'

export interface MaterialIconProps {
  icon: string
  size?: number | string
  className?: string
}

// Backwards-compatible wrapper that now renders lucide icons via mapping
const MaterialIcon: React.FC<MaterialIconProps> = ({ icon, size = 20, className = '' }) => {
  const numericSize = typeof size === 'number' ? size : parseInt(String(size), 10) || 20
  return <Icon name={icon} className={className} size={numericSize} />
}

export default MaterialIcon
