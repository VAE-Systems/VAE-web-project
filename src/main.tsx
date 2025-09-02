import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { useServiceWorker } from './hooks/useServiceWorker'

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

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ServiceWorkerManager />
    <App />
  </React.StrictMode>,
)
