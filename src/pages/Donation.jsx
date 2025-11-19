import { useState } from 'react'
import DonationForm from '../components/DonationForm'
import '../styles/Donation.css'
import '../styles/PageAnimations.css'

const Donation = () => {
  const [showForm, setShowForm] = useState(false)

  const handleDonateClick = () => {
    setShowForm(true)
    // Scroll to top when form is shown
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (showForm) {
    return (
      <div className="donation-container">
        <div className="donation-content">
          <button className="back-button" onClick={() => setShowForm(false)}>
            ← Back
          </button>
          <DonationForm />
        </div>
      </div>
    )
  }

  return (
    <div className="donation-container">
      <div className="donation-landing">
        <div className="donation-hero">
          <h1 className="page-heading-animated">Support Our Temple</h1>
          <p className="hero-subtitle page-subtitle-animated">
            Your generous contributions help preserve our sacred traditions and serve the community
          </p>
        </div>

        <div className="donation-message-section">
          <div className="message-card">
            <div className="message-icon">🙏</div>
            <h2>The Power of Giving</h2>
            <p>
              In the spirit of seva (selfless service), your donations help maintain our temple, 
              support daily rituals, organize festivals, and provide spiritual guidance to devotees. 
              Every contribution, no matter the size, makes a meaningful difference in keeping our 
              traditions alive for future generations.
            </p>
          </div>

          <div className="impact-section">
            <h3>Your Donation Helps:</h3>
            <div className="impact-grid">
              <div className="impact-item">
                <span className="impact-icon">🕉️</span>
                <p>Daily Pooja & Rituals</p>
              </div>
              <div className="impact-item">
                <span className="impact-icon">🏛️</span>
                <p>Temple Maintenance</p>
              </div>
              <div className="impact-item">
                <span className="impact-icon">🎉</span>
                <p>Festival Celebrations</p>
              </div>
              <div className="impact-item">
                <span className="impact-icon">📚</span>
                <p>Spiritual Education</p>
              </div>
              <div className="impact-item">
                <span className="impact-icon">🍲</span>
                <p>Prasadam Distribution</p>
              </div>
              <div className="impact-item">
                <span className="impact-icon">💡</span>
                <p>Community Services</p>
              </div>
            </div>
          </div>

          <div className="donate-action">
            <button className="donate-now-button" onClick={handleDonateClick}>
              Donate Now
            </button>
            <p className="donate-note">Secure online payment • Tax benefits available</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donation
