import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'
import '../styles/ProtectedRoute.css'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-required-container">
        <div className="auth-required-content">
          <div className="auth-required-icon">🔒</div>
          <h2>Authentication Required</h2>
          <p>You need to be logged in to access this page.</p>
          <div className="auth-required-actions">
            <button 
              className="auth-required-btn login-btn"
              onClick={() => setShowAuthModal(true)}
            >
              Login
            </button>
            {!adminOnly && (
              <button 
                className="auth-required-btn signup-btn"
                onClick={() => setShowAuthModal(true)}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialTab="login"
          hideSignup={adminOnly}
        />
      </div>
    )
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute