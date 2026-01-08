import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Star, Globe, Clock, ArrowLeft, CheckCircle } from 'lucide-react'
import Modal from '../components/Modal'
import { getBusinessById } from '../services/businessService'
import './BusinessListing.css'

const BusinessListing = () => {
  const { id } = useParams()
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    loadBusiness()
  }, [id])

  const loadBusiness = async () => {
    try {
      const data = await getBusinessById(id)
      setBusiness(data)
    } catch (error) {
      console.error('Error loading business:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuoteSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement quote submission
    console.log('Quote request:', quoteForm)
    alert('Quote request submitted! The business will contact you soon.')
    setShowQuoteModal(false)
    setQuoteForm({ name: '', email: '', phone: '', message: '' })
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={i < fullStars ? 'star filled' : 'star empty'}
        />
      )
    }
    return stars
  }

  if (loading) {
    return (
      <div className="business-listing-page">
        <div className="container">
          <div className="loading">Loading business details...</div>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="business-listing-page">
        <div className="container">
          <div className="no-results">
            <h2>Business not found</h2>
            <Link to="/categories" className="btn btn-primary">
              Browse Businesses
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="business-listing-page">
      <div className="container">
        <Link to="/categories" className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Categories</span>
        </Link>

        <div className="business-header">
          <div className="business-info">
            <div className="business-title-section">
              <h1 className="business-name">{business.name}</h1>
              {business.featured && (
                <span className="featured-badge">Featured</span>
              )}
            </div>
            <p className="business-category">{business.category}</p>
            {business.location && (
              <div className="business-location">
                <MapPin size={20} />
                <span>{business.location}</span>
              </div>
            )}
            {business.rating !== undefined && (
              <div className="business-rating">
                <div className="stars">{renderStars(business.rating)}</div>
                <span className="rating-value">
                  {business.rating?.toFixed(1) || 0} ({business.reviews?.length || 0} reviews)
                </span>
              </div>
            )}
          </div>
          <div className="business-actions">
            <button
              onClick={() => setShowQuoteModal(true)}
              className="btn btn-primary quote-btn"
            >
              Request a Quote
            </button>
            {business.phone && (
              <a href={`tel:${business.phone}`} className="btn btn-secondary">
                <Phone size={18} />
                Call Now
              </a>
            )}
            {business.email && (
              <a href={`mailto:${business.email}`} className="btn btn-secondary">
                <Mail size={18} />
                Email
              </a>
            )}
          </div>
        </div>

        {business.image && (
          <div className="business-hero-image">
            <img 
              src={business.image} 
              alt={business.name}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <div className="business-content">
          <div className="business-main">
            <section className="business-section">
              <h2>About</h2>
              <p className="business-description">{business.description}</p>
            </section>

            {business.services && business.services.length > 0 && (
              <section className="business-section">
                <h2>Services Offered</h2>
                <div className="services-grid">
                  {business.services.map((service, index) => (
                    <div key={index} className="service-item">
                      <CheckCircle size={20} className="service-icon" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {business.portfolio && business.portfolio.length > 0 && (
              <section className="business-section">
                <h2>Portfolio / Gallery</h2>
                <div className="portfolio-grid">
                  {business.portfolio.map((image, index) => (
                    <div key={index} className="portfolio-item">
                      <img 
                        src={image} 
                        alt={`Portfolio ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {business.reviews && business.reviews.length > 0 && (
              <section className="business-section">
                <h2>Reviews</h2>
                <div className="reviews-list">
                  {business.reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <div className="review-header">
                        <div className="review-author">{review.author || 'Anonymous'}</div>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="review-text">{review.text}</p>
                      {review.date && (
                        <div className="review-date">{review.date}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="business-sidebar">
            <div className="contact-card">
              <h3>Contact Information</h3>
              {business.phone && (
                <div className="contact-item">
                  <Phone size={18} />
                  <a href={`tel:${business.phone}`}>{business.phone}</a>
                </div>
              )}
              {business.email && (
                <div className="contact-item">
                  <Mail size={18} />
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </div>
              )}
              {business.website && (
                <div className="contact-item">
                  <Globe size={18} />
                  <a href={business.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </div>
              )}
              {business.location && (
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>{business.location}</span>
                </div>
              )}
            </div>

            {business.hours && (
              <div className="hours-card">
                <h3>Business Hours</h3>
                <div className="hours-list">
                  {business.hours.map((hour, index) => (
                    <div key={index} className="hour-item">
                      <span className="hour-day">{hour.day}</span>
                      <span className="hour-time">{hour.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <Modal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        title="Request a Quote"
      >
        <form onSubmit={handleQuoteSubmit} className="quote-form">
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              required
              value={quoteForm.name}
              onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              required
              value={quoteForm.email}
              onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              required
              value={quoteForm.phone}
              onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Message / Requirements *</label>
            <textarea
              required
              rows="5"
              value={quoteForm.message}
              onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
              placeholder="Describe what you need..."
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setShowQuoteModal(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Request
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default BusinessListing

