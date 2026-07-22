import { initializeApp, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

let app

if (getApps().length === 0) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID
    if (!projectId) {
      console.warn('⚠️ FIREBASE_PROJECT_ID environment variable is missing in server .env')
    }
    
    // Initialize the Firebase Admin App
    app = initializeApp({
      projectId: projectId || 'temple-management-system'
    })
    console.log('🔥 Firebase Admin SDK initialized successfully')
  } catch (error) {
    console.error('❌ Firebase Admin initialization error:', error.message)
  }
}

export { getAuth }
