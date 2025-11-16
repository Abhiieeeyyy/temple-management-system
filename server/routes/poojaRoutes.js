import express from 'express'
import Pooja from '../models/Pooja.js'
import Booking from '../models/Booking.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Initialize sample poojas
router.post('/init', async (req, res) => {
  try {
    // First, clear existing poojas
    await Pooja.deleteMany({})

    // Sample poojas data
    const samplePoojas = [
      {
        name: 'Ganapathi Homam',
        description: 'A powerful homam dedicated to Lord Ganesha to remove obstacles and bring success in all endeavors. This sacred fire ritual helps in clearing negative energies and attracting positive vibrations.',
        duration: '2 hours',
        price: 50,
        category: 'Special',
        imageUrl: '/images/ganapathi.png',
        requirements: [
          'Fresh flowers',
          'Coconut',
          'Ghee',
          'Sandalwood paste'
        ],
        benefits: [
          'Removes obstacles and challenges',
          'Brings success in new ventures',
          'Enhances wisdom and knowledge',
          'Protects from negative energies'
        ],
        isAvailable: true
      },
      {
        name: 'Daily Pooja',
        description: 'Regular daily worship service performed for the deities. This pooja includes abhishekam, archana, and deeparadhana, ensuring daily blessings and protection.',
        duration: '1 hour',
        price: 150,
        category: 'Daily',
        imageUrl: '/images/daily-pooja.jpg',
        requirements: [
          'Flowers',
          'Fruits',
          'Camphor',
          'Incense sticks'
        ],
        benefits: [
          'Daily divine blessings',
          'Peace and prosperity',
          'Family harmony',
          'Spiritual growth'
        ],
        isAvailable: true
      },
      {
        name: 'Naga Pooja',
        description: 'Special pooja dedicated to the Naga Devatas (Serpent Gods) to seek protection from sarpa dosha and to bring peace and prosperity. This pooja helps in removing negative karmic effects.',
        duration: '1.5 hours',
        price: 50,
        category: 'Special',
        imageUrl: '/images/naga-pooja.jpg',
        requirements: [
          'Milk',
          'Turmeric',
          'Kumkum',
          'Flowers'
        ],
        benefits: [
          'Removes sarpa dosha',
          'Protection from snake-related issues',
          'Brings peace and harmony',
          'Relieves ancestral curses'
        ],
        isAvailable: true
      }
    ]

    // Insert sample poojas
    const insertedPoojas = await Pooja.insertMany(samplePoojas)

    res.status(201).json({
      success: true,
      message: 'Sample poojas initialized successfully',
      poojas: insertedPoojas
    })
  } catch (error) {
    console.error('Error initializing poojas:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to initialize sample poojas'
    })
  }
})

// GET /api/poojas - List all poojas
router.get('/', async (req, res) => {
  try {
    const poojas = await Pooja.find()
    res.json(poojas)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch poojas' })
  }
})

// Get a specific pooja
router.get('/:id', async (req, res) => {
  try {
    const pooja = await Pooja.findById(req.params.id)
    if (!pooja) {
      return res.status(404).json({ 
        success: false,
        message: 'Pooja not found' 
      })
    }
    res.json({
      success: true,
      pooja
    })
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    })
  }
})

// Create a new pooja - Admin only
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  const pooja = new Pooja({
    name: req.body.name,
    type: req.body.type,
    duration: req.body.duration,
    price: req.body.price,
    description: req.body.description,
    schedule: req.body.schedule,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    requirements: req.body.requirements,
    benefits: req.body.benefits,
    isAvailable: req.body.isAvailable !== undefined ? req.body.isAvailable : true
  })

  try {
    const newPooja = await pooja.save()
    res.status(201).json({
      success: true,
      pooja: newPooja
    })
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    })
  }
})

// Update a pooja - Admin only
router.patch('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const pooja = await Pooja.findById(req.params.id)
    if (!pooja) {
      return res.status(404).json({ 
        success: false,
        message: 'Pooja not found' 
      })
    }

    Object.keys(req.body).forEach(key => {
      pooja[key] = req.body[key]
    })

    const updatedPooja = await pooja.save()
    res.json({
      success: true,
      pooja: updatedPooja
    })
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    })
  }
})

// Delete a pooja - Admin only
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const pooja = await Pooja.findById(req.params.id)
    if (!pooja) {
      return res.status(404).json({ 
        success: false,
        message: 'Pooja not found' 
      })
    }

    await pooja.deleteOne()
    res.json({ 
      success: true,
      message: 'Pooja deleted' 
    })
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    })
  }
})

// POST /api/poojas/book - Book a pooja (no authentication required)
router.post('/book', async (req, res) => {
  try {
    const {
      poojaId,
      poojaName,
      name,
      birthStar,
      mobileNumber,
      date,
      time,
      additionalInfo,
      price
    } = req.body

    if (!poojaId || !date || !time || !name || !birthStar || !mobileNumber) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required booking information' 
      })
    }

    const booking = new Booking({
      poojaId,
      poojaName,
      name,
      birthStar,
      mobileNumber,
      date,
      time,
      additionalInfo,
      price,
      status: 'pending'
    })

    await booking.save()
    res.status(201).json({ 
      success: true,
      message: 'Booking successful',
      booking 
    })
  } catch (err) {
    console.error('Booking error:', err)
    res.status(500).json({ 
      success: false,
      message: 'Failed to book pooja' 
    })
  }
})

// GET /api/poojas/bookings - Get all bookings (no authentication required)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('pooja')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' })
  }
})

export default router 