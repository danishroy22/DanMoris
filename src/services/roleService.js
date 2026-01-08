/**
 * Role-Based Access Control Service
 * Manages user roles and permissions
 */
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

// User roles
export const ROLES = {
  SUPER_USER: 'super_user',
  ADMIN: 'admin',
  USER: 'user'
}

// Permissions for each role
export const PERMISSIONS = {
  [ROLES.SUPER_USER]: {
    manageUsers: true,
    manageSystemSettings: true,
    updateContent: true,
    manageBusinesses: true,
    viewAnalytics: true,
    manageRoles: true
  },
  [ROLES.ADMIN]: {
    manageUsers: false,
    manageSystemSettings: false,
    updateContent: true,
    manageBusinesses: true,
    viewAnalytics: true,
    manageRoles: false
  },
  [ROLES.USER]: {
    manageUsers: false,
    manageSystemSettings: false,
    updateContent: false,
    manageBusinesses: false,
    viewAnalytics: false,
    manageRoles: false
  }
}

// Get user role from Firestore
export const getUserRole = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      return userDoc.data().role || ROLES.USER
    }
    return ROLES.USER
  } catch (error) {
    console.error('Error getting user role:', error)
    return ROLES.USER
  }
}

// Set user role (super user only)
export const setUserRole = async (userId, role) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (userDoc.exists()) {
      await updateDoc(userRef, { role })
    } else {
      await setDoc(userRef, { role, createdAt: new Date() })
    }
    return true
  } catch (error) {
    console.error('Error setting user role:', error)
    throw error
  }
}

// Check if user has permission
export const hasPermission = (userRole, permission) => {
  const rolePermissions = PERMISSIONS[userRole] || PERMISSIONS[ROLES.USER]
  return rolePermissions[permission] || false
}

// Initialize admin users (run once to set up initial admins)
export const initializeAdminUsers = async (adminEmails) => {
  // This should be run manually or through a setup script
  // adminEmails should be an array of email addresses
  console.log('Initialize admin users with emails:', adminEmails)
  // Implementation would require Firebase Admin SDK or Cloud Function
}

