import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables FIRST
dotenv.config({ path: path.join(__dirname, '.env') })

// Import middleware
import { errorHandler } from './middleware/errorHandler.js'
import { stream } from './utils/logger.js'

// Routes (imported AFTER dotenv.config)
import poojaRoutes from './routes/poojaRoutes.js'
import bookingRoutes from './routes/bookings.js'
import galleryRoutes from './routes/galleryRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import donationRoutes from './routes/donationRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

// Payment routes will be imported dynamically after env vars are loaded

// Verify environment variables
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env file')
  process.exit(1)
}

const app = express()

// Security middleware
app.use(helmet())
app.use(cors())
app.use(compression())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Request parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging
app.use(morgan('combined', { stream }))

// Serve static files with proper MIME types
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), {
  setHeaders: (res, path) => {
    // Set proper MIME types for video files
    if (path.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4')
    } else if (path.endsWith('.webm')) {
      res.setHeader('Content-Type', 'video/webm')
    } else if (path.endsWith('.mov')) {
      res.setHeader('Content-Type', 'video/quicktime')
    } else if (path.endsWith('.avi')) {
      res.setHeader('Content-Type', 'video/x-msvideo')
    } else if (path.endsWith('.mkv')) {
      res.setHeader('Content-Type', 'video/x-matroska')
    }
    // Enable range requests for video streaming
    res.setHeader('Accept-Ranges', 'bytes')
    // Add CORS headers for video access
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  }
}))

// Routes
app.use('/api/poojas', poojaRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/donations', donationRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

// Payment routes will be loaded dynamically after env verification

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Initialize poojas
const initializePoojas = async () => {
  try {
    const PORT = process.env.PORT || 5011
    const response = await axios.post(`http://localhost:${PORT}/api/poojas/init`)
    console.log('Poojas initialized:', response.data.message)
  } catch (error) {
    console.error('Error initializing poojas:', error.message)
  }
}

// Error handling
app.use(errorHandler)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
})
  .then(async () => {
    console.log('Connected to MongoDB')
    
    // Load payment routes dynamically after env vars are confirmed loaded
    try {
      const { default: paymentRoutes } = await import('./routes/paymentRoutes.js')
      app.use('/api/payments', paymentRoutes)
      console.log('✅ Payment routes loaded successfully')
    } catch (error) {
      console.error('❌ Error loading payment routes:', error.message)
    }
    
    // Initialize poojas after successful database connection
    // await initializePoojas() // COMMENTED OUT - Only run manually when needed
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })

// Start server
const PORT = process.env.PORT || 5011
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`MongoDB URI: ${process.env.MONGODB_URI}`)
})

// Handle port already in use error
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use`)
    console.log('💡 Try one of these solutions:')
    console.log('   1. Kill existing process: taskkill /f /im node.exe')
    console.log('   2. Use different port: PORT=5012 npm start')
    console.log('   3. Close other terminal windows running the server')
    process.exit(1)
  } else {
    console.error('Server error:', error)
    process.exit(1)
  }
})