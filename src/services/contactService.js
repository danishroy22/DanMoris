/**
 * Contact Form Submission Service
 * Stores all contact form submissions in Firebase for admin review
 */
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'
import { db } from './firebase'

// Submit contact form - stores in database for admin review
export const submitContactForm = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, 'contactSubmissions'), {
      ...formData,
      submittedAt: Timestamp.now(),
      read: false,
      status: 'new'
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
}

// Get all contact submissions (admin only)
export const getContactSubmissions = async () => {
  try {
    const q = query(
      collection(db, 'contactSubmissions'),
      orderBy('submittedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    const submissions = []
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() })
    })
    return submissions
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return []
  }
}

// Mark submission as read
export const markSubmissionAsRead = async (id) => {
  try {
    const { updateDoc, doc } = await import('firebase/firestore')
    const docRef = doc(db, 'contactSubmissions', id)
    await updateDoc(docRef, {
      read: true,
      readAt: Timestamp.now()
    })
    return true
  } catch (error) {
    console.error('Error marking submission as read:', error)
    throw error
  }
}

