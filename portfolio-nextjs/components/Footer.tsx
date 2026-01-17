'use client'

import { portfolioData } from '@/data/portfolio'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Let&apos;s Connect</h3>
            <p className="footer-description">Feel free to reach out for collaborations, opportunities, or just to say hello!</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Technologies</h3>
            <p className="footer-description">This portfolio is built with modern web technologies and best practices.</p>
            <div className="footer-tech-tags">
              <span className="tech-tag">HTML5</span>
              <span className="tech-tag">CSS3</span>
              <span className="tech-tag">JavaScript</span>
              <span className="tech-tag">React</span>
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">Responsive Design</span>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">About This Site</h3>
            <p className="footer-description">Built with passion for learning and growth in Information Technology. Crafted with modern web technologies and attention to detail.</p>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>&copy; 2025 <span id="footerName">{portfolioData.personalInfo.name}</span>. All rights reserved.</p>
          <p className="footer-tagline">Made with <span className="heart">❤️</span> and dedication</p>
        </div>
      </div>
    </footer>
  )
}

