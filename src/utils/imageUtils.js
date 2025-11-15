const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5009'

/**
 * Converts a relative media URL to a full URL
 * @param {string} mediaUrl - The relative media URL from the API
 * @returns {string} - The full URL to the media file
 */
export const getFullMediaUrl = (mediaUrl) => {
  if (!mediaUrl) return ''
  
  // If it's already a full URL, return as is
  if (mediaUrl.startsWith('http://') || mediaUrl.startsWith('https://')) {
    return mediaUrl
  }
  
  // If it starts with /, prepend the base URL
  if (mediaUrl.startsWith('/')) {
    return `${API_BASE_URL}${mediaUrl}`
  }
  
  // Otherwise, assume it's a relative path and add both base URL and /
  return `${API_BASE_URL}/${mediaUrl}`
}

/**
 * Checks if a file is a video based on its URL or mime type
 * @param {string} url - The file URL
 * @param {string} mediaType - The media type from the API
 * @returns {boolean} - True if it's a video file
 */
export const isVideoFile = (url, mediaType) => {
  if (mediaType === 'video') return true
  
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.wmv']
  return videoExtensions.some(ext => url.toLowerCase().includes(ext))
}

/**
 * Debug function to test video URL accessibility with comprehensive checks
 * @param {string} videoUrl - The video URL to test
 * @returns {Promise<object>} - Test results with detailed information
 */
export const testVideoUrl = async (videoUrl) => {
  try {
    const response = await fetch(videoUrl, { method: 'HEAD' })
    const contentType = response.headers.get('content-type')
    const contentLength = response.headers.get('content-length')
    const acceptRanges = response.headers.get('accept-ranges')
    
    const result = {
      url: videoUrl,
      status: response.status,
      ok: response.ok,
      contentType,
      contentLength,
      acceptRanges,
      isVideo: contentType && contentType.startsWith('video/'),
      supportsRanges: acceptRanges === 'bytes'
    }
    
    console.log('Video URL test result:', result)
    return result
  } catch (error) {
    console.error('Video URL test failed:', error)
    return {
      url: videoUrl,
      error: error.message,
      ok: false
    }
  }
}

/**
 * Test video playability by creating a temporary video element
 * @param {string} videoUrl - The video URL to test
 * @returns {Promise<boolean>} - True if video can be played
 */
export const testVideoPlayability = (videoUrl) => {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    
    const cleanup = () => {
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('error', onError)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.src = ''
    }
    
    const onCanPlay = () => {
      console.log('Video can play:', videoUrl)
      cleanup()
      resolve(true)
    }
    
    const onError = (e) => {
      console.error('Video playability test failed:', e, videoUrl)
      cleanup()
      resolve(false)
    }
    
    const onLoadedMetadata = () => {
      console.log('Video metadata loaded:', {
        url: videoUrl,
        duration: video.duration,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight
      })
    }
    
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('error', onError)
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    
    video.src = videoUrl
    
    // Timeout fallback
    setTimeout(() => {
      cleanup()
      resolve(false)
    }, 5000)
  })
}

/**
 * Generate thumbnail from video element with better error handling
 * @param {HTMLVideoElement} videoElement - The video element
 * @param {number} timeOffset - Time offset in seconds for thumbnail
 * @returns {Promise<string>} - Base64 data URL of thumbnail
 */
export const generateVideoThumbnail = (videoElement, timeOffset = 2) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    const cleanup = () => {
      videoElement.removeEventListener('seeked', onSeeked)
      videoElement.removeEventListener('error', onError)
      videoElement.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
    
    const onSeeked = () => {
      try {
        // Ensure video has dimensions
        if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
          cleanup()
          reject(new Error('Video has no dimensions'))
          return
        }
        
        canvas.width = videoElement.videoWidth
        canvas.height = videoElement.videoHeight
        ctx.drawImage(videoElement, 0, 0)
        
        const dataURL = canvas.toDataURL('image/jpeg', 0.8)
        cleanup()
        resolve(dataURL)
      } catch (error) {
        cleanup()
        reject(error)
      }
    }
    
    const onError = (e) => {
      console.error('Video thumbnail generation error:', e)
      cleanup()
      reject(new Error('Failed to generate video thumbnail: ' + e.message))
    }
    
    const onLoadedMetadata = () => {
      // Set time for thumbnail after metadata is loaded
      try {
        const duration = videoElement.duration
        const safeTimeOffset = Math.min(timeOffset, duration - 1)
        videoElement.currentTime = Math.max(0, safeTimeOffset)
      } catch (error) {
        cleanup()
        reject(error)
      }
    }
    
    videoElement.addEventListener('seeked', onSeeked)
    videoElement.addEventListener('error', onError)
    videoElement.addEventListener('loadedmetadata', onLoadedMetadata)
    
    // If metadata is already loaded, set time immediately
    if (videoElement.readyState >= 1) {
      onLoadedMetadata()
    }
    
    // Timeout fallback
    setTimeout(() => {
      cleanup()
      reject(new Error('Video thumbnail generation timeout'))
    }, 10000)
  })
}

/**
 * Checks if a file is an image based on its URL or mime type
 * @param {string} url - The file URL
 * @param {string} mediaType - The media type from the API
 * @returns {boolean} - True if it's an image file
 */
export const isImageFile = (url, mediaType) => {
  if (mediaType === 'image') return true
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
  return imageExtensions.some(ext => url.toLowerCase().includes(ext))
}