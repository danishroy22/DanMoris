import { memo } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, Phone, Mail } from 'lucide-react'
import './BusinessCard.css'

const BusinessCard = memo(({ business }) => {
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={16} className="star filled" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} size={16} className="star half" />)
      } else {
        stars.push(<Star key={i} size={16} className="star empty" />)
      }
    }
    return stars
  }

  return (
    <Link to={`/business/${business.id}`} className="business-card">
      <div className="card-image-container">
        {business.image ? (
          <img 
            src={business.image} 
            alt={business.name} 
            className="card-image"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="card-image-placeholder">
            <span>{business.name?.charAt(0).toUpperCase()}</span>
          </div>
        )}
        {business.featured && (
          <span className="featured-badge">Featured</span>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{business.name}</h3>
        <p className="card-category">{business.category}</p>
        
        {business.location && (
          <div className="card-location">
            <MapPin size={16} />
            <span>{business.location}</span>
          </div>
        )}
        
        {business.rating !== undefined && (
          <div className="card-rating">
            <div className="stars">{renderStars(business.rating)}</div>
            <span className="rating-value">({business.rating?.toFixed(1) || 0})</span>
          </div>
        )}
        
        {business.description && (
          <p className="card-description">
            {business.description.length > 100
              ? `${business.description.substring(0, 100)}...`
              : business.description}
          </p>
        )}
        
        {business.services && business.services.length > 0 && (
          <div className="card-services">
            {business.services.slice(0, 3).map((service, index) => (
              <span key={index} className="service-tag">{service}</span>
            ))}
            {business.services.length > 3 && (
              <span className="service-tag">+{business.services.length - 3} more</span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
})

BusinessCard.displayName = 'BusinessCard'

export default BusinessCard


