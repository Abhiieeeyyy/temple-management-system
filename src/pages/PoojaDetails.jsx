import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../utils/axiosConfig'
import AuthModal from '../components/AuthModal'
import { 
  initializeRazorpay, 
  createRazorpayOrder, 
  openRazorpayCheckout, 
  verifyPayment, 
  RAZORPAY_CONFIG 
} from '../utils/razorpay'
import '../styles/PoojaDetails.css'
import '../styles/PageAnimations.css'

const PoojaDetails = () => {
  const { isAuthenticated, user } = useAuth()
  const [selectedPooja, setSelectedPooja] = useState(null)
  const [selectedMultiplePoojas, setSelectedMultiplePoojas] = useState([])
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [adminPoojas, setAdminPoojas] = useState([])
  const [filteredPoojas, setFilteredPoojas] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showOtherPoojas, setShowOtherPoojas] = useState(false)
  const [people, setPeople] = useState([])
  const [selectedPeople, setSelectedPeople] = useState([])
  const [bookingFor, setBookingFor] = useState('myself') // 'myself' or 'others'
  
  // Cart system for additional poojas
  const [cart, setCart] = useState([])
  const [showAddToCartForm, setShowAddToCartForm] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [cartFormData, setCartFormData] = useState({
    name: '',
    birthStar: '',
    date: '',
    deity: 'ayyappa'
  })
  
  const [formData, setFormData] = useState({
    name: '',
    birthStar: '',
    mobileNumber: '',
    address: '',
    date: '',
    paymentMethod: 'online', // only online payment
    status: 'pending'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const birthStars = [
    { value: 'ashwini', label: 'അശ്വതി' },
    { value: 'bharani', label: 'ഭരണി' },
    { value: 'karthika', label: 'കാർത്തിക' },
    { value: 'rohini', label: 'രോഹിണി' },
    { value: 'mrigashira', label: 'മകയിരം' },
    { value: 'ardra', label: 'തിരുവാതിര' },
    { value: 'punarvasu', label: 'പുണർതം' },
    { value: 'pushya', label: 'പൂയം' },
    { value: 'ashlesha', label: 'ആയില്യം' },
    { value: 'magha', label: 'മകം' },
    { value: 'purva_phalguni', label: 'പൂരം' },
    { value: 'uttara_phalguni', label: 'ഉത്രം' },
    { value: 'hasta', label: 'അത്തം' },
    { value: 'chitra', label: 'ചിത്തിര' },
    { value: 'swati', label: 'ചോതി' },
    { value: 'vishakha', label: 'വിശാഖം' },
    { value: 'anooradha', label: 'അനിഴം' },
    { value: 'jyeshtha', label: 'തൃക്കേട്ട' },
    { value: 'moola', label: 'മൂലം' },
    { value: 'purva_ashadha', label: 'പൂരാടം' },
    { value: 'uttara_ashadha', label: 'ഉത്രാടം' },
    { value: 'shravana', label: 'തിരുവോണം' },
    { value: 'dhanishta', label: 'അവിട്ടം' },
    { value: 'shatabhisha', label: 'ചതയം' },
    { value: 'purva_bhadrapada', label: 'പൂരുരുട്ടാതി' },
    { value: 'uttara_bhadrapada', label: 'ഉത്രട്ടാതി' },
    { value: 'revati', label: 'രേവതി' }
  ]

  // Fetch admin-added poojas
  useEffect(() => {
    const fetchAdminPoojas = async () => {
      try {
        const response = await api.get('/api/poojas')
        // Filter out the main poojas (ones that should remain at the top)
        const adminAddedPoojas = response.data.filter(pooja => 
          !['Ganapathi Homam', 'Daily Pooja', 'Naga Pooja', 'Chuttu Vilakku', 'ഗണപതി ഹോമം', 'ദൈനിക പൂജ', 'നാഗ പൂജ', 'ചുറ്റുവിളക്ക്'].includes(pooja.name)
        )
        setAdminPoojas(adminAddedPoojas)
        setFilteredPoojas(adminAddedPoojas)
      } catch (error) {
        console.error('Error fetching admin poojas:', error)
      }
    }
    
    fetchAdminPoojas()
  }, [])

  // Filter poojas based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPoojas(adminPoojas)
    } else {
      const filtered = adminPoojas.filter(pooja =>
        pooja.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pooja.malayalamName && pooja.malayalamName.includes(searchQuery)) ||
        (pooja.description && pooja.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredPoojas(filtered)
    }
  }, [searchQuery, adminPoojas])

  // People management removed - users don't need authentication

  const handleBookingClick = (pooja) => {
    setSelectedPooja(pooja)
    setSelectedMultiplePoojas([])
    setShowBookingForm(true)
    setFormData({
      name: '',
      birthStar: '',
      mobileNumber: '',
      address: '',
      date: '',
      status: 'pending'
    })
    setError('')
    setSuccess('')
    setValidationErrors({})
  }

  const handleMultiplePoojaToggle = (pooja) => {
    setSelectedMultiplePoojas(prev => {
      const isSelected = prev.find(p => p._id === pooja._id)
      if (isSelected) {
        return prev.filter(p => p._id !== pooja._id)
      } else {
        return [...prev, pooja]
      }
    })
  }

  const handleMultipleBookingClick = () => {
    if (selectedMultiplePoojas.length === 0) {
      setError('Please select at least one pooja to book')
      return
    }
    // Open add to cart form
    setShowAddToCartForm(true)
    setCartFormData({
      name: '',
      birthStar: '',
      date: '',
      deity: 'ayyappa'
    })
    setError('')
    setValidationErrors({})
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    
    // Validation
    if (!cartFormData.name.trim()) {
      setError('Name is required')
      return
    }
    if (!cartFormData.birthStar) {
      setError('Please select birth star')
      return
    }
    if (!cartFormData.date) {
      setError('Please select date')
      return
    }
    if (!cartFormData.deity) {
      setError('Please select deity')
      return
    }

    // Add to cart
    const cartItem = {
      id: Date.now(),
      poojas: [...selectedMultiplePoojas],
      name: cartFormData.name,
      birthStar: cartFormData.birthStar,
      date: cartFormData.date,
      deity: cartFormData.deity,
      totalPrice: selectedMultiplePoojas.reduce((sum, pooja) => sum + pooja.price, 0)
    }

    setCart(prev => [...prev, cartItem])
    setSuccess(`Added to cart: ${selectedMultiplePoojas.length} pooja(s) for ${cartFormData.name}`)
    
    // Reset form and selections
    setShowAddToCartForm(false)
    setSelectedMultiplePoojas([])
    setCartFormData({
      name: '',
      birthStar: '',
      date: '',
      deity: 'ayyappa'
    })
    
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleRemoveFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId))
    setSuccess('Item removed from cart')
    setTimeout(() => setSuccess(''), 2000)
  }

  const handleCartCheckout = async () => {
    if (cart.length === 0) {
      setError('Cart is empty')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Calculate total amount
      const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0)

      // Initialize Razorpay
      const razorpayLoaded = await initializeRazorpay()
      if (!razorpayLoaded) {
        throw new Error('Razorpay SDK failed to load')
      }

      // Create Razorpay order
      const orderData = {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: `cart_${Date.now()}`,
        notes: {
          cartItems: cart.length,
          type: 'cart_booking'
        }
      }

      const order = await createRazorpayOrder(orderData)
      
      if (!order.success) {
        throw new Error(order.message || 'Failed to create payment order')
      }

      // Configure Razorpay options
      const options = {
        ...RAZORPAY_CONFIG,
        order_id: order.orderId,
        amount: orderData.amount,
        prefill: {
          name: cart[0].name,
          email: user?.email || '',
          contact: user?.phone || ''
        },
        notes: orderData.notes
      }

      // Open Razorpay checkout
      const paymentResponse = await openRazorpayCheckout(options)
      
      // Payment successful, create bookings
      await createCartBookings(paymentResponse)
      
    } catch (err) {
      console.error('Payment error:', err)
      if (err.message === 'Payment cancelled by user') {
        setError('Payment was cancelled')
      } else {
        setError(err.message || 'Payment failed')
      }
      setLoading(false)
    }
  }

  const createCartBookings = async (paymentResponse) => {
    try {
      const bookingPromises = []
      
      for (const cartItem of cart) {
        for (const pooja of cartItem.poojas) {
          const bookingData = {
            name: cartItem.name,
            birthStar: cartItem.birthStar,
            deity: cartItem.deity,
            mobileNumber: user?.phone || '',
            address: '',
            date: cartItem.date,
            poojaId: pooja._id,
            poojaName: pooja.name,
            userId: user?._id || null,
            price: pooja.price,
            paymentStatus: 'paid',
            paymentMethod: 'online',
            paymentId: paymentResponse.razorpay_payment_id,
            orderId: paymentResponse.razorpay_order_id
          }
          bookingPromises.push(api.post('/api/bookings', bookingData))
        }
      }
      
      await Promise.all(bookingPromises)
      
      const totalBookings = cart.reduce((sum, item) => sum + item.poojas.length, 0)
      const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0)
      
      setSuccess(`🎉 Payment Successful! ${totalBookings} booking(s) created. Total: ₹${totalAmount}. Payment ID: ${paymentResponse.razorpay_payment_id}`)
      setCart([])
      setShowCart(false)
      setLoading(false)
      
    } catch (err) {
      console.error('Error creating bookings:', err)
      setError('Payment successful but booking failed. Please contact support with Payment ID: ' + paymentResponse.razorpay_payment_id)
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    
    if (!formData.birthStar) {
      errors.birthStar = 'Please select your birth star'
    }

    if (!formData.mobileNumber) {
      errors.mobileNumber = 'Phone number is required'
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = 'Please enter a valid 10-digit phone number'
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Address is required'
    }

    if (!formData.date) {
      errors.date = 'Please select a date for the pooja'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    // Validate people selection if booking for others
    if (bookingFor === 'others' && selectedPeople.length === 0) {
      setError('Please select at least one person to book for')
      return
    }
    
    if (bookingFor === 'myself' && !validateForm()) {
      return
    }

    setLoading(true)
    
    // If online payment selected, process with Razorpay
    if (formData.paymentMethod === 'online') {
      try {
        // Initialize Razorpay
        const razorpayLoaded = await initializeRazorpay()
        if (!razorpayLoaded) {
          throw new Error('Razorpay SDK failed to load')
        }

        // Calculate total amount
        const poojas = selectedPooja ? [selectedPooja] : selectedMultiplePoojas
        const peopleCount = bookingFor === 'others' ? selectedPeople.length : 1
        const totalAmount = poojas.reduce((sum, pooja) => sum + pooja.price, 0) * peopleCount

        // Create Razorpay order
        const orderData = {
          amount: totalAmount * 100, // Convert to paise
          currency: 'INR',
          receipt: `pooja_${Date.now()}`,
          notes: {
            name: bookingFor === 'myself' ? formData.name : 'Multiple People',
            phone: formData.mobileNumber || user?.phone,
            poojaNames: poojas.map(p => p.name).join(', '),
            date: formData.date,
            type: 'pooja_booking'
          }
        }

        const order = await createRazorpayOrder(orderData)
        
        if (!order.success) {
          throw new Error(order.message || 'Failed to create payment order')
        }

        // Configure Razorpay options
        const options = {
          ...RAZORPAY_CONFIG,
          order_id: order.orderId,
          amount: orderData.amount,
          prefill: {
            name: bookingFor === 'myself' ? formData.name : user?.firstName + ' ' + user?.lastName,
            email: user?.email || '',
            contact: formData.mobileNumber || user?.phone || ''
          },
          notes: orderData.notes
        }

        // Open Razorpay checkout
        const paymentResponse = await openRazorpayCheckout(options)
        
        // Payment successful, now create bookings
        await createBookingsAfterPayment(paymentResponse, poojas, peopleCount)
        
      } catch (err) {
        console.error('Payment error:', err)
        if (err.message === 'Payment cancelled by user') {
          setError('Payment was cancelled. Please try again if you wish to book.')
        } else {
          setError(err.message || 'Payment failed. Please try again.')
        }
        setLoading(false)
        return
      }
    }
  }

  // Helper function to create bookings after successful payment
  const createBookingsAfterPayment = async (paymentResponse, poojas, peopleCount) => {
    try {
      if (bookingFor === 'others' && selectedPeople.length > 0) {
        const peopleToBook = people.filter(p => selectedPeople.includes(p._id))
        const bookingPromises = []
        
        for (const person of peopleToBook) {
          for (const pooja of poojas) {
            const bookingData = {
              name: person.name,
              birthStar: person.birthstar,
              mobileNumber: user?.phone || '',
              address: person.address,
              date: formData.date,
              poojaId: pooja._id,
              poojaName: pooja.name,
              userId: user?._id || null,
              personId: person._id,
              price: pooja.price,
              paymentStatus: 'paid',
              paymentMethod: 'online',
              paymentId: paymentResponse.razorpay_payment_id,
              orderId: paymentResponse.razorpay_order_id,
              bookedForPerson: true
            }
            bookingPromises.push(api.post('/api/bookings', bookingData))
          }
        }
        
        await Promise.all(bookingPromises)
        const totalBookings = peopleToBook.length * poojas.length
        const totalPrice = poojas.reduce((sum, pooja) => sum + pooja.price, 0) * peopleToBook.length
        setSuccess(`🎉 Payment Successful! Your ${poojas.length} pooja(s) for ${peopleToBook.length} person(s) have been booked. Total: ₹${totalPrice}. A confirmation message has been sent to your mobile. Payment ID: ${paymentResponse.razorpay_payment_id}`)
      } else if (selectedMultiplePoojas.length > 0) {
        const bookingPromises = selectedMultiplePoojas.map(pooja => {
          const bookingData = {
            ...formData,
            poojaId: pooja._id,
            poojaName: pooja.name,
            userId: user?._id || null,
            price: pooja.price,
            paymentStatus: 'paid',
            paymentMethod: 'online',
            paymentId: paymentResponse.razorpay_payment_id,
            orderId: paymentResponse.razorpay_order_id
          }
          return api.post('/api/bookings', bookingData)
        })
        
        await Promise.all(bookingPromises)
        const totalPrice = selectedMultiplePoojas.reduce((sum, pooja) => sum + pooja.price, 0)
        setSuccess(`🎉 Payment Successful! Your ${selectedMultiplePoojas.length} pooja(s) have been booked. Total: ₹${totalPrice}. A confirmation message has been sent to your mobile. Payment ID: ${paymentResponse.razorpay_payment_id}`)
      } else {
        const bookingData = {
          ...formData,
          poojaId: selectedPooja._id,
          poojaName: selectedPooja.name,
          userId: user?._id || null,
          price: selectedPooja.price,
          paymentStatus: 'paid',
          paymentMethod: 'online',
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id
        }
        
        await api.post('/api/bookings', bookingData)
        setSuccess(`🎉 Payment Successful! Your ${selectedPooja.name} has been booked for ${new Date(formData.date).toLocaleDateString()}. A confirmation message has been sent to your mobile. Payment ID: ${paymentResponse.razorpay_payment_id}`)
      }
      
      // Reset form
      setShowBookingForm(false)
      setSelectedPooja(null)
      setSelectedMultiplePoojas([])
      setSelectedPeople([])
      setBookingFor('myself')
      setFormData({
        name: '',
        birthStar: '',
        mobileNumber: '',
        address: '',
        date: '',
        paymentMethod: 'online',
        status: 'pending'
      })
      setValidationErrors({})
      setLoading(false)
    } catch (err) {
      console.error('Error creating bookings:', err)
      setError('Payment successful but booking failed. Please contact support with Payment ID: ' + paymentResponse.razorpay_payment_id)
      setLoading(false)
    }
  }

  // Predefined pooja models
  const poojas = [
    {
      _id: '672a1b2c3d4e5f6789abcdef',
      name: 'Ganapathi Hoomam (ഗണപതി ഹോമം)',
      englishName: 'Ganapathi Hoomam',
      price: 50,
      duration: '6:00am',
      description: 'A powerful homam dedicated to Lord Ganesha for removing obstacles and bringing success.',
      imageUrl: '/images/ganapathi.png',
      benefits: [
        'Removes obstacles and challenges',
        'Brings success in new ventures',
        'Enhances wisdom and knowledge',
        'Promotes spiritual growth'
      ],
      isAvailable: true
    },
    {
      _id: '672a1b2c3d4e5f6789abcd00',
      name: 'Daily Pooja (ദൈനിക പൂജ)',
      englishName: 'Daily Pooja',
      price: 150,
      duration: '8:00 am',
      description: 'A comprehensive pooja to appease all nine planets and balance their influences in your life.',
      imageUrl: '/images/daily-pooja.jpg',
      benefits: [
        'Balances planetary influences',
        'Reduces negative planetary effects',
        'Brings harmony in life',
        'Enhances overall well-being'
      ],
      isAvailable: true
    },
    {
      _id: '672a1b2c3d4e5f6789abcd11',
      name: 'Naga Pooja (നാഗ പൂജ)',
      englishName: 'Naga Pooja',
      price: 50,
      duration: '9:00am',
      description: 'A special pooja dedicated to Goddess Lakshmi and Lord Kubera for wealth and prosperity.',
      imageUrl: '/images/nagapooja.jpg',
      benefits: [
        'Attracts wealth and prosperity',
        'Removes financial obstacles',
        'Enhances business success',
        'Brings material and spiritual abundance'
      ],
      isAvailable: true
    },
    {
      _id: '672a1b2c3d4e5f6789abcd12',
      name: 'Chuttu Vilakku (ചുറ്റുവിളക്ക്)',
      englishName: 'Chuttu Vilakku',
      price: 3000,
      duration: '6:00pm',
      description: 'A beautiful evening lamp lighting ceremony that brings divine light and blessings to your home and family.',
      imageUrl: '/images/pooja.jpg',
      benefits: [
        'Brings divine light and blessings',
        'Removes darkness and obstacles',
        'Enhances spiritual energy',
        'Promotes peace and prosperity'
      ],
      isAvailable: true
    }
  ]

  return (
    <div className="pooja-container">
      <div className="pooja-content">
        <h1 className="page-heading-animated">Pooja Services</h1>
        <p className="pooja-intro page-subtitle-animated">
          Explore our various pooja services and spiritual ceremonies.
        </p>

        {/* Success and Error Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Main Poojas in a single row */}
        <div className="main-poojas-section">
          <h2>Main Poojas</h2>
          <div className="main-pooja-list">
            {poojas.map(pooja => (
              <div key={pooja._id} className="main-pooja-card">
                <div className="main-pooja-image">
                  <img src={pooja.imageUrl} alt={pooja.name} />
                </div>
                <div className="main-pooja-details">
                  <div className="main-pooja-header">
                    <h3>{pooja.name}</h3>
                    <span className="main-pooja-price">₹{pooja.price}</span>
                  </div>
                  <p className="main-pooja-duration">{pooja.duration}</p>
                  <button
                    className="main-book-button"
                    onClick={() => handleBookingClick(pooja)}
                  >
                    📅 Book Pooja
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Poojas Section - Always Visible */}
        {adminPoojas.length > 0 && (
          <div className="other-poojas-section">
            <div className="section-header">
              <h2>Additional Poojas</h2>
              <p className="section-subtitle">Select multiple poojas for combined booking or book individually</p>
            </div>

            {/* Search Box */}
            <div className="pooja-search-container">
              <input
                type="text"
                className="pooja-search-input"
                placeholder="Search poojas by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Multiple Selection Controls - Sticky */}
            <div className="multiple-selection-controls sticky-controls">
              <div className="selection-summary">
                <span className="selected-count">Selected: {selectedMultiplePoojas.length} pooja(s)</span>
                {selectedMultiplePoojas.length > 0 && (
                  <span className="total-price">
                    Total: ₹{selectedMultiplePoojas.reduce((sum, pooja) => sum + pooja.price, 0)}
                  </span>
                )}
              </div>
              <div className="cart-actions">
                <button
                  className="view-cart-button"
                  onClick={() => setShowCart(true)}
                >
                  🛒 Cart ({cart.length})
                </button>
                {selectedMultiplePoojas.length > 0 && (
                  <button
                    className="add-to-cart-button"
                    onClick={handleMultipleBookingClick}
                  >
                    Add to Cart ({selectedMultiplePoojas.length})
                  </button>
                )}
              </div>
            </div>
            
            {/* Grid Layout for Other Poojas */}
            {filteredPoojas.length === 0 ? (
              <div className="no-results">
                <p>No poojas found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="other-pooja-grid">
                {filteredPoojas.map(pooja => {
                const isSelected = selectedMultiplePoojas.find(p => p._id === pooja._id)
                return (
                  <div 
                    key={pooja._id} 
                    className={`other-pooja-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleMultiplePoojaToggle(pooja)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="pooja-card-header">
                      <label className="pooja-checkbox-label" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={!!isSelected}
                          onChange={() => handleMultiplePoojaToggle(pooja)}
                          className="pooja-checkbox"
                        />
                        <span className="checkbox-custom"></span>
                        <h3 className="pooja-title">
                          {pooja.name} {pooja.malayalamName && `(${pooja.malayalamName})`}
                        </h3>
                      </label>
                      <span className="pooja-price-badge">₹{pooja.price}</span>
                    </div>
                    
                    <div className="pooja-card-content">
                      <p className="pooja-description">{pooja.description}</p>

                      {pooja.benefits && pooja.benefits.length > 0 && (
                        <div className="pooja-benefits">
                          <h4>Benefits:</h4>
                          <ul className="benefits-list">
                            {pooja.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                            {pooja.benefits.length > 3 && (
                              <li className="more-benefits">+{pooja.benefits.length - 3} more benefits</li>
                            )}
                          </ul>
                        </div>
                      )}


                    </div>
                  </div>
                )
              })}
              </div>
            )}
          </div>
        )}

        {showBookingForm && (selectedPooja || selectedMultiplePoojas.length > 0) && (
          <div className="booking-modal">
            <div className="booking-modal-content">
              <div className="modal-header">
                <h2>
                  {selectedPooja ? `Book ${selectedPooja.name}` : `Book ${selectedMultiplePoojas.length} Selected Poojas`}
                </h2>
                <button 
                  className="close-button"
                  onClick={() => setShowBookingForm(false)}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="booking-form">
                {/* Book For Selection */}
                {people.length > 0 && (
                  <div className="form-group booking-for-section">
                    <label>Book This Pooja For:</label>
                    <div className="booking-for-options">
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="bookingFor"
                          value="myself"
                          checked={bookingFor === 'myself'}
                          onChange={(e) => {
                            setBookingFor(e.target.value)
                            setSelectedPeople([])
                          }}
                        />
                        <span>Myself</span>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="bookingFor"
                          value="others"
                          checked={bookingFor === 'others'}
                          onChange={(e) => setBookingFor(e.target.value)}
                        />
                        <span>Select from my people</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* People Selection */}
                {bookingFor === 'others' && people.length > 0 && (
                  <div className="form-group people-selection-section">
                    <label>Select People (You can select multiple):</label>
                    <div className="people-checkboxes">
                      {people.map((person) => (
                        <label key={person._id} className="person-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedPeople.includes(person._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPeople([...selectedPeople, person._id])
                              } else {
                                setSelectedPeople(selectedPeople.filter(id => id !== person._id))
                              }
                            }}
                          />
                          <span className="person-info">
                            <strong>{person.name}</strong>
                            <small>{person.birthstar}</small>
                          </span>
                        </label>
                      ))}
                    </div>
                    {selectedPeople.length > 0 && (
                      <p className="selected-count">
                        {selectedPeople.length} person(s) selected
                      </p>
                    )}
                  </div>
                )}

                {/* Show form fields only if booking for myself */}
                {bookingFor === 'myself' && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className={validationErrors.name ? 'error' : ''}
                        />
                        {validationErrors.name && (
                          <span className="field-error">{validationErrors.name}</span>
                        )}
                      </div>

                  <div className="form-group">
                    <label htmlFor="mobileNumber">Phone Number *</label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                      pattern="[0-9]{10}"
                      className={validationErrors.mobileNumber ? 'error' : ''}
                    />
                    {validationErrors.mobileNumber && (
                      <span className="field-error">{validationErrors.mobileNumber}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="birthStar">Birth Star *</label>
                  <select
                    id="birthStar"
                    name="birthStar"
                    value={formData.birthStar}
                    onChange={handleChange}
                    required
                    className={validationErrors.birthStar ? 'error' : ''}
                  >
                    <option value="">Select your birth star</option>
                    {birthStars.map(star => (
                      <option key={star.value} value={star.value}>
                        {star.label}
                      </option>
                    ))}
                  </select>
                  {validationErrors.birthStar && (
                    <span className="field-error">{validationErrors.birthStar}</span>
                  )}
                </div>

                    <div className="form-group">
                      <label htmlFor="address">Address *</label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Enter your complete address"
                        rows="3"
                        className={validationErrors.address ? 'error' : ''}
                      />
                      {validationErrors.address && (
                        <span className="field-error">{validationErrors.address}</span>
                      )}
                    </div>
                  </>
                )}

                {/* Date field - always shown */}
                <div className="form-group">
                  <label htmlFor="date">Date to Perform Pooja *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className={validationErrors.date ? 'error' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {validationErrors.date && (
                    <span className="field-error">{validationErrors.date}</span>
                  )}
                </div>

                {/* Payment Info */}
                <div className="payment-info-box online">
                  <p><strong>💳 Secure Online Payment</strong></p>
                  <p>You will be redirected to Razorpay payment gateway to complete your payment securely.</p>
                  <p className="note">Accepted: Credit/Debit Cards, UPI, Net Banking, Wallets</p>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowBookingForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add to Cart Form Modal */}
        {showAddToCartForm && selectedMultiplePoojas.length > 0 && (
          <div className="booking-modal">
            <div className="cart-form-modal">
              <div className="modal-header">
                <h2>Add to Cart</h2>
                <button 
                  className="close-button"
                  onClick={() => setShowAddToCartForm(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="selected-poojas-summary">
                <h3>Selected Poojas:</h3>
                <ul>
                  {selectedMultiplePoojas.map(pooja => (
                    <li key={pooja._id}>
                      {pooja.name} - ₹{pooja.price}
                    </li>
                  ))}
                </ul>
                <p className="total-per-person">
                  Total per person: ₹{selectedMultiplePoojas.reduce((sum, p) => sum + p.price, 0)}
                </p>
              </div>

              <form onSubmit={handleAddToCart} className="cart-form">
                <div className="form-group">
                  <label htmlFor="cartName">Name *</label>
                  <input
                    type="text"
                    id="cartName"
                    value={cartFormData.name}
                    onChange={(e) => setCartFormData({...cartFormData, name: e.target.value})}
                    placeholder="Enter your Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cartBirthStar">Birth Star *</label>
                  <select
                    id="cartBirthStar"
                    value={cartFormData.birthStar}
                    onChange={(e) => setCartFormData({...cartFormData, birthStar: e.target.value})}
                    required
                  >
                    <option value="">Select Birth Star</option>
                    {birthStars.map(star => (
                      <option key={star.value} value={star.value}>
                        {star.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="cartDate">Date to Perform *</label>
                  <input
                    type="date"
                    id="cartDate"
                    value={cartFormData.date}
                    onChange={(e) => setCartFormData({...cartFormData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cartDeity">Deity *</label>
                  <select
                    id="cartDeity"
                    value={cartFormData.deity}
                    onChange={(e) => setCartFormData({...cartFormData, deity: e.target.value})}
                    required
                  >
                    <option value="ayyappa">Ayyappa (അയ്യപ്പൻ)</option>
                    <option value="bhagavathi">Bhagavathi (ഭഗവതി)</option>
                  </select>
                </div>

                <div className="cart-form-total">
                  <strong>Total: ₹{selectedMultiplePoojas.reduce((sum, p) => sum + p.price, 0)}</strong>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowAddToCartForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Add to Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cart View Modal */}
        {showCart && (
          <div className="booking-modal">
            <div className="cart-modal">
              <div className="modal-header">
                <h2>Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h2>
                <button 
                  className="close-button"
                  onClick={() => setShowCart(false)}
                >
                  ×
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                  <button 
                    className="continue-shopping-btn"
                    onClick={() => setShowCart(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-header">
                          <h3>{item.name}</h3>
                          <button
                            className="remove-item-btn"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            ✕
                          </button>
                        </div>
                        <div className="cart-item-details">
                          <p><strong>Birth Star:</strong> {birthStars.find(s => s.value === item.birthStar)?.label}</p>
                          <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                          <p><strong>Deity:</strong> {item.deity === 'ayyappa' ? 'Ayyappa (അയ്യപ്പൻ)' : 'Bhagavathi (ഭഗവതി)'}</p>
                          <p><strong>Poojas:</strong></p>
                          <ul className="cart-item-poojas">
                            {item.poojas.map(pooja => (
                              <li key={pooja._id}>{pooja.name} - ₹{pooja.price}</li>
                            ))}
                          </ul>
                          <p className="cart-item-total"><strong>Total: ₹{item.totalPrice}</strong></p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary">
                    <div className="cart-total">
                      <h3>Grand Total: ₹{cart.reduce((sum, item) => sum + item.totalPrice, 0)}</h3>
                      <p>{cart.reduce((sum, item) => sum + item.poojas.length, 0)} total bookings</p>
                    </div>
                    <button
                      className="checkout-button"
                      onClick={handleCartCheckout}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Authentication Modal */}
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialTab="login"
        />
      </div>
    </div>
  )
}

export default PoojaDetails 