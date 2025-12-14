import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit 
} from 'firebase/firestore'
import { db } from './firebase'

export const getBusinesses = async (filters = {}) => {
  try {
    let q = collection(db, 'businesses')
    
    if (filters.category) {
      q = query(q, where('category', '==', filters.category))
    }
    
    if (filters.location) {
      q = query(q, where('location', '==', filters.location))
    }
    
    if (filters.sortBy === 'rating') {
      q = query(q, orderBy('rating', 'desc'))
    } else if (filters.sortBy === 'popular') {
      q = query(q, orderBy('views', 'desc'))
    }
    
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

export const getBusinessById = async (id) => {
  try {
    const docRef = doc(db, 'businesses', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error('Error fetching business:', error)
    return null
  }
}

export const addBusiness = async (businessData) => {
  try {
    const docRef = await addDoc(collection(db, 'businesses'), {
      ...businessData,
      createdAt: new Date(),
      approved: false,
      rating: 0,
      reviews: [],
      views: 0
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding business:', error)
    throw error
  }
}

export const updateBusiness = async (id, updates) => {
  try {
    const docRef = doc(db, 'businesses', id)
    await updateDoc(docRef, updates)
  } catch (error) {
    console.error('Error updating business:', error)
    throw error
  }
}

export const deleteBusiness = async (id) => {
  try {
    const docRef = doc(db, 'businesses', id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting business:', error)
    throw error
  }
}

export const searchBusinesses = async (searchTerm) => {
  try {
    const q = query(collection(db, 'businesses'))
    const querySnapshot = await getDocs(q)
    const businesses = []
    const term = searchTerm.toLowerCase()
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if (
        data.name?.toLowerCase().includes(term) ||
        data.description?.toLowerCase().includes(term) ||
        data.category?.toLowerCase().includes(term) ||
        data.services?.some(s => s.toLowerCase().includes(term))
      ) {
        businesses.push({ id: doc.id, ...data })
      }
    })
    return businesses
  } catch (error) {
    console.error('Error searching businesses:', error)
    return []
  }
}


