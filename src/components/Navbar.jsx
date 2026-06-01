import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../utils/constants'
import UserProfile from './UserProfile'

const Navbar = () => {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'About', path: ROUTES.ABOUT },
    { name: 'Donation', path: ROUTES.DONATION },
    { name: 'Pooja', path: ROUTES.POOJA_DETAILS },
    { name: 'Gallery', path: ROUTES.GALLERY },
    { name: 'Contact', path: ROUTES.CONTACT }
  ]

  const isActive = (path) => {
    if (path === ROUTES.HOME) {
      return location.pathname === '/' || location.pathname === '/home'
    }
    return location.pathname === path
  }

  return (
    <header className="w-full top-0 sticky z-50 bg-background/95 backdrop-blur-md shadow-sm shadow-primary/5 transition-all duration-300">
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 w-full relative">
        {/* Brand Logo & Name */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-200 border border-primary/20 flex-shrink-0">
            <img src="/images/temple9.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-headline-md text-base md:text-lg font-bold text-primary whitespace-nowrap">
            Sri Kainari Ayyappan Kavu
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-label-md text-sm transition-colors duration-200 pb-1 ${
                isActive(link.path)
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant font-medium hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Admin Section (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && isAdmin && (
            <UserProfile />
          )}
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-full transition-colors focus:outline-none flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-b border-outline-variant/30 shadow-lg md:hidden animate-fade-in z-50 py-4 px-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-label-md text-sm py-2.5 transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary font-bold border-l-4 border-primary pl-3'
                    : 'text-on-surface-variant font-medium hover:text-primary pl-3'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated && isAdmin && (
              <div className="border-t border-outline-variant/20 pt-4 mt-2">
                <div className="flex justify-start">
                  <UserProfile onAction={() => setIsMobileMenuOpen(false)} />
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar