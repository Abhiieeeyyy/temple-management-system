import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import User from '../models/User.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') })

const newAdminData = {
  email: 'srikainariayyappatemple@gmail.com',
  password: 'Skat@666'
}

async function updateAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...')
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    })
    
    console.log('✅ Connected to MongoDB Atlas')
    
    // Find and delete old admin
    console.log('\n🗑️  Removing old admin accounts...')
    const oldAdmins = await User.find({ role: 'admin' })
    
    if (oldAdmins.length > 0) {
      await User.deleteMany({ role: 'admin' })
      console.log(`✅ Removed ${oldAdmins.length} old admin account(s)`)
    } else {
      console.log('ℹ️  No existing admin accounts found')
    }
    
    // Create new admin
    console.log('\n👤 Creating new admin user...')
    const admin = await User.create({
      firstName: 'Temple',
      lastName: 'Admin',
      email: newAdminData.email,
      phone: '9999999999',
      password: newAdminData.password,
      role: 'admin',
      isActive: true
    })
    
    console.log('✅ Admin user created successfully')
    
    // Display summary
    const totalUsers = await User.countDocuments()
    const totalAdmins = await User.countDocuments({ role: 'admin' })
    
    console.log('\n📊 Database Summary:')
    console.log('='.repeat(50))
    console.log(`Total Users: ${totalUsers}`)
    console.log(`Total Admins: ${totalAdmins}`)
    
    console.log('\n🔐 New Admin Login Credentials:')
    console.log('='.repeat(50))
    console.log(`Email: ${newAdminData.email}`)
    console.log(`Password: ${newAdminData.password}`)
    
    console.log('\n✅ Admin credentials updated successfully!')
    
  } catch (error) {
    console.error('❌ Error updating admin:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('\n🔌 Database connection closed')
    process.exit(0)
  }
}

updateAdmin()
