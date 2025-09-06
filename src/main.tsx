import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './config/designSystem'; // Initialisiert das Design-System
import { useServiceWorker } from './hooks/useServiceWorker'
import './styles/globals.css'

// Service Worker Registration Component
const ServiceWorkerManager: React.FC = () => {
  useServiceWorker()
  return null
}

// Ensure root element exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

// In development, ensure any previously registered SW is unregistered to avoid
// HMR websocket issues and duplicate React instances served from cache.
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations?.().then((regs) => {
    regs.forEach((r) => r.unregister().catch(() => { }))
  }).catch(() => { })
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {import.meta.env.PROD ? <ServiceWorkerManager /> : null}
    <App />
  </React.StrictMode>,
)
