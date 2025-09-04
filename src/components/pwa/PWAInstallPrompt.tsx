/**
 * PWA Install Prompt Component
 *
 * Shows install prompt for PWA when available
 */

import React, { useState, useEffect } from 'react'
import { usePWA } from '../../hooks/usePWA'
import TouchButton from '../ui/TouchButton'

const PWAInstallPrompt: React.FC = () => {
  const { canInstall, install, isInstalled, isInstallable } = usePWA()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [debugInfo, setDebugInfo] = useState<{
    isHttps: boolean
    serviceWorkerSupported: boolean
    canInstall: boolean
    serviceWorkerRegistered: boolean
    serviceWorkerState: string
    platform: string
    userAgent: string
  }>({
    isHttps: false,
    serviceWorkerSupported: false,
    canInstall: false,
    serviceWorkerRegistered: false,
    serviceWorkerState: 'unknown',
    platform: 'unknown',
    userAgent: 'unknown'
  })

  useEffect(() => {
    // Check if user has already dismissed the prompt
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Debug information
    const newDebugInfo = {
      isHttps: window.location.protocol === 'https:',
      serviceWorkerSupported: 'serviceWorker' in navigator,
      canInstall: canInstall,
      serviceWorkerRegistered: false, // Will be updated by service worker registration
      serviceWorkerState: 'unknown',
      platform: navigator.platform || 'unknown',
      userAgent: navigator.userAgent
    }

    // Check service worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          newDebugInfo.serviceWorkerRegistered = true
          newDebugInfo.serviceWorkerState = registration.active?.state || 'unknown'
          setDebugInfo(prev => ({ ...prev, serviceWorkerRegistered: true, serviceWorkerState: registration.active?.state || 'unknown' }))
        }
      })
    }

    setDebugInfo(newDebugInfo)

    // Show prompt after a delay if installable
    if (canInstall) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000) // Show after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [canInstall, isInstallable, isInstalled])

  const handleInstall = async () => {
    console.log('[PWA] Install button clicked')
    console.log('[PWA] Can install:', canInstall)
    console.log('[PWA] Is installable:', isInstallable)

    if (!canInstall) {
      alert(`PWA kann nicht installiert werden. Debug: HTTPS=${debugInfo.isHttps}, SW=${debugInfo.serviceWorkerSupported}, CanInstall=${debugInfo.canInstall}`)
      return
    }

    try {
      const success = await install()
      console.log('[PWA] Install result:', success)
      if (success) {
        setIsVisible(false)
        alert('PWA erfolgreich installiert!')
      } else {
        alert('PWA Installation wurde abgebrochen oder ist fehlgeschlagen.')
      }
    } catch (error) {
      console.error('[PWA] Install error:', error)
      alert(`Fehler bei PWA Installation: ${error}`)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (!isVisible || isDismissed || !canInstall) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-40 bg-bg-darker border border-vae-turquoise/30 rounded-lg shadow-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-vae-turquoise/20 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-vae-turquoise">download</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text-light mb-1">
            App installieren
          </h3>
          <p className="text-sm text-text-muted mb-3">
            Installiere VAE Systems als App für besseren Zugriff und Offline-Nutzung.
          </p>

          {/* Debug Information - nur in Entwicklung */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-3 p-2 bg-bg-dark rounded text-xs text-text-muted border border-vae-turquoise/20">
              <div className="font-semibold mb-1 text-vae-turquoise">Debug Info:</div>
              <div>HTTPS: {debugInfo.isHttps ? '✅' : '❌'}</div>
              <div>SW Support: {debugInfo.serviceWorkerSupported ? '✅' : '❌'}</div>
              <div>Can Install: {debugInfo.canInstall ? '✅' : '❌'}</div>
              <div>SW Registered: {debugInfo.serviceWorkerRegistered ? '✅' : '❌'}</div>
              <div>SW State: {debugInfo.serviceWorkerState}</div>
              <div>Platform: {debugInfo.platform}</div>
              <div>Browser: {debugInfo.userAgent?.split(' ')[0]}</div>
              <button
                onClick={() => {
                  localStorage.removeItem('pwa-install-dismissed')
                  setIsDismissed(false)
                  window.location.reload()
                }}
                className="mt-2 px-2 py-1 bg-vae-turquoise/20 text-vae-turquoise rounded text-xs hover:bg-vae-turquoise/30"
              >
                Reset Dismissed
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <TouchButton
              onClick={handleInstall}
              size="sm"
              className="flex-1"
            >
              Installieren
            </TouchButton>
            <TouchButton
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
            >
              Später
            </TouchButton>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-text-muted hover:text-text-light p-1"
          aria-label="Installationsaufforderung schließen"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  )
}

export default PWAInstallPrompt
