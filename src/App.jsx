import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminLayout from './components/AdminLayout'
import { ADMIN_BASE_PATH } from './config/adminConfig'
import './App.css'

// Lazy load pages for code splitting and faster initial load
const Home = lazy(() => import('./pages/Home'))
const Categories = lazy(() => import('./pages/Categories'))
const BusinessListing = lazy(() => import('./pages/BusinessListing'))
const AddBusiness = lazy(() => import('./pages/AddBusiness'))
const RealEstate = lazy(() => import('./pages/RealEstate'))
const CorporateServices = lazy(() => import('./pages/CorporateServices'))
const LeisureActivities = lazy(() => import('./pages/LeisureActivities'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

// Admin pages - lazy loaded
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const BusinessManagement = lazy(() => import('./pages/admin/BusinessManagement'))
const PendingApprovals = lazy(() => import('./pages/admin/PendingApprovals'))
const ContactSubmissions = lazy(() => import('./pages/admin/ContactSubmissions'))

// Loading component
const PageLoader = () => (
  <div style={{ 
    minHeight: '50vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    <div>Loading...</div>
  </div>
)

function App() {
  return (
    <ThemeProvider>
      {/* Auth temporarily disabled - uncomment to re-enable */}
      {/* <AuthProvider> */}
        <Router>
          <div className="app">
            <Routes>
              {/* Public Routes */}
              <Route path="/*" element={
                <>
                  <Navbar />
                  <main className="main-content">
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/business/:id" element={<BusinessListing />} />
                        <Route path="/add-business" element={<AddBusiness />} />
                        <Route path="/real-estate" element={<RealEstate />} />
                        <Route path="/corporate-services" element={<CorporateServices />} />
                        <Route path="/leisure-activities" element={<LeisureActivities />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                </>
              } />

              {/* Admin Routes - Secure URL (Authentication temporarily disabled) */}
              <Route path={`${ADMIN_BASE_PATH}/*`} element={
                // <ProtectedRoute>
                  <AdminLayout>
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/businesses" element={<BusinessManagement />} />
                        <Route path="/pending" element={<PendingApprovals />} />
                        <Route path="/contact-submissions" element={<ContactSubmissions />} />
                      </Routes>
                    </Suspense>
                  </AdminLayout>
                // </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      {/* </AuthProvider> */}
    </ThemeProvider>
  )
}

export default App


