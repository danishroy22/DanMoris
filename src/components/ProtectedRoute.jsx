import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ADMIN_ROUTES } from '../config/adminConfig'
import AdminLogin from '../pages/admin/AdminLogin'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--bg-color, #f5f5f5)'
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <AdminLogin />
  }

  return children
}

export default ProtectedRoute

