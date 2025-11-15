import express from 'express'
import Donation from '../models/Donation.js'

const router = express.Router()

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find()
      .sort({ createdAt: -1 })
    res.json({ success: true, donations })
  } catch (error) {
    console.error('Error fetching donations:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch donations' })
  }
})

// Create new donation
router.post('/', async (req, res) => {
  try {
    const { name, amount, phoneNumber, purpose, message } = req.body

    // Validate required fields
    if (!name || !amount || !phoneNumber || !purpose) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, amount, phone number, and purpose are required' 
      })
    }

    // Validate phone number format
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid 10-digit phone number' 
      })
    }

    // Generate a simple order ID for tracking
    const orderId = `DON_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create new donation
    const donation = new Donation({
      name,
      amount,
      phoneNumber,
      purpose,
      message,
      userId: null, // No user authentication
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