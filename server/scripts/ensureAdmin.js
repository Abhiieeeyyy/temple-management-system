import mongoose from 'mongoose'
import User from '../models/User.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') })

const ADMIN_EMAIL = 'srikainariayyappatemple@gmail.com'
const ADMIN_PASSWORD = 'Skat@666'

async function ensureAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    })
    
    console.log('✅ Connected to MongoDB')
    
    // Check if admin exists
    let admin = await User.findOne({ email: ADMIN_EMAIL })
    
    if (!admin) {
      console.log('👤 Admin user not found. Creating...')
      admin = await User.create({
        firstName: 'Temple',
        lastName: 'Admin',
        email: ADMIN_EMAIL,
        phone: '9999999999',
        password: ADMIN_PASSWORD,
        role: 'admin',
        isActive: true
      })
      console.log('✅ Admin user created successfully')
    } else {
      console.log('ℹ️  Admin user already exists')
      
      // Update admin to ensure role is set correctly
      if (admin.role !== 'admin') {
        console.log('🔧 Updating admin role...')
        admin.role = 'admin'
        await admin.save()
        console.log('✅ Admin role updated')
      }
      
      // Update password if needed (only if it's not the correct one)
      const isPasswordCorrect = await admin.comparePassword(ADMIN_PASSWORD)
      if (!isPasswordCorrect) {
        console.log('🔧 Updating admin password...')
        admin.password = ADMIN_PASSWORD
        await admin.save()
        console.log('✅ Admin password updated')
      }
    }
    
    // Verify admin credentials
    console.log('\n🔐 Verifying admin credentials...')
    const testAdmin = await User.findOne({ email: ADMIN_EMAIL }).select('+password')
    const passwordValid = await testAdmin.comparePassword(ADMIN_PASSWORD)
    const roleValid = testAdmin.role === 'admin'
    
    if (passwordValid && roleValid) {
      console.log('✅ Admin credentials verified successfully')
      console.log(`📧 Email: ${ADMIN_EMAIL}`)
      console.log(`🔑 Password: ${ADMIN_PASSWORD}`)
      console.log(`👤 Role: ${testAdmin.role}`)
    } else {
      console.error('❌ Admin credentials verification failed')
      console.error(`Password valid: ${passwordValid}`)
      console.error(`Role valid: ${roleValid}`)
    }
    
    await mongoose.connection.close()
    console.log('\n✅ Admin user check completed')
    process.exit(0)
    
  } catch (error) {
    console.error('❌ Error ensuring admin user:', error)
    process.exit(1)
  }
}

ensureAdmin()

