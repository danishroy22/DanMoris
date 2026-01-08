/**
 * Company Promotion (Paid) Container Component
 * Visually distinct container for promoted/featured companies
 * Reusable component for highlighting paid promotions
 */
import { Star, TrendingUp } from 'lucide-react'
import BusinessCard from './BusinessCard'
import './CompanyPromotion.css'

const CompanyPromotion = ({ businesses = [], title = 'Company Promotion (Paid)' }) => {
  if (!businesses || businesses.length === 0) {
    return null
  }

  return (
    <section className="company-promotion-section">
      <div className="container">
        <div className="promotion-header">
          <div className="promotion-badge">
            <TrendingUp size={18} />
            <span>{title}</span>
          </div>
          <h2 className="promotion-title">Featured Companies</h2>
          <p className="promotion-subtitle">
            Discover our promoted partners and featured businesses
          </p>
        </div>
        
        <div className="promotion-grid">
          {businesses.map((business) => (
            <div key={business.id} className="promotion-card-wrapper">
              <BusinessCard business={business} />
              <div className="promotion-indicator">
                <Star size={14} />
                <span>Promoted</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyPromotion

