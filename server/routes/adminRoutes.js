import express from 'express'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

// Apply authentication middleware to all admin routes
router.use(authenticateToken)
router.use(requireAdmin)

// GET /api/admin/users - Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 })
    
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
      user
    })
  } catch (error) {
    console.error('Toggle user status error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update user status'
    })
  }
})

export default router