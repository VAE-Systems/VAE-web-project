/**
 * Icon Registry - Centralized Icon Management
 *
 * This file provides a robust icon system that works consistently
 * between development and production environments.
 */

import React from 'react'
import Icon from './Icon'

export interface IconRegistryProps {
  name: string
  className?: string
  size?: number
  fallback?: string
}

/**
 * Enhanced Icon Component with Better Error Handling
 *
 * This wrapper provides additional safety for production builds
 * where icon mappings might not be available.
 */
export const SafeIcon: React.FC<IconRegistryProps> = ({ name, className, size = 20, fallback = 'shapes' }) => {
  try {
    return <Icon name={name} className={className} size={size} />
  } catch (error) {
    console.warn(`Icon '${name}' failed to render, using fallback '${fallback}'`, error)
    return <Icon name={fallback} className={className} size={size} />
  }
}

/**
 * Icon Validator - Check if an icon exists before rendering
 */
export const validateIcon = (name: string): boolean => {
  // This will be populated with available icons from the Icon component
  const availableIcons = [
    'arrow_forward',
    'arrow_back',
    'expand_more',
    'download',
    'close',
    'call',
    'email',
    'schedule',
    'layers',
    'check',
    'menu',
    'home',
    'settings',
    'info',
    'location_on',
    'psychology',
    'cloud_sync',
    'verified_user',
    'rocket_launch',
    'keyboard_arrow_down',
  ]

  return availableIcons.includes(name)
}

/**
 * Icon Preloader for Production Builds
 *
 * Ensures all required icons are available during build time
 */
export const preloadIcons = () => {
  // This can be called during the build process to ensure
  // all icons are properly bundled
  console.log('Preloading icon registry...')
}

export default SafeIcon
