import { useState, useRef, useEffect } from 'react'
import '../styles/Footer.css'

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
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copyright">
          © 2024 Sri Kainari Ayyappan Kavu Temple Management System
        </p>
        <p className="footer-text">
          Developed by{' '}
          <span 
            className="designer-name"
            onClick={() => setShowSocial(!showSocial)}
            ref={dropdownRef}
          >
            Abhinav Parayanchola
            {showSocial && (
              <div className="social-dropdown">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--hover-color': link.color }}
                  >
                    <img src={link.image} alt={link.name} className="social-icon-img" />
                    <span className="social-name">{link.name}</span>
                  </a>
                ))}
              </div>
            )}
          </span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
