import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import '../styles/AuthModal.css'

const AuthModal = ({ isOpen, onClose, initialTab = 'login', hideSignup = false }) => {
  const { login, signup } = useAuth()
  const [activeTab, setActiveTab] = useState(initialTab)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  })

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    })
  }



  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(loginData.email, loginData.password)

    if (result.success) {
      setSuccess('Login successful!')
      setTimeout(() => {
        onClose()
        setSuccess('')
        resetLoginData()
      }, 1000)
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  const resetLoginData = () => {
    setLoginData({
      email: '',
      password: ''
    })
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    const result = await signup({
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      phone: signupData.phone,
      dateOfBirth: signupData.dateOfBirth,
      password: signupData.password
    })

    if (result.success) {
      setSuccess('Account created successfully!')
      setTimeout(() => {
        onClose()
        setSuccess('')
        setSignupData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          password: '',
          confirmPassword: ''
        })
      }, 1000)
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    setError('')
    setSuccess('')
    resetLoginData()
  }

  if (!isOpen) return null

  return (
    <div className="auth-modal-overlay force-center" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => switchTab('login')}
            >
              Login
            </button>
            {!hideSignup && (
              <button
                className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => switchTab('signup')}
              >
                Sign Up
              </button>
            )}
          </div>
          <button className="auth-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="auth-modal-content">
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signupEmail">Email</label>
                <input
                  type="email"
                  id="signupEmail"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={signupData.dateOfBirth}
                  onChange={handleSignupChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="signupPassword">Password</label>
                <input
                  type="password"
                  id="signupPassword"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required
                  disabled={loading}
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  required
                  disabled={loading}
                  minLength="6"
                />
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthModal