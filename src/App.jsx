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
    window.scrollTo(0, 0)
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