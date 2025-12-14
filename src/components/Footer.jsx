import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Dan Moris</h3>
            <p className="footer-description">
              Your one-stop platform for planning, research, and resource-finding.
              Connecting businesses with customers seamlessly.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/real-estate">Real Estate</Link></li>
              <li><Link to="/corporate-services">Corporate Services</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/add-business">List Your Business</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={18} />
                <span>info@danmoris.com</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+234 (0) 123 456 7890</span>
              </li>
              <li>
                <MapPin size={18} />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Dan Moris. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


