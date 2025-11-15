import { useState } from 'react'
import { testVideoUrl, testVideoPlayability } from '../utils/imageUtils'

const VideoDebugger = ({ videoUrl, videoTitle }) => {
  const [debugInfo, setDebugInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const runDiagnostics = async () => {
    setIsLoading(true)
    try {
      console.log('Running video diagnostics for:', videoUrl)
      
      const urlTest = await testVideoUrl(videoUrl)
      const playTest = await testVideoPlayability(videoUrl)
      
      setDebugInfo({
        urlTest,
        playTest,
        timestamp: new Date().toISOString()
      })
      
      console.log('Diagnostics complete:', { urlTest, playTest })
    } catch (error) {
      console.error('Diagnostics failed:', error)
      setDebugInfo({
        error: error.message,
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
      position: 'absolute', 
      top: '2px', 
      right: '2px', 
      background: 'rgba(0,0,0,0.7)', 
      color: 'white', 
      padding: '2px', 
      fontSize: '0.6rem',
      borderRadius: '2px',
      zIndex: 10,
      opacity: 0.6
    }}>
      <button 
        onClick={runDiagnostics}
        disabled={isLoading}
        style={{
          background: 'rgba(181, 20, 20, 0.8)',
          color: 'white',
          border: 'none',
          padding: '1px 3px',
          fontSize: '0.5rem',
          borderRadius: '1px',
          cursor: 'pointer',
          opacity: 0.7
        }}
        title="Click to run video diagnostics"
      >
        {isLoading ? '...' : 'D'}
      </button>
      
      {debugInfo && (
        <div style={{ 
          position: 'absolute',
          top: '20px',
          right: '0px',
          background: 'rgba(0,0,0,0.9)',
          color: 'white',
          padding: '4px',
          fontSize: '0.5rem',
          borderRadius: '2px',
          minWidth: '120px',
          maxWidth: '150px',
          wordBreak: 'break-all'
        }}>
          <div style={{ fontSize: '0.5rem', lineHeight: '1.2' }}>Title: {videoTitle}</div>
          <div style={{ fontSize: '0.5rem', lineHeight: '1.2' }}>URL: {videoUrl.split('/').pop()}</div>
          {debugInfo.error ? (
            <div style={{ color: '#e74c3c', fontSize: '0.5rem' }}>Error: {debugInfo.error}</div>
          ) : (
            <>
              <div style={{ fontSize: '0.5rem' }}>URL OK: {debugInfo.urlTest?.ok ? '✓' : '✗'}</div>
              <div style={{ fontSize: '0.5rem' }}>Can Play: {debugInfo.playTest ? '✓' : '✗'}</div>
              <div style={{ fontSize: '0.5rem' }}>Type: {debugInfo.urlTest?.contentType}</div>
              <div style={{ fontSize: '0.5rem' }}>Size: {debugInfo.urlTest?.contentLength ? 
                (parseInt(debugInfo.urlTest.contentLength) / 1024 / 1024).toFixed(1) + 'MB' 
                : 'Unknown'}</div>
              <div style={{ fontSize: '0.5rem' }}>Ranges: {debugInfo.urlTest?.supportsRanges ? '✓' : '✗'}</div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default VideoDebugger