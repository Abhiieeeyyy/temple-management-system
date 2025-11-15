import { useNavigate } from 'react-router-dom'
import './AvailableSoon.css'

const AvailableSoon = ({ pageName = 'This feature' }) => {
  const navigate = useNavigate()

  return (
    <div className="available-soon-container">
      <div className="available-soon-content">
        <div className="available-soon-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <h1>Available Soon...</h1>
        <p>{pageName} will be available soon. We're working on it!</p>
        <button 
          className="back-home-btn" 
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default AvailableSoon
