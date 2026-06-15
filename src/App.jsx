import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './routes'

// Loading component
const LoadingFallback = () => {
  console.log('LoadingFallback rendered')
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  )
}

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Disable browser default scroll restoration behavior
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const performScroll = () => {
      // Scroll window
      window.scrollTo(0, 0)
      
      // Scroll documentElement and body
      if (document.documentElement) document.documentElement.scrollTo(0, 0)
      if (document.body) document.body.scrollTo(0, 0)
      
      // Scroll common layout wrapper elements in single page applications
      const root = document.getElementById('root')
      if (root) root.scrollTo(0, 0)
      
      const appContainer = document.querySelector('.app')
      if (appContainer) appContainer.scrollTo(0, 0)

      const mainContent = document.querySelector('.main-content')
      if (mainContent) mainContent.scrollTo(0, 0)
    }

    // Scroll immediately
    performScroll()

    // Scroll again on sequential timeouts to guarantee reset after layout paints, shifts and hydration
    const t0 = setTimeout(performScroll, 0)
    const t1 = setTimeout(performScroll, 50)
    const t2 = setTimeout(performScroll, 150)
    const t3 = setTimeout(performScroll, 300)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [pathname])

  return null
}

function App() {
  console.log('App component rendering')
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Suspense fallback={<LoadingFallback />}>
                <AppRoutes />
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App