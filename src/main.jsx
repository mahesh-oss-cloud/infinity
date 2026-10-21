import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Infinity failed while rendering:', error, info)
  }

  recover = async () => {
    // Clear only Infinity's app-shell caches and its service-worker registration.
    // Do not erase saved account or transaction data.
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        await Promise.all(registrations.map((registration) => registration.unregister()))
      }
      if ('caches' in window) {
        const cacheNames = await window.caches.keys()
        await Promise.all(
          cacheNames
            .filter((name) => name.startsWith('infinity-cache-'))
            .map((name) => window.caches.delete(name))
        )
      }
    } catch (error) {
      console.warn('Infinity cache recovery was not fully available:', error)
    }
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '24px',
            background: '#f4f6fa',
            color: '#111827',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <section style={{ width: '100%', maxWidth: '420px', padding: '28px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '20px' }}>
            <h1 style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: 650 }}>Infinity couldn't load</h1>
            <p style={{ margin: '0 0 20px', color: '#4b5563', lineHeight: 1.6 }}>
              The app encountered a startup error. Your saved account and transaction data have not been erased.
              Refresh the app to reload its cached files.
            </p>
            <button
              type="button"
              onClick={this.recover}
              style={{ padding: '11px 16px', borderRadius: '10px', border: 0, background: '#111827', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
            >
              Refresh app
            </button>
          </section>
        </main>
      )
    }
    return this.props.children
  }
}

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </StrictMode>,
  )
}

// Register the PWA service worker in production. Failure to register must not block the app.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('Infinity service worker registration failed:', err)
    })
  })
}
