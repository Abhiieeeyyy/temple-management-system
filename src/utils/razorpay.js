// Razorpay payment utility functions

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export const createRazorpayOrder = async (orderData) => {
  try {
    console.log('Creating order with data:', orderData)
    const token = localStorage.getItem('temple_token')
    
    const headers = {
      'Content-Type': 'application/json'
    }
    
    // Add token if available (optional auth)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011'
    const response = await fetch(`${API_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(orderData)
    })
    
    console.log('Response status:', response.status)
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Non-JSON response:', text)
      throw new Error('Server returned non-JSON response. Please check if the server is running.')
    }
    
    const data = await response.json()
    console.log('Order response:', data)
    return data
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    throw error
  }
}

export const openRazorpayCheckout = (options) => {
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      ...options,
      handler: function (response) {
        resolve(response)
      },
      modal: {
        ondismiss: function () {
          reject(new Error('Payment cancelled by user'))
        }
      }
    })
    rzp.open()
  })
}

export const verifyPayment = async (paymentData) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011'
    const response = await fetch(`${API_URL}/api/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('temple_token')}`
      },
      body: JSON.stringify(paymentData)
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error verifying payment:', error)
    throw error
  }
}

// Test mode configuration
export const RAZORPAY_CONFIG = {
  key: 'rzp_test_RfxxUHvWj3pwrI', // Test key from .env
  currency: 'INR',
  name: 'Sri Kainari Ayyappan Kavu',
  description: 'Temple Donation/Booking Payment',
  image: '/images/temple9.jpg', // Temple logo
  theme: {
    color: '#b51414' // Temple theme color
  },
  prefill: {
    name: '',
    email: '',
    contact: ''
  },
  notes: {
    address: 'Valamkulam PO, Anamangad, Malappuram, Kerala - 679357'
  }
}

// Test card details for testing (only works in test mode)
export const TEST_CARD_DETAILS = {
  success: {
    number: '4111111111111111',
    expiry: '12/25',
    cvv: '123',
    name: 'Test User'
  },
  failure: {
    number: '4000000000000002',
    expiry: '12/25', 
    cvv: '123',
    name: 'Test User'
  }
}