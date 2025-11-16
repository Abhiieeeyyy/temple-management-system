import express from 'express'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'
import User from '../models/User.js'
import Donation from '../models/Donation.js'
import Booking from '../models/Booking.js'
import { Message } from '../models/Message.js'
import Pooja from '../models/Pooja.js'

const router = express.Router()

// Apply authentication middleware to all admin routes
router.use(authenticateToken)
router.use(requireAdmin)

// ==================== USERS MANAGEMENT ====================

// GET /api/admin/users - Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).select('-password')
    
    res.json({
      success: true,
      users
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    })
  }
})

// GET /api/admin/stats - Get admin dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' })
    const totalAdmins = await User.countDocuments({ role: 'admin' })
    const activeUsers = await User.countDocuments({ isActive: true })
    const totalDonations = await Donation.countDocuments()
    const totalBookings = await Booking.countDocuments()
    const totalMessages = await Message.countDocuments()
    const totalPoojas = await Pooja.countDocuments()
    
    const recentUsers = await User.find({ role: 'user' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email createdAt')

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalAdmins,
        activeUsers,
        totalDonations,
        totalBookings,
        totalMessages,
        totalPoojas,
        recentUsers
      }
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    })
  }
})

// PUT /api/admin/users/:id/toggle-status - Toggle user active status
router.put('/users/:id/toggle-status', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify admin user status'
      })
    }

    user.isActive = !user.isActive
    await user.save()

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user: user.toJSON()
    })
  } catch (error) {
    console.error('Toggle user status error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update user status'
    })
  }
})

// ==================== DONATIONS MANAGEMENT ====================

// GET /api/admin/donations - Get all donations (admin only)
router.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'firstName lastName email')
    
    res.json({
      success: true,
      donations
    })
  } catch (error) {
    console.error('Get donations error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donations'
    })
  }
})

// PATCH /api/admin/donations/:id - Update donation status
router.patch('/donations/:id', async (req, res) => {
  try {
    const { status } = req.body
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      })
    }

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      })
    }

    res.json({
      success: true,
      message: 'Donation status updated successfully',
      donation
    })
  } catch (error) {
    console.error('Update donation error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update donation'
    })
  }
})

// ==================== BOOKINGS MANAGEMENT ====================

// GET /api/admin/bookings - Get all bookings (admin only)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'firstName lastName email')
      .populate('poojaId', 'name malayalamName price')
    
    res.json({
      success: true,
      bookings
    })
  } catch (error) {
    console.error('Get bookings error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    })
  }
})

// PATCH /api/admin/bookings/:id/status - Update booking status
router.patch('/bookings/:id/status', async (req, res) => {
  try {
    const { status, paymentStatus } = req.body
    
    const updateData = {}
    if (status) updateData.status = status
    if (paymentStatus) updateData.paymentStatus = paymentStatus

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Status or paymentStatus is required'
      })
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    res.json({
      success: true,
      message: 'Booking updated successfully',
      booking
    })
  } catch (error) {
    console.error('Update booking error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update booking'
    })
  }
})

// ==================== MESSAGES MANAGEMENT ====================

// GET /api/admin/messages - Get all messages (admin only)
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'firstName lastName email')
    
    res.json({
      success: true,
      messages
    })
  } catch (error) {
    console.error('Get messages error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages'
    })
  }
})

// PUT /api/admin/messages/:id - Update message status
router.put('/messages/:id', async (req, res) => {
  try {
    const { status } = req.body
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      })
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    res.json({
      success: true,
      message: 'Message status updated successfully',
      data: message
    })
  } catch (error) {
    console.error('Update message error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update message'
    })
  }
})

// ==================== POOJAS MANAGEMENT ====================

// GET /api/admin/poojas - Get all poojas (admin only)
router.get('/poojas', async (req, res) => {
  try {
    const poojas = await Pooja.find().sort({ createdAt: -1 })
    
    res.json({
      success: true,
      poojas
    })
  } catch (error) {
    console.error('Get poojas error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch poojas'
    })
  }
})

// POST /api/admin/poojas - Create new pooja (admin only)
router.post('/poojas', async (req, res) => {
  try {
    const poojaData = {
      name: req.body.name,
      malayalamName: req.body.malayalamName || '',
      description: req.body.description || '',
      duration: req.body.duration || '',
      price: req.body.price,
      category: req.body.category || 'Custom',
      imageUrl: req.body.imageUrl || '/images/pooja.jpg',
      requirements: req.body.requirements || [],
      benefits: req.body.benefits || [],
      isAvailable: req.body.isAvailable !== undefined ? req.body.isAvailable : true
    }

    if (!poojaData.name || !poojaData.price) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required'
      })
    }

    const pooja = new Pooja(poojaData)
    await pooja.save()

    res.status(201).json({
      success: true,
      message: 'Pooja created successfully',
      pooja
    })
  } catch (error) {
    console.error('Create pooja error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create pooja',
      error: error.message
    })
  }
})

// PATCH /api/admin/poojas/:id - Update pooja (admin only)
router.patch('/poojas/:id', async (req, res) => {
  try {
    const pooja = await Pooja.findById(req.params.id)
    
    if (!pooja) {
      return res.status(404).json({
        success: false,
        message: 'Pooja not found'
      })
    }

    // Update allowed fields
    const allowedFields = ['name', 'malayalamName', 'description', 'duration', 'price', 
                          'category', 'imageUrl', 'requirements', 'benefits', 'isAvailable']
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        pooja[field] = req.body[field]
      }
    })

    await pooja.save()

    res.json({
      success: true,
      message: 'Pooja updated successfully',
      pooja
    })
  } catch (error) {
    console.error('Update pooja error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update pooja',
      error: error.message
    })
  }
})

// DELETE /api/admin/poojas/:id - Delete pooja (admin only)
router.delete('/poojas/:id', async (req, res) => {
  try {
    const pooja = await Pooja.findById(req.params.id)
    
    if (!pooja) {
      return res.status(404).json({
        success: false,
        message: 'Pooja not found'
      })
    }

    // Check if there are any bookings for this pooja
    const bookingsCount = await Booking.countDocuments({ poojaId: req.params.id })
    
    if (bookingsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete pooja. There are ${bookingsCount} booking(s) associated with it.`
      })
    }

    await pooja.deleteOne()

    res.json({
      success: true,
      message: 'Pooja deleted successfully'
    })
  } catch (error) {
    console.error('Delete pooja error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete pooja',
      error: error.message
    })
  }
})

export default router