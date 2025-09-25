/**
 * useServiceWorker Hook
 *
 * Manages service worker registration and updates
 */

import { useState, useEffect } from 'react'

interface ServiceWorkerState {
  isSupported: boolean
  isRegistered: boolean
  isUpdating: boolean
  updateAvailable: boolean
  registration: ServiceWorkerRegistration | null
}

export const useServiceWorker = () => {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: 'serviceWorker' in navigator,
    isRegistered: false,
    isUpdating: false,
    updateAvailable: false,
    registration: null,
  })

  useEffect(() => {
    // Do not register service workers during local development.
    // Vite's HMR relies on a websocket that can be broken by a SW caching the app shell,
    // which may also lead to duplicate React versions being loaded.
    if (!state.isSupported || import.meta.env.DEV) return

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })

        console.log('[SW] Registered:', registration)

        setState(prev => ({
          ...prev,
          isRegistered: true,
          registration,
        }))

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            setState(prev => ({ ...prev, isUpdating: true }))

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setState(prev => ({
                  ...prev,
                  isUpdating: false,
                  updateAvailable: true,
                }))
              }
            })
          }
        })

        // Handle controller change (new SW activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('[SW] New service worker activated')
          window.location.reload()
        })
      } catch (error) {
        console.error('[SW] Registration failed:', error)
      }
    }

    registerServiceWorker()
  }, [state.isSupported])

  const updateServiceWorker = () => {
    if (state.registration && state.registration.waiting) {
      state.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  const unregisterServiceWorker = async () => {
    if (state.registration) {
      await state.registration.unregister()
      setState(prev => ({
        ...prev,
        isRegistered: false,
        registration: null,
      }))
    }
  }

  return {
    ...state,
    updateServiceWorker,
    unregisterServiceWorker,
  }
}
