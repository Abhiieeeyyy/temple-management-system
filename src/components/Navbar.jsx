import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../utils/constants'
import UserProfile from './UserProfile'
import '../styles/Navbar.css'

const Navbar = () => {
  const { isAuthenticated, isAdmin } = useAuth()

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
        </div>
      </div>
      
      {/* Bottom Row - Navigation Links */}
      <div className="navbar-navigation">
        <div className="navbar-links">
          <Link to={ROUTES.HOME} className="nav-link">Home</Link>
          <Link to={ROUTES.ABOUT} className="nav-link">About</Link>
          <Link to={ROUTES.DONATION} className="nav-link">Donation</Link>
          <Link to={ROUTES.POOJA_DETAILS} className="nav-link">Pooja</Link>
          <Link to={ROUTES.GALLERY} className="nav-link">Gallery</Link>
          <Link to={ROUTES.CONTACT} className="nav-link">Contact</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar