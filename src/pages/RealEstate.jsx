import { useState, useEffect } from 'react'
import { Building2, MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react'
import { getProperties } from '../services/realEstateService'
import { MAURITIUS_LOCATIONS } from '../constants/locations'
import './RealEstate.css'

const RealEstate = () => {
  const [activeTab, setActiveTab] = useState('buy')
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: ''
  })

  useEffect(() => {
    loadProperties()
  }, [activeTab, filters])

  const loadProperties = async () => {
    setLoading(true)
    try {
      const type = activeTab === 'buy' ? 'sale' : activeTab === 'rent' ? 'rent' : 'all'
      const results = await getProperties(type, filters)
      setProperties(results)
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price)
  }

  const PropertyCard = ({ property }) => (
    <div className="property-card">
      <div className="property-image">
        {property.image ? (
          <img 
            src={property.image} 
            alt={property.title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="property-image-placeholder">
            <Building2 size={48} />
          </div>
        )}
        <span className="property-type">{property.type}</span>
      </div>
      <div className="property-content">
        <h3 className="property-title">{property.title}</h3>
        <div className="property-location">
          <MapPin size={16} />
          <span>{property.location}</span>
        </div>
        <div className="property-features">
          {property.bedrooms && (
            <div className="feature">
              <Bed size={18} />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="feature">
              <Bath size={18} />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.area && (
            <div className="feature">
              <Square size={18} />
              <span>{property.area} sqft</span>
            </div>
          )}
        </div>
        <div className="property-footer">
          <div className="property-price">{formatPrice(property.price)}</div>
          <button className="btn btn-primary property-btn">
            View Details <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="real-estate-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Real Estate</h1>
          <p className="page-subtitle">
            Find your perfect property - Buy, Rent, or Sell
          </p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'buy' ? 'active' : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            Buy
          </button>
          <button
            className={`tab ${activeTab === 'rent' ? 'active' : ''}`}
            onClick={() => setActiveTab('rent')}
          >
            Rent
          </button>
          <button
            className={`tab ${activeTab === 'sell' ? 'active' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell
          </button>
        </div>

        <div className="filters-bar">
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="filter-select"
          >
            <option value="">All Locations</option>
            {MAURITIUS_LOCATIONS.filter(loc => loc !== 'Other').map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={filters.priceMin}
            onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
            className="filter-input"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.priceMax}
            onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
            className="filter-input"
          />
        </div>

        {loading ? (
          <div className="loading">Loading properties...</div>
        ) : properties.length > 0 ? (
          <div className="properties-grid grid-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No properties found</h3>
            <p>Try adjusting your filters or check back later</p>
          </div>
        )}

        {activeTab === 'sell' && (
          <div className="sell-cta">
            <h2>Want to List Your Property?</h2>
            <p>Reach thousands of potential buyers and renters</p>
            <button className="btn btn-primary">
              List Your Property
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RealEstate


