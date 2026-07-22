import express from 'express'
import crypto from 'crypto'
import Donation from '../models/Donation.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'


const router = express.Router()

// Get all donations - Admin only (public donations endpoint removed, use /api/admin/donations)
// This route is kept for backward compatibility but requires admin authentication
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'firstName lastName email')
    res.json({ success: true, donations })
  } catch (error) {
    console.error('Error fetching donations:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch donations' })
  }
})

// Create new donation
router.post('/', async (req, res) => {
  try {
    const { name, amount, phoneNumber, purpose, message, address, paymentId, orderId, razorpaySignature } = req.body

    // Validate required fields
    if (!name || !amount || !phoneNumber || !purpose || !address || !paymentId || !orderId || !razorpaySignature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, amount, phone number, purpose, address, and payment verification details are required' 
      })
    }

    // Validate phone number format
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid 10-digit phone number' 
      })
    }

    // Verify payment signature
    const bodyText = orderId + '|' + paymentId
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_test_key_secret')
      .update(bodyText.toString())
      .digest('hex')

    if (expectedSignature !== razorpaySignature) {
      console.error(`❌ Payment verification failed for donation. Order: ${orderId}, Payment: ${paymentId}`)
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Untrusted transaction.'
      })
    }

    // Create new donation
    const donation = new Donation({
      name,
      amount,
      phoneNumber,
      purpose,
      message,
      address,
      userId: null,
      paymentId,
      orderId,
      status: 'completed'
    })

    await donation.save()

    res.json({ 

      success: true, 
      message: 'Donation recorded successfully', 
      donation,
      orderId,
      paymentId
    })
  } catch (error) {
    console.error('Error creating donation:', error)
    res.status(500).json({ success: false, message: 'Failed to record donation' })
  }
})

// Update donation status
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' })
    }

    const donation = await Donation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' })
    }

    res.json({ success: true, message: 'Donation status updated', donation })
  } catch (error) {
    console.error('Error updating donation status:', error)
    res.status(500).json({ success: false, message: 'Failed to update donation status' })
  }
})

export default router 