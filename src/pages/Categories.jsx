import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import BusinessCard from '../components/BusinessCard'
import Filter from '../components/Filter'
import { getBusinesses, searchBusinesses } from '../services/businessService'
import './Categories.css'

const Categories = () => {
  const [searchParams] = useSearchParams()
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    location: '',
    priceRange: '',
    rating: '',
    sortBy: 'popular'
  })
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    loadBusinesses()
  }, [filters, searchQuery])

  const loadBusinesses = async () => {
    setLoading(true)
    try {
      let results = []
      if (searchQuery) {
        results = await searchBusinesses(searchQuery)
      } else {
        results = await getBusinesses(filters)
      }
      setBusinesses(results)
    } catch (error) {
      console.error('Error loading businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const categories = ['Contractors', 'Materials', 'Services', 'Events', 'Real Estate', 'Retailers', 'Wholesalers', 'Distributors']
  const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu', 'Kaduna']

  return (
    <div className="categories-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Categories'}
          </h1>
          <p className="page-subtitle">
            Find the perfect business or service provider for your needs
          </p>
        </div>

        <div className="categories-content">
          <aside className="filters-sidebar">
            <Filter
              onFilterChange={handleFilterChange}
              categories={categories}
              locations={locations}
            />
          </aside>

          <main className="businesses-main">
            {loading ? (
              <div className="loading">Loading businesses...</div>
            ) : businesses.length > 0 ? (
              <>
                <div className="results-header">
                  <p className="results-count">
                    Found {businesses.length} {businesses.length === 1 ? 'business' : 'businesses'}
                  </p>
                </div>
                <div className="businesses-grid grid-3">
                  {businesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </>
            ) : (
              <div className="no-results">
                <h3>No businesses found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Categories


