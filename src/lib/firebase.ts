import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

// Read config from Vite env vars (set these in a local .env and in Netlify).
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
}

/** True only when the required Firebase env vars are present. */
export const isAuthConfigured = Boolean(config.apiKey && config.projectId && config.appId)

let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined
let googleProvider: GoogleAuthProvider | undefined

if (isAuthConfigured) {
  app = initializeApp(config)
  auth = getAuth(app)
  db = getFirestore(app)
  googleProvider = new GoogleAuthProvider()
}

export { auth, db, googleProvider }
