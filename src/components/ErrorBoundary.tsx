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
        <div className="flex min-h-screen items-center justify-center bg-bg-darker text-text-light">
          <div className="p-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-red-400">Oops! Etwas ist schiefgelaufen</h1>
            <p className="mb-6 text-lg">Entschuldigung, es gab einen Fehler. Bitte laden Sie die Seite neu.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-turquoise hover:bg-turquoise-dark rounded-lg px-6 py-3 text-bg-darker transition-colors"
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
