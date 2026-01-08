import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CheckCircle, 
  XCircle, 
  Eye,
  Clock,
  Building2,
  Home
} from 'lucide-react'
import { 
  getPendingBusinesses,
  approveBusiness,
  rejectBusiness,
  getAllProperties,
  approveProperty,
  rejectProperty
} from '../../services/adminService'
import './PendingApprovals.css'

const PendingApprovals = () => {
  const navigate = useNavigate()
  const [pendingBusinesses, setPendingBusinesses] = useState([])
  const [pendingProperties, setPendingProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('businesses')
  const [actionLoading, setActionLoading] = useState(null)

  useEffect(() => {
    loadPendingItems()
  }, [])

  const loadPendingItems = async () => {
    setLoading(true)
    try {
      const [businesses, properties] = await Promise.all([
        getPendingBusinesses(),
        getAllProperties().then(props => props.filter(p => !p.approved))
      ])
      setPendingBusinesses(businesses)
      setPendingProperties(properties)
    } catch (error) {
      console.error('Error loading pending items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveBusiness = async (id) => {
    setActionLoading(`business-${id}`)
    try {
      await approveBusiness(id)
      await loadPendingItems()
    } catch (error) {
      alert('Failed to approve business: ' + error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectBusiness = async (id) => {
    if (!confirm('Are you sure you want to reject this business?')) {
      return
    }
    setActionLoading(`business-${id}`)
    try {
      await rejectBusiness(id)
      await loadPendingItems()
    } catch (error) {
      alert('Failed to reject business: ' + error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleApproveProperty = async (id) => {
    setActionLoading(`property-${id}`)
    try {
      await approveProperty(id)
      await loadPendingItems()
    } catch (error) {
      alert('Failed to approve property: ' + error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectProperty = async (id) => {
    if (!confirm('Are you sure you want to reject this property?')) {
      return
    }
    setActionLoading(`property-${id}`)
    try {
      await rejectProperty(id)
      await loadPendingItems()
    } catch (error) {
      alert('Failed to reject property: ' + error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="pending-approvals">
        <div className="approvals-container">
          <div className="loading-state">Loading pending approvals...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="pending-approvals">
      <div className="approvals-container">
        <div className="page-header">
          <h1>Pending Approvals</h1>
          <p>Review and approve pending submissions</p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'businesses' ? 'active' : ''}`}
            onClick={() => setActiveTab('businesses')}
          >
            <Building2 size={18} />
            Businesses ({pendingBusinesses.length})
          </button>
          <button
            className={`tab ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            <Home size={18} />
            Properties ({pendingProperties.length})
          </button>
        </div>

        {activeTab === 'businesses' && (
          <div className="pending-list">
            {pendingBusinesses.length === 0 ? (
              <div className="empty-state">
                <CheckCircle size={48} />
                <h3>No Pending Businesses</h3>
                <p>All businesses have been reviewed</p>
              </div>
            ) : (
              pendingBusinesses.map((business) => (
                <div key={business.id} className="pending-card">
                  <div className="card-header">
                    <div className="card-title">
                      <h3>{business.name}</h3>
                      <span className="badge pending">
                        <Clock size={14} />
                        Pending
                      </span>
                    </div>
                    <div className="card-meta">
                      <span>{business.category}</span>
                      <span>•</span>
                      <span>{business.location}</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <p className="description">{business.description}</p>
                    <div className="card-details">
                      <div className="detail-item">
                        <strong>Email:</strong> {business.email}
                      </div>
                      <div className="detail-item">
                        <strong>Phone:</strong> {business.phone}
                      </div>
                      {business.services && business.services.length > 0 && (
                        <div className="detail-item">
                          <strong>Services:</strong>
                          <div className="services-tags">
                            {business.services.slice(0, 5).map((service, idx) => (
                              <span key={idx} className="service-tag">{service}</span>
                            ))}
                            {business.services.length > 5 && (
                              <span className="service-tag">+{business.services.length - 5} more</span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="detail-item">
                        <strong>Submitted:</strong> {formatDate(business.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      onClick={() => navigate(`/business/${business.id}`)}
                      className="btn btn-secondary"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                    <button
                      onClick={() => handleRejectBusiness(business.id)}
                      className="btn btn-danger"
                      disabled={actionLoading === `business-${business.id}`}
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproveBusiness(business.id)}
                      className="btn btn-primary"
                      disabled={actionLoading === `business-${business.id}`}
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="pending-list">
            {pendingProperties.length === 0 ? (
              <div className="empty-state">
                <CheckCircle size={48} />
                <h3>No Pending Properties</h3>
                <p>All properties have been reviewed</p>
              </div>
            ) : (
              pendingProperties.map((property) => (
                <div key={property.id} className="pending-card">
                  <div className="card-header">
                    <div className="card-title">
                      <h3>{property.title}</h3>
                      <span className="badge pending">
                        <Clock size={14} />
                        Pending
                      </span>
                    </div>
                    <div className="card-meta">
                      <span>{property.type === 'sale' ? 'For Sale' : 'For Rent'}</span>
                      <span>•</span>
                      <span>{property.location}</span>
                      <span>•</span>
                      <span className="price">₦{property.price?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <p className="description">{property.description}</p>
                    <div className="card-details">
                      {property.bedrooms && (
                        <div className="detail-item">
                          <strong>Bedrooms:</strong> {property.bedrooms}
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="detail-item">
                          <strong>Bathrooms:</strong> {property.bathrooms}
                        </div>
                      )}
                      {property.area && (
                        <div className="detail-item">
                          <strong>Area:</strong> {property.area} sq ft
                        </div>
                      )}
                      <div className="detail-item">
                        <strong>Submitted:</strong> {formatDate(property.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      onClick={() => handleRejectProperty(property.id)}
                      className="btn btn-danger"
                      disabled={actionLoading === `property-${property.id}`}
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproveProperty(property.id)}
                      className="btn btn-primary"
                      disabled={actionLoading === `property-${property.id}`}
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PendingApprovals

