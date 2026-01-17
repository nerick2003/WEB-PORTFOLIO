'use client'

import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.pageYOffset || window.scrollY
      const scrollProgress = windowHeight > 0 ? Math.min((currentScroll / windowHeight), 1) : 0
      
      const easedProgress = scrollProgress < 0.5 
        ? 2 * scrollProgress * scrollProgress 
        : 1 - Math.pow(-2 * scrollProgress + 2, 2) / 2
      
      setProgress(easedProgress)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div 
      className="scroll-indicator"
      style={{
        width: `${progress * 100}%`,
        opacity: progress > 0 ? 1 : 0,
        visibility: progress > 0 ? 'visible' : 'hidden',
        transform: `scaleX(${progress})`,
        transformOrigin: 'left'
      }}
    />
  )
}

