import { useState, useEffect } from 'react'
import { 
  Building2, 
  CheckCircle, 
  Clock, 
  Eye, 
  Home, 
  TrendingUp,
  MapPin,
  Tag,
  MousePointerClick,
  FileText
} from 'lucide-react'
import { getDashboardStats } from '../../services/adminService'
import { getTotalSiteViews, getAnalytics } from '../../services/analyticsService'
import { getContactSubmissions } from '../../services/contactService'
import './Dashboard.css'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [totalSiteViews, setTotalSiteViews] = useState(0)
  const [pageViews, setPageViews] = useState({})
  const [adminClicks, setAdminClicks] = useState(0)
  const [contactSubmissions, setContactSubmissions] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    try {
      const [dashboardData, siteViews, analytics, submissions] = await Promise.all([
        getDashboardStats(),
        getTotalSiteViews(),
        getAnalytics(new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]),
        getContactSubmissions()
      ])
      
      setStats(dashboardData)
      setTotalSiteViews(siteViews)
      
      // Calculate page views from today's analytics
      if (analytics.length > 0) {
        const todayAnalytics = analytics[0]
        setPageViews(todayAnalytics.pageViews || {})
        
        // Count total admin clicks
        const clicks = todayAnalytics.adminClicks || {}
        setAdminClicks(Object.values(clicks).reduce((sum, val) => sum + val, 0))
      }
      
      setContactSubmissions(submissions.length)
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-container">
          <div className="loading-state">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-container">
          <div className="error-state">Failed to load dashboard data</div>
        </div>
      </div>
    )
  }

  const topCategories = Object.entries(stats.categoryDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const topLocations = Object.entries(stats.locationDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Overview of your platform</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon business">
              <Building2 size={24} />
            </div>
            <div className="stat-content">
              <h3>Total Businesses</h3>
              <p className="stat-value">{stats.totalBusinesses}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon approved">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>Approved</h3>
              <p className="stat-value">{stats.approvedBusinesses}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <h3>Pending Approval</h3>
              <p className="stat-value">{stats.pendingBusinesses}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon views">
              <Eye size={24} />
            </div>
            <div className="stat-content">
              <h3>Total Views</h3>
              <p className="stat-value">{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon property">
              <Home size={24} />
            </div>
            <div className="stat-content">
              <h3>Properties</h3>
              <p className="stat-value">{stats.totalProperties}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending-prop">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <h3>Pending Properties</h3>
              <p className="stat-value">{stats.pendingProperties}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="dashboard-section">
            <div className="section-header">
              <Tag size={20} />
              <h2>Top Categories</h2>
            </div>
            <div className="category-list">
              {topCategories.length > 0 ? (
                topCategories.map(([category, count]) => (
                  <div key={category} className="category-item">
                    <span className="category-name">{category}</span>
                    <span className="category-count">{count}</span>
                  </div>
                ))
              ) : (
                <p className="empty-state">No categories yet</p>
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <MapPin size={20} />
              <h2>Top Locations</h2>
            </div>
            <div className="location-list">
              {topLocations.length > 0 ? (
                topLocations.map(([location, count]) => (
                  <div key={location} className="location-item">
                    <span className="location-name">{location}</span>
                    <span className="location-count">{count}</span>
                  </div>
                ))
              ) : (
                <p className="empty-state">No locations yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

