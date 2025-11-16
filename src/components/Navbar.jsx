import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../utils/constants'
import UserProfile from './UserProfile'
import '../styles/Navbar.css'

const Navbar = () => {
  const { isAuthenticated, isAdmin } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      {/* Top Row - Temple Brand and Admin */}
      <div className="navbar-header">
        <div className="navbar-brand">
          <img src="/images/temple9.jpg" alt="Temple Logo" className="temple-logo" />
          <Link to={ROUTES.HOME} className="temple-name">
            <span className="temple-text">Sri Kainari Ayyappan Kavu</span>
          </Link>
        </div>
        
        <div className="navbar-right">
          <div className="navbar-auth">
            {isAuthenticated && isAdmin && (
              <UserProfile />
            )}
          </div>
          
          {/* Hamburger Menu Button - Mobile Only */}
          <button 
            className="hamburger-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
      
      {/* Bottom Row - Navigation Links */}
      <div className={`navbar-navigation ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="navbar-links">
          <Link to={ROUTES.HOME} className="nav-link" onClick={closeMobileMenu}>Home</Link>
          <Link to={ROUTES.ABOUT} className="nav-link" onClick={closeMobileMenu}>About</Link>
          <Link to={ROUTES.DONATION} className="nav-link" onClick={closeMobileMenu}>Donation</Link>
          <Link to={ROUTES.POOJA_DETAILS} className="nav-link" onClick={closeMobileMenu}>Pooja</Link>
          <Link to={ROUTES.GALLERY} className="nav-link" onClick={closeMobileMenu}>Gallery</Link>
          <Link to={ROUTES.CONTACT} className="nav-link" onClick={closeMobileMenu}>Contact</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar