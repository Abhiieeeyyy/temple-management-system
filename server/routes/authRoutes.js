import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'temple-secret-key', {
    expiresIn: '7d'
  })
}

// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      })
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id)

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: user.toJSON(),
      token
    })

  } catch (error) {
    console.error('Registration error:', error)
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      })
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    })
  }
})

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      })
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      console.log(`❌ Login failed: Invalid password for ${email}`)
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate token
    const token = generateToken(user._id)

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Get user data with role field explicitly included
    const userData = user.toJSON()
    // Ensure role is included (should be from schema, but explicitly set it)
    const userResponse = {
      ...userData,
      role: user.role || 'user',
      isAdmin: user.role === 'admin'
    }

    // Log admin login for debugging
    if (user.role === 'admin') {
      console.log(`✅ Admin login successful: ${email}`)
      console.log(`   Role: ${userResponse.role}, isAdmin: ${userResponse.isAdmin}`)
    }

    res.json({
      success: true,
      message: 'Login successful',
      user: userResponse,
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    })
  }
})

// POST /api/auth/login-phone - Login user with phone (after OTP verification)
router.post('/login-phone', async (req, res) => {
  try {
    const { phone } = req.body

    // Validate input
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      })
    }

    // Find user by phone
    const user = await User.findOne({ phone })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this phone number'
      })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      })
    }

    // Generate token
    const token = generateToken(user._id)

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    res.json({
      success: true,
      message: 'Login successful',
      user: user.toJSON(),
      token
    })

  } catch (error) {
    console.error('Phone login error:', error)
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    })
  }
})

// POST /api/auth/logout - Logout user (client-side mainly)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  })
})

// GET /api/auth/me - Get current user info
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'temple-secret-key')
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      user: user.toJSON()
    })

  } catch (error) {
    console.error('Get user error:', error)
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    })
  }
})

// PUT /api/auth/update-profile - Update user profile
router.put('/update-profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'temple-secret-key')
    const user = await User.findById(decoded.userId).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      })
    }

    const { firstName, lastName, email, phone, currentPassword, newPassword } = req.body

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required to change password'
        })
      }

      const isCurrentPasswordValid = await user.comparePassword(currentPassword)
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        })
      }

      user.password = newPassword
    }

    // Update other fields
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.email = email || user.email
    user.phone = phone || user.phone

    await user.save()

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toJSON()
    })

  } catch (error) {
    console.error('Update profile error:', error)
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      })
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      })
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    })
  }
})

// POST /api/auth/create-admin - Create admin user (for initial setup)
router.post('/create-admin', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, adminKey } = req.body

    // Check admin key (you can set this in environment variables)
    const expectedAdminKey = process.env.ADMIN_CREATION_KEY || 'temple-admin-2024'
    if (adminKey !== expectedAdminKey) {
      return res.status(403).json({
        success: false,
        message: 'Invalid admin creation key'
      })
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email })
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      })
    }

    // Create admin user
    const admin = await User.createAdmin({
      firstName,
      lastName,
      email,
      phone,
      password
    })

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      user: admin.toJSON()
    })

  } catch (error) {
    console.error('Admin creation error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create admin user'
    })
  }
})

// POST /api/auth/init-admin - Initialize admin user (one-time setup)
// GET or POST /api/auth/init-admin - Initialize admin user (one-time setup)
router.get('/init-admin', async (req, res) => {
  try {
    const adminKey = req.query.adminKey
    
    // Check admin creation key
    if (adminKey !== process.env.ADMIN_CREATION_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Invalid admin creation key'
      })
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      email: 'srikainariayyappatemple@gmail.com' 
    })
    
    if (existingAdmin) {
      return res.status(200).json({
        success: true,
        message: 'Admin user already exists',
        credentials: {
          email: 'srikainariayyappatemple@gmail.com',
          password: 'Use existing password: Skat@666'
        }
      })
    }

    // Create admin user
    const admin = await User.create({
      firstName: 'Temple',
      lastName: 'Admin',
      email: 'srikainariayyappatemple@gmail.com',
      phone: '9999999999',
      password: 'Skat@666',
      role: 'admin',
      isActive: true
    })

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      credentials: {
        email: 'srikainariayyappatemple@gmail.com',
        password: 'Skat@666'
      }
    })
  } catch (error) {
    console.error('Init admin error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to initialize admin user',
      error: error.message
    })
  }
})

export default router