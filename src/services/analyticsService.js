/**
 * Analytics Service
 * Tracks site views, page views, and admin action clicks
 */
import { collection, addDoc, getDocs, query, where, Timestamp, increment, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'

// Track page view
export const trackPageView = async (pagePath, pageTitle) => {
  try {
    // Get today's date as string for document ID
    const today = new Date().toISOString().split('T')[0]
    const docRef = doc(db, 'analytics', today)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      // Update existing document
      const data = docSnap.data()
      const pageViews = data.pageViews || {}
      pageViews[pagePath] = (pageViews[pagePath] || 0) + 1
      
      await updateDoc(docRef, {
        totalViews: (data.totalViews || 0) + 1,
        pageViews: pageViews,
        lastUpdated: Timestamp.now()
      })
    } else {
      // Create new document for today
      await setDoc(docRef, {
        date: today,
        totalViews: 1,
        pageViews: { [pagePath]: 1 },
        adminClicks: {},
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now()
      })
    }
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}

// Track admin action click
export const trackAdminClick = async (action, adminId) => {
  try {
    const today = new Date().toISOString().split('T')[0]
    const docRef = doc(db, 'analytics', today)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      const adminClicks = data.adminClicks || {}
      const actionKey = `${action}_${adminId}`
      adminClicks[actionKey] = (adminClicks[actionKey] || 0) + 1
      
      await updateDoc(docRef, {
        adminClicks: adminClicks,
        lastUpdated: Timestamp.now()
      })
    } else {
      await setDoc(docRef, {
        date: today,
        totalViews: 0,
        pageViews: {},
        adminClicks: { [`${action}_${adminId}`]: 1 },
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now()
      })
    }
  } catch (error) {
    console.error('Error tracking admin click:', error)
  }
}

// Get analytics data for date range
export const getAnalytics = async (startDate, endDate) => {
  try {
    const q = query(
      collection(db, 'analytics'),
      where('date', '>=', startDate),
      where('date', '<=', endDate)
    )
    const querySnapshot = await getDocs(q)
    const analytics = []
    querySnapshot.forEach((doc) => {
      analytics.push({ id: doc.id, ...doc.data() })
    })
    return analytics
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return []
  }
}

// Get total site views (all time)
export const getTotalSiteViews = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'analytics'))
    let total = 0
    querySnapshot.forEach((doc) => {
      total += doc.data().totalViews || 0
    })
    return total
  } catch (error) {
    console.error('Error getting total site views:', error)
    return 0
  }
}

