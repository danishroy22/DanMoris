import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Building2, 
  Clock, 
  ArrowLeft,
  LogOut,
  Mail
} from 'lucide-react'
import { ADMIN_ROUTES } from '../config/adminConfig'
// import { useAuth } from '../contexts/AuthContext' // Auth temporarily disabled
// import { logout } from '../services/authService' // Auth temporarily disabled
import './AdminNavbar.css'

const AdminNavbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // const { user } = useAuth() // Auth temporarily disabled

  const adminLinks = [
    { path: ADMIN_ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { path: ADMIN_ROUTES.BUSINESSES, label: 'Businesses', icon: Building2 },
    { path: ADMIN_ROUTES.PENDING, label: 'Pending', icon: Clock },
    { path: `${ADMIN_ROUTES.DASHBOARD.split('/dashboard')[0]}/contact-submissions`, label: 'Contact Forms', icon: Mail },
  ]

  // Logout temporarily disabled - uncomment to re-enable
  // const handleLogout = async () => {
  //   if (window.confirm('Are you sure you want to logout?')) {
  //     await logout()
  //     // Redirect will happen automatically via ProtectedRoute
  //     window.location.href = ADMIN_ROUTES.DASHBOARD
  //   }
  // }

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-navbar-header">
          <Link to={ADMIN_ROUTES.DASHBOARD} className="admin-logo">
            <span className="admin-logo-text">Admin Panel</span>
          </Link>
          <div className="admin-navbar-actions">
            {/* User info temporarily disabled - uncomment to re-enable */}
            {/* {user && (
              <div className="user-info">
                <span className="user-email">{user.email}</span>
              </div>
            )} */}
            <Link to="/" className="back-to-site">
              <ArrowLeft size={18} />
              <span>Back to Site</span>
            </Link>
            {/* Logout button temporarily disabled - uncomment to re-enable */}
            {/* <button onClick={handleLogout} className="logout-button">
              <LogOut size={18} />
              <span>Logout</span>
            </button> */}
          </div>
        </div>

        <div className="admin-navbar-links">
          {adminLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`admin-nav-link ${
                  location.pathname === link.path ? 'active' : ''
                }`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar

