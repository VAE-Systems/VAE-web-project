import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Layout Components
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'

// Pages
import HomePage from '@components/pages/HomePage'

/**
 * Main App Component
 * 
 * Provides routing structure and layout for VAE Systems website
 * Uses React Router for client-side navigation
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-bg-darker text-text-light">
        <Header />
        
        <main className="pt-20"> {/* Account for fixed header */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Additional routes will be added here */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App
