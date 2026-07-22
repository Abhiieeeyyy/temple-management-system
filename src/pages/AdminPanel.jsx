import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../utils/axiosConfig'
import { API_URL } from '../config'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const AdminPanel = () => {
  const { user } = useAuth()
  const [donations, setDonations] = useState([])
  const [bookings, setBookings] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'donations')
  const [expandedMessageId, setExpandedMessageId] = useState(null)

  const toggleMessage = (id) => {
    setExpandedMessageId(expandedMessageId === id ? null : id)
  }

  const downloadDonationsPDF = () => {
    const doc = new jsPDF()
    doc.text("Donation List", 14, 15)
    const tableColumn = ["Date", "Donor Name", "Phone", "Address", "Amount", "Purpose", "Payment ID", "Status"]
    const tableRows = []

    donations.forEach(donation => {
      const donationData = [
        new Date(donation.createdAt).toLocaleDateString(),
        donation.name,
        donation.phoneNumber,
        donation.address || 'N/A',
        `Rs ${donation.amount}`,
        donation.purpose,
        donation.paymentId,
        donation.status
      ]
      tableRows.push(donationData)
    })

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    })
    doc.save("donations_list.pdf")
  }

  const downloadBookingsPDF = () => {
    const doc = new jsPDF()
    doc.text("Pooja Booking List", 14, 15)
    const tableColumn = ["Date", "Name", "Birth Star", "Phone", "Address", "Pooja", "Booking Date", "Amount", "Status"]
    const tableRows = []

    bookings.forEach(booking => {
      const bookingData = [
        new Date(booking.createdAt).toLocaleDateString(),
        booking.name || 'Guest',
        getBirthStarEnglish(booking.birthStar),
        booking.mobileNumber || 'N/A',
        booking.address || 'N/A',
        booking.poojaName,
        new Date(booking.date).toLocaleDateString(),
        `Rs ${booking.price}`,
        booking.status || 'completed'
      ]
      tableRows.push(bookingData)
    })

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    })
    doc.save("pooja_bookings_list.pdf")
  }

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

  // Birth star transliterated English mapping for PDF downloads (avoiding Sanskrit & Unicode issues)
  const birthStarsEnglish = {
    'ashwini': 'Aswathy',
    'bharani': 'Bharani',
    'karthika': 'Karthika',
    'rohini': 'Rohini',
    'mrigashira': 'Makayiram',
    'ardra': 'Thiruvathira',
    'punarvasu': 'Punartham',
    'pushya': 'Pooyam',
    'ashlesha': 'Ayilyam',
    'magha': 'Makam',
    'purva_phalguni': 'Pooram',
    'uttara_phalguni': 'Uthram',
    'hasta': 'Atham',
    'chitra': 'Chithira',
    'swati': 'Chothi',
    'vishakha': 'Vishakham',
    'anooradha': 'Anizham',
    'jyeshtha': 'Thrikketta',
    'moola': 'Moolam',
    'purva_ashadha': 'Pooradam',
    'uttara_ashadha': 'Uthradam',
    'shravana': 'Thiruvonam',
    'dhanishta': 'Avittam',
    'shatabhisha': 'Chathayam',
    'purva_bhadrapada': 'Pooruruttathi',
    'uttara_bhadrapada': 'Uthruttathi',
    'revati': 'Revathi'
  }

  const getBirthStarName = (birthStarId) => {
    return birthStars[birthStarId] || birthStarId || 'N/A'
  }

  const getBirthStarEnglish = (birthStarId) => {
    if (!birthStarId) return 'N/A'
    return birthStarsEnglish[birthStarId.toLowerCase()] || birthStarId
  }

  // Gallery state
  const [galleryItems, setGalleryItems] = useState([])
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Events',
    size: 'normal',
    image: null
  })


  // Poojas State
  const [poojas, setPoojas] = useState([])
  const [poojaForm, setPoojaForm] = useState({
    name: '',
    malayalamName: '',
    price: ''
  })
  const [poojaLoading, setPoojaLoading] = useState(false)

  // Sync activeTab with routing state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab)
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true)
        setError('')

        // Fetch secure info
        const donationsResponse = await api.get('/api/admin/donations')
        setDonations(donationsResponse.data.donations || [])

        const bookingsResponse = await api.get('/api/admin/bookings')
        setBookings(bookingsResponse.data.bookings || [])

        const messagesResponse = await api.get('/api/admin/messages')
        setMessages(messagesResponse.data.messages || [])

        const galleryResponse = await api.get('/api/gallery')
        setGalleryItems(galleryResponse.data.photos || [])

        const poojasResponse = await api.get('/api/poojas')
        setPoojas(poojasResponse.data || [])

      } catch (err) {
        console.error('Error fetching data:', err)
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('Authentication required. Please log in again.')
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
    fetchAdminData()
  }, [])

  const handleUpdateMessageStatus = async (messageId, newStatus) => {
    try {
      await api.put(`/api/admin/messages/${messageId}`, { status: newStatus })
      setSuccess('Message status updated successfully!')
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
          'Content-Type': undefined
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


  const handlePoojaSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!poojaForm.name.trim() || !poojaForm.price) {
      setError('Please fill in the English name and price')
      return
    }

    try {
      setPoojaLoading(true)
      const response = await api.post('/api/poojas', {
        name: poojaForm.name,
        malayalamName: poojaForm.malayalamName,
        price: Number(poojaForm.price),
        category: 'Custom'
      })

      if (response.data?.success) {
        setSuccess('Additional Pooja added successfully!')
        setPoojaForm({
          name: '',
          malayalamName: '',
          price: ''
        })
        // Refresh list
        const poojasResponse = await api.get('/api/poojas')
        setPoojas(poojasResponse.data || [])
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Authentication required. Please log in again.')
        setTimeout(() => {
          window.location.href = '/admin'
        }, 2000)
      } else {
        setError(err.response?.data?.message || 'Failed to add pooja')
      }
    } finally {
      setPoojaLoading(false)
    }
  }

  const handleDeletePooja = async (poojaId) => {
    if (!window.confirm('Are you sure you want to delete this additional pooja?')) {
      return
    }

    try {
      await api.delete(`/api/poojas/${poojaId}`)
      setSuccess('Pooja deleted successfully!')
      // Refresh list
      const poojasResponse = await api.get('/api/poojas')
      setPoojas(poojasResponse.data || [])
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Authentication required. Please log in again.')
        setTimeout(() => {
          window.location.href = '/admin'
        }, 2000)
      } else {
        setError(err.response?.data?.message || 'Failed to delete pooja')
      }
    }
  }

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-surface-container border-t-primary rounded-full animate-spin"></div>
        <p className="text-sm text-on-surface-variant font-medium">Loading admin panel...</p>
      </div>
    )
  }

  const tabList = [
    { id: 'donations', label: 'Donations', icon: 'volunteer_activism' },
    { id: 'bookings', label: 'Pooja Bookings', icon: 'spa' },
    { id: 'messages', label: 'User Messages', icon: 'mail' },
    { id: 'poojas', label: 'Manage Poojas', icon: 'auto_awesome' }
  ]

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24">
      {/* Title Header */}
      <div className="pt-12 pb-8 max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-3xl md:text-4xl text-primary font-bold">Admin Panel</h1>
          <p className="text-sm text-on-surface-variant mt-1">Welcome back, {user?.firstName || 'Admin'}!</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 space-y-6">
        {/* Messages Alert */}
        {error && (
          <div className="p-4 bg-error-container text-on-error-container rounded-lg text-sm border border-error/20">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-surface-container text-primary font-medium rounded-lg text-sm border border-primary/20">
            {success}
          </div>
        )}

        {/* Tab Buttons Navigation - 2 columns on mobile, flex on desktop */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 pb-2 border-b border-outline-variant/20">
          {tabList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full md:w-auto px-3 sm:px-5 py-3 rounded-full font-label-md text-xs sm:text-sm font-semibold flex items-center justify-center sm:justify-start gap-2 transition-all duration-150 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="pt-4">
          
          {/* Donations Tab */}
          {activeTab === 'donations' && (
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="font-display-lg text-xl md:text-2xl text-primary font-bold">Donation Details</h2>
                {donations.length > 0 && (
                  <button
                    onClick={downloadDonationsPDF}
                    className="px-5 py-2.5 bg-primary text-white rounded-full font-bold text-xs hover:bg-tertiary transition-colors flex items-center gap-2 self-start"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    Download PDF
                  </button>
                )}
              </div>

              {donations.length === 0 ? (
                <p className="text-on-surface-variant italic text-sm py-8 text-center">No donations found.</p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-outline-variant/25">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-surface-container text-on-surface-variant uppercase tracking-wider font-semibold border-b border-outline-variant/20">
                        <th className="p-4">Date</th>
                        <th className="p-4">Donor Name</th>
                        <th className="p-4">Phone Number</th>
                        <th className="p-4">Address</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Purpose</th>
                        <th className="p-4">Payment ID</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 bg-white">
                      {donations.map((donation) => (
                        <tr key={donation._id} className="hover:bg-background/40">
                          <td className="p-4 whitespace-nowrap">{new Date(donation.createdAt).toLocaleDateString()}</td>
                          <td className="p-4 font-semibold text-on-surface">{donation.name}</td>
                          <td className="p-4 whitespace-nowrap">{donation.phoneNumber}</td>
                          <td className="p-4 max-w-[200px] truncate" title={donation.address}>{donation.address || 'N/A'}</td>
                          <td className="p-4 font-bold text-primary">₹{donation.amount}</td>
                          <td className="p-4 capitalize">{donation.purpose}</td>
                          <td className="p-4 font-mono select-all">{donation.paymentId}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              donation.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
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

          {/* Pooja Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="font-display-lg text-xl md:text-2xl text-primary font-bold">Pooja Bookings</h2>
                {bookings.length > 0 && (
                  <button
                    onClick={downloadBookingsPDF}
                    className="px-5 py-2.5 bg-primary text-white rounded-full font-bold text-xs hover:bg-tertiary transition-colors flex items-center gap-2 self-start"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    Download PDF
                  </button>
                )}
              </div>

              {bookings.length === 0 ? (
                <p className="text-on-surface-variant italic text-sm py-8 text-center">No bookings found.</p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-outline-variant/25">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-surface-container text-on-surface-variant uppercase tracking-wider font-semibold border-b border-outline-variant/20">
                        <th className="p-4">Date</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Birth Star</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Address</th>
                        <th className="p-4">Pooja</th>
                        <th className="p-4">Performance Date</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 bg-white">
                      {bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-background/40">
                          <td className="p-4 whitespace-nowrap">{new Date(booking.createdAt).toLocaleDateString()}</td>
                          <td className="p-4 font-semibold text-on-surface">{booking.name || 'Guest'}</td>
                          <td className="p-4 whitespace-nowrap">{getBirthStarName(booking.birthStar)}</td>
                          <td className="p-4">{booking.mobileNumber || 'N/A'}</td>
                          <td className="p-4 max-w-[200px] truncate" title={booking.address}>{booking.address || 'N/A'}</td>
                          <td className="p-4 font-semibold text-primary">{booking.poojaName}</td>
                          <td className="p-4 whitespace-nowrap">{new Date(booking.date).toLocaleDateString()}</td>
                          <td className="p-4 font-bold text-primary">₹{booking.price}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              booking.paymentStatus === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.paymentStatus || 'pending'}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-blue-100 text-blue-800 tracking-wider">
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

          {/* User Messages Tab */}
          {activeTab === 'messages' && (
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-md space-y-6">
              <h2 className="font-display-lg text-xl md:text-2xl text-primary font-bold">User Messages</h2>

              {messages.length === 0 ? (
                <p className="text-on-surface-variant italic text-sm py-8 text-center">No messages found.</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isNew = message.status === 'new'
                    const isRead = message.status === 'read'
                    return (
                      <div
                        key={message._id}
                        className={`rounded-lg border shadow-sm transition-all duration-200 overflow-hidden ${
                          isNew 
                            ? 'border-l-4 border-l-primary border-outline-variant/35 bg-primary-fixed/5' 
                            : 'border-l-4 border-l-secondary border-outline-variant/20 bg-white'
                        }`}
                      >
                        {/* Collapsed Header */}
                        {expandedMessageId !== message._id ? (
                          <div
                            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-background/20"
                            onClick={() => toggleMessage(message._id)}
                          >
                            <div className="flex-1 min-w-0 space-y-1">
                              <p className="font-bold text-xs md:text-sm text-on-surface truncate">{message.name} ({message.email})</p>
                              <p className="text-xs text-on-surface-variant truncate">{message.subject}</p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                isNew 
                                  ? 'bg-primary text-white' 
                                  : 'bg-surface-container text-on-surface-variant'
                              }`}>
                                {message.status}
                              </span>
                              <span className="material-symbols-outlined text-base opacity-40">expand_more</span>
                            </div>
                          </div>
                        ) : (
                          /* Expanded Details */
                          <div className="p-6 space-y-4">
                            <div
                              className="flex items-center justify-between border-b border-outline-variant/10 pb-3 cursor-pointer hover:opacity-85"
                              onClick={() => toggleMessage(message._id)}
                            >
                              <div>
                                <h4 className="font-bold text-sm md:text-base text-on-surface">{message.name}</h4>
                                <p className="text-xs text-on-surface-variant">{message.email} • {message.phone || 'No phone'}</p>
                              </div>
                              <div className="text-right text-xs text-on-surface-variant flex flex-col items-end gap-1">
                                <span>{new Date(message.createdAt).toLocaleString()}</span>
                                <span className="material-symbols-outlined text-base opacity-40">expand_less</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h5 className="font-bold text-xs md:text-sm text-primary">Subject: {message.subject}</h5>
                              <p className="text-xs md:text-sm text-on-surface-variant bg-background/50 p-4 rounded-lg leading-relaxed whitespace-pre-line border border-outline-variant/15">
                                {message.message}
                              </p>
                            </div>

                            {/* Actions bar */}
                            <div className="flex flex-wrap gap-2 pt-2 justify-end text-xs">
                              {isNew && (
                                <button
                                  onClick={() => handleUpdateMessageStatus(message._id, 'read')}
                                  className="px-4 py-2 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-colors"
                                >
                                  Mark as Read
                                </button>
                              )}
                              {isRead && (
                                <button
                                  onClick={() => handleUpdateMessageStatus(message._id, 'replied')}
                                  className="px-4 py-2 bg-secondary text-white rounded-full font-bold hover:opacity-95 transition-colors"
                                >
                                  Mark as Replied
                                </button>
                              )}
                              {message.status === 'replied' && (
                                <button
                                  onClick={() => handleUpdateMessageStatus(message._id, 'read')}
                                  className="px-4 py-2 bg-surface-container text-on-surface-variant rounded-full font-bold hover:bg-surface-container-high transition-colors"
                                >
                                  Mark as Read
                                </button>
                              )}
                              <a
                                href={`mailto:${message.email}?subject=Re: ${message.subject}&body=Dear ${message.name},%0D%0A%0D%0AThank you for contacting Sri Kainari Ayyappa Temple.%0D%0A%0D%0A`}
                                className="px-4 py-2 border border-primary text-primary rounded-full font-bold hover:bg-primary/5 transition-colors text-center"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Reply via Email
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Manage Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Upload Form */}
              <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-md space-y-6">
                <h3 className="font-display-lg text-lg text-primary font-bold">Upload New Image</h3>
                
                <form onSubmit={handleGallerySubmit} className="space-y-4">
                  
                  {/* Title */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="galleryTitle" className="text-xs font-semibold text-on-surface">Title *</label>
                    <input
                      type="text"
                      id="galleryTitle"
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                      required
                      placeholder="Image title"
                      className="w-full px-4 py-2.5 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                    />
                  </div>

                  {/* Category */}
                  {(() => {
                    const existingCategories = [...new Set(galleryItems.map(item => item.category))]
                    const defaultCategories = ['Events', 'Rituals', 'Deities', 'Surroundings']
                    const allCategories = [...new Set([...defaultCategories, ...existingCategories])]
                    return (
                      <div className="flex flex-col gap-1">
                        <label htmlFor="galleryCategory" className="text-xs font-semibold text-on-surface">Category *</label>
                        <input
                          list="galleryCategoryList"
                          id="galleryCategory"
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                          required
                          placeholder="Select or type a category..."
                          className="w-full px-4 py-2.5 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                        />
                        <datalist id="galleryCategoryList">
                          {allCategories.map((cat, idx) => (
                            <option key={idx} value={cat} />
                          ))}
                        </datalist>
                      </div>
                    )
                  })()}

                  {/* Bento Size */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="gallerySize" className="text-xs font-semibold text-on-surface">Bento Layout Size *</label>
                    <div className="relative">
                      <select
                        id="gallerySize"
                        value={galleryForm.size}
                        onChange={(e) => setGalleryForm({ ...galleryForm, size: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs bg-white appearance-none"
                      >
                        <option value="normal">Normal (1x1)</option>
                        <option value="wide">Wide (2x1)</option>
                        <option value="tall">Tall (1x2)</option>
                        <option value="large">Large (2x2)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                        <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
                      </div>
                    </div>
                  </div>

                  {/* Image File Input */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="galleryImage" className="text-xs font-semibold text-on-surface">Image File *</label>
                    <input
                      type="file"
                      id="galleryImage"
                      onChange={handleGalleryFileChange}
                      accept="image/*"
                      required
                      className="w-full px-4 py-2 text-xs border border-outline-variant/50 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/5 file:text-primary hover:file:bg-primary/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-all text-xs uppercase tracking-wider mt-2 shadow"
                  >
                    Upload Image
                  </button>

                </form>
              </div>

              {/* Right Column: Existing List */}
              <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-md space-y-6">
                <h3 className="font-display-lg text-lg text-primary font-bold">Existing Gallery Images</h3>

                {galleryItems.length === 0 ? (
                  <p className="text-on-surface-variant italic text-sm py-8 text-center">No images uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto custom-scrollbar pr-2">
                    {galleryItems.map((item) => (
                      <div
                        key={item._id}
                        className="rounded-lg border border-outline-variant/20 overflow-hidden shadow-sm flex flex-col"
                      >
                        <div className="h-[140px] overflow-hidden bg-black flex items-center justify-center relative group">
                          <img
                            src={item.mediaUrl && item.mediaUrl.startsWith('http') ? item.mediaUrl : `${API_URL}${item.mediaUrl}`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[10px] text-white bg-primary px-2.5 py-0.5 rounded-full font-semibold uppercase">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 flex justify-between items-center gap-2 bg-surface-container-lowest">
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-on-surface truncate">{item.title}</h4>
                            <p className="text-[10px] text-on-surface-variant mt-0.5 capitalize">{item.size} bento</p>
                          </div>
                          <button
                            onClick={() => handleDeleteGalleryItem(item._id)}
                            className="px-3 py-1.5 bg-error-container text-error rounded-full text-[10px] font-bold hover:bg-error hover:text-white transition-all flex items-center gap-1 shrink-0"
                          >
                            <span className="material-symbols-outlined text-xs">delete</span>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}


          {/* Manage Poojas Tab */}
          {activeTab === 'poojas' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
              {/* Add Pooja Form */}
              <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-md space-y-6">
                <h3 className="font-display-lg text-lg text-primary font-bold">Add Additional Pooja</h3>
                <form onSubmit={handlePoojaSubmit} className="space-y-4">
                  {/* Name (English) */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="poojaName" className="text-xs font-semibold text-on-surface">Pooja Name (English) *</label>
                    <input
                      type="text"
                      id="poojaName"
                      value={poojaForm.name}
                      onChange={(e) => setPoojaForm({ ...poojaForm, name: e.target.value })}
                      required
                      placeholder="e.g. Archana"
                      className="w-full px-4 py-2.5 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                    />
                  </div>

                  {/* Name (Malayalam) */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="poojaMalayalamName" className="text-xs font-semibold text-on-surface">Pooja Name (Malayalam)</label>
                    <input
                      type="text"
                      id="poojaMalayalamName"
                      value={poojaForm.malayalamName}
                      onChange={(e) => setPoojaForm({ ...poojaForm, malayalamName: e.target.value })}
                      placeholder="e.g. അർച്ചന"
                      className="w-full px-4 py-2.5 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                    />
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="poojaPrice" className="text-xs font-semibold text-on-surface">Price (INR) *</label>
                    <input
                      type="number"
                      id="poojaPrice"
                      value={poojaForm.price}
                      onChange={(e) => setPoojaForm({ ...poojaForm, price: e.target.value })}
                      required
                      min={0}
                      placeholder="e.g. 50"
                      className="w-full px-4 py-2.5 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={poojaLoading}
                    className="w-full py-3 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-all text-xs uppercase tracking-wider mt-2 shadow"
                  >
                    {poojaLoading ? 'Saving...' : 'Add Pooja'}
                  </button>
                </form>
              </div>

              {/* Poojas List */}
              <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-md space-y-6">
                <h3 className="font-display-lg text-lg text-primary font-bold">Existing Additional Poojas</h3>
                {poojas.filter(p => p.category === 'Custom').length === 0 ? (
                  <p className="text-on-surface-variant italic text-sm py-8 text-center">No additional poojas added yet.</p>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-outline-variant/25">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-surface-container text-on-surface-variant uppercase tracking-wider font-semibold border-b border-outline-variant/20">
                          <th className="p-4">Pooja Name (EN)</th>
                          <th className="p-4">Pooja Name (ML)</th>
                          <th className="p-4">Price</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20 bg-white">
                        {poojas.filter(p => p.category === 'Custom').map((pooja) => (
                          <tr key={pooja._id} className="hover:bg-background/40">
                            <td className="p-4 font-semibold text-on-surface">{pooja.name}</td>
                            <td className="p-4 text-on-surface-variant">{pooja.malayalamName || 'N/A'}</td>
                            <td className="p-4 font-bold text-primary">₹{pooja.price}</td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeletePooja(pooja._id)}
                                className="px-3 py-1.5 bg-error-container text-error rounded-full text-[10px] font-bold hover:bg-error hover:text-white transition-all inline-flex items-center gap-1"
                              >
                                <span className="material-symbols-outlined text-xs">delete</span>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default AdminPanel