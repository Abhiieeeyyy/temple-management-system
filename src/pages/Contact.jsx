import React, { useState } from 'react'
import '../styles/Contact.css'
import '../styles/PageAnimations.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('Message response:', data)

      if (response.ok && data.success) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setTimeout(() => setSuccess(false), 5000)
      } else {
        setError(data.message || 'Failed to send message. Please try again.')
      }
    } catch (err) {
      console.error('Message submission error:', err)
      setError('Failed to send message. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      <h1 className="page-heading-animated">Contact Us</h1>
      <div className="contact-intro page-subtitle-animated">
        <p>We'd love to hear from you. Please fill out the form below to get in touch with us.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="address-block">
            <p>Sri Kainari Ayyappan Kavu,</p>
            <p>Valamkulam PO, Anamangad</p>
            <p>Malappuram, Kerala</p>
            <p>Pin: 679357</p>
          </div>
          
          <div className="social-media-links">
            <a href="https://maps.app.goo.gl/BYtDTDDLNSoANf4b7" target="_blank" rel="noopener noreferrer" title="Location">
              <img src="/images/map.jpg" alt="Location Map" />
            </a>
            <a href="tel:+919895922357" target="_blank" rel="noopener noreferrer" title="Phone">
              <img src="/images/ph.jpg" alt="Phone" />
            </a>
            <a href="mailto:srikainariayyappatemple@gmail.com" target="_blank" rel="noopener noreferrer" title="Email">
              <img src="/images/gm.jpg" alt="Gmail" />
            </a>
            <a href="https://www.instagram.com/srikainariayyappankavu?utm_source=ig_web_button_share_sheet&igsh=YzcydXhidjk3eWdl" target="_blank" rel="noopener noreferrer" title="Instagram">
              <img src="/images/ig.jpg" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61558487145842&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" title="Facebook">
              <img src="/images/fb.jpg" alt="Facebook" />
            </a>
          </div>
          
          <div className="contact-details">
            <p className="phone-number">+91 9895922357</p>
            <p className="email-address">srikainariayyappatemple@gmail.com</p>
            <p className="timing">Open Daily: 5:00 AM - 9:00 AM</p>
          </div>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              ></textarea>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Message sent successfully!</div>}

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact 