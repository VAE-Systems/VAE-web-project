import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-darker text-text-light">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-red-400 mb-4">Oops! Etwas ist schiefgelaufen</h1>
            <p className="text-lg mb-6">Entschuldigung, es gab einen Fehler. Bitte laden Sie die Seite neu.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-turquoise text-bg-darker rounded-lg hover:bg-turquoise-dark transition-colors"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
