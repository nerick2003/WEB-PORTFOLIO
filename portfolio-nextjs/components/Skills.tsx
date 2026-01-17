'use client'

import { useState } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function Skills() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index)
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Technologies and tools I&apos;m learning and working with</p>
        
        <div className="skills-grid" id="skillsContainer">
          {portfolioData.skills.map((category, index) => (
            <div 
              key={index}
              className={`accordion-item skill-category ${expandedCategory === index ? 'active' : ''}`}
              data-category={index}
            >
              <button 
                className={`accordion-header ${expandedCategory === index ? 'active' : ''}`}
                aria-expanded={expandedCategory === index}
                onClick={() => toggleCategory(index)}
              >
                <div className="category-header-content">
                  <div className="category-icon">{category.icon}</div>
                  <h3 className="category-title">{category.category}</h3>
                </div>
                <span className="accordion-icon">▼</span>
              </button>
              <div 
                className="accordion-content"
                style={{
                  maxHeight: expandedCategory === index ? '1000px' : '0'
                }}
              >
                <div className="accordion-body">
                  <div className="skill-items">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="skill-item">
                        <span className="skill-name">{item}</span>
                        <div className="skill-badge"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

