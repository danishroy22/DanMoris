import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Eye,
  Clock
} from 'lucide-react'
import { 
  getAllBusinesses, 
  approveBusiness, 
  rejectBusiness
} from '../../services/adminService'
import { deleteBusiness } from '../../services/businessService'
import { MAURITIUS_LOCATIONS } from '../../constants/locations'
import { BUSINESS_CATEGORIES } from '../../constants/categories'
import './BusinessManagement.css'

const BusinessManagement = () => {
  const navigate = useNavigate()
  const [businesses, setBusinesses] = useState([])
  const [filteredBusinesses, setFilteredBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [actionLoading, setActionLoading] = useState(null)

  const categories = BUSINESS_CATEGORIES

  const locations = MAURITIUS_LOCATIONS

  useEffect(() => {
    loadBusinesses()
  }, [])

  useEffect(() => {
    filterBusinesses()
  }, [businesses, searchTerm, statusFilter, categoryFilter, locationFilter])

  const loadBusinesses = async () => {
    setLoading(true)
    try {
      const data = await getAllBusinesses()
      setBusinesses(data)
      setFilteredBusinesses(data)
    } catch (error) {
      console.error('Error loading businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterBusinesses = () => {
    let filtered = [...businesses]

    // Status filter
    if (statusFilter === 'approved') {
      filtered = filtered.filter(b => b.approved === true)
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter(b => b.approved === false)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(b => b.category === categoryFilter)
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(b => b.location === locationFilter)
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(b =>
        b.name?.toLowerCase().includes(term) ||
        b.email?.toLowerCase().includes(term) ||
        b.description?.toLowerCase().includes(term)
      )
    }

    setFilteredBusinesses(filtered)
  }

  const handleApprove = async (id) => {
    setActionLoading(id)
    try {
      await approveBusiness(id)
      await loadBusinesses()
    } catch (error) {
      alert('Failed to approve business: ' + error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id) => {
    if (!confirm('Are you sure you want to reject this business?')) {
      return
    }
    setActionLoading(id)
    try {
      await rejectBusiness(id)
      await loadBusinesses()
    } catch (error) {
      alert('Failed to reject business: ' + error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this business? This action cannot be undone.')) {
      return
    }
    setActionLoading(id)
    try {
      await deleteBusiness(id)
      await loadBusinesses()
    } catch (error) {
      alert('Failed to delete business: ' + error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusBadge = (business) => {
    if (business.approved) {
      return <span className="status-badge approved">Approved</span>
    }
    return <span className="status-badge pending">Pending</span>
  }

  if (loading) {
    return (
      <div className="business-management">
        <div className="management-container">
          <div className="loading-state">Loading businesses...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="business-management">
      <div className="management-container">
        <div className="page-header">
          <h1>Business Management</h1>
          <p>Manage and approve business listings</p>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <Filter size={18} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="businesses-table">
          <div className="table-header">
            <div className="table-row">
              <div className="table-cell">Business</div>
              <div className="table-cell">Category</div>
              <div className="table-cell">Location</div>
              <div className="table-cell">Status</div>
              <div className="table-cell">Views</div>
              <div className="table-cell">Created</div>
              <div className="table-cell actions">Actions</div>
            </div>
          </div>

          <div className="table-body">
            {filteredBusinesses.length === 0 ? (
              <div className="empty-state">
                <p>No businesses found</p>
              </div>
            ) : (
              filteredBusinesses.map((business) => (
                <div key={business.id} className="table-row">
                  <div className="table-cell business-info">
                    <div className="business-name">{business.name}</div>
                    <div className="business-email">{business.email}</div>
                  </div>
                  <div className="table-cell">{business.category || 'N/A'}</div>
                  <div className="table-cell">{business.location || 'N/A'}</div>
                  <div className="table-cell">{getStatusBadge(business)}</div>
                  <div className="table-cell">{business.views || 0}</div>
                  <div className="table-cell">
                    {business.createdAt?.toDate 
                      ? new Date(business.createdAt.toDate()).toLocaleDateString()
                      : 'N/A'}
                  </div>
                  <div className="table-cell actions">
                    <div className="action-buttons">
                      <button
                        onClick={() => navigate(`/business/${business.id}`)}
                        className="btn-icon view"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      {!business.approved && (
                        <button
                          onClick={() => handleApprove(business.id)}
                          className="btn-icon approve"
                          disabled={actionLoading === business.id}
                          title="Approve"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {!business.approved && (
                        <button
                          onClick={() => handleReject(business.id)}
                          className="btn-icon reject"
                          disabled={actionLoading === business.id}
                          title="Reject"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(business.id)}
                        className="btn-icon delete"
                        disabled={actionLoading === business.id}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="table-footer">
          <p>Showing {filteredBusinesses.length} of {businesses.length} businesses</p>
        </div>
      </div>
    </div>
  )
}

export default BusinessManagement

