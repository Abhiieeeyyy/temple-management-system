import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  poojaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pooja',
    required: true
  },
  poojaName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  birthStar: {
    type: String,
    required: true
  },
  deity: {
    type: String,
    enum: ['ayyappa', 'bhagavathi'],
    default: 'ayyappa'
  },
  mobileNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String
  },
  additionalInfo: {
    type: String
  },
  price: {
    type: Number
  },
  address: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  },
  bookedForPerson: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['online'],
    default: 'online'
  },
  paymentId: {
    type: String
  },
  orderId: {
    type: String
  },
  isPartOfMultipleBooking: {
    type: Boolean,
    default: false
  },
  multipleBookingNote: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking; 