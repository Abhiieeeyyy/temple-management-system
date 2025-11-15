export const validateMessage = (req, res, next) => {
  const { name, email, phone, subject, message } = req.body

  // Check if all required fields are present
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    })
  }

  // Validate email format
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    })
  }

  // Validate phone number format (10 digits)
  const phoneRegex = /^[0-9]{10}$/
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid 10-digit phone number'
    })
  }

  // Validate message length
  if (message.length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Message must be at least 10 characters long'
    })
  }

  next()
}

export const validateDonation = (req, res, next) => {
  const { name, amount, phoneNumber, purpose, message } = req.body

  // Check if required fields are present
  if (!name || !amount || !phoneNumber || !purpose) {
    return res.status(400).json({
      success: false,
      message: 'Name, amount, phone number, and purpose are required'
    })
  }

  // Validate name (must be at least 2 characters)
  if (name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Name must be at least 2 characters long'
    })
  }

  // Validate amount (must be a positive number)
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid donation amount'
    })
  }

  // Validate phone number (must be 10 digits)
  if (!/^[0-9]{10}$/.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid 10-digit phone number'
    })
  }

  // Validate purpose length
  if (purpose.length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Purpose must be at least 3 characters long'
    })
  }

  // Validate message length if provided
  if (message && message.length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Message must be at least 10 characters long if provided'
    })
  }

  next()
} 