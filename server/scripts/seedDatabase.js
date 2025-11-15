import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import User from '../models/User.js'
import Pooja from '../models/Pooja.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') })

// Admin user data
const adminData = {
  firstName: 'Admin',
  lastName: 'Temple',
  email: 'admin@temple.com',
  phone: '9999999999',
  password: 'admin123',
  role: 'admin',
  isActive: true
}

// Pooja data
const poojas = [
  {
    name: 'Ganapathi Homam',
    malayalamName: 'ഗണപതി ഹോമം',
    description: 'Lord Ganesha homam for removing obstacles and bringing prosperity',
    duration: '2-3 hours',
    price: 2500,
    category: 'Special',
    imageUrl: '/images/ganapathi-homam.jpg',
    requirements: ['Flowers', 'Fruits', 'Coconut', 'Ghee'],
    benefits: ['Removes obstacles', 'Brings prosperity', 'Success in new ventures']
  },
  {
    name: 'Navagraha Pooja',
    malayalamName: 'നവഗ്രഹ പൂജ',
    description: 'Worship of nine planets to reduce malefic effects and enhance positive influences',
    duration: '3-4 hours',
    price: 3500,
    category: 'Special',
    imageUrl: '/images/navagraha-pooja.jpg',
    requirements: ['Nine types of flowers', 'Nine types of grains', 'Colored cloths'],
    benefits: ['Planetary peace', 'Health improvement', 'Career growth']
  },
  {
    name: 'Satyanarayana Pooja',
    malayalamName: 'സത്യനാരായണ പൂജ',
    description: 'Sacred ritual dedicated to Lord Vishnu for fulfillment of wishes',
    duration: '2-3 hours',
    price: 2000,
    category: 'Special',
    imageUrl: '/images/satyanarayana-pooja.jpg',
    requirements: ['Banana leaves', 'Panchamritham', 'Flowers', 'Fruits'],
    benefits: ['Wish fulfillment', 'Family harmony', 'Spiritual growth']
  },
  {
    name: 'Lakshmi Pooja',
    malayalamName: 'ലക്ഷ്മി പൂജ',
    description: 'Worship of Goddess Lakshmi for wealth and prosperity',
    duration: '1-2 hours',
    price: 1500,
    category: 'Special',
    imageUrl: '/images/lakshmi-pooja.jpg',
    requirements: ['Lotus flowers', 'Gold/Silver coins', 'Turmeric', 'Kumkum'],
    benefits: ['Financial prosperity', 'Business success', 'Wealth accumulation']
  },
  {
    name: 'Durga Pooja',
    malayalamName: 'ദുർഗ്ഗ പൂജ',
    description: 'Worship of Goddess Durga for protection and strength',
    duration: '2-3 hours',
    price: 2500,
    category: 'Festival',
    imageUrl: '/images/durga-pooja.jpg',
    requirements: ['Red flowers', 'Vermillion', 'Incense', 'Fruits'],
    benefits: ['Protection from evil', 'Inner strength', 'Victory over enemies']
  },
  {
    name: 'Ayyappa Pooja',
    malayalamName: 'അയ്യപ്പ പൂജ',
    description: 'Special worship of Lord Ayyappa',
    duration: '2 hours',
    price: 1800,
    category: 'Daily',
    imageUrl: '/images/ayyappa-pooja.jpg',
    requirements: ['Ghee', 'Coconut', 'Jaggery', 'Black sesame'],
    benefits: ['Spiritual enlightenment', 'Self-discipline', 'Peace of mind']
  },
  {
    name: 'Rudra Abhishekam',
    malayalamName: 'രുദ്ര അഭിഷേകം',
    description: 'Sacred bathing ritual for Lord Shiva',
    duration: '1-2 hours',
    price: 2000,
    category: 'Special',
    imageUrl: '/images/rudra-abhishekam.jpg',
    requirements: ['Milk', 'Honey', 'Ghee', 'Bilva leaves'],
    benefits: ['Health and longevity', 'Mental peace', 'Removal of sins']
  },
  {
    name: 'Hanuman Pooja',
    malayalamName: 'ഹനുമാൻ പൂജ',
    description: 'Worship of Lord Hanuman for strength and courage',
    duration: '1 hour',
    price: 1000,
    category: 'Daily',
    imageUrl: '/images/hanuman-pooja.jpg',
    requirements: ['Sindoor', 'Jasmine oil', 'Red flowers', 'Bananas'],
    benefits: ['Physical strength', 'Courage', 'Protection from negative energies']
  },
  {
    name: 'Sudarshana Homam',
    malayalamName: 'സുദർശന ഹോമം',
    description: 'Fire ritual for Lord Sudarshana Chakra for protection',
    duration: '3-4 hours',
    price: 4000,
    category: 'Special',
    imageUrl: '/images/sudarshana-homam.jpg',
    requirements: ['Sacred fire materials', 'Ghee', 'Herbs', 'Grains'],
    benefits: ['Protection from enemies', 'Removal of black magic', 'Health protection']
  },
  {
    name: 'Mrityunjaya Homam',
    malayalamName: 'മൃത്യുഞ്ജയ ഹോമം',
    description: 'Powerful homam for health and longevity',
    duration: '3-4 hours',
    price: 3500,
    category: 'Special',
    imageUrl: '/images/mrityunjaya-homam.jpg',
    requirements: ['Bilva leaves', 'White flowers', 'Ghee', 'Sacred herbs'],
    benefits: ['Health improvement', 'Longevity', 'Recovery from illness']
  },
  {
    name: 'Kalasam Pooja',
    malayalamName: 'കലശം പൂജ',
    description: 'Sacred pot worship for auspicious beginnings',
    duration: '1 hour',
    price: 800,
    category: 'Daily',
    imageUrl: '/images/kalasam-pooja.jpg',
    requirements: ['Copper pot', 'Mango leaves', 'Coconut', 'Sacred water'],
    benefits: ['Auspicious start', 'Positive energy', 'Divine blessings']
  },
  {
    name: 'Archana',
    malayalamName: 'അർച്ചന',
    description: 'Daily worship with chanting of 108 names',
    duration: '30 minutes',
    price: 500,
    category: 'Daily',
    imageUrl: '/images/archana.jpg',
    requirements: ['Flowers', 'Incense', 'Camphor'],
    benefits: ['Daily blessings', 'Peace of mind', 'Spiritual connection']
  },
  {
    name: 'Abhishekam',
    malayalamName: 'അഭിഷേകം',
    description: 'Sacred bathing ceremony for the deity',
    duration: '1 hour',
    price: 1200,
    category: 'Daily',
    imageUrl: '/images/abhishekam.jpg',
    requirements: ['Milk', 'Honey', 'Ghee', 'Panchamritham'],
    benefits: ['Purification', 'Divine grace', 'Prosperity']
  },
  {
    name: 'Vishu Kani',
    malayalamName: 'വിഷു കണി',
    description: 'Special arrangement for Vishu festival',
    duration: '1 hour',
    price: 1500,
    category: 'Festival',
    imageUrl: '/images/vishu-kani.jpg',
    requirements: ['Gold ornaments', 'Fruits', 'Vegetables', 'Mirror'],
    benefits: ['Prosperity for the year', 'Good fortune', 'Abundance']
  },
  {
    name: 'Onam Sadya Pooja',
    malayalamName: 'ഓണം സദ്യ പൂജ',
    description: 'Special Onam festival worship',
    duration: '2 hours',
    price: 2000,
    category: 'Festival',
    imageUrl: '/images/onam-pooja.jpg',
    requirements: ['Flowers', 'Pookalam materials', 'Traditional items'],
    benefits: ['Festival blessings', 'Family unity', 'Prosperity']
  }
]

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...')
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    })
    
    console.log('✅ Connected to MongoDB Atlas')
    
    // Create admin user
    console.log('\n👤 Creating admin user...')
    const existingAdmin = await User.findOne({ email: adminData.email })
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists')
    } else {
      const admin = await User.create(adminData)
      console.log('✅ Admin user created successfully')
      console.log('📧 Email:', adminData.email)
      console.log('🔑 Password:', adminData.password)
    }
    
    // Seed poojas
    console.log('\n🕉️  Seeding poojas...')
    
    for (const poojaData of poojas) {
      const existingPooja = await Pooja.findOne({ name: poojaData.name })
      
      if (existingPooja) {
        console.log(`ℹ️  ${poojaData.name} already exists`)
      } else {
        await Pooja.create(poojaData)
        console.log(`✅ Created: ${poojaData.name}`)
      }
    }
    
    // Display summary
    const totalPoojas = await Pooja.countDocuments()
    const totalUsers = await User.countDocuments()
    const totalAdmins = await User.countDocuments({ role: 'admin' })
    
    console.log('\n📊 Database Summary:')
    console.log('='.repeat(50))
    console.log(`Total Poojas: ${totalPoojas}`)
    console.log(`Total Users: ${totalUsers}`)
    console.log(`Total Admins: ${totalAdmins}`)
    
    console.log('\n🔐 Admin Login Credentials:')
    console.log('='.repeat(50))
    console.log(`Email: ${adminData.email}`)
    console.log(`Password: ${adminData.password}`)
    
    console.log('\n✅ Database seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('\n🔌 Database connection closed')
    process.exit(0)
  }
}

seedDatabase()
