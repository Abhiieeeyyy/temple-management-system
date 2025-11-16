import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/AdminLogin.css'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated, isAdmin } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already logged in as admin
  if (isAuthenticated && isAdmin) {
    navigate('/admin-panel')
    return null
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(formData.email, formData.password)

      if (result.success) {
        // Check if user is admin - check both role and isAdmin flag
        const userRole = result.user?.role
        const isUserAdmin = result.user?.isAdmin || userRole === 'admin'
        
        if (isUserAdmin) {
          // Wait for state to update, then navigate
          setTimeout(() => {
            navigate('/admin-panel', { replace: true })
          }, 150)
        } else {
          setError('Access denied. Admin credentials required.')
          setLoading(false)
        }
      } else {
        setError(result.message || 'Invalid credentials')
        setLoading(false)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <img 
              src="/images/temple9.jpg" 
              alt="Temple Logo" 
              className="admin-logo"
              onError={(e) => {
                e.target.src = '/images/temple-bg.jpg'
              }}
            />
            <h1>Admin Login</h1>
            <p>Sri Kainari Ayyappan Kavu</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Enter admin email"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>Authorized personnel only</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
