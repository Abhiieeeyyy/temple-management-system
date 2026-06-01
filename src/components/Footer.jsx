import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/constants'

const Footer = () => {
  const [showSocial, setShowSocial] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSocial(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/abhinav._p__/',
      image: '/images/ig.jpg',
      color: '#E4405F'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/9037459793',
      image: '/images/w.jpg',
      color: '#25D366'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/abhinav.p.108963/',
      image: '/images/fb.jpg',
      color: '#1877F2'
    },
  ]

  return (
    <footer className="w-full pt-4 sm:pt-8 pb-4 bg-surface-container border-t border-outline-variant/30 text-on-surface">
      {/* Top Footer Info (Brand Info & Visit Us) - Hidden on Mobile */}
      <div className="hidden sm:block max-w-[1200px] mx-auto px-6 space-y-4">
        {/* Brand Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border border-primary/20 shadow-sm flex-shrink-0">
              <img src="/images/temple9.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-headline-md text-base md:text-lg text-primary font-bold">
              Sri Kainari Ayyappan Kavu
            </h3>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            A spiritual center dedicated to the service of Lord Ayyappa and the community.
          </p>
        </div>

        {/* Visit Us (Placed in between - compact inline) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-2 text-xs text-on-surface-variant pt-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">location_on</span>
            <p className="font-body-md text-xs">Sri Kainari Ayyappan Kavu Temple, Valaamkulam PO, Kerala, India</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">schedule</span>
            <p className="font-body-md text-xs">Daily: 5:00 AM - 8:30 PM</p>
          </div>
        </div>
      </div>

      {/* Copyright & Interactive Developer Signature */}
      <div className="max-w-[1200px] mx-auto px-6 mt-0 sm:mt-6 pt-0 sm:pt-4 border-t-0 sm:border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-on-surface-variant/80">
        <p>© 2024 Sri Kainari Ayyappan Kavu. All Rights Reserved.</p>
        <div className="relative" ref={dropdownRef}>
          <span>Developed by </span>
          <span
            className="font-semibold text-primary hover:text-tertiary cursor-pointer underline transition-colors"
            onClick={() => setShowSocial(!showSocial)}
          >
            Abhinav Parayanchola
          </span>
          {showSocial && (
            <div className="absolute right-0 bottom-full mb-2 bg-white border border-outline-variant/20 rounded-lg shadow-xl p-2 min-w-[150px] z-50 flex flex-col gap-1.5 animate-fade-in text-left">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-surface-container transition-colors duration-150 text-xs text-on-surface font-medium"
                >
                  <img
                    src={link.image}
                    alt={link.name}
                    className="w-4 h-4 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
