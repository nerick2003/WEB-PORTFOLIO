'use client'

export default function WelcomeScreen() {
  return (
    <div id="welcomeScreen" className="welcome-screen">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to my Portfolio</h1>
        <div className="welcome-subtitle">Let&apos;s explore together</div>
        <div className="welcome-loader">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
      </div>
    </div>
  )
}

