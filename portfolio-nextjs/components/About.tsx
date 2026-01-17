'use client'

import { portfolioData } from '@/data/portfolio'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I am a dedicated 2nd-year Information Technology student at the University of 
              Science and Technology of Southern Philippines, with a strong passion for 
              technology and software development. My journey in IT has been exciting and 
              challenging, pushing me to continuously learn and adapt to new technologies.
            </p>
            <p>
              My interests span across <strong>software development</strong>, 
              <strong>web development</strong>, <strong>database management</strong>, and 
              <strong>software engineering</strong>. I enjoy building projects that solve 
              real-world problems and contribute to making technology more accessible and 
              user-friendly.
            </p>
            <p>
              As a student, I am actively seeking opportunities to apply my knowledge through 
              internships and collaborative projects. I believe in continuous learning and 
              staying updated with the latest industry trends and best practices.
            </p>
            <div className="education">
              <h3>Education</h3>
              <div className="education-item">
                <h4>Bachelor of Science in Information Technology</h4>
                <p>
                  <a 
                    href="https://www.ustp.edu.ph/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="university-link"
                  >
                    University of Science and Technology of Southern Philippines
                  </a>
                </p>
                <p className="education-year">2nd Year | Present</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

