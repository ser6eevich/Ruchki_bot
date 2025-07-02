import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

function env(key) {
  return (
    process.env[`NEXT_PUBLIC_${key}`] ?? //  ← Next.js
    import.meta.env?.[`VITE_${key}`] ?? //  ← Vite / Vitest
    ""
  )
}

const firebaseConfig = {
  apiKey: env("FIREBASE_API_KEY"),
  authDomain: env("FIREBASE_AUTH_DOMAIN"),
  projectId: env("FIREBASE_PROJECT_ID"),
  storageBucket: env("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: env("FIREBASE_MESSAGING_SENDER_ID"),
  appId: env("FIREBASE_APP_ID"),
}

if (!firebaseConfig.apiKey) {
  // eslint-disable-next-line no-console
  console.error("❗ Firebase API key is empty. " + "Make sure NEXT_PUBLIC_FIREBASE_API_KEY is set in .env.local")
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
