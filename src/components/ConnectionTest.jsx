import { useState } from 'react'

const ConnectionTest = () => {
  const [results, setResults] = useState({})
  const [testing, setTesting] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011'

  const runTests = async () => {
    setTesting(true)
    const testResults = {}

    // Test 1: Check environment variable
    testResults.envVar = {
      name: 'Environment Variable',
      value: API_URL,
      status: API_URL ? 'pass' : 'fail'
    }

    // Test 2: Health check
    try {
      const healthResponse = await fetch(`${API_URL}/api/health`)
      const healthData = await healthResponse.json()
      testResults.health = {
        name: 'Backend Health',
        value: healthData.status,
        status: healthResponse.ok ? 'pass' : 'fail'
      }
    } catch (error) {
      testResults.health = {
        name: 'Backend Health',
        value: error.message,
        status: 'fail'
      }
    }

    // Test 3: Admin user check
    try {
      const adminResponse = await fetch(`${API_URL}/api/auth/init-admin?adminKey=temple-admin-2024`)
      const adminData = await adminResponse.json()
      testResults.admin = {
        name: 'Admin User',
        value: adminData.message,
        status: adminData.success ? 'pass' : 'fail'
      }
    } catch (error) {
      testResults.admin = {
        name: 'Admin User',
        value: error.message,
        status: 'fail'
      }
    }

    // Test 4: CORS check
    try {
      const corsResponse = await fetch(`${API_URL}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      testResults.cors = {
        name: 'CORS Configuration',
        value: 'CORS headers present',
        status: corsResponse.ok ? 'pass' : 'fail'
      }
    } catch (error) {
      testResults.cors = {
        name: 'CORS Configuration',
        value: error.message,
        status: 'fail'
      }
    }

    setResults(testResults)
    setTesting(false)
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      maxWidth: '400px',
      zIndex: 9999
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#b51414' }}>Connection Test</h3>
      
      <button
        onClick={runTests}
        disabled={testing}
        style={{
          background: '#b51414',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: testing ? 'not-allowed' : 'pointer',
          marginBottom: '15px',
          width: '100%'
        }}
      >
        {testing ? 'Testing...' : 'Run Tests'}
      </button>

      {Object.keys(results).length > 0 && (
        <div>
          {Object.entries(results).map(([key, result]) => (
            <div key={key} style={{
              padding: '10px',
              marginBottom: '8px',
              background: result.status === 'pass' ? '#e8f5e9' : '#ffebee',
              borderRadius: '4px',
              borderLeft: `4px solid ${result.status === 'pass' ? '#4caf50' : '#f44336'}`
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {result.status === 'pass' ? '✅' : '❌'} {result.name}
              </div>
              <div style={{ fontSize: '0.9em', color: '#666' }}>
                {result.value}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ 
        marginTop: '15px', 
        padding: '10px', 
        background: '#f5f5f5', 
        borderRadius: '4px',
        fontSize: '0.85em'
      }}>
        <strong>API URL:</strong><br />
        {API_URL}
      </div>
    </div>
  )
}

export default ConnectionTest
