'use client'

import { useEffect, useRef } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function Achievements() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackRef.current) return

    const track = trackRef.current
    const cards = track.querySelectorAll('.achievement-card')
    if (cards.length === 0) return

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const achievementsCount = portfolioData.achievements.length
        let oneSetWidth = 0
        
        for (let i = 0; i < achievementsCount; i++) {
          if (cards[i]) {
            const cardRect = cards[i].getBoundingClientRect()
            oneSetWidth += cardRect.width
          }
        }
        
        const computedGap = window.getComputedStyle(track).gap
        const gapValue = parseFloat(computedGap) || 32
        oneSetWidth += gapValue * (achievementsCount - 1)
        
        const animationDuration = 30
        
        track.style.setProperty('--slide-width', `${oneSetWidth}px`)
        track.style.setProperty('--animation-duration', `${animationDuration}s`)
        track.classList.add('animate')
      })
    })
  }, [])

  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <h2 className="section-title">Achievements & Certificates</h2>
        <p className="section-subtitle">My academic and professional accomplishments</p>
        
        <div className="achievements-grid" id="achievementsContainer">
          <div className="achievements-slideshow-wrapper">
            <div className="achievements-slideshow-track" ref={trackRef}>
              {[...Array(3)].map((_, duplicateIndex) => (
                portfolioData.achievements.map((achievement, index) => (
                  <div key={`${duplicateIndex}-${index}`} className="achievement-card" data-achievement={index}>
                    <div className="achievement-content">
                      <div className="achievement-header">
                        <div className="achievement-icon">{achievement.icon}</div>
                        <h3 className="achievement-title">{achievement.title}</h3>
                      </div>
                      <div className="achievement-body">
                        <p className="achievement-description">{achievement.description}</p>
                      </div>
                      <div className="achievement-footer">
                        <span className="achievement-date">
                          <span className="date-icon">📅</span>
                          <span className="date-text">{achievement.date}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

