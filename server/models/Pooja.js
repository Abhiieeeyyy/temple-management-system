import mongoose from 'mongoose'

const poojaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  malayalamName: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  duration: {
    type: String,
    required: false,
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: false,
    default: '/images/pooja.jpg'
  },
  category: {
    type: String,
    required: false,
    default: 'Custom',
    enum: ['Daily', 'Special', 'Festival', 'Custom']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  requirements: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Pooja = mongoose.model('Pooja', poojaSchema)

export default Pooja