import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, X } from 'lucide-react'
import { addBusiness } from '../services/businessService'
import './AddBusiness.css'

const AddBusiness = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    services: []
  })
  const [serviceInput, setServiceInput] = useState('')
  const [portfolioImages, setPortfolioImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const categories = [
    'Contractors',
    'Materials',
    'Services',
    'Events',
    'Real Estate',
    'Retailers',
    'Wholesalers',
    'Distributors'
  ]

  const locations = [
    'Lagos',
    'Abuja',
    'Port Harcourt',
    'Kano',
    'Ibadan',
    'Enugu',
    'Kaduna',
    'Other'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData({
        ...formData,
        services: [...formData.services, serviceInput.trim()]
      })
      setServiceInput('')
    }
  }

  const handleRemoveService = (index) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index)
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = files.map(file => URL.createObjectURL(file))
    setPortfolioImages([...portfolioImages, ...imageUrls])
  }

  const handleRemoveImage = (index) => {
    setPortfolioImages(portfolioImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.category || !formData.description || !formData.email || !formData.phone || !formData.location) {
        throw new Error('Please fill in all required fields')
      }

      const businessData = {
        ...formData,
        image: portfolioImages[0] || null,
        portfolio: portfolioImages.slice(1),
        createdAt: new Date().toISOString()
      }

      await addBusiness(businessData)
      setSuccess(true)
      setTimeout(() => {
        navigate('/categories')
      }, 2000)
    } catch (err) {
      setError(err.message || 'Failed to submit business. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="add-business-page">
        <div className="container">
          <div className="success-message">
            <h2>Business Submitted Successfully!</h2>
            <p>Your business listing has been submitted and is pending approval.</p>
            <p>You will be notified once it's approved.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="add-business-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Add Your Business</h1>
          <p className="page-subtitle">
            Join All in Moris and reach thousands of potential customers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="business-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Business Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your business name"
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Description *</label>
                <textarea
                  name="description"
                  required
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your business, services, and what makes you unique..."
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="business@example.com"
                />
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 123 456 7890"
                />
              </div>

              <div className="form-group">
                <label>Location *</label>
                <select
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value="">Select location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Website (Optional)</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.example.com"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Services Offered</h2>
            <div className="services-input-group">
              <input
                type="text"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                placeholder="Add a service and press Enter"
                className="service-input"
              />
              <button
                type="button"
                onClick={handleAddService}
                className="btn btn-secondary"
              >
                Add Service
              </button>
            </div>
            {formData.services.length > 0 && (
              <div className="services-list">
                {formData.services.map((service, index) => (
                  <div key={index} className="service-tag">
                    <span>{service}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="remove-service"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>Portfolio / Gallery</h2>
            <p className="section-description">
              Upload images to showcase your work. First image will be used as the main image.
            </p>
            <div className="image-upload-area">
              <label className="upload-label">
                <Upload size={24} />
                <span>Click to upload or drag and drop</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="file-input"
                />
              </label>
            </div>
            {portfolioImages.length > 0 && (
              <div className="portfolio-preview">
                {portfolioImages.map((image, index) => (
                  <div key={index} className="portfolio-item">
                    <img src={image} alt={`Portfolio ${index + 1}`} />
                    {index === 0 && <span className="main-image-badge">Main</span>}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="remove-image"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Business'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBusiness


