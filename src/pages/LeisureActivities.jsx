/**
 * Leisure and Activities Page
 * Dedicated page with tabs for different leisure subcategories
 */
import { useState, useEffect } from 'react'
import { Hotel, Car, UtensilsCrossed, ShoppingBag, Sparkles, Store } from 'lucide-react'
import BusinessCard from '../components/BusinessCard'
import { getBusinesses } from '../services/businessService'
import { LEISURE_SUBCATEGORIES } from '../constants/categories'
import './LeisureActivities.css'

const LeisureActivities = () => {
  const [activeTab, setActiveTab] = useState('Hotels')
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)

  // Icon mapping for subcategories
  const subcategoryIcons = {
    'Hotels': Hotel,
    'Car Rental': Car,
    'Restaurants': UtensilsCrossed,
    'Malls': ShoppingBag,
    'Spas': Sparkles,
    'Shopping': Store
  }

  useEffect(() => {
    loadBusinesses()
  }, [activeTab])

  const loadBusinesses = async () => {
    setLoading(true)
    try {
      // Filter businesses by category "Leisure and Activities" and subcategory
      const allBusinesses = await getBusinesses({ category: 'Leisure and Activities' })
      // Filter by subcategory (stored in business.subcategory field)
      const filtered = allBusinesses.filter(b => 
        b.subcategory === activeTab || 
        (activeTab === 'Shopping' && b.subcategory === 'Shopping')
      )
      setBusinesses(filtered)
    } catch (error) {
      console.error('Error loading businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="leisure-activities-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Leisure and Activities</h1>
          <p className="page-subtitle">
            Discover the best leisure activities, hotels, restaurants, and more in Mauritius
          </p>
        </div>

        {/* Tabs */}
        <div className="leisure-tabs">
          {LEISURE_SUBCATEGORIES.map((subcategory) => {
            const Icon = subcategoryIcons[subcategory] || Store
            return (
              <button
                key={subcategory}
                className={`leisure-tab ${activeTab === subcategory ? 'active' : ''}`}
                onClick={() => setActiveTab(subcategory)}
              >
                <Icon size={20} />
                <span>{subcategory}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="leisure-content">
          {loading ? (
            <div className="loading">Loading {activeTab.toLowerCase()}...</div>
          ) : businesses.length > 0 ? (
            <>
              <div className="results-header">
                <h2>{activeTab}</h2>
                <p className="results-count">{businesses.length} {businesses.length === 1 ? 'business' : 'businesses'} found</p>
              </div>
              <div className="businesses-grid">
                {businesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <p>No {activeTab.toLowerCase()} businesses found yet.</p>
              <a href="/add-business" className="btn btn-primary">
                List Your Business
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeisureActivities

