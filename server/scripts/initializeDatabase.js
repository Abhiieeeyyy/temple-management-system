import mongoose from 'mongoose'
import User from '../models/User.js'
import Gallery from '../models/Gallery.js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Database initialization function
const initializeDatabase = async () => {
  try {
    console.log('🔄 Starting database initialization...')
    
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/temple_pooja'
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    })
    
    console.log('✅ Connected to MongoDB:', mongoose.connection.name)
    
    // Initialize Users collection
    await initializeUsersCollection()
    
    // Initialize Gallery collection
    await initializeGalleryCollection()
    
    // Initialize other collections
    await initializeOtherCollections()
    
    console.log('🎉 Database initialization completed successfully!')
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  }
}

// Initialize Users collection with indexes and constraints
const initializeUsersCollection = async () => {
  try {
    console.log('📋 Initializing Users collection...')
    
    // Create the collection if it doesn't exist
    const collections = await mongoose.connection.db.listCollections().toArray()
    const userCollectionExists = collections.some(col => col.name === 'users')
    
    if (!userCollectionExists) {
      await mongoose.connection.db.createCollection('users')
      console.log('✅ Users collection created')
    } else {
      console.log('ℹ️  Users collection already exists')
    }
    
    // Ensure unique index on email
    await User.collection.createIndex({ email: 1 }, { unique: true })
    console.log('✅ Unique index created on email field')
    
    // Create additional indexes for better performance
    await User.collection.createIndex({ createdAt: 1 })
    await User.collection.createIndex({ isAdmin: 1 })
    await User.collection.createIndex({ firstName: 1, secondName: 1 })
    
    console.log('✅ Additional indexes created for Users collection')
    
    // Check if admin user exists, if not create one
    await createAdminUser()
    
  } catch (error) {
    console.error('❌ Error initializing Users collection:', error)
  }
}

// Initialize Gallery collection
const initializeGalleryCollection = async () => {
  try {
    console.log('🖼️  Initializing Gallery collection...')
    
    const collections = await mongoose.connection.db.listCollections().toArray()
    const galleryCollectionExists = collections.some(col => col.name === 'galleries')
    
    if (!galleryCollectionExists) {
      await mongoose.connection.db.createCollection('galleries')
      console.log('✅ Gallery collection created')
    } else {
      console.log('ℹ️  Gallery collection already exists')
    }
    
    // Create indexes for Gallery collection
    await Gallery.collection.createIndex({ createdAt: -1 })
    await Gallery.collection.createIndex({ category: 1 })
    await Gallery.collection.createIndex({ mediaType: 1 })
    
    console.log('✅ Indexes created for Gallery collection')
    
  } catch (error) {
    console.error('❌ Error initializing Gallery collection:', error)
  }
}

// Initialize other collections (Bookings, Donations, Messages, Notifications)
const initializeOtherCollections = async () => {
  try {
    console.log('📦 Initializing other collections...')
    
    const collectionsToCreate = [
      'bookings',
      'donations', 
      'messages',
      'notifications',
      'poojas'
    ]
    
    const existingCollections = await mongoose.connection.db.listCollections().toArray()
    const existingNames = existingCollections.map(col => col.name)
    
    for (const collectionName of collectionsToCreate) {
      if (!existingNames.includes(collectionName)) {
        await mongoose.connection.db.createCollection(collectionName)
        console.log(`✅ ${collectionName} collection created`)
      } else {
        console.log(`ℹ️  ${collectionName} collection already exists`)
      }
    }
    
  } catch (error) {
    console.error('❌ Error initializing other collections:', error)
  }
}

// Create admin user if it doesn't exist
const createAdminUser = async () => {
  try {
    console.log('👤 Checking for admin user...')
    
    const adminEmail = 'srikainariayyappatemple@gmail.com'
    const existingAdmin = await User.findOne({ email: adminEmail })
    
    if (!existingAdmin) {
      // Import bcrypt for password hashing
      const bcrypt = await import('bcryptjs')
      
      const adminUser = new User({
        firstName: 'Admin',
        secondName: 'User',
        email: adminEmail,
        phone: '+91-9999999999',
        gender: 'Other',
        dateOfBirth: new Date('1990-01-01'),
        address: 'Temple Administration Office',
        password: await bcrypt.default.hash('skat369', 10),
        isAdmin: true
      })
      
      await adminUser.save()
      console.log('✅ Admin user created successfully')
      console.log('📧 Admin Email:', adminEmail)
      console.log('🔑 Admin Password: skat369')
    } else {
      console.log('ℹ️  Admin user already exists')
    }
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  }
}

// Display database statistics
const displayDatabaseStats = async () => {
  try {
    console.log('\n📊 Database Statistics:')
    console.log('='.repeat(50))
    
    const stats = await mongoose.connection.db.stats()
    console.log(`Database: ${stats.db}`)
    console.log(`Collections: ${stats.collections}`)
    console.log(`Data Size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`)
    
    // Count documents in each collection
    const userCount = await User.countDocuments()
    const galleryCount = await Gallery.countDocuments()
    
    console.log(`\n📈 Document Counts:`)
    console.log(`Users: ${userCount}`)
    console.log(`Gallery Items: ${galleryCount}`)
    
  } catch (error) {
    console.error('❌ Error fetching database stats:', error)
  }
}

// Main execution
const main = async () => {
  await initializeDatabase()
  await displayDatabaseStats()
  
  console.log('\n🔐 Admin Login Credentials:')
  console.log('Email: srikainariayyappatemple@gmail.com')
  console.log('Password: skat369')
  
  // Close connection
  await mongoose.connection.close()
  console.log('\n✅ Database connection closed')
  process.exit(0)
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('💥 Script failed:', error)
    process.exit(1)
  })
}

export default initializeDatabase