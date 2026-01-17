'use client'

import { useEffect, useRef } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function Statistics() {
  const statRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted')
          animateCounter(entry.target as HTMLDivElement)
        }
      })
    }, observerOptions)

    statRefs.current.forEach(item => {
      if (item) observer.observe(item)
    })

    return () => {
      statRefs.current.forEach(item => {
        if (item) observer.unobserve(item)
      })
    }
  }, [])

  const animateCounter = (element: HTMLDivElement) => {
    const targetValue = parseInt(element.dataset.value || '0')
    const numberElement = element.querySelector('.stat-number')
    if (!numberElement) return

    const duration = 2000
    const startTime = performance.now()
    const startValue = 0

    function updateCounter(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutCubic)
      
      numberElement.textContent = currentValue.toString()

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        numberElement.textContent = targetValue.toString()
      }
    }

    requestAnimationFrame(updateCounter)
  }

  return (
    <section id="statistics" className="statistics">
      <div className="container">
        <div className="statistics-grid" id="statisticsContainer">
          {portfolioData.statistics.map((stat, index) => (
            <div
              key={index}
              className="stat-item"
              data-value={stat.value}
              ref={(el) => { statRefs.current[index] = el }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">
                  <span className="stat-number">0</span>{stat.suffix || ''}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

