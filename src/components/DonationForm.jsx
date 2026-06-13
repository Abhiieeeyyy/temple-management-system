import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  initializeRazorpay, 
  createRazorpayOrder, 
  openRazorpayCheckout, 
  verifyPayment, 
  RAZORPAY_CONFIG
} from '../utils/razorpay'
import { generateReceiptPDF } from '../utils/receiptGenerator'


const DonationForm = ({ initialAmount = '' }) => {
  const { user } = useAuth()
  const [receiptData, setReceiptData] = useState(null)
  const [formData, setFormData] = useState({

    name: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
    amount: initialAmount,
    phoneNumber: user?.phone || '',
    purpose: 'general',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Sync initialAmount if passed from parent
  useEffect(() => {
    if (initialAmount) {
      setFormData(prev => ({ ...prev, amount: initialAmount }))
    }
  }, [initialAmount])

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

    const containsMalayalam = (text) => /[\u0D00-\u0D7F]/.test(text)
    if (containsMalayalam(formData.name)) {
      setError('Please enter name in English only')
      return
    }

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
          
          const donationDetails = {
            name: formData.name,
            amount: parseFloat(formData.amount),
            phoneNumber: formData.phoneNumber,
            purpose: formData.purpose,
            message: formData.message,
            paymentId: paymentResponse.razorpay_payment_id
          }
          setReceiptData({ type: 'donation', details: donationDetails })
          generateReceiptPDF('donation', donationDetails)

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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display-lg text-2xl font-bold text-primary">Make a Donation</h2>
        <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
          Your generous contribution helps us maintain our temple and continue providing spiritual services to the community.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-error-container text-on-error-container rounded-lg text-sm border border-error/20">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-surface-container text-primary font-medium rounded-lg text-sm border border-primary/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>{success}</div>
          {receiptData && (
            <button
              type="button"
              onClick={() => generateReceiptPDF(receiptData.type, receiptData.details)}
              className="px-4 py-2 bg-primary text-white rounded-full font-bold text-xs hover:bg-tertiary transition-colors flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Download Receipt
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-on-surface">
            Full Name (In English only) *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter your full name"
            className="w-full px-5 py-3 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="amount" className="text-sm font-semibold text-on-surface">
            Donation Amount (₹) *
          </label>
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
            className="w-full px-5 py-3 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phoneNumber" className="text-sm font-semibold text-on-surface">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter your 10-digit phone number"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            className="w-full px-5 py-3 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm"
          />
        </div>

        {/* Purpose */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="purpose" className="text-sm font-semibold text-on-surface">
            Purpose of Donation *
          </label>
          <div className="relative">
            <select
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-5 py-3 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm appearance-none"
            >
              <option value="general">General Donation</option>
              <option value="construction">Construction</option>
              <option value="maintenance">Maintenance</option>
              <option value="festival">Festival</option>
              <option value="other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">arrow_drop_down</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-on-surface">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
            placeholder="Add a message with your donation"
            rows="3"
            className="w-full px-5 py-3 rounded-xl border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm resize-none"
          />
        </div>

        <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/20 text-xs text-on-surface-variant leading-relaxed">
          <p>
            <strong>Secure Payment:</strong> Your donation will be processed securely through Razorpay. 
            We accept all major cards, UPI, and net banking. You will receive an immediate confirmation upon successful payment.
          </p>
        </div>

        <button 
          type="submit" 
          className="w-full py-3.5 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-all duration-200 shadow-md text-sm uppercase tracking-wider"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Donate Now'}
        </button>
      </form>
    </div>
  )
}

export default DonationForm