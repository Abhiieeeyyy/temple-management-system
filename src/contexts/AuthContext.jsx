import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('temple_token')
    const userData = localStorage.getItem('temple_user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('temple_token')
        localStorage.removeItem('temple_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011'
    console.log('Login function called with:', email)
    try {
      console.log('Making request to:', `${API_URL}/api/auth/login`)
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (data.success) {
        setUser(data.user)
        setIsAuthenticated(true)
        localStorage.setItem('temple_token', data.token)
        localStorage.setItem('temple_user', JSON.stringify(data.user))
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  const signup = async (userData) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011'
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        setIsAuthenticated(true)
        localStorage.setItem('temple_token', data.token)
        localStorage.setItem('temple_user', JSON.stringify(data.user))
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, message: 'Signup failed. Please try again.' }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('temple_token')
    localStorage.removeItem('temple_user')
  }

  const sendOTP = async (phone, purpose = 'login') => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011'
    try {
      const response = await fetch(`${API_URL}/api/otp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, purpose }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Send OTP error:', error)
      return { success: false, message: 'Failed to send OTP. Please try again.' }
    }
  }

  const verifyOTP = async (phone, otp, purpose = 'login') => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011'
    try {
      const response = await fetch(`${API_URL}/api/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp, purpose }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Verify OTP error:', error)
      return { success: false, message: 'Failed to verify OTP. Please try again.' }
    }
  }

  const loginWithPhone = async (phone, otp) => {
    try {
      // First verify the OTP
      const otpResult = await verifyOTP(phone, otp, 'login')
      
      if (!otpResult.success) {
        return otpResult
      }

      // If OTP is verified, find the user and log them in
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011'
      const response = await fetch(`${API_URL}/api/auth/login-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        setIsAuthenticated(true)
        localStorage.setItem('temple_token', data.token)
        localStorage.setItem('temple_user', JSON.stringify(data.user))
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error('Phone login error:', error)
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  const resetPassword = async (phone, otp, newPassword) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011'
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp, newPassword }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Reset password error:', error)
      return { success: false, message: 'Failed to reset password. Please try again.' }
    }
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('temple_user', JSON.stringify(updatedUser))
  }

  const isAdmin = user?.role === 'admin'

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    signup,
    logout,
    updateUser,
    sendOTP,
    verifyOTP,
    loginWithPhone,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}