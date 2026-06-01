import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated, isAdmin, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!authLoading && isAuthenticated && isAdmin) {
      navigate('/admin-panel', { replace: true })
    }
  }, [isAuthenticated, isAdmin, authLoading, navigate])

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-surface-container border-t-primary rounded-full animate-spin"></div>
      </div>
    )
  }

  // Don't show login form if already authenticated as admin
  if (isAuthenticated && isAdmin) {
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
        const userRole = result.user?.role
        const isUserAdmin = result.user?.isAdmin || userRole === 'admin'

        if (isUserAdmin) {
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
    <div className="bg-background text-on-background font-body-md min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none hero-pattern"></div>
      
      <div className="relative z-10 w-full max-w-[450px] bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-outline-variant/20 parchment-glow space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <span className="material-symbols-outlined text-primary text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              temple_hindu
            </span>
          </div>
          <h1 className="font-display-lg text-2xl font-bold text-primary">Admin Login</h1>
          <p className="text-xs text-on-surface-variant tracking-wider uppercase font-semibold">Sri Kainari Ayyappan Kavu</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-error-container text-on-error-container rounded-lg text-xs border border-error/20">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-on-surface">Email</label>
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
              className="w-full px-5 py-3 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs bg-white"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-on-surface">Password</label>
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
              className="w-full px-5 py-3 rounded-full border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary text-xs bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-primary text-white rounded-full font-bold hover:bg-tertiary transition-all duration-200 shadow-md text-xs uppercase tracking-wider mt-2 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-outline-variant/10">
          <p className="text-[10px] text-on-surface-variant font-medium tracking-widest uppercase">
            Authorized personnel only
          </p>
        </div>

      </div>
    </div>
  )
}

export default AdminLogin
