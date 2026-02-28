
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import Pooja from '../models/Pooja.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') })

const mainPoojas = [
    {
        name: 'Ganapathi Homam',
        malayalamName: 'ഗണപതി ഹോമം',
        englishName: 'Ganapathi Homam',
        price: 300,
        duration: '5:30am - 6:30am',
        description: 'A powerful ritual dedicated to Lord Ganesha to remove obstacles and ensure success in all endeavors.',
        imageUrl: '/images/ganapathi-homam.jpg',
        category: 'Daily',
        benefits: [
            'Removes obstacles from life',
            'Brings success in new ventures',
            'Enhances wisdom and knowledge',
            'Promotes spiritual growth'
        ],
        isAvailable: true
    },
    {
        name: 'Daily Pooja',
        malayalamName: 'ദൈനിക പൂജ',
        englishName: 'Daily Pooja',
        price: 150,
        duration: '8:00 am',
        description: 'A comprehensive pooja to appease all nine planets and balance their influences in your life.',
        imageUrl: '/images/daily-pooja.jpg',
        category: 'Daily',
        benefits: [
            'Balances planetary influences',
            'Reduces negative planetary effects',
            'Brings harmony in life',
            'Enhances overall well-being'
        ],
        isAvailable: true
    },
    {
        name: 'Naga Pooja',
        malayalamName: 'നാഗ പൂജ',
        englishName: 'Naga Pooja',
        price: 50,
        duration: '9:00am',
        description: 'A special pooja dedicated to Goddess Lakshmi and Lord Kubera for wealth and prosperity.',
        imageUrl: '/images/nagapooja.jpg',
        category: 'Special',
        benefits: [
            'Attracts wealth and prosperity',
            'Removes financial obstacles',
            'Enhances business success',
            'Brings material and spiritual abundance'
        ],
        isAvailable: true
    },
    {
        name: 'Chuttu Vilakku',
        malayalamName: 'ചുറ്റുവിളക്ക്',
        englishName: 'Chuttu Vilakku',
        price: 3000,
        duration: '6:00pm',
        description: 'A beautiful evening lamp lighting ceremony that brings divine light and blessings to your home and family.',
        imageUrl: '/images/vilakku.jpg',
        category: 'Daily',
        benefits: [
            'Brings divine light and blessings',
            'Removes darkness and obstacles',
            'Enhances spiritual energy',
            'Promotes peace and prosperity'
        ],
        isAvailable: true
    }
]

const seedPoojas = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')

        for (const pooja of mainPoojas) {
            // Check if exists
            const exists = await Pooja.findOne({ name: pooja.name })
            if (!exists) {
                await Pooja.create(pooja)
                console.log(`Created: ${pooja.name}`)
            } else {
                console.log(`Exists: ${pooja.name}`)
            }
        }

        console.log('Seeding complete')
        process.exit(0)
    } catch (error) {
        console.error('Error seeding:', error)
        process.exit(1)
    }
}

seedPoojas()
