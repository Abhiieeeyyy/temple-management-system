import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { firstName, secondName, phone, email, gender, dateOfBirth, address, password } = req.body
    if (!firstName || !secondName || !phone || !email || !gender || !dateOfBirth || !address || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Age validation - must be 18 or older
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age < 18) {
      return res.status(400).json({ message: 'You must be 18 years or older to register' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      firstName,
      secondName,
      phone,
      email,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      address,
      password: hashedPassword
    })
    await user.save()

    // Generate token
    const token = jwt.sign(
      { 
        userId: user._id,
        isAdmin: false
      }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '1d' }
    )

    // Return token and user data
    res.status(201).json({ 
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        isAdmin: false
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('Login attempt:', { email, password: password ? '[PROVIDED]' : '[MISSING]' })

    // Check for admin credentials first
    if (email === 'srikainariayyappatemple@gmail.com' && password === 'skat369') {
      console.log('Admin login successful')
      const token = jwt.sign(
        { 
          userId: 'admin',
          isAdmin: true 
        }, 
        process.env.JWT_SECRET || 'secret', 
        { expiresIn: '1d' }
      )
      return res.json({
        token,
        user: {
          _id: 'admin',
          firstName: 'Admin',
          secondName: 'User',
          email: 'srikainariayyappatemple@gmail.com',
          isAdmin: true
        }
      })
    }

    // Regular user login
    const user = await User.findOne({ email })
    if (!user) {
      console.log('User not found:', email)
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log('Password mismatch for user:', email)
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    console.log('Regular user login successful:', email)
    const token = jwt.sign(
      { 
        userId: user._id,
        isAdmin: false
      }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '1d' }
    )
    res.json({ 
      token, 
      user: {
        _id: user._id,
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        isAdmin: false
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: error.message })
  }
})

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    
    if (decoded.userId === 'admin') {
      return res.json({
        _id: 'admin',
        firstName: 'Admin',
        secondName: 'User',
        email: 'srikainariayyappatemple@gmail.com',
        isAdmin: true
      })
    }

    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      isAdmin: user.isAdmin
    })
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
})

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { firstName, secondName, phone, email, gender, dateOfBirth, address, password } = req.body;
    const updateData = { firstName, secondName, phone, email, gender, dateOfBirth, address };

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users (Admin only - for notifications)
router.get('/all/list', async (req, res) => {
  try {
    const users = await User.find({}, 'firstName lastName email _id').sort({ firstName: 1 })
    res.json({ success: true, users })
  } catch (error) {
    console.error('Get all users error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch users' })
  }
})

export default router