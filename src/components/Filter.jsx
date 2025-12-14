import { useState } from 'react'
import { Filter as FilterIcon, X } from 'lucide-react'
import './Filter.css'

const Filter = ({ onFilterChange, categories = [], locations = [] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    priceRange: '',
    rating: '',
    sortBy: 'popular'
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      location: '',
      priceRange: '',
      rating: '',
      sortBy: 'popular'
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some(
    (value) => value && value !== 'popular'
  )

  return (
    <div className="filter-container">
      <button 
        className="filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterIcon size={20} />
        <span>Filters</span>
        {hasActiveFilters && <span className="filter-badge">{Object.values(filters).filter(v => v && v !== 'popular').length}</span>}
      </button>

      {isOpen && (
        <div className="filter-panel">
          <div className="filter-header">
            <h3>Filter Results</h3>
            <button onClick={() => setIsOpen(false)} className="close-filter">
              <X size={20} />
            </button>
          </div>

          <div className="filter-content">
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">Any Price</option>
                <option value="low">Low (Under ₦50,000)</option>
                <option value="medium">Medium (₦50,000 - ₦200,000)</option>
                <option value="high">High (₦200,000 - ₦500,000)</option>
                <option value="premium">Premium (Above ₦500,000)</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="1">1+ Star</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="nearest">Nearest</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button onClick={clearFilters} className="btn btn-secondary">
              Clear All
            </button>
            <button onClick={() => setIsOpen(false)} className="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter


