import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../utils/constants'
import '../styles/UserProfile.css'

const UserProfile = ({ onAction }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = (e) => {
    e.stopPropagation()
    logout()
    setShowDropdown(false)
    if (onAction) onAction()
  }

  const handleAdminPanel = (e) => {
    e.stopPropagation()
    navigate(ROUTES.ADMIN_PANEL, { state: { activeTab: 'donations' } })
    setShowDropdown(false)
    if (onAction) onAction()
  }

  return (
    <div className="user-profile" onClick={(e) => e.stopPropagation()}>
      <button
        className="profile-button"
        onClick={(e) => {
          e.stopPropagation()
          setShowDropdown(!showDropdown)
        }}
      >
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase() || 'A'}
        </div>
        <span className="profile-name">{user?.name || 'Admin'}</span>
      </button>

      {showDropdown && (
        <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-header">
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
            <span className="user-role">{user?.role}</span>
          </div>
          <div className="dropdown-divider"></div>
          <button className="dropdown-menu-item" onClick={handleAdminPanel}>
            Admin Panel
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfile
