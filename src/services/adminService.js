import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

// Get all businesses (including unapproved) for admin
export const getAllBusinesses = async (filters = {}) => {
  try {
    let q = collection(db, 'businesses')
    
    if (filters.status) {
      if (filters.status === 'pending') {
        q = query(q, where('approved', '==', false))
      } else if (filters.status === 'approved') {
        q = query(q, where('approved', '==', true))
      }
    }
    
    if (filters.category) {
      q = query(q, where('category', '==', filters.category))
    }
    
    if (filters.location) {
      q = query(q, where('location', '==', filters.location))
    }
    
    q = query(q, orderBy('createdAt', 'desc'))
    
    const querySnapshot = await getDocs(q)
    const businesses = []
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() })
    })
    return businesses
  } catch (error) {
    console.error('Error fetching businesses:', error)
    return []
  }
}

// Get pending businesses
export const getPendingBusinesses = async () => {
  try {
    const q = query(
      collection(db, 'businesses'),
      where('approved', '==', false),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    const businesses = []
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() })
    })
    return businesses
  } catch (error) {
    console.error('Error fetching pending businesses:', error)
    return []
  }
}

// Approve a business
export const approveBusiness = async (id) => {
  try {
    const docRef = doc(db, 'businesses', id)
    await updateDoc(docRef, {
      approved: true,
      approvedAt: Timestamp.now()
    })
    return true
  } catch (error) {
    console.error('Error approving business:', error)
    throw error
  }
}

// Reject a business
export const rejectBusiness = async (id, reason = '') => {
  try {
    const docRef = doc(db, 'businesses', id)
    await updateDoc(docRef, {
      approved: false,
      rejected: true,
      rejectedAt: Timestamp.now(),
      rejectionReason: reason
    })
    return true
  } catch (error) {
    console.error('Error rejecting business:', error)
    throw error
  }
}

// Get dashboard analytics
export const getDashboardStats = async () => {
  try {
    const businessesSnapshot = await getDocs(collection(db, 'businesses'))
    const propertiesSnapshot = await getDocs(collection(db, 'properties'))
    
    let totalBusinesses = 0
    let approvedBusinesses = 0
    let pendingBusinesses = 0
    let totalViews = 0
    let totalProperties = 0
    let pendingProperties = 0
    
    businessesSnapshot.forEach((doc) => {
      const data = doc.data()
      totalBusinesses++
      if (data.approved) {
        approvedBusinesses++
      } else {
        pendingBusinesses++
      }
      totalViews += data.views || 0
    })
    
    propertiesSnapshot.forEach((doc) => {
      const data = doc.data()
      totalProperties++
      if (!data.approved) {
        pendingProperties++
      }
    })
    
    // Get category distribution
    const categoryCount = {}
    businessesSnapshot.forEach((doc) => {
      const category = doc.data().category
      if (category) {
        categoryCount[category] = (categoryCount[category] || 0) + 1
      }
    })
    
    // Get location distribution
    const locationCount = {}
    businessesSnapshot.forEach((doc) => {
      const location = doc.data().location
      if (location) {
        locationCount[location] = (locationCount[location] || 0) + 1
      }
    })
    
    return {
      totalBusinesses,
      approvedBusinesses,
      pendingBusinesses,
      totalViews,
      totalProperties,
      pendingProperties,
      categoryDistribution: categoryCount,
      locationDistribution: locationCount
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      totalBusinesses: 0,
      approvedBusinesses: 0,
      pendingBusinesses: 0,
      totalViews: 0,
      totalProperties: 0,
      pendingProperties: 0,
      categoryDistribution: {},
      locationDistribution: {}
    }
  }
}

// Get all properties for admin
export const getAllProperties = async () => {
  try {
    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    const properties = []
    querySnapshot.forEach((doc) => {
      properties.push({ id: doc.id, ...doc.data() })
    })
    return properties
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

// Approve a property
export const approveProperty = async (id) => {
  try {
    const docRef = doc(db, 'properties', id)
    await updateDoc(docRef, {
      approved: true,
      approvedAt: Timestamp.now()
    })
    return true
  } catch (error) {
    console.error('Error approving property:', error)
    throw error
  }
}

// Reject a property
export const rejectProperty = async (id, reason = '') => {
  try {
    const docRef = doc(db, 'properties', id)
    await updateDoc(docRef, {
      approved: false,
      rejected: true,
      rejectedAt: Timestamp.now(),
      rejectionReason: reason
    })
    return true
  } catch (error) {
    console.error('Error rejecting property:', error)
    throw error
  }
}

