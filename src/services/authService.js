import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './firebase'

// Login with email and password
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return {
      success: true,
      user: userCredential.user
    }
  } catch (error) {
    let errorMessage = 'Login failed. Please try again.'
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.'
        break
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.'
        break
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.'
        break
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.'
        break
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed attempts. Please try again later.'
        break
      default:
        errorMessage = error.message || errorMessage
    }
    
    return {
      success: false,
      error: errorMessage
    }
  }
}

// Logout
export const logout = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to logout'
    }
  }
}

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser
}

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

