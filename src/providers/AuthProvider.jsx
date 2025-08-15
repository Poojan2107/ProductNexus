import { createContext, useEffect, useMemo, useState } from 'react'
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const auth = useMemo(() => getAuth(), [])
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setInitializing(false)
    })
    return () => unsub()
  }, [auth])

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const loginWithEmail = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const registerWithEmail = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (cred.user && name) {
      await updateProfile(cred.user, { displayName: name })
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const value = {
    user,
    initializing,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the context for use in other files
export { AuthContext }


