import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore'
import { db } from './firebase'

export const getProperties = async (type = 'all', filters = {}) => {
  try {
    let q = collection(db, 'properties')
    
    if (type !== 'all') {
      q = query(q, where('type', '==', type))
    }
    
    if (filters.location) {
      q = query(q, where('location', '==', filters.location))
    }
    
    if (filters.priceMin) {
      q = query(q, where('price', '>=', filters.priceMin))
    }
    
    if (filters.priceMax) {
      q = query(q, where('price', '<=', filters.priceMax))
    }
    
    q = query(q, orderBy('createdAt', 'desc'))
    
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

export const getPropertyById = async (id) => {
  try {
    const docRef = doc(db, 'properties', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}

export const addProperty = async (propertyData) => {
  try {
    const docRef = await addDoc(collection(db, 'properties'), {
      ...propertyData,
      createdAt: new Date(),
      approved: false
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding property:', error)
    throw error
  }
}


