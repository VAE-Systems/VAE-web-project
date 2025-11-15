import React, { createContext, ReactNode, useContext, useState } from 'react'

/**
 * Help text definition interface
 * Each help item has a unique key, title, and description
 */
export interface HelpText {
  title: string
  description: string
}

/**
 * Help mode context state interface
 */
interface HelpModeContextType {
  /** Whether help mode is currently active */
  helpMode: boolean
  /** The currently displayed help item key, or null if none */
  activeHelp: string | null
  /** Show intro popup when help mode is first activated */
  showIntroPopup: boolean
  /** Skip help mode for this session (not persistent, DSGVO compliant) */
  skipHelpForSession: boolean
  /** Toggle help mode on/off */
  toggleHelpMode: () => void
  /** Show help for a specific item */
  showHelp: (key: string) => void
  /** Close the active help popup */
  closeHelp: () => void
  /** Close the intro popup */
  closeIntroPopup: () => void
  /** Set whether to skip help for this session */
  setSkipHelpForSession: (skip: boolean) => void
  /** Dictionary of all available help texts */
  helpTexts: Record<string, HelpText>
  /** Register new help texts (merge with existing) */
  registerHelpTexts: (texts: Record<string, HelpText>) => void
}

const HelpModeContext = createContext<HelpModeContextType | undefined>(undefined)

/**
 * Provider component for help mode functionality
 * Wrap your app or page with this to enable help mode
 *
 * @example
 * ```tsx
 * <HelpModeProvider>
 *   <YourApp />
 * </HelpModeProvider>
 * ```
 */
export const HelpModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [helpMode, setHelpMode] = useState(false)
  const [activeHelp, setActiveHelp] = useState<string | null>(null)
  const [helpTexts, setHelpTexts] = useState<Record<string, HelpText>>({})
  const [showIntroPopup, setShowIntroPopup] = useState(false)
  const [skipHelpForSession, setSkipHelpForSession] = useState(false)

  // Handle ESC key to exit help mode
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && helpMode) {
        toggleHelpModeForESC()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [helpMode])

  const toggleHelpModeForESC = () => {
    setHelpMode(false)
    setActiveHelp(null)
    setShowIntroPopup(false)
  }

  const toggleHelpMode = () => {
    // Help mode can always be toggled
    const newMode = !helpMode
    setHelpMode(newMode)
    setActiveHelp(null)
    // Show intro popup when activating help mode (unless opted out for session)
    if (newMode && !skipHelpForSession) {
      setShowIntroPopup(true)
    }
  }

  const showHelp = (key: string) => {
    if (helpTexts[key]) {
      setActiveHelp(key)
    } else {
      console.warn(`Help text not found for key: ${key}`)
    }
  }

  const closeHelp = () => {
    setActiveHelp(null)
  }

  const closeIntroPopup = () => {
    setShowIntroPopup(false)
  }

  const registerHelpTexts = (texts: Record<string, HelpText>) => {
    setHelpTexts(prev => ({ ...prev, ...texts }))
  }

  return (
    <HelpModeContext.Provider
      value={{
        helpMode,
        activeHelp,
        showIntroPopup,
        skipHelpForSession,
        toggleHelpMode,
        showHelp,
        closeHelp,
        closeIntroPopup,
        setSkipHelpForSession,
        helpTexts,
        registerHelpTexts,
      }}
    >
      {children}
    </HelpModeContext.Provider>
  )
}

/**
 * Hook to access help mode context
 * Must be used within a HelpModeProvider
 *
 * @throws Error if used outside HelpModeProvider
 *
 * @example
 * ```tsx
 * const { helpMode, showHelp } = useHelpModeContext()
 * ```
 */
export const useHelpModeContext = () => {
  const context = useContext(HelpModeContext)
  if (!context) {
    throw new Error('useHelpModeContext must be used within HelpModeProvider')
  }
  return context
}
