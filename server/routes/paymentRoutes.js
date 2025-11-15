import express from 'express'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { optionalAuth } from '../middleware/auth.js'

const router = express.Router()

// Initialize Razorpay with test credentials
console.log('Initializing Razorpay with:')
console.log('Key ID:', process.env.RAZORPAY_KEY_ID ? `${process.env.RAZORPAY_KEY_ID.substring(0, 15)}...` : 'NOT SET')
console.log('Key Secret:', process.env.RAZORPAY_KEY_SECRET ? 'SET' : 'NOT SET')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1234567890',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_test_key_secret'
})

// Log all requests to payment routes
router.use((req, res, next) => {
  console.log(`📥 Payment API Request: ${req.method} ${req.path}`)
  console.log('   Headers:', req.headers)
  console.log('   Body:', req.body)
  next()
})

// Apply optional authentication middleware (allows both logged in and guest users)
router.use(optionalAuth)

// Test endpoint to verify Razorpay setup
router.get('/test', (req, res) => {
  const keyId = process.env.RAZORPAY_KEY_ID
  const hasSecret = !!process.env.RAZORPAY_KEY_SECRET
  
  res.json({
    success: true,
    message: 'Payment routes are working',
    razorpay: {
      keyId: keyId ? `${keyId.substring(0, 15)}...` : 'NOT SET',
      hasSecret: hasSecret,
      configured: !!(keyId && hasSecret)
    }
  })
})

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    console.log('Creating Razorpay order with data:', req.body)
    const { amount, currency, receipt, notes } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      })
    }

    const options = {
      amount: amount, // amount in paise
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    }

    console.log('Razorpay order options:', options)
    const order = await razorpay.orders.create(options)
    console.log('Razorpay order created successfully:', order.id)
    
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    })
  } catch (error) {
    console.error('❌ ERROR creating Razorpay order:')
    console.error('Error message:', error.message)
    console.error('Error description:', error.description)
    console.error('Error code:', error.code)
    console.error('Full error:', error)
    
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message,
      description: error.description,
      code: error.code
    })
  }
})

// Verify payment
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donationData,
      bookingData
    } = req.body

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_test_key_secret')
      .update(body.toString())
      .digest('hex')

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
      // Payment is verified, save to database
      if (donationData) {
        // Save donation record
        console.log('Donation verified and saved:', {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          ...donationData
        })
      }

      if (bookingData) {
        // Save booking record
        console.log('Booking payment verified and saved:', {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          ...bookingData
        })
      }

      res.json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      })
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    })
  }
})

// Get payment details
router.get('/payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params
    const payment = await razorpay.payments.fetch(paymentId)
    
    res.json({
      success: true,
      payment
    })
  } catch (error) {
    console.error('Error fetching payment details:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details'
    })
  }
})

export default router