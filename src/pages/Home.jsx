import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import '../styles/Home.css'
import '../styles/PageAnimations.css'

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-layout">
        {/* Left Content Section */}
        <div className="hero-left">
          <div className="hero-text">
            <p className="hero-subtitle page-heading-animated">Ancient Tradition</p>
            <h1 className="hero-title page-heading-animated">
              Heavenly<br />
              Abode of<br />
              Ayyappa
            </h1>
            <p className="hero-description page-subtitle-animated">
              A way to the divine, set your<br />
              soul's facets answering.
            </p>
            <Link to={ROUTES.ABOUT} className="explore-btn content-fade-in">
              Explore Temple
            </Link>
          </div>
        </div>

        {/* Center Temple Image - Clickable to Gallery */}
        <div className="hero-center">
          <Link to={ROUTES.GALLERY} className="temple-card">
            <img
              src="/images/temple-bg.jpg"
              alt="Sri Kainari Ayyappan Kavu"
              className="temple-image"
            />
            <div className="image-overlay">
              <span className="overlay-text">View Gallery</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Info Cards Section - Below Temple Image */}
      <div className="info-cards-section">
        <div className="info-card">
          <div className="info-icon">ॐ</div>
          <p className="info-text">
            Walk within the out to the<br />
            fragrant bliss you'd buy<br />
            yourself
          </p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">🕉️</div>
          <p className="info-text">
            Embrace the divine energy<br />
            that flows through sacred<br />
            traditions
          </p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">🙏</div>
          <p className="info-text">
            Find peace in devotion<br />
            and strength in faith's<br />
            eternal light
          </p>
        </div>
      </div>
      {/* Quick Access Section */}
      <div className="quick-access">
        <h2 className="quick-access-title">Quick Links</h2>
        <div className="access-grid">
          <Link to={ROUTES.ABOUT} className="access-card">
            <div className="access-icon">🕉️</div>
            <h3>About</h3>
            <p>Learn our temple history</p>
          </Link>

           <Link to={ROUTES.DONATION} className="access-card">
            <div className="access-icon">🏦</div>
            <h3>Donations</h3>
            <p>Support temple activities</p>
          </Link>

          <Link to={ROUTES.POOJA_DETAILS} className="access-card">
            <div className="access-icon">📆</div>
            <h3>Pooja Services</h3>
            <p>Book your spiritual ceremonies</p>
          </Link>

          <Link to={ROUTES.GALLERY} className="access-card">
            <div className="access-icon">🖼️</div>
            <h3>Gallery</h3>
            <p>View temple moments</p>
          </Link>

          <Link to={ROUTES.CONTACT} className="access-card">
            <div className="access-icon">📞</div>
            <h3>Contact</h3>
            <p>Get in touch with us</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 


