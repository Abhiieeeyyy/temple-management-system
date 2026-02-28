import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../utils/axiosConfig'
import { API_URL } from '../config'
import '../styles/AdminPanel.css'

const AdminPanel = () => {
  const { user } = useAuth()
  const [donations, setDonations] = useState([])
  const [bookings, setBookings] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState('donations')

  // Birth star mapping
  const birthStars = {
    'ashwini': 'അശ്വതി',
    'bharani': 'ഭരണി',
    'karthika': 'കാർത്തിക',
    'rohini': 'രോഹിണി',
    'mrigashira': 'മകയിരം',
    'ardra': 'തിരുവാതിര',
    'punarvasu': 'പുണർതം',
    'pushya': 'പൂയം',
    'ashlesha': 'ആയില്യം',
    'magha': 'മകം',
    'purva_phalguni': 'പൂരം',
    'uttara_phalguni': 'ഉത്രം',
    'hasta': 'അത്തം',
    'chitra': 'ചിത്തിര',
    'swati': 'ചോതി',
    'vishakha': 'വിശാഖം',
    'anooradha': 'അനിഴം',
    'jyeshtha': 'തൃക്കേട്ട',
    'moola': 'മൂലം',
    'purva_ashadha': 'പൂരാടം',
    'uttara_ashadha': 'ഉത്രാടം',
    'shravana': 'തിരുവോണം',
    'dhanishta': 'അവിട്ടം',
    'shatabhisha': 'ചതയം',
    'purva_bhadrapada': 'പൂരുരുട്ടാതി',
    'uttara_bhadrapada': 'ഉത്രട്ടാതി',
    'revati': 'രേവതി'
  }

  // Helper function to get birth star name
  const getBirthStarName = (birthStarId) => {
    return birthStars[birthStarId] || birthStarId || 'N/A'
  }

  // Pooja admin removed to be strictly developer configured via src/data/poojas.js

  // Gallery state
  const [galleryItems, setGalleryItems] = useState([])
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Events',
    size: 'normal',
    image: null
  })



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        // Fetch donations from secure admin endpoint
        const donationsResponse = await api.get('/api/admin/donations')
        setDonations(donationsResponse.data.donations || [])

        // Fetch bookings from secure admin endpoint
        const bookingsResponse = await api.get('/api/admin/bookings')
        setBookings(bookingsResponse.data.bookings || [])

        // Fetch messages from secure admin endpoint
        const messagesResponse = await api.get('/api/admin/messages')
        setMessages(messagesResponse.data.messages || [])

        // Fetch gallery items
        const galleryResponse = await api.get('/api/gallery')
        setGalleryItems(galleryResponse.data.photos || [])


      } catch (err) {
        console.error('Error fetching data:', err)
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('Authentication required. Please log in again.')
          // Redirect to admin login
          setTimeout(() => {
            window.location.href = '/admin'
          }, 2000)
        } else {
          setError('Failed to load data. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])



  const handleUpdateMessageStatus = async (messageId, newStatus) => {
    try {
      await api.put(`/api/admin/messages/${messageId}`, { status: newStatus })
      setSuccess('Message status updated successfully!')
      // Refresh messages from secure admin endpoint
      const messagesResponse = await api.get('/api/admin/messages')
      setMessages(messagesResponse.data.messages || [])
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Authentication required. Please log in again.')
        setTimeout(() => {
          window.location.href = '/admin'
        }, 2000)
      } else {
        setError('Failed to update message status')
      }
    }
  }

  const handleGalleryFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setGalleryForm({ ...galleryForm, image: e.target.files[0] })
    }
  }

  const handleGallerySubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!galleryForm.image) {
      setError('Please select an image to upload')
      return
    }

    const formData = new FormData()
    formData.append('title', galleryForm.title)
    formData.append('category', galleryForm.category)
    formData.append('size', galleryForm.size)
    formData.append('image', galleryForm.image)

    try {
      await api.post('/api/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setSuccess('Image uploaded successfully!')

      setGalleryForm({
        title: '',
        category: 'Events',
        size: 'normal',
        image: null
      })
      document.getElementById('galleryImage').value = ''

      const galleryResponse = await api.get('/api/gallery')
      setGalleryItems(galleryResponse.data.photos || [])
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Authentication required. Please log in again.')
        setTimeout(() => {
          window.location.href = '/admin'
        }, 2000)
      } else {
        setError(err.response?.data?.message || 'Failed to upload image')
      }
    }
  }

  const handleDeleteGalleryItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return
    }

    try {
      await api.delete(`/api/gallery/${itemId}`)
      setSuccess('Image deleted successfully!')

      const galleryResponse = await api.get('/api/gallery')
      setGalleryItems(galleryResponse.data.photos || [])
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Authentication required. Please log in again.')
        setTimeout(() => {
          window.location.href = '/admin'
        }, 2000)
      } else {
        setError(err.response?.data?.message || 'Failed to delete image')
      }
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <p className="welcome-message">Welcome, {user?.firstName}!</p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'donations' ? 'active' : ''}`}
          onClick={() => setActiveTab('donations')}
        >
          Donations
        </button>
        <button
          className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Pooja Bookings
        </button>

        <button
          className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          User Messages
        </button>
        <button
          className={`tab-button ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          Manage Gallery
        </button>
      </div>

      <div className="content-section">
        {activeTab === 'donations' && (
          <div className="donations-section">
            <h2>Donation Details</h2>
            {donations.length === 0 ? (
              <p className="no-data">No donations found.</p>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Donor Name</th>
                      <th>Phone Number</th>
                      <th>Amount</th>
                      <th>Purpose</th>
                      <th>Payment ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation._id}>
                        <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                        <td>{donation.name}</td>
                        <td>{donation.phoneNumber}</td>
                        <td>₹{donation.amount}</td>
                        <td>{donation.purpose}</td>
                        <td>{donation.paymentId}</td>
                        <td>
                          <span className={`status ${donation.status}`}>
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h2>Pooja Booking Details</h2>
            {bookings.length === 0 ? (
              <p className="no-data">No bookings found.</p>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Birth Star</th>
                      <th>Phone</th>
                      <th>Pooja</th>
                      <th>Booking Date</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                        <td>{booking.name || 'Guest'}</td>
                        <td>{getBirthStarName(booking.birthStar)}</td>
                        <td>{booking.mobileNumber || 'N/A'}</td>
                        <td>{booking.poojaName}</td>
                        <td>{new Date(booking.date).toLocaleDateString()}</td>
                        <td>₹{booking.price}</td>
                        <td>
                          <span className={`status ${booking.paymentStatus || 'pending'}`}>
                            {booking.paymentStatus || 'pending'}
                          </span>
                        </td>
                        <td>
                          <span className={`status ${booking.status || 'completed'}`}>
                            {booking.status || 'completed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}




        {activeTab === 'messages' && (
          <div className="messages-section">
            <h2>User Messages</h2>
            {messages.length === 0 ? (
              <p className="no-data">No messages found.</p>
            ) : (
              <div className="messages-container">
                {messages.map((message) => (
                  <div key={message._id} className={`message-card ${message.status}`}>
                    <div className="message-header">
                      <div className="message-sender">
                        <h4>{message.name}</h4>
                        <p className="message-email">{message.email}</p>
                        {message.phone && <p className="message-phone">{message.phone}</p>}
                      </div>
                      <div className="message-meta">
                        <span className="message-date">
                          {new Date(message.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span className={`message-status ${message.status}`}>
                          {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="message-content">
                      <h5 className="message-subject">{message.subject}</h5>
                      <p className="message-text">{message.message}</p>
                    </div>

                    <div className="message-actions">
                      {message.status === 'new' && (
                        <button
                          onClick={() => handleUpdateMessageStatus(message._id, 'read')}
                          className="status-btn read-btn"
                        >
                          Mark as Read
                        </button>
                      )}
                      {message.status === 'read' && (
                        <button
                          onClick={() => handleUpdateMessageStatus(message._id, 'replied')}
                          className="status-btn replied-btn"
                        >
                          Mark as Replied
                        </button>
                      )}
                      {message.status === 'replied' && (
                        <button
                          onClick={() => handleUpdateMessageStatus(message._id, 'read')}
                          className="status-btn read-btn"
                        >
                          Mark as Read
                        </button>
                      )}
                      <a
                        href={`mailto:${message.email}?subject=Re: ${message.subject}&body=Dear ${message.name},%0D%0A%0D%0AThank you for contacting Sri Kainari Ayyappa Temple.%0D%0A%0D%0A`}
                        className="reply-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Reply via Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="gallery-section">
            <h2>Manage Gallery</h2>

            <div className="pooja-form-section">
              <h3>Upload New Image</h3>
              <form onSubmit={handleGallerySubmit} className="pooja-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="galleryTitle">Title *</label>
                    <input
                      type="text"
                      id="galleryTitle"
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                      required
                      placeholder="Image title"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="galleryCategory">Category *</label>
                    <select
                      id="galleryCategory"
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className="category-select"
                    >
                      <option value="Events">Events</option>
                      <option value="Rituals">Rituals</option>
                      <option value="Deities">Deities</option>
                      <option value="Surroundings">Surroundings</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gallerySize">Size (Bento Grid) *</label>
                    <select
                      id="gallerySize"
                      value={galleryForm.size}
                      onChange={(e) => setGalleryForm({ ...galleryForm, size: e.target.value })}
                      className="category-select"
                    >
                      <option value="normal">Normal (1x1)</option>
                      <option value="wide">Wide (2x1)</option>
                      <option value="tall">Tall (1x2)</option>
                      <option value="large">Large (2x2)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="galleryImage">Image File *</label>
                    <input
                      type="file"
                      id="galleryImage"
                      onChange={handleGalleryFileChange}
                      accept="image/*"
                      required
                      className="file-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Upload Image
                  </button>
                </div>
              </form>
            </div>

            <div className="existing-poojas-section">
              <h3>Gallery Images</h3>
              {galleryItems.length === 0 ? (
                <p className="no-data">No images uploaded yet.</p>
              ) : (
                <div className="poojas-grid">
                  {galleryItems.map((item) => (
                    <div key={item._id} className="pooja-card">
                      <div className="pooja-card-header">
                        <div className="pooja-names">
                          <h4>{item.title}</h4>
                          <p className="malayalam-text">{item.category} • {item.size}</p>
                        </div>
                      </div>
                      <div className="pooja-card-content">
                        {item.mediaType === 'image' && (
                          <div className="preview-image" style={{ height: '150px', overflow: 'hidden', marginBottom: '10px', borderRadius: '4px' }}>
                            <img
                              src={item.mediaUrl && item.mediaUrl.startsWith('http') ? item.mediaUrl : `${API_URL}${item.mediaUrl}`}
                              alt={item.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        )}
                        <div className="pooja-card-actions">
                          <button
                            onClick={() => handleDeleteGalleryItem(item._id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel