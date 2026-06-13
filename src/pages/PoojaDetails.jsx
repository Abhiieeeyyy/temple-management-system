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
import { mainPoojas as staticMainPoojas, additionalPoojas } from '../data/poojas'
import { generateReceiptPDF } from '../utils/receiptGenerator'


const PoojaDetails = () => {
  const { isAuthenticated, user } = useAuth()
  const [selectedPooja, setSelectedPooja] = useState(null)
  const [selectedMultiplePoojas, setSelectedMultiplePoojas] = useState([])
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [adminPoojas, setAdminPoojas] = useState([])
  const [mainPoojas, setMainPoojas] = useState([])
  const [filteredPoojas, setFilteredPoojas] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [people, setPeople] = useState([])
  const [selectedPeople, setSelectedPeople] = useState([])
  const [bookingFor, setBookingFor] = useState('myself') // 'myself' or 'others'
  const [receiptData, setReceiptData] = useState(null)


  // Cart system for additional poojas
  const [cart, setCart] = useState([])
  const [showAddToCartForm, setShowAddToCartForm] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [cartFormData, setCartFormData] = useState({
    name: '',
    birthStar: '',
    date: '',
    deity: 'ayyappa',
    phoneNumber: ''
  })

  const [formData, setFormData] = useState({
    name: '',
    birthStar: '',
    mobileNumber: '',
    address: '',
    date: '',
    paymentMethod: 'online',
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
    { value: 'anooradha', label: 'അനീഴം' },
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

  const [loadingPoojas, setLoadingPoojas] = useState(false)

  // Load poojas dynamically from backend
  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        setLoadingPoojas(true)
        const response = await api.get('/api/poojas')
        const allPoojas = response.data || []
        
        if (allPoojas.length > 0) {
          const mainNames = ['Ganapathi Homam', 'Daily Pooja', 'Naga Pooja', 'Chuttu Vilakku']
          
          // Filter main poojas from database
          const dbMainPoojas = allPoojas.filter(p => mainNames.includes(p.name))
          
          // Filter additional poojas from database (only show Custom category poojas)
          const dbAdditionalPoojas = allPoojas.filter(p => p.category === 'Custom')

          // Merge static main poojas with their database counterparts to get correct MongoDB ObjectIds while using static file details (like price)
          const mergedMain = staticMainPoojas.map(staticP => {
            const dbP = dbMainPoojas.find(dp => dp.name.toLowerCase() === staticP.name.toLowerCase())
            return dbP ? { ...dbP, ...staticP, _id: dbP._id } : staticP
          })

          setMainPoojas(mergedMain)
          setAdminPoojas(dbAdditionalPoojas)
          setFilteredPoojas(dbAdditionalPoojas)
        } else {
          // Fallback to static poojas
          setMainPoojas(staticMainPoojas)
          setAdminPoojas(additionalPoojas)
          setFilteredPoojas(additionalPoojas)
        }
      } catch (err) {
        console.error('Error fetching poojas:', err)
        // Fallback to static poojas
        setMainPoojas(staticMainPoojas)
        setAdminPoojas(additionalPoojas)
        setFilteredPoojas(additionalPoojas)
      } finally {
        setLoadingPoojas(false)
      }
    }
    fetchPoojas()
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

  const handleBookingClick = (pooja) => {
    setSelectedPooja(pooja)
    setSelectedMultiplePoojas([])
    setShowBookingForm(true)
    setReceiptData(null)
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
    setReceiptData(null)
    setCartFormData({
      name: '',
      birthStar: '',
      date: '',
      deity: 'ayyappa',
      phoneNumber: ''
    })
    setError('')
    setValidationErrors({})
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    const containsMalayalam = (text) => /[\u0D00-\u0D7F]/.test(text)

    // Validation
    if (!cartFormData.name.trim()) {
      setError('Name is required')
      return
    }
    if (containsMalayalam(cartFormData.name)) {
      setError('Please enter devotee name in English only')
      return
    }
    if (!cartFormData.phoneNumber) {
      setError('Phone number is required')
      return
    } else if (!/^[0-9]{10}$/.test(cartFormData.phoneNumber)) {
      setError('Please enter a valid 10-digit phone number')
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
      phoneNumber: cartFormData.phoneNumber,
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
      deity: 'ayyappa',
      phoneNumber: ''
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
            mobileNumber: cartItem.phoneNumber,
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
      
      const receiptDetails = {
        name: cart[0]?.name || 'Devotee',
        phoneNumber: cart[0]?.phoneNumber || '',
        paymentId: paymentResponse.razorpay_payment_id,
        totalPrice: totalAmount,
        cartItems: cart.flatMap(item => 
          item.poojas.map(pooja => ({
            poojaName: pooja.name,
            name: item.name,
            birthStar: item.birthStar,
            date: item.date,
            price: pooja.price
          }))
        )
      }
      setReceiptData({ type: 'booking', details: receiptDetails })
      generateReceiptPDF('booking', receiptDetails)

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
    const containsMalayalam = (text) => /[\u0D00-\u0D7F]/.test(text)

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (containsMalayalam(formData.name)) {
      errors.name = 'Please enter name in English only'
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
    } else if (containsMalayalam(formData.address)) {
      errors.address = 'Please enter address in English only'
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

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Initialize Razorpay
      const razorpayLoaded = await initializeRazorpay()
      if (!razorpayLoaded) {
        throw new Error('Razorpay SDK failed to load')
      }

      // Calculate total amount
      const poojas = selectedPooja ? [selectedPooja] : selectedMultiplePoojas
      const totalAmount = poojas.reduce((sum, pooja) => sum + pooja.price, 0)

      // Create Razorpay order
      const orderData = {
        amount: totalAmount * 100, // Convert to paise
        currency: 'INR',
        receipt: `pooja_${Date.now()}`,
        notes: {
          name: formData.name,
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
          name: formData.name,
          email: user?.email || '',
          contact: formData.mobileNumber || user?.phone || ''
        },
        notes: orderData.notes
      }

      // Open Razorpay checkout
      const paymentResponse = await openRazorpayCheckout(options)

      // Payment successful, now create bookings
      await createBookingsAfterPayment(paymentResponse, poojas)

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

  const createBookingsAfterPayment = async (paymentResponse, poojas) => {
    try {
      const bookingPromises = poojas.map(pooja => {
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
      const totalPrice = poojas.reduce((sum, pooja) => sum + pooja.price, 0)
      setSuccess(`🎉 Payment Successful! Your ${poojas.length} pooja(s) have been booked. Total: ₹${totalPrice}. Payment ID: ${paymentResponse.razorpay_payment_id}`)

      const receiptDetails = {
        name: formData.name,
        birthStar: formData.birthStar,
        mobileNumber: formData.mobileNumber,
        phoneNumber: formData.mobileNumber,
        paymentId: paymentResponse.razorpay_payment_id,
        totalPrice,
        ...(poojas.length === 1 ? {
          poojaName: poojas[0].name,
          date: formData.date,
          price: poojas[0].price
        } : {
          cartItems: poojas.map(pooja => ({
            poojaName: pooja.name,
            name: formData.name,
            birthStar: formData.birthStar,
            date: formData.date,
            price: pooja.price
          }))
        })
      }
      setReceiptData({ type: 'booking', details: receiptDetails })
      generateReceiptPDF('booking', receiptDetails)

      // Reset form
      setShowBookingForm(false)
      setSelectedPooja(null)
      setSelectedMultiplePoojas([])
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

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-20">
      {/* Hero Title Section */}
      <div className="text-center pt-16 pb-12 max-w-[1200px] mx-auto px-6">
        <h1 className="font-display-lg text-4xl md:text-5xl text-primary font-bold mb-4">Pooja Services</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Experience the divine grace through our meticulously performed Vedic rituals and sacred offerings. Select from our traditional poojas to seek blessings for prosperity and peace.
        </p>
      </div>

      {/* Success and Error Messages */}
      <div className="max-w-[1200px] mx-auto px-6 mb-6">
        {error && (
          <div className="p-4 bg-error-container text-on-error-container rounded-lg text-sm border border-error/20 mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-surface-container text-primary font-medium rounded-lg text-sm border border-primary/20 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>{success}</div>
            {receiptData && (
              <button
                onClick={() => generateReceiptPDF(receiptData.type, receiptData.details)}
                className="px-4 py-2 bg-primary text-white rounded-full font-bold text-xs hover:bg-tertiary transition-colors flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Download Receipt
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Poojas Section (Bento Style) */}
      <section className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-outline-variant/30"></div>
          <h2 className="font-display-lg text-2xl md:text-3xl text-primary font-bold">Main Poojas</h2>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-outline-variant/30"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          
          {/* Ganapathi Homam */}
          {mainPoojas[0] && (
            <div className="bento-card relative overflow-hidden rounded-lg group h-[220px] md:h-[380px] shadow-lg border border-outline-variant/20">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={mainPoojas[0].name}
                src="/images/ganapathi-homam.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 md:p-5 w-full">
                <h3 className="font-headline-md text-sm sm:text-base md:text-xl text-white font-bold">{mainPoojas[0].name}</h3>
                {mainPoojas[0].malayalamName && (
                  <p className="text-surface-variant/80 font-body-md text-[10px] md:text-xs mt-0.5 mb-2 md:mb-4">{mainPoojas[0].malayalamName}</p>
                )}
                <div className="flex justify-between items-center mt-1 md:mt-2">
                  <span className="text-white font-bold text-xs md:text-base">₹{mainPoojas[0].price}</span>
                  <button
                    onClick={() => handleBookingClick(mainPoojas[0])}
                    className="px-3 py-1 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-colors text-[10px] md:text-xs"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Daily Pooja */}
          {mainPoojas[1] && (
            <div className="bento-card relative overflow-hidden rounded-lg group h-[220px] md:h-[380px] shadow-lg border border-outline-variant/20">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={mainPoojas[1].name}
                src="/images/daily-pooja.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 md:p-5 w-full">
                <h3 className="font-headline-md text-sm sm:text-base md:text-xl text-white font-bold">{mainPoojas[1].name}</h3>
                {mainPoojas[1].malayalamName && (
                  <p className="text-surface-variant/80 font-body-md text-[10px] md:text-xs mt-0.5 mb-2 md:mb-4">{mainPoojas[1].malayalamName}</p>
                )}
                <div className="flex justify-between items-center mt-1 md:mt-2">
                  <span className="text-white font-bold text-xs md:text-base">₹{mainPoojas[1].price}</span>
                  <button
                    onClick={() => handleBookingClick(mainPoojas[1])}
                    className="px-3 py-1 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-colors text-[10px] md:text-xs"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Naga Pooja */}
          {mainPoojas[2] && (
            <div className="bento-card relative overflow-hidden rounded-lg group h-[220px] md:h-[380px] shadow-lg border border-outline-variant/20">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={mainPoojas[2].name}
                src="/images/nagapooja.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 md:p-5 w-full">
                <h3 className="font-headline-md text-sm sm:text-base md:text-xl text-white font-bold">{mainPoojas[2].name}</h3>
                {mainPoojas[2].malayalamName && (
                  <p className="text-surface-variant/80 font-body-md text-[10px] md:text-xs mt-0.5 mb-2 md:mb-4">{mainPoojas[2].malayalamName}</p>
                )}
                <div className="flex justify-between items-center mt-1 md:mt-2">
                  <span className="text-white font-bold text-xs md:text-base">₹{mainPoojas[2].price}</span>
                  <button
                    onClick={() => handleBookingClick(mainPoojas[2])}
                    className="px-3 py-1 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-colors text-[10px] md:text-xs"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chuttu Vilakku */}
          {mainPoojas[3] && (
            <div className="bento-card relative overflow-hidden rounded-lg group h-[220px] md:h-[380px] shadow-lg border border-outline-variant/20">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={mainPoojas[3].name}
                src="/images/vilakku.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 md:p-5 w-full">
                <h3 className="font-headline-md text-sm sm:text-base md:text-xl text-white font-bold">{mainPoojas[3].name}</h3>
                {mainPoojas[3].malayalamName && (
                  <p className="text-surface-variant/80 font-body-md text-[10px] md:text-xs mt-0.5 mb-2 md:mb-4">{mainPoojas[3].malayalamName}</p>
                )}
                <div className="flex justify-between items-center mt-1 md:mt-2">
                  <span className="text-white font-bold text-xs md:text-base">₹{mainPoojas[3].price}</span>
                  <button
                    onClick={() => handleBookingClick(mainPoojas[3])}
                    className="px-3 py-1 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-colors text-[10px] md:text-xs"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Additional Poojas Selection */}
      <section className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-outline-variant/30"></div>
          <h2 className="font-display-lg text-2xl md:text-3xl text-primary font-bold">Additional Poojas</h2>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-outline-variant/30"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Search & List */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                className="w-full px-6 py-4 bg-white border border-outline-variant/30 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-sm"
                placeholder="Search poojas by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors text-sm"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            {/* List Grid */}
            {filteredPoojas.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-outline-variant/10 shadow-sm">
                <p className="text-on-surface-variant italic">No poojas found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPoojas.map((pooja) => {
                  const isSelected = selectedMultiplePoojas.find(p => p._id === pooja._id)
                  return (
                    <div
                      key={pooja._id}
                      onClick={() => handleMultiplePoojaToggle(pooja)}
                      className={`p-5 rounded-lg border shadow-sm flex items-center justify-between hover:border-primary/45 transition-all cursor-pointer bg-white group ${
                        isSelected ? 'border-primary bg-primary-fixed/10' : 'border-outline-variant/10'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? 'border-primary bg-primary' : 'border-outline-variant group-hover:border-primary'
                        }`}>
                          {isSelected && (
                            <span className="material-symbols-outlined text-white text-xs font-bold">check</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-on-surface text-sm md:text-base">{pooja.name}</h4>
                          {pooja.malayalamName && (
                            <p className="text-xs text-on-surface-variant mt-0.5">{pooja.malayalamName}</p>
                          )}
                        </div>
                      </div>
                      <span className="px-3.5 py-1 bg-surface-container text-primary font-bold rounded-full text-xs md:text-sm">
                        ₹{pooja.price}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right: Cart Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border-2 border-primary/25 p-6 sticky top-28 shadow-xl shadow-primary/5 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                <h3 className="font-headline-md text-lg text-primary font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Your Cart
                </h3>
                <span className="bg-primary-fixed-dim/30 text-primary px-3 py-1 rounded-full font-bold text-xs">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Selected multiple poojas buffer */}
              {selectedMultiplePoojas.length > 0 && (
                <div className="p-4 bg-secondary-container/20 border border-secondary-container rounded-lg space-y-3">
                  <p className="text-xs text-on-secondary-container font-semibold">
                    {selectedMultiplePoojas.length} pooja(s) selected:
                  </p>
                  <ul className="text-xs text-on-surface-variant space-y-1 pl-4 list-disc">
                    {selectedMultiplePoojas.map(p => (
                      <li key={p._id}>{p.name} (₹{p.price})</li>
                    ))}
                  </ul>
                  <button
                    onClick={handleMultipleBookingClick}
                    className="w-full py-2 bg-secondary text-white rounded-full font-bold text-xs hover:bg-opacity-95 transition-all"
                  >
                    Add Selections to Cart
                  </button>
                </div>
              )}

              {/* Cart List */}
              <div className="space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <span className="material-symbols-outlined text-outline text-3xl mb-1 opacity-50">inventory_2</span>
                    <p className="text-xs text-on-surface-variant italic">Select poojas from the list and add to cart.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="p-3 bg-background rounded-lg border border-outline-variant/20 flex flex-col gap-2 relative">
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="absolute top-2 right-2 text-on-surface-variant hover:text-primary text-xs"
                      >
                        ✕
                      </button>
                      <div className="pr-6">
                        <p className="font-bold text-on-surface text-xs">{item.name}</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">
                          Star: {birthStars.find(s => s.value === item.birthStar)?.label} • Date: {new Date(item.date).toLocaleDateString()}
                        </p>
                        <ul className="text-[10px] text-on-surface-variant pl-4 list-disc mt-1 space-y-0.5">
                          {item.poojas.map(p => (
                            <li key={p._id}>{p.name}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-outline-variant/10 text-xs">
                        <span className="text-on-surface-variant">Price</span>
                        <span className="font-bold text-primary">₹{item.totalPrice}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Grand Total & Checkout */}
              <div className="pt-4 border-t border-outline-variant/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant font-medium">Grand Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{cart.reduce((sum, item) => sum + item.totalPrice, 0)}
                  </span>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={handleCartCheckout}
                    disabled={loading}
                    className="w-full py-3.5 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all text-sm uppercase tracking-wider"
                  >
                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                )}
                <p className="text-center text-[10px] text-on-surface-variant">
                  Secure payment gateway • Instant confirmation.
                </p>
              </div>

              {/* Button to review full Cart in modal */}
              {cart.length > 0 && (
                <button
                  onClick={() => setShowCart(true)}
                  className="w-full text-center text-xs font-semibold text-primary hover:underline"
                >
                  View Detailed Cart ({cart.length})
                </button>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Modal (Direct / Single Booking) */}
      {showBookingForm && (selectedPooja || selectedMultiplePoojas.length > 0) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-outline-variant/20 w-full max-w-[600px] p-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setShowBookingForm(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="mb-6">
              <h2 className="font-display-lg text-xl md:text-2xl text-primary font-bold">
                {selectedPooja ? `Book ${selectedPooja.name}` : `Book Selected Poojas`}
              </h2>
              <div className="w-12 h-0.5 bg-primary mt-2"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-on-surface">Full Name (In English only) *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className={`px-4 py-2.5 rounded-full border text-xs focus:outline-none focus:ring-2 focus:ring-primary ${
                      validationErrors.name ? 'border-error' : 'border-outline-variant/50'
                    }`}
                  />
                  {validationErrors.name && (
                    <span className="text-[10px] text-error pl-3">{validationErrors.name}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mobileNumber" className="text-xs font-semibold text-on-surface">Phone Number *</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    pattern="[0-9]{10}"
                    className={`px-4 py-2.5 rounded-full border text-xs focus:outline-none focus:ring-2 focus:ring-primary ${
                      validationErrors.mobileNumber ? 'border-error' : 'border-outline-variant/50'
                    }`}
                  />
                  {validationErrors.mobileNumber && (
                    <span className="text-[10px] text-error pl-3">{validationErrors.mobileNumber}</span>
                  )}
                </div>
              </div>

              {/* Birth Star */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="birthStar" className="text-xs font-semibold text-on-surface">Birth Star *</label>
                <select
                  id="birthStar"
                  name="birthStar"
                  value={formData.birthStar}
                  onChange={handleChange}
                  required
                  className={`px-4 py-2.5 rounded-full border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                    validationErrors.birthStar ? 'border-error' : 'border-outline-variant/50'
                  }`}
                >
                  <option value="">Select your birth star</option>
                  {birthStars.map(star => (
                    <option key={star.value} value={star.value}>
                      {star.label}
                    </option>
                  ))}
                </select>
                {validationErrors.birthStar && (
                  <span className="text-[10px] text-error pl-3">{validationErrors.birthStar}</span>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="address" className="text-xs font-semibold text-on-surface">Address (In English only) *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your complete address"
                  rows="3"
                  className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                    validationErrors.address ? 'border-error' : 'border-outline-variant/50'
                  }`}
                />
                {validationErrors.address && (
                  <span className="text-[10px] text-error pl-3">{validationErrors.address}</span>
                )}
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="date" className="text-xs font-semibold text-on-surface">Date to Perform Pooja *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className={`px-4 py-2.5 rounded-full border text-xs focus:outline-none focus:ring-2 focus:ring-primary ${
                    validationErrors.date ? 'border-error' : 'border-outline-variant/50'
                  }`}
                />
                {validationErrors.date && (
                  <span className="text-[10px] text-error pl-3">{validationErrors.date}</span>
                )}
              </div>

              {/* Secure payment info */}
              <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/20 text-xs text-on-surface-variant leading-relaxed">
                <p className="font-bold text-primary flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Secure Online Payment
                </p>
                <p>You will be redirected to Razorpay checkout. Accepted: Cards, UPI, Net Banking, and Wallets.</p>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="px-6 py-2.5 border border-outline-variant rounded-full text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-primary text-white rounded-full text-xs font-bold hover:bg-tertiary transition-colors shadow-md"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-outline-variant/20 w-full max-w-[500px] p-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setShowAddToCartForm(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="mb-4">
              <h2 className="font-display-lg text-lg text-primary font-bold">Add to Cart</h2>
              <div className="w-12 h-0.5 bg-primary mt-1"></div>
            </div>

            <div className="p-4 bg-background border border-outline-variant/20 rounded-lg text-xs text-on-surface-variant mb-4 space-y-2">
              <p className="font-semibold text-on-surface">Selected Poojas:</p>
              <ul className="pl-4 list-disc space-y-0.5">
                {selectedMultiplePoojas.map(pooja => (
                  <li key={pooja._id}>
                    {pooja.name} - ₹{pooja.price}
                  </li>
                ))}
              </ul>
              <p className="pt-2 border-t border-outline-variant/10 text-right font-bold text-primary">
                Total per person: ₹{selectedMultiplePoojas.reduce((sum, p) => sum + p.price, 0)}
              </p>
            </div>

            <form onSubmit={handleAddToCart} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="cartName" className="text-xs font-semibold text-on-surface">Devotee Name (In English only) *</label>
                <input
                  type="text"
                  id="cartName"
                  value={cartFormData.name}
                  onChange={(e) => setCartFormData({ ...cartFormData, name: e.target.value })}
                  placeholder="Enter devotee name"
                  required
                  className="px-4 py-2.5 border border-outline-variant/50 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="cartPhoneNumber" className="text-xs font-semibold text-on-surface">Phone Number *</label>
                <input
                  type="tel"
                  id="cartPhoneNumber"
                  value={cartFormData.phoneNumber}
                  onChange={(e) => setCartFormData({ ...cartFormData, phoneNumber: e.target.value })}
                  placeholder="Enter devotee phone number"
                  required
                  pattern="[0-9]{10}"
                  className="px-4 py-2.5 border border-outline-variant/50 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="cartBirthStar" className="text-xs font-semibold text-on-surface">Birth Star *</label>
                <select
                  id="cartBirthStar"
                  value={cartFormData.birthStar}
                  onChange={(e) => setCartFormData({ ...cartFormData, birthStar: e.target.value })}
                  required
                  className="px-4 py-2.5 border border-outline-variant/50 bg-white rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Birth Star</option>
                  {birthStars.map(star => (
                    <option key={star.value} value={star.value}>
                      {star.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="cartDate" className="text-xs font-semibold text-on-surface">Date to Perform *</label>
                <input
                  type="date"
                  id="cartDate"
                  value={cartFormData.date}
                  onChange={(e) => setCartFormData({ ...cartFormData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="px-4 py-2.5 border border-outline-variant/50 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="cartDeity" className="text-xs font-semibold text-on-surface">Deity *</label>
                <select
                  id="cartDeity"
                  value={cartFormData.deity}
                  onChange={(e) => setCartFormData({ ...cartFormData, deity: e.target.value })}
                  required
                  className="px-4 py-2.5 border border-outline-variant/50 bg-white rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="ayyappa">Ayyappa (അയ്യപ്പൻ)</option>
                  <option value="bhagavathi">Bhagavathi (ഭഗവതി)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setShowAddToCartForm(false)}
                  className="px-5 py-2 border border-outline-variant rounded-full text-xs font-semibold text-on-surface hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white rounded-full text-xs font-bold hover:bg-tertiary shadow"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-outline-variant/20 w-full max-w-[600px] p-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="mb-6">
              <h2 className="font-display-lg text-xl text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">shopping_cart</span>
                Your Cart Detail ({cart.length})
              </h2>
              <div className="w-12 h-0.5 bg-primary mt-1"></div>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-on-surface-variant italic">Your cart is empty</p>
                <button
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-bold text-xs"
                  onClick={() => setShowCart(false)}
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="p-4 bg-background border border-outline-variant/20 rounded-lg relative">
                      <button
                        className="absolute top-4 right-4 text-on-surface-variant hover:text-primary text-sm font-bold"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        ✕
                      </button>
                      <h3 className="font-bold text-primary text-sm md:text-base">{item.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs mt-2 text-on-surface-variant">
                        <p><strong>Birth Star:</strong> {birthStars.find(s => s.value === item.birthStar)?.label}</p>
                        <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                        <p className="col-span-2"><strong>Deity:</strong> {item.deity === 'ayyappa' ? 'Ayyappa (അയ്യപ്പൻ)' : 'Bhagavathi (ഭഗവതി)'}</p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-outline-variant/10">
                        <p className="text-xs font-semibold text-on-surface">Booked offerings:</p>
                        <ul className="text-xs text-on-surface-variant pl-4 list-disc mt-1 space-y-0.5">
                          {item.poojas.map(pooja => (
                            <li key={pooja._id}>{pooja.name} - ₹{pooja.price}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-right text-xs font-bold text-primary mt-2">Item Total: ₹{item.totalPrice}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-bold text-primary">
                      Grand Total: ₹{cart.reduce((sum, item) => sum + item.totalPrice, 0)}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {cart.reduce((sum, item) => sum + item.poojas.length, 0)} total bookings
                    </p>
                  </div>
                  <button
                    className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-all shadow-md text-xs uppercase tracking-wider"
                    onClick={handleCartCheckout}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal overlay placeholder */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab="login"
      />
    </div>
  )
}

export default PoojaDetails