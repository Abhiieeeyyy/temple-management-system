import express from 'express'
import { Message } from '../models/Message.js'
import { validateMessage } from '../middleware/validation.js'

const router = express.Router()

// Create a new message
router.post('/', async (req, res) => {
  console.log('Received message submission:', req.body)
  
  try {
    const message = new Message({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
      userId: req.body.userId || null,
      status: 'new',
      createdAt: new Date()
    })

    console.log('Attempting to save message to database:', message)
    
    const savedMessage = await message.save()
    console.log('Message successfully saved to database:', savedMessage)
    
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
      data: savedMessage 
    })
  } catch (error) {
    console.error('Error saving message to database:', {
      error: error.message,
      stack: error.stack,
      messageData: req.body
    })
    
    // Check for specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid message data',
        errors: Object.values(error.errors).map(err => err.message)
      })
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Duplicate message detected'
      })
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// Get all messages (admin only)
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all messages from database')
    const messages = await Message.find().sort({ createdAt: -1 })
    console.log(`Successfully retrieved ${messages.length} messages`)
    res.json({ 
      success: true, 
      data: messages 
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch messages' 
    })
  }
})

// Update message status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body
    console.log(`Updating message ${req.params.id} status to ${status}`)
    
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    
    if (!message) {
      console.log(`Message ${req.params.id} not found`)
      return res.status(404).json({ message: 'Message not found' })
    }
    
    console.log(`Successfully updated message ${req.params.id}`)
    res.json(message)
  } catch (error) {
    console.error('Error updating message:', error)
    res.status(500).json({ 
      message: 'Error updating message',
      error: error.message
    })
  }
})

export default router 