'use client'

import { useEffect, useState } from 'react'
import WelcomeScreen from '@/components/WelcomeScreen'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Statistics from '@/components/Statistics'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Achievements from '@/components/Achievements'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import ScrollIndicator from '@/components/ScrollIndicator'
import { portfolioData } from '@/data/portfolio'

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [appVisible, setAppVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
      setTimeout(() => setAppVisible(true), 600)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showWelcome && <WelcomeScreen />}
      <div id="app" className={appVisible ? '' : 'app-hidden'}>
        <Navbar />
        <main>
          <Hero />
          <Statistics />
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <ScrollIndicator />
      </div>
    </>
  )
}

