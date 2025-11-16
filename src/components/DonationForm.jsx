import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  initializeRazorpay, 
  createRazorpayOrder, 
  openRazorpayCheckout, 
  verifyPayment, 
  RAZORPAY_CONFIG
} from '../utils/razorpay'
import '../styles/DonationForm.css'

const DonationForm = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
    amount: '',
    phoneNumber: user?.phone || '',
    purpose: 'general',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      // Initialize Razorpay
      const razorpayLoaded = await initializeRazorpay()
      if (!razorpayLoaded) {
        throw new Error('Razorpay SDK failed to load')
      }

      // Create order
      const orderData = {
        amount: parseFloat(formData.amount) * 100, // Convert to paise
        currency: 'INR',
        receipt: `donation_${Date.now()}`,
        notes: {
          name: formData.name,
          phone: formData.phoneNumber,
          purpose: formData.purpose,
          message: formData.message,
          type: 'donation'
        }
      }

      const order = await createRazorpayOrder(orderData)
      console.log('Order creation result:', order)
      
      if (!order.success) {
        const errorMsg = order.description || order.error || order.message || 'Failed to create payment order'
        console.error('Order creation failed:', errorMsg)
        throw new Error(errorMsg)
      }

      // Configure Razorpay options
      const options = {
        ...RAZORPAY_CONFIG,
        order_id: order.orderId,
        amount: orderData.amount,
        prefill: {
          name: formData.name,
          email: user?.email || '',
          contact: formData.phoneNumber
        },
        notes: orderData.notes
      }

      // Open Razorpay checkout
      const paymentResponse = await openRazorpayCheckout(options)
      
      // Verify payment
      const verificationData = {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        donationData: formData
      }

      const verification = await verifyPayment(verificationData)
      
      if (verification.success) {
        // Save donation to database
        const donationRecord = {
          name: formData.name,
          amount: parseFloat(formData.amount),
          phoneNumber: formData.phoneNumber,
          purpose: formData.purpose,
          message: formData.message,
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
          status: 'completed'
        }

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011'
        const saveResponse = await fetch(`${API_URL}/api/donations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(donationRecord)
        })

        const saveData = await saveResponse.json()

        if (saveData.success) {
          setSuccess(`Thank you for your generous donation of ₹${formData.amount}! Your donation has been recorded. Payment ID: ${paymentResponse.razorpay_payment_id}`)
          
          // Reset form
          setFormData({
            name: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
            amount: '',
            phoneNumber: user?.phone || '',
            purpose: 'general',
            message: ''
          })
        } else {
          throw new Error('Payment successful but failed to record donation. Please contact support.')
        }
      } else {
        throw new Error('Payment verification failed')
      }

    } catch (err) {
      console.error('Donation payment error:', err)
      if (err.message === 'Payment cancelled by user') {
        setError('Payment was cancelled. Please try again if you wish to donate.')
      } else {
        setError(err.message || 'Payment failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="donation-form-container">
      <h2>Make a Donation</h2>
      <p className="donation-intro">
        Your generous contribution helps us maintain our temple and continue providing spiritual services to the community.
      </p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="donation-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Donation Amount (₹) *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            disabled={loading}
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter your phone number"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Purpose of Donation *</label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="general">General Donation</option>
            <option value="construction">Construction</option>
            <option value="maintenance">Maintenance</option>
            <option value="festival">Festival</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message (Optional)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
            placeholder="Add a message with your donation"
            rows="3"
          />
        </div>

        <div className="donation-note">
          <p>
            <strong>Secure Payment:</strong> Your donation will be processed securely through Razorpay. 
            We accept all major cards, UPI, and net banking. You will receive an immediate confirmation upon successful payment.
          </p>
        </div>

        <button 
          type="submit" 
          className="donate-button"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Donate Now'}
        </button>
      </form>
    </div>
  )
}

export default DonationForm 