import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Categories from './pages/Categories'
import BusinessListing from './pages/BusinessListing'
import AddBusiness from './pages/AddBusiness'
import RealEstate from './pages/RealEstate'
import CorporateServices from './pages/CorporateServices'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/business/:id" element={<BusinessListing />} />
              <Route path="/add-business" element={<AddBusiness />} />
              <Route path="/real-estate" element={<RealEstate />} />
              <Route path="/corporate-services" element={<CorporateServices />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App


