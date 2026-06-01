import React, { useState } from 'react'
import { API_URL } from '../config'

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
      const response = await fetch(`${API_URL}/api/messages`, {
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
    <div className="bg-background text-on-background font-body-md min-h-screen pb-20">
      {/* Page Header */}
      <div className="text-center pt-16 pb-12 max-w-[1200px] mx-auto px-6">
        <h1 className="font-display-lg text-4xl md:text-5xl text-primary font-bold mb-4">Contact Us</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          We'd love to hear from you. Please fill out the form below to get in touch with us.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Contact Details Card */}
        <div className="lg:col-span-5 bg-white p-8 rounded-xl shadow-xl border border-outline-variant/20 space-y-8 parchment-glow">
          <div className="space-y-4">
            <h2 className="font-display-lg text-2xl font-bold text-primary">Get in Touch</h2>
            <div className="w-12 h-0.5 bg-primary"></div>
          </div>

          <div className="text-sm text-on-surface-variant space-y-2 leading-relaxed">
            <p className="font-semibold text-on-surface">Sri Kainari Ayyappan Kavu,</p>
            <p>Valamkulam PO, Anamangad</p>
            <p>Malappuram, Kerala</p>
            <p>Pin: 679357</p>
          </div>

          {/* Social and Action Icons */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-on-surface uppercase tracking-wider">Connect Channels</p>
            <div className="flex flex-row items-center gap-3 flex-nowrap">
              <a
                href="https://maps.app.goo.gl/BYtDTDDLNSoANf4b7"
                target="_blank"
                rel="noopener noreferrer"
                title="Location Map"
                className="w-10 h-10 rounded-full overflow-hidden hover:scale-110 transition-transform duration-200 shadow-sm border border-outline-variant/30"
              >
                <img src="/images/map.jpg" alt="Map" className="w-full h-full object-cover" />
              </a>
              <a
                href="tel:+919895922357"
                target="_blank"
                rel="noopener noreferrer"
                title="Phone call"
                className="w-10 h-10 rounded-full overflow-hidden hover:scale-110 transition-transform duration-200 shadow-sm border border-outline-variant/30"
              >
                <img src="/images/ph.jpg" alt="Phone" className="w-full h-full object-cover" />
              </a>
              <a
                href="mailto:srikainariayyappatemple@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Send Email"
                className="w-10 h-10 rounded-full overflow-hidden hover:scale-110 transition-transform duration-200 shadow-sm border border-outline-variant/30"
              >
                <img src="/images/gm.jpg" alt="Email" className="w-full h-full object-cover" />
              </a>
              <a
                href="https://www.instagram.com/srikainariayyappankavu?utm_source=ig_web_button_share_sheet&igsh=YzcydXhidjk3eWdl"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-full overflow-hidden hover:scale-110 transition-transform duration-200 shadow-sm border border-outline-variant/30"
              >
                <img src="/images/ig.jpg" alt="Instagram" className="w-full h-full object-cover" />
              </a>
              <a
                href="https://www.facebook.com/abhinav.p.108963/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-10 h-10 rounded-full overflow-hidden hover:scale-110 transition-transform duration-200 shadow-sm border border-outline-variant/30"
              >
                <img src="/images/fb.jpg" alt="Facebook" className="w-full h-full object-cover" />
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-outline-variant/10 space-y-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-base">call</span>
              <p className="text-sm font-semibold text-on-surface">+91 9895922357</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-base">mail</span>
              <p className="text-sm font-semibold text-on-surface text-xs md:text-sm break-all">srikainariayyappatemple@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-base">schedule</span>
              <p className="text-sm font-semibold text-on-surface">Daily: 5:00 AM - 9:00 AM</p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form Container */}
        <div className="lg:col-span-7 bg-white p-8 rounded-xl shadow-xl border border-outline-variant/20 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="p-4 bg-error-container text-on-error-container rounded-lg text-sm border border-error/20">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 bg-surface-container text-primary font-medium rounded-lg text-sm border border-primary/20">
                Message sent successfully!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-on-surface">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs bg-white"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-on-surface">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-semibold text-on-surface">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2.5 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs bg-white"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-semibold text-on-surface">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Enter subject"
                  className="w-full px-4 py-2.5 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs bg-white"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-on-surface">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Enter your message details"
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-all duration-200 shadow-md text-xs uppercase tracking-wider"
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