import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import BusinessCard from '../components/BusinessCard'
import { getBusinesses } from '../services/businessService'
import './Home.css'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredBusinesses, setFeaturedBusinesses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedBusinesses()
  }, [])

  const loadFeaturedBusinesses = async () => {
    try {
      const businesses = await getBusinesses({ sortBy: 'popular' })
      setFeaturedBusinesses(businesses.slice(0, 6))
    } catch (error) {
      console.error('Error loading featured businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/categories?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const categories = [
    { name: 'Contractors', icon: '🔨', link: '/categories?category=Contractors' },
    { name: 'Materials', icon: '🏗️', link: '/categories?category=Materials' },
    { name: 'Real Estate', icon: '🏠', link: '/real-estate' },
    { name: 'Services', icon: '⚙️', link: '/categories?category=Services' },
    { name: 'Events', icon: '🎉', link: '/categories?category=Events' },
  ]

  const steps = [
    {
      number: '1',
      title: 'Search',
      description: 'Find contractors, materials, services, or properties using our powerful search'
    },
    {
      number: '2',
      title: 'Compare',
      description: 'Browse profiles, portfolios, reviews, and ratings to make informed decisions'
    },
    {
      number: '3',
      title: 'Connect',
      description: 'Contact businesses directly or request quotes through our platform'
    },
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to All in Moris</h1>
          <p className="hero-subtitle">
            Your one-stop platform for planning, research, and resource-finding.
            Connect with trusted businesses and service providers.
          </p>
          <form onSubmit={handleSearch} className="hero-search">
            <div className="search-wrapper">
              <Search size={24} className="search-icon" />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hero-search-input"
              />
            </div>
            <button type="submit" className="btn btn-primary hero-search-btn">
              Search
            </button>
          </form>
          <div className="quick-categories">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="quick-category"
              >
                <span className="category-icon">{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get started in three simple steps
          </p>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">
            Find exactly what you need across different categories
          </p>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="category-card"
              >
                <div className="category-icon-large">{category.icon}</div>
                <h3>{category.name}</h3>
                <ArrowRight size={20} className="category-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="section featured-section">
        <div className="container">
          <h2 className="section-title">Featured Companies</h2>
          <p className="section-subtitle">
            Discover top-rated businesses and service providers
          </p>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : featuredBusinesses.length > 0 ? (
            <div className="businesses-grid grid-3">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No featured businesses yet. Be the first to list your business!</p>
              <Link to="/add-business" className="btn btn-primary">
                List Your Business
              </Link>
            </div>
          )}
          <div className="view-all">
            <Link to="/categories" className="btn btn-secondary">
              View All Businesses <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Grow Your Business?</h2>
            <p>Join thousands of businesses already on All in Moris</p>
            <Link to="/add-business" className="btn btn-primary cta-button">
              List Your Business Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

