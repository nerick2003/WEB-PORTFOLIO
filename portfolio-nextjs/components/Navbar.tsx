'use client'

import { useState, useEffect } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <div className="nav-brand">
          <span className="brand-icon">💻</span>
          <span className="brand-text">{portfolioData.personalInfo.name}&apos;s Portfolio</span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
          <li><a href="#skills" className="nav-link" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
          <li><a href="#projects" className="nav-link" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
          <li><a href="#achievements" className="nav-link" onClick={(e) => handleNavClick(e, '#achievements')}>Achievements</a></li>
          <li><a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
        </ul>
        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          id="hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

