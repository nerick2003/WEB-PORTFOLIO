'use client'

import { useState, useMemo, useEffect } from 'react'
import { portfolioData, Project } from '@/data/portfolio'
import Image from 'next/image'

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'featured' | 'completed' | 'in-progress'>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'newest' | 'oldest' | 'featured' | 'alphabetical'>('newest')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = [...portfolioData.projects]

    // Apply filter
    if (filter === 'featured') {
      filtered = filtered.filter(p => p.featured)
    } else if (filter === 'completed') {
      filtered = filtered.filter(p => p.status === 'completed')
    } else if (filter === 'in-progress') {
      filtered = filtered.filter(p => p.status === 'in-progress')
    }

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(project => {
        const techString = project.technologies.join(' ').toLowerCase()
        const searchText = `${project.title} ${project.description} ${techString} ${project.category}`.toLowerCase()
        return searchText.includes(searchLower)
      })
    }

    // Apply sort
    filtered.sort((a, b) => {
      if (sort === 'featured') {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.year.localeCompare(a.year)
      } else if (sort === 'newest') {
        return b.year.localeCompare(a.year)
      } else if (sort === 'oldest') {
        return a.year.localeCompare(b.year)
      } else if (sort === 'alphabetical') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

    return filtered
  }, [filter, search, sort])

  const statusConfig = {
    'completed': { text: 'Completed', icon: '✅', class: 'status-completed' },
    'in-progress': { text: 'In Progress', icon: '🚧', class: 'status-in-progress' },
    'maintained': { text: 'Maintained', icon: '🔄', class: 'status-maintained' },
    'planned': { text: 'Planned', icon: '🎯', class: 'status-planned' }
  }

  const openModal = (index: number) => {
    const project = portfolioData.projects[index]
    setSelectedProject(index)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <>
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Some of my recent work and academic projects</p>
          
          <div className="projects-controls">
            <div className="projects-search">
              <input 
                type="text" 
                id="projectSearch" 
                className="search-input" 
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            <div className="projects-filters">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
                onClick={() => setFilter('featured')}
              >
                ⭐ Featured
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                ✅ Completed
              </button>
              <button 
                className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
                onClick={() => setFilter('in-progress')}
              >
                🚧 In Progress
              </button>
            </div>
            <div className="projects-sort">
              <select 
                id="projectSort" 
                className="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="featured">Featured First</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>
          </div>
          
          <div className="projects-stats">
            <span className="project-count">
              {filteredAndSortedProjects.length} {filteredAndSortedProjects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
          
          <div className="projects-grid" id="projectsContainer">
            {filteredAndSortedProjects.map((project, displayIndex) => {
              const originalIndex = portfolioData.projects.indexOf(project)
              const hasScreenshot = project.screenshot && project.screenshot.trim() !== ''
              const statusInfo = statusConfig[project.status] || statusConfig['completed']
              
              return (
                <div 
                  key={originalIndex}
                  className={`project-card ${project.featured ? 'featured-project' : ''}`}
                  data-status={project.status}
                >
                  {project.featured && <div className="project-featured-badge">⭐ Featured</div>}
                  <div className="project-image">
                    <div className="project-icon-wrapper">
                      {hasScreenshot ? (
                        <Image
                          src={project.screenshot!}
                          alt={`${project.title} Screenshot`}
                          className="project-screenshot"
                          width={400}
                          height={300}
                        />
                      ) : (
                        <div className="project-placeholder">{project.icon}</div>
                      )}
                      <div className="project-overlay"></div>
                      {hasScreenshot && (
                        <div className="screenshot-overlay">
                          <span>View Details</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-badges">
                        <div className={`project-status ${statusInfo.class}`}>
                          {statusInfo.icon} {statusInfo.text}
                        </div>
                        {project.year && (
                          <div className="project-year">📅 {project.year}</div>
                        )}
                        {project.category && (
                          <div className="project-category">🏷️ {project.category}</div>
                        )}
                      </div>
                    </div>
                    <div className="project-footer">
                      <button 
                        className="project-action-btn project-view-details-btn"
                        onClick={() => openModal(originalIndex)}
                      >
                        <span className="btn-icon">👁️</span>
                        <span className="btn-text">View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {filteredAndSortedProjects.length === 0 && (
            <div className="no-projects-message">
              <p>No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {selectedProject !== null && (
        <ProjectModal 
          project={portfolioData.projects[selectedProject]}
          onClose={closeModal}
        />
      )}
    </>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const statusConfig = {
    'completed': { text: 'Completed', icon: '✅', class: 'status-completed' },
    'in-progress': { text: 'In Progress', icon: '🚧', class: 'status-in-progress' },
    'maintained': { text: 'Maintained', icon: '🔄', class: 'status-maintained' },
    'planned': { text: 'Planned', icon: '🎯', class: 'status-planned' }
  }
  
  const statusInfo = statusConfig[project.status] || statusConfig['completed']
  const hasScreenshot = project.screenshot && project.screenshot.trim() !== ''

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div id="projectModal" className="project-modal active">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <div className="modal-body">
          <div className="modal-image">
            {hasScreenshot ? (
              <Image
                src={project.screenshot!}
                alt={project.title}
                className="modal-screenshot"
                width={800}
                height={600}
              />
            ) : (
              <div className="modal-placeholder">{project.icon}</div>
            )}
            {project.features && project.features.length > 0 && (
              <div className="modal-features">
                <h4>Key Features</h4>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="modal-info">
            <div className="modal-header">
              <h2>{project.title}</h2>
              <div className="modal-badges">
                {project.featured && <span className="modal-badge featured">⭐ Featured</span>}
                <span className={`modal-badge ${statusInfo.class}`}>
                  {statusInfo.icon} {statusInfo.text}
                </span>
                {project.year && (
                  <div className="modal-meta"><span>📅 {project.year}</span></div>
                )}
              </div>
            </div>
            <p className="modal-description">{project.description}</p>
            <div className="modal-tech">
              <h4>Technologies</h4>
              <div className="modal-tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="modal-tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-actions-bottom">
            {project.liveDemo && project.liveDemo.trim() && project.liveDemo !== '#' && (
              <a href={project.liveDemo} className="modal-action-btn modal-demo-btn" target="_blank" rel="noopener noreferrer">
                🌐 Live Demo
              </a>
            )}
            {project.videoDemo && project.videoDemo.trim() && project.videoDemo !== '#' && (
              <a href={project.videoDemo} className="modal-action-btn modal-video-btn" target="_blank" rel="noopener noreferrer">
                ▶️ Video
              </a>
            )}
            {project.caseStudy && project.caseStudy.trim() && project.caseStudy !== '#' && (
              <a href={project.caseStudy} className="modal-action-btn modal-case-btn" target="_blank" rel="noopener noreferrer">
                📄 Case Study
              </a>
            )}
            {project.githubLink && project.githubLink.trim() && project.githubLink !== '#' && (
              <a href={project.githubLink} className="modal-action-btn modal-github-btn" target="_blank" rel="noopener noreferrer">
                💻 Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

