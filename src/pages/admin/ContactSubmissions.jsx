/**
 * Contact Submissions Admin Page
 * View and manage all contact form submissions
 */
import { useState, useEffect } from 'react'
import { Mail, Phone, Calendar, CheckCircle, XCircle } from 'lucide-react'
import { getContactSubmissions, markSubmissionAsRead } from '../../services/contactService'
import './ContactSubmissions.css'

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, new, read

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    setLoading(true)
    try {
      const data = await getContactSubmissions()
      setSubmissions(data)
    } catch (error) {
      console.error('Error loading submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await markSubmissionAsRead(id)
      await loadSubmissions()
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleString()
  }

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'new') return !sub.read
    if (filter === 'read') return sub.read
    return true
  })

  if (loading) {
    return (
      <div className="contact-submissions">
        <div className="submissions-container">
          <div className="loading-state">Loading submissions...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-submissions">
      <div className="submissions-container">
        <div className="page-header">
          <h1>Contact Form Submissions</h1>
          <p>View and manage all contact form submissions</p>
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({submissions.length})
          </button>
          <button
            className={`filter-tab ${filter === 'new' ? 'active' : ''}`}
            onClick={() => setFilter('new')}
          >
            New ({submissions.filter(s => !s.read).length})
          </button>
          <button
            className={`filter-tab ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read ({submissions.filter(s => s.read).length})
          </button>
        </div>

        <div className="submissions-list">
          {filteredSubmissions.length === 0 ? (
            <div className="empty-state">
              <Mail size={48} />
              <h3>No Submissions</h3>
              <p>No contact form submissions found</p>
            </div>
          ) : (
            filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className={`submission-card ${submission.read ? 'read' : 'new'}`}
              >
                <div className="submission-header">
                  <div className="submission-meta">
                    <h3>{submission.name}</h3>
                    <div className="submission-contact">
                      <Mail size={16} />
                      <span>{submission.email}</span>
                      {submission.phone && (
                        <>
                          <Phone size={16} />
                          <span>{submission.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="submission-status">
                    {submission.read ? (
                      <span className="status-badge read">
                        <CheckCircle size={14} />
                        Read
                      </span>
                    ) : (
                      <span className="status-badge new">
                        <XCircle size={14} />
                        New
                      </span>
                    )}
                  </div>
                </div>

                <div className="submission-body">
                  <div className="submission-subject">
                    <strong>Subject:</strong> {submission.subject}
                  </div>
                  <div className="submission-message">
                    <strong>Message:</strong>
                    <p>{submission.message}</p>
                  </div>
                </div>

                <div className="submission-footer">
                  <div className="submission-date">
                    <Calendar size={16} />
                    <span>Submitted: {formatDate(submission.submittedAt)}</span>
                  </div>
                  {!submission.read && (
                    <button
                      onClick={() => handleMarkAsRead(submission.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactSubmissions

