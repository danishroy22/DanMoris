import { Target, Eye, Users, CheckCircle } from 'lucide-react'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="page-header">
              <h1 className="page-title">About All in Moris</h1>
          <p className="page-subtitle">
            Connecting businesses with customers, making planning and resource-finding easy
          </p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <div className="mission-vision">
              <div className="mv-card">
                <div className="mv-icon">
                  <Target size={32} />
                </div>
                <h2>Our Mission</h2>
                <p>
                  To create a seamless platform that connects businesses, service providers, and customers,
                  making it easy to find, compare, and connect with the right resources for any project or need.
                  We aim to simplify the process of planning, researching, and sourcing across all industries.
                </p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">
                  <Eye size={32} />
                </div>
                <h2>Our Vision</h2>
                <p>
                  To become the leading multi-purpose planning and resource platform in Mauritius and beyond,
                  empowering businesses of all sizes to grow and succeed by providing easy access to quality
                  services, materials, and professional connections.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">Our Purpose</h2>
            <div className="purpose-content">
              <p>
             All in Moris was created to solve a fundamental problem: the difficulty of finding reliable
                contractors, suppliers, service providers, and resources when you need them most. Whether
                you're planning a personal project, managing a corporate event, or sourcing materials for
                construction, we provide a single, trusted platform to connect you with verified businesses.
              </p>
              <p>
                We serve a diverse range of users including the general public, small and medium enterprises (SMEs),
                large corporate companies, government agencies, and parastatal bodies. Our platform is designed
                to be accessible, user-friendly, and comprehensive, covering everything from construction and
                real estate to event planning and corporate services.
              </p>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <CheckCircle size={24} className="feature-check" />
                <h3>Comprehensive Directory</h3>
                <p>Access to contractors, retailers, wholesalers, distributors, and service providers across various industries</p>
              </div>
              <div className="feature-card">
                <CheckCircle size={24} className="feature-check" />
                <h3>Real Estate Services</h3>
                <p>Buy, sell, or rent properties with ease through our integrated real estate platform</p>
              </div>
              <div className="feature-card">
                <CheckCircle size={24} className="feature-check" />
                <h3>Project Planning</h3>
                <p>Plan personal or corporate projects and events with access to all necessary resources</p>
              </div>
              <div className="feature-card">
                <CheckCircle size={24} className="feature-check" />
                <h3>Direct Communication</h3>
                <p>Contact businesses directly through the platform or request quotes instantly</p>
              </div>
              <div className="feature-card">
                <CheckCircle size={24} className="feature-check" />
                <h3>Company Portfolios</h3>
                <p>View detailed profiles, portfolios, reviews, and ratings to make informed decisions</p>
              </div>
              <div className="feature-card">
                <CheckCircle size={24} className="feature-check" />
                <h3>Corporate Solutions</h3>
                <p>Specialized services for businesses including event planning, office setup, and resource management</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">Who We Serve</h2>
            <div className="audience-grid">
              <div className="audience-card">
                <Users size={32} className="audience-icon" />
                <h3>General Public</h3>
                <p>Individuals looking for contractors, services, or resources for personal projects</p>
              </div>
              <div className="audience-card">
                <Users size={32} className="audience-icon" />
                <h3>SMEs</h3>
                <p>Small and medium enterprises seeking reliable suppliers and service providers</p>
              </div>
              <div className="audience-card">
                <Users size={32} className="audience-icon" />
                <h3>Corporate Companies</h3>
                <p>Large corporations requiring comprehensive resource planning and corporate services</p>
              </div>
              <div className="audience-card">
                <Users size={32} className="audience-icon" />
                <h3>Government & Parastatals</h3>
                <p>Government agencies and parastatal bodies in need of verified service providers</p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <h2>Join the All in Moris Community</h2>
              <p>Whether you're a business looking to grow or a customer seeking quality services, we're here to help</p>
            <div className="cta-buttons">
              <a href="/add-business" className="btn btn-primary">List Your Business</a>
              <a href="/categories" className="btn btn-secondary">Browse Services</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About


