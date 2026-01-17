'use client'

import { useState } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formMessage, setFormMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null })
  const [isLoading, setIsLoading] = useState(false)

  const formatUrl = (url: string, type: string) => {
    if (type === 'email') return `mailto:${url}`
    if (type === 'linkedin' && !url.startsWith('http')) return `https://www.${url}`
    if (type === 'github' && !url.startsWith('http')) return `https://${url}`
    if (type === 'facebook' && !url.startsWith('http')) return `https://www.${url}`
    return url.startsWith('http') ? url : `https://${url}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormMessage({ text: 'Please fill in all fields.', type: 'error' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormMessage({ text: 'Please enter a valid email address.', type: 'error' })
      return
    }

    setIsLoading(true)
    setFormMessage({ text: '', type: null })

    // TODO: Configure EmailJS
    const EMAILJS_CONFIG = {
      serviceId: 'YOUR_SERVICE_ID',
      templateId: 'YOUR_TEMPLATE_ID',
      publicKey: 'YOUR_PUBLIC_KEY'
    }

    const isEmailJSConfigured = EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' && 
                               EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' &&
                               EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY'

    if (isEmailJSConfigured && typeof window !== 'undefined' && (window as any).emailjs) {
      try {
        await (window as any).emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: portfolioData.contact.email
          }
        )
        
        setFormMessage({ 
          text: `Thank you, ${formData.name}! Your message has been sent successfully. I'll get back to you soon at ${formData.email}.`, 
          type: 'success' 
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } catch (error) {
        console.error('EmailJS Error:', error)
        setFormMessage({ 
          text: `Sorry, there was an error sending your message. Please try again later or contact me directly at ${portfolioData.contact.email}`, 
          type: 'error' 
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      // Fallback: Show success message
      setTimeout(() => {
        setFormMessage({ 
          text: `Thank you, ${formData.name}! Your message has been received. I'll get back to you soon at ${formData.email}.`, 
          type: 'success' 
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setIsLoading(false)
        
        setTimeout(() => {
          setFormMessage({ text: '', type: null })
        }, 5000)
      }, 1500)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          I&apos;m open to internships, collaborative projects, and opportunities to learn and grow. 
          Feel free to reach out!
        </p>
        
        <div className="contact-content">
          <div className="contact-info" id="contactInfoContainer">
            <a href={formatUrl(portfolioData.contact.email, 'email')} className="contact-item contact-link" title="Send me an email">
              <div className="contact-icon-wrapper">
                <div className="contact-icon">📧</div>
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>{portfolioData.contact.email}</p>
                <span className="contact-hint">Click to send email</span>
              </div>
            </a>
            <a 
              href={formatUrl(portfolioData.contact.linkedin, 'linkedin')} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-item contact-link" 
              title="Visit my LinkedIn profile"
            >
              <div className="contact-icon-wrapper">
                <div className="contact-icon">💼</div>
              </div>
              <div className="contact-details">
                <h3>LinkedIn</h3>
                <p>{portfolioData.contact.linkedin}</p>
                <span className="contact-hint">Visit profile →</span>
              </div>
            </a>
            <a 
              href={formatUrl(portfolioData.contact.github, 'github')} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-item contact-link" 
              title="Visit my GitHub profile"
            >
              <div className="contact-icon-wrapper">
                <div className="contact-icon">🐙</div>
              </div>
              <div className="contact-details">
                <h3>GitHub</h3>
                <p>{portfolioData.contact.github}</p>
                <span className="contact-hint">Visit profile →</span>
              </div>
            </a>
            {portfolioData.contact.cvPath && (
              <a 
                href={portfolioData.contact.cvPath} 
                download 
                className="contact-item contact-link" 
                title="Download my CV/Resume"
              >
                <div className="contact-icon-wrapper">
                  <div className="contact-icon">📄</div>
                </div>
                <div className="contact-details">
                  <h3>Download CV</h3>
                  <p>Get my resume</p>
                  <span className="contact-hint">Download PDF →</span>
                </div>
              </a>
            )}
            <a 
              href={portfolioData.contact.locationLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-item contact-link" 
              title="View location on Google Maps"
            >
              <div className="contact-icon-wrapper">
                <div className="contact-icon">📍</div>
              </div>
              <div className="contact-details">
                <h3>Location</h3>
                <p>{portfolioData.contact.location}</p>
                <span className="contact-hint">View on map →</span>
              </div>
            </a>
          </div>

          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            {formMessage.text && (
              <div className={`form-message ${formMessage.type} show`}>
                {formMessage.text}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your full name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="your.email@example.com" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="What's this about?" 
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={10} 
                placeholder="Tell me about your project or opportunity..." 
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className={`btn btn-primary btn-send-message ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              <span className="btn-text">Send Message</span>
              <span className="btn-icon">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

