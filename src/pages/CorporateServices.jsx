import { Link } from 'react-router-dom'
import { Briefcase, Calendar, Building, Users, ArrowRight, CheckCircle } from 'lucide-react'
import './CorporateServices.css'

const CorporateServices = () => {
  const services = [
    {
      icon: <Calendar size={32} />,
      title: 'Event Planning',
      description: 'Professional corporate event planning services for conferences, seminars, team building, and company celebrations.',
      features: [
        'Venue selection and booking',
        'Catering coordination',
        'Audio-visual setup',
        'Event management',
        'Post-event follow-up'
      ]
    },
    {
      icon: <Building size={32} />,
      title: 'Office Setup & Expansion',
      description: 'Complete office setup solutions including space planning, furniture procurement, IT infrastructure, and relocation services.',
      features: [
        'Space planning and design',
        'Furniture and equipment sourcing',
        'IT infrastructure setup',
        'Relocation services',
        'Maintenance support'
      ]
    },
    {
      icon: <Briefcase size={32} />,
      title: 'Resource Planning',
      description: 'Strategic resource planning and procurement services to help your business operate efficiently and cost-effectively.',
      features: [
        'Vendor management',
        'Supply chain optimization',
        'Cost analysis and budgeting',
        'Resource allocation',
        'Performance monitoring'
      ]
    },
    {
      icon: <Users size={32} />,
      title: 'Corporate Partnerships',
      description: 'Connect with trusted suppliers, contractors, and service providers for your corporate needs.',
      features: [
        'Verified business network',
        'Bulk procurement options',
        'Preferred vendor programs',
        'Dedicated account management',
        'Custom solutions'
      ]
    }
  ]

  return (
    <div className="corporate-services-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Corporate Services</h1>
          <p className="page-subtitle">
            Comprehensive solutions for businesses, SMEs, government, and parastatal bodies
          </p>
        </div>

        <div className="services-intro">
          <p>
            All in Moris provides specialized corporate services designed to streamline your business operations,
            reduce costs, and improve efficiency. Whether you're planning a major event, setting up a new office,
            or managing resources, we connect you with the right professionals.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h2 className="service-title">{service.title}</h2>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <CheckCircle size={18} className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary service-btn">
                Get Started <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to Transform Your Business Operations?</h2>
            <p>Let our team help you find the perfect solutions for your corporate needs</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <Link to="/categories" className="btn btn-secondary">
                Browse Services
              </Link>
            </div>
          </div>
        </div>

        <div className="benefits-section">
          <h2 className="section-title">Why Choose All in Moris for Corporate Services?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h3>Verified Network</h3>
              <p>All businesses are verified and vetted for quality and reliability</p>
            </div>
            <div className="benefit-item">
              <h3>Cost-Effective</h3>
              <p>Access competitive pricing and bulk procurement options</p>
            </div>
            <div className="benefit-item">
              <h3>Dedicated Support</h3>
              <p>Personalized assistance for your corporate requirements</p>
            </div>
            <div className="benefit-item">
              <h3>Time-Saving</h3>
              <p>Streamlined process to find and connect with providers quickly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CorporateServices


