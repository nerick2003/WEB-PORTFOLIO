'use client'

import { useEffect, useRef } from 'react'
import { portfolioData } from '@/data/portfolio'
import Image from 'next/image'

export default function Hero() {
  const subtitleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (subtitleRef.current) {
      typewriterEffect(subtitleRef.current, portfolioData.personalInfo.title)
    }
  }, [])

  const typewriterEffect = (element: HTMLSpanElement, text: string) => {
    const speed = 60
    const loopDelay = 3000
    const cursor = element.parentElement?.querySelector('.typing-cursor') as HTMLElement

    function type() {
      element.textContent = ''
      let i = 0

      if (cursor) {
        cursor.style.opacity = '1'
        cursor.style.animation = 'cursorBlink 1s infinite, cursorGlow 1.5s ease-in-out infinite'
      }

      function typeChar() {
        if (i < text.length) {
          element.textContent += text.charAt(i)
          i++
          setTimeout(typeChar, speed)
        } else {
          if (cursor) {
            setTimeout(() => {
              cursor.style.opacity = '0'
              cursor.style.animation = 'none'
            }, 1000)
          }
          setTimeout(() => {
            type()
          }, loopDelay)
        }
      }

      typeChar()
    }

    setTimeout(() => {
      type()
    }, 1200)
  }

  const formatUrl = (url: string, type: string) => {
    if (type === 'email') return `mailto:${url}`
    if (type === 'linkedin' && !url.startsWith('http')) return `https://www.${url}`
    if (type === 'github' && !url.startsWith('http')) return `https://${url}`
    if (type === 'facebook' && !url.startsWith('http')) return `https://www.${url}`
    return url.startsWith('http') ? url : `https://${url}`
  }

  return (
    <section id="home" className="hero">
      <div className="hero-bg-gif">
        <Image 
          src="/images/gif.gif" 
          alt="Background Animation" 
          className="bg-gif-image"
          fill
          style={{ objectFit: 'cover' }}
          priority
          unoptimized
        />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-image-container">
            <Image
              src={portfolioData.personalInfo.profileImage}
              alt="Profile Picture"
              className="hero-profile-image"
              id="heroProfileImage"
              width={300}
              height={300}
              priority
            />
          </div>
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I&apos;m{' '}
              <a 
                href={formatUrl(portfolioData.contact.facebook, 'facebook')} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="highlight highlight-link"
              >
                {portfolioData.personalInfo.name}
              </a>
            </h1>
            <p className="hero-subtitle">
              <span ref={subtitleRef} id="heroSubtitleText"></span>
              <span className="typing-cursor">|</span>
            </p>
            <p className="hero-description">
              {portfolioData.personalInfo.description}
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                <span className="btn-icon">💼</span>
                <span className="btn-text">View My Work</span>
              </a>
              <a href="#contact" className="btn btn-secondary">
                <span className="btn-icon">✉️</span>
                <span className="btn-text">Get In Touch</span>
              </a>
              {portfolioData.contact.cvPath && (
                <a 
                  href={portfolioData.contact.cvPath} 
                  className="btn btn-outline" 
                  download
                >
                  <span className="btn-icon">📄</span>
                  <span className="btn-text">Download CV</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

