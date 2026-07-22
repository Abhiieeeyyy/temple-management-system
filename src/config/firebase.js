import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
let app
let auth
let googleProvider

try {
  // If the API key is not yet set, we print a warning but still try to initialize or export nulls to prevent app crashes
  if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    console.warn('⚠️ Firebase API key is missing. Google Login will not work until VITE_FIREBASE_API_KEY is configured in .env')
  }
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  })
} catch (error) {
  console.error('❌ Firebase initialization error:', error)
}

export { auth, googleProvider }
