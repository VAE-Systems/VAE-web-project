import { useEffect } from 'react'
import { HelpText, useHelpModeContext } from './HelpModeContext'

/**
 * Custom hook for easy access to help mode functionality
 * Automatically registers help texts when component mounts
 *
 * @param helpTexts - Dictionary of help texts to register for this component
 * @returns Help mode context methods and state
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { helpMode, showHelp, closeHelp } = useHelpMode({
 *     myField: {
 *       title: 'Feldname',
 *       description: 'Dies ist eine Erklärung für das Feld.'
 *     }
 *   })
 *
 *   return (
 *     <button onClick={() => helpMode ? showHelp('myField') : doSomething()}>
 *       Feld
 *     </button>
 *   )
 * }
 * ```
 */
export const useHelpMode = (helpTexts?: Record<string, HelpText>) => {
  const context = useHelpModeContext()

  // Auto-register help texts on mount
  useEffect(() => {
    if (helpTexts) {
      context.registerHelpTexts(helpTexts)
    }
  }, []) // Only run on mount

  return context
}

/**
 * Helper function to create help-aware onClick handlers
 * Returns a function that either shows help or executes the action
 *
 * @param helpMode - Whether help mode is active
 * @param helpKey - The help text key to show
 * @param showHelp - Function to show help
 * @param action - The actual action to perform when not in help mode
 * @returns Click handler function
 *
 * @example
 * ```tsx
 * const { helpMode, showHelp } = useHelpMode(helpTexts)
 *
 * <button
 *   onClick={createHelpAwareHandler(
 *     helpMode,
 *     'myField',
 *     showHelp,
 *     () => console.log('clicked')
 *   )}
 * >
 *   Click me
 * </button>
 * ```
 */
export const createHelpAwareHandler = (
  helpMode: boolean,
  helpKey: string,
  showHelp: (key: string) => void,
  action: () => void
) => {
  return () => {
    if (helpMode) {
      showHelp(helpKey)
    } else {
      action()
    }
  }
}

/**
 * Helper function to add help mode styling classes
 * Returns conditional className string for help mode visual feedback
 *
 * @param helpMode - Whether help mode is active
 * @param baseClasses - Base CSS classes
 * @param helpClasses - Additional classes to add in help mode (default: cursor-help ring effect)
 * @returns Combined className string
 *
 * @example
 * ```tsx
 * const { helpMode } = useHelpMode()
 *
 * <button className={getHelpModeClasses(helpMode, 'btn-primary')}>
 *   Button
 * </button>
 * ```
 */
export const getHelpModeClasses = (
  helpMode: boolean,
  baseClasses: string,
  helpClasses = 'cursor-help ring-2 ring-white/70 ring-offset-2 ring-offset-vae-turquoise/40 dark:ring-vae-turquoise/20 dark:ring-offset-transparent'
) => {
  return helpMode ? `${baseClasses} ${helpClasses}` : baseClasses
}
