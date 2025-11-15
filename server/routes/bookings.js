import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      userId: req.body.userId || null
    });

    await booking.save();
    res.status(201).json({
      success: true,
      booking,
      message: 'Booking created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get all bookings (for admin)
router.get('/all', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all bookings for a user
router.get('/user', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }
    
    const bookings = await Booking.find({ userId })
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get a single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = req.body.status;
    await booking.save();

    res.json({
      success: true,
      booking,
      message: 'Booking status updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

export default router; 