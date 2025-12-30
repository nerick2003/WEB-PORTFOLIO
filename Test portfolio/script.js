// Module Loader and Portfolio Builder
// This script loads all components and populates them with data

// Load HTML component
async function loadComponent(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        return await response.text();
    } catch (error) {
        console.error(`Error loading component ${path}:`, error);
        return '';
    }
}

// Render Skills Section
function renderSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    let html = '';
    portfolioData.skills.forEach((category, index) => {
        const icon = category.icon || '💡';
        html += `
            <div class="accordion-item skill-category" data-category="${index}">
                <button class="accordion-header" aria-expanded="false">
                    <div class="category-header-content">
                        <div class="category-icon">${icon}</div>
                        <h3 class="category-title">${category.category}</h3>
                    </div>
                    <span class="accordion-icon">▼</span>
                </button>
                <div class="accordion-content">
                    <div class="accordion-body">
                        <div class="skill-items">
                            ${category.items.map(item => `
                                <div class="skill-item">
                                    <span class="skill-name">${item}</span>
                                    <div class="skill-badge"></div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    
    // Initialize accordion functionality
    initAccordion();
}

// Initialize Accordion Functionality
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Close all other accordions (optional - remove if you want multiple open)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherItem = otherHeader.parentElement;
                    const otherContent = otherItem.querySelector('.accordion-content');
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherHeader.classList.remove('active');
                    otherContent.style.maxHeight = null;
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current accordion
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
                header.classList.remove('active');
                accordionContent.style.maxHeight = null;
                accordionItem.classList.remove('active');
            } else {
                header.setAttribute('aria-expanded', 'true');
                header.classList.add('active');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                accordionItem.classList.add('active');
            }
        });
    });
}

// Render Projects Section
function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    // Sort projects: featured first, then by year (newest first)
    const sortedProjects = [...portfolioData.projects].sort((a, b) => {
        // Featured projects first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Then by year (newest first)
        const yearA = a.year || a.completionDate || '0';
        const yearB = b.year || b.completionDate || '0';
        return yearB.localeCompare(yearA);
    });

    let html = '';
    sortedProjects.forEach((project, index) => {
        const originalIndex = portfolioData.projects.indexOf(project);
        
        // Determine if we should show screenshot or icon
        const hasScreenshot = project.screenshot && project.screenshot.trim() !== '';
        const imageContent = hasScreenshot 
            ? `<img src="${project.screenshot}" alt="${project.title} Screenshot" class="project-screenshot" loading="lazy">`
            : `<div class="project-placeholder">${project.icon}</div>`;
        
        // Project status badge
        const status = project.status || 'completed';
        const statusConfig = {
            'completed': { text: 'Completed', icon: '✅', class: 'status-completed' },
            'in-progress': { text: 'In Progress', icon: '🚧', class: 'status-in-progress' },
            'maintained': { text: 'Maintained', icon: '🔄', class: 'status-maintained' },
            'planned': { text: 'Planned', icon: '🎯', class: 'status-planned' }
        };
        const statusInfo = statusConfig[status] || statusConfig['completed'];
        const statusBadge = `<div class="project-status ${statusInfo.class}">${statusInfo.icon} ${statusInfo.text}</div>`;
        
        // Featured badge
        const featuredBadge = project.featured ? '<div class="project-featured-badge">⭐ Featured</div>' : '';
        
        // Year/Date badge
        const year = project.year || project.completionDate || '';
        const yearBadge = year ? `<div class="project-year">📅 ${year}</div>` : '';
        
        // Build action buttons
        let actionButtons = '';
        
        // Live Demo button
        if (project.liveDemo && project.liveDemo.trim() !== '' && project.liveDemo !== '#') {
            actionButtons += `
                <a href="${project.liveDemo}" class="project-action-btn project-demo-btn" target="_blank" rel="noopener noreferrer" title="View Live Demo">
                    <span class="btn-icon">🌐</span>
                    <span class="btn-text">Live Demo</span>
                </a>
            `;
        }
        
        // Video Demo button
        if (project.videoDemo && project.videoDemo.trim() !== '' && project.videoDemo !== '#') {
            actionButtons += `
                <a href="${project.videoDemo}" class="project-action-btn project-video-btn" target="_blank" rel="noopener noreferrer" title="Watch Video Walkthrough">
                    <span class="btn-icon">▶️</span>
                    <span class="btn-text">Video</span>
                </a>
            `;
        }
        
        // Case Study button
        if (project.caseStudy && project.caseStudy.trim() !== '' && project.caseStudy !== '#') {
            actionButtons += `
                <a href="${project.caseStudy}" class="project-action-btn project-case-btn" target="_blank" rel="noopener noreferrer" title="Read Case Study">
                    <span class="btn-icon">📄</span>
                    <span class="btn-text">Case Study</span>
                </a>
            `;
        }
        
        // GitHub link (optional - can be hidden)
        if (project.githubLink && project.githubLink.trim() !== '' && project.githubLink !== '#') {
            actionButtons += `
                <a href="${project.githubLink}" class="project-action-btn project-github-btn" target="_blank" rel="noopener noreferrer" title="View on GitHub">
                    <span class="btn-icon">💻</span>
                    <span class="btn-text">Code</span>
                </a>
            `;
        }
        
        // Fallback to original link if no action buttons
        if (!actionButtons && project.link && project.link !== '#') {
            actionButtons = `
                <a href="${project.link}" class="project-action-btn project-link-btn" target="_blank" rel="noopener noreferrer">
                    <span class="btn-text">${project.linkText || 'View Project'}</span>
                    <span class="link-icon">→</span>
                </a>
            `;
        }
        
        // Features list
        const featuresList = project.features && project.features.length > 0
            ? `
                <div class="project-features">
                    <h4 class="features-title">Key Features:</h4>
                    <ul class="features-list">
                        ${project.features.map(feature => `
                            <li class="feature-item">
                                <span class="feature-icon">✓</span>
                                <span class="feature-text">${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `
            : '';
        
        // Project metadata (technologies as data attributes for filtering)
        const techString = project.technologies ? project.technologies.join(' ').toLowerCase() : '';
        const category = project.category || '';
        const searchText = `${project.title} ${project.description} ${techString} ${category}`.toLowerCase();
        
        html += `
            <div class="project-card ${project.featured ? 'featured-project' : ''}" 
                 data-project="${originalIndex}"
                 data-status="${status}"
                 data-featured="${project.featured ? 'true' : 'false'}"
                 data-year="${year}"
                 data-category="${category}"
                 data-tech="${techString}"
                 data-search="${searchText}">
                ${featuredBadge}
                <div class="project-image ${hasScreenshot ? 'has-screenshot' : ''}">
                    <div class="project-icon-wrapper">
                        ${imageContent}
                        <div class="project-overlay"></div>
                        ${hasScreenshot ? '<div class="screenshot-overlay"><span>View Details</span></div>' : ''}
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        <div class="project-badges">
                            ${statusBadge}
                            ${yearBadge}
                        </div>
                    </div>
                    <div class="project-footer project-actions-toggle">
                        <button class="project-action-btn project-view-details-btn" data-project-index="${originalIndex}" title="View Details">
                            <span class="btn-icon">👁️</span>
                            <span class="btn-text">View Details</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    
    // Initialize filtering and search
    initProjectFilters();
    initProjectModal();
    updateProjectCount();
    
    // Re-observe project cards after rendering
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (window.cardObserver) {
                document.querySelectorAll('.project-card').forEach(card => {
                    if (!card.classList.contains('card-visible')) {
                        window.cardObserver.observe(card);
                    }
                });
            }
        });
    });
}

// Initialize Project Filters and Search
function initProjectFilters() {
    const searchInput = document.getElementById('projectSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('projectSort');
    const noProjectsMessage = document.getElementById('noProjectsMessage');
    
    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'newest';
    
    // Search functionality
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            currentSearch = e.target.value.toLowerCase().trim();
            searchTimeout = setTimeout(() => {
                filterProjects(currentFilter, currentSearch, currentSort);
            }, 300);
        });
    }
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterProjects(currentFilter, currentSearch, currentSort);
        });
    });
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterProjects(currentFilter, currentSearch, currentSort);
        });
    }
    
    // Filter function
    function filterProjects(filter, search, sort) {
        const cards = document.querySelectorAll('.project-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            let show = true;
            
            // Apply filter
            if (filter === 'featured') {
                show = card.dataset.featured === 'true';
            } else if (filter === 'completed') {
                show = card.dataset.status === 'completed';
            } else if (filter === 'in-progress') {
                show = card.dataset.status === 'in-progress';
            }
            // 'all' shows everything
            
            // Apply search
            if (show && search) {
                show = card.dataset.search.includes(search);
            }
            
            // Show/hide card
            if (show) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no projects message
        if (noProjectsMessage) {
            noProjectsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        
        updateProjectCount(visibleCount);
    }
}

// Update project count
function updateProjectCount(count) {
    const countElement = document.getElementById('projectCount');
    if (countElement) {
        const total = portfolioData.projects.length;
        const visible = count !== undefined ? count : total;
        countElement.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    }
}

// Initialize Project Details Toggle
// Initialize Project Modal
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');
    
    if (!modal || !modalBody) return;
    
    // Close modal handlers
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // View details button handlers
    document.addEventListener('click', (e) => {
        if (e.target.closest('.project-view-details-btn')) {
            const btn = e.target.closest('.project-view-details-btn');
            const projectIndex = parseInt(btn.dataset.projectIndex);
            openProjectModal(projectIndex);
        }
        
        // Also open modal when clicking on project card image
        if (e.target.closest('.project-card')) {
            const card = e.target.closest('.project-card');
            const projectIndex = parseInt(card.dataset.project);
            if (e.target.closest('.project-image') || e.target.closest('.screenshot-overlay')) {
                openProjectModal(projectIndex);
            }
        }
    });
    
    // Open modal function
    function openProjectModal(index) {
        const project = portfolioData.projects[index];
        if (!project) return;
        
        const hasScreenshot = project.screenshot && project.screenshot.trim() !== '';
        const imageContent = hasScreenshot 
            ? `<img src="${project.screenshot}" alt="${project.title}" class="modal-screenshot">`
            : `<div class="modal-placeholder">${project.icon}</div>`;
        
        const status = project.status || 'completed';
        const statusConfig = {
            'completed': { text: 'Completed', icon: '✅', class: 'status-completed' },
            'in-progress': { text: 'In Progress', icon: '🚧', class: 'status-in-progress' },
            'maintained': { text: 'Maintained', icon: '🔄', class: 'status-maintained' },
            'planned': { text: 'Planned', icon: '🎯', class: 'status-planned' }
        };
        const statusInfo = statusConfig[status] || statusConfig['completed'];
        
        let actionButtons = '';
        if (project.liveDemo && project.liveDemo.trim() !== '' && project.liveDemo !== '#') {
            actionButtons += `<a href="${project.liveDemo}" class="modal-action-btn modal-demo-btn" target="_blank">🌐 Live Demo</a>`;
        }
        if (project.videoDemo && project.videoDemo.trim() !== '' && project.videoDemo !== '#') {
            actionButtons += `<a href="${project.videoDemo}" class="modal-action-btn modal-video-btn" target="_blank">▶️ Video</a>`;
        }
        if (project.caseStudy && project.caseStudy.trim() !== '' && project.caseStudy !== '#') {
            actionButtons += `<a href="${project.caseStudy}" class="modal-action-btn modal-case-btn" target="_blank">📄 Case Study</a>`;
        }
        if (project.githubLink && project.githubLink.trim() !== '' && project.githubLink !== '#') {
            actionButtons += `<a href="${project.githubLink}" class="modal-action-btn modal-github-btn" target="_blank">💻 Code</a>`;
        }
        
        const featuresList = project.features && project.features.length > 0
            ? `<div class="modal-features">
                <h4>Key Features</h4>
                <ul>${project.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul>
               </div>`
            : '';
        
        const year = project.year || project.completionDate || '';
        const yearText = year ? `<div class="modal-meta"><span>📅 ${year}</span></div>` : '';
        
        modalBody.innerHTML = `
            <div class="modal-image">
                ${imageContent}
                ${featuresList}
            </div>
            <div class="modal-info">
                <div class="modal-header">
                    <h2>${project.title}</h2>
                    <div class="modal-badges">
                        ${project.featured ? '<span class="modal-badge featured">⭐ Featured</span>' : ''}
                        <span class="modal-badge ${statusInfo.class}">${statusInfo.icon} ${statusInfo.text}</span>
                        ${yearText}
                    </div>
                </div>
                <p class="modal-description">${project.description}</p>
                <div class="modal-tech">
                    <h4>Technologies</h4>
                    <div class="modal-tech-tags">
                        ${project.technologies.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
            ${actionButtons ? `<div class="modal-actions-bottom">${actionButtons}</div>` : ''}
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// ============================================
// ACHIEVEMENTS & CERTIFICATES RENDERING
// ============================================

/**
 * Creates HTML for a single achievement/certificate card
 * @param {Object} achievement - Achievement data object
 * @param {number} index - Index of the achievement
 * @returns {string} HTML string for the card
 */
function createAchievementCard(achievement, index) {
    return `
        <div class="achievement-card" data-achievement="${index}">
            <div class="achievement-content">
                <div class="achievement-header">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <h3 class="achievement-title">${achievement.title}</h3>
                </div>
                <div class="achievement-body">
                    <p class="achievement-description">${achievement.description}</p>
                </div>
                <div class="achievement-footer">
                    <span class="achievement-date">
                        <span class="date-icon">📅</span>
                        <span class="date-text">${achievement.date}</span>
                    </span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders all achievements and certificates to the DOM as a continuous slideshow
 */
function renderAchievements() {
    const container = document.getElementById('achievementsContainer');
    if (!container) {
        console.warn('Achievements container not found');
        return;
    }

    // Check if achievements data exists
    if (!portfolioData.achievements || portfolioData.achievements.length === 0) {
        container.innerHTML = '<p class="no-content">No achievements to display.</p>';
        return;
    }

    // Create slideshow wrapper
    container.innerHTML = '<div class="achievements-slideshow-wrapper"><div class="achievements-slideshow-track"></div></div>';
    
    const track = container.querySelector('.achievements-slideshow-track');
    
    // Duplicate achievements 3 times for seamless infinite loop
    // This ensures smooth continuous scrolling
    const duplicates = 3;
    let html = '';
    
    for (let i = 0; i < duplicates; i++) {
        html += portfolioData.achievements
            .map((achievement, index) => createAchievementCard(achievement, index))
            .join('');
    }
    
    track.innerHTML = html;
    
    // Initialize slideshow animation after a short delay to ensure DOM is ready
    setTimeout(() => {
        initAchievementsSlideshow();
    }, 100);
}

/**
 * Initialize the continuous slideshow animation
 */
function initAchievementsSlideshow() {
    const track = document.querySelector('.achievements-slideshow-track');
    if (!track) return;
    
    const cards = track.querySelectorAll('.achievement-card');
    if (cards.length === 0) return;
    
    // Wait for layout to be ready
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Calculate the width of one set of achievements
            const achievementsCount = portfolioData.achievements.length;
            let oneSetWidth = 0;
            
            // Sum up the width of the first set of cards
            for (let i = 0; i < achievementsCount; i++) {
                if (cards[i]) {
                    const cardRect = cards[i].getBoundingClientRect();
                    oneSetWidth += cardRect.width;
                }
            }
            
            // Add gap between cards (2rem = 32px, but get computed gap)
            const computedGap = window.getComputedStyle(track).gap;
            const gapValue = parseFloat(computedGap) || 32;
            oneSetWidth += gapValue * (achievementsCount - 1);
            
            // Set the animation duration based on the width
            // Adjust speed: 30s for smooth, continuous scrolling
            const animationDuration = 30; // seconds
            
            // Apply animation
            track.style.setProperty('--slide-width', `${oneSetWidth}px`);
            track.style.setProperty('--animation-duration', `${animationDuration}s`);
            track.classList.add('animate');
        });
    });
}

// Render Contact Info
function renderContactInfo() {
    const container = document.getElementById('contactInfoContainer');
    if (!container) return;

    const contact = portfolioData.contact;
    
    // Helper function to format URLs
    const formatUrl = (url, type) => {
        if (type === 'email') return `mailto:${url}`;
        if (type === 'linkedin' && !url.startsWith('http')) return `https://www.${url}`;
        if (type === 'github' && !url.startsWith('http')) return `https://${url}`;
        if (type === 'facebook' && !url.startsWith('http')) return `https://www.${url}`;
        return url.startsWith('http') ? url : `https://${url}`;
    };
    
    container.innerHTML = `
        <a href="${formatUrl(contact.email, 'email')}" class="contact-item contact-link" title="Send me an email">
            <div class="contact-icon-wrapper">
                <div class="contact-icon">📧</div>
            </div>
            <div class="contact-details">
                <h3>Email</h3>
                <p>${contact.email}</p>
                <span class="contact-hint">Click to send email</span>
            </div>
        </a>
        <a href="${formatUrl(contact.linkedin, 'linkedin')}" target="_blank" rel="noopener noreferrer" class="contact-item contact-link" title="Visit my LinkedIn profile">
            <div class="contact-icon-wrapper">
                <div class="contact-icon">💼</div>
            </div>
            <div class="contact-details">
                <h3>LinkedIn</h3>
                <p>${contact.linkedin}</p>
                <span class="contact-hint">Visit profile →</span>
            </div>
        </a>
        <a href="${formatUrl(contact.github, 'github')}" target="_blank" rel="noopener noreferrer" class="contact-item contact-link" title="Visit my GitHub profile">
            <div class="contact-icon-wrapper">
                <div class="contact-icon">🐙</div>
            </div>
            <div class="contact-details">
                <h3>GitHub</h3>
                <p>${contact.github}</p>
                <span class="contact-hint">Visit profile →</span>
            </div>
        </a>
        <div class="contact-item contact-static">
            <div class="contact-icon-wrapper">
                <div class="contact-icon">📍</div>
            </div>
            <div class="contact-details">
                <h3>Location</h3>
                <p>${contact.location}</p>
            </div>
        </div>
    `;
}

// Update Personal Information
function updatePersonalInfo() {
    const info = portfolioData.personalInfo;
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = `Hi, I'm <a href="https://www.facebook.com/nerick69" target="_blank" rel="noopener noreferrer" class="highlight highlight-link">${info.name}</a>`;
    }
    
    // Update hero subtitle with typewriter effect
    const heroSubtitleText = document.getElementById('heroSubtitleText');
    if (heroSubtitleText && info.title) {
        typewriterEffect(heroSubtitleText, info.title);
    }
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        heroDescription.textContent = info.description;
    }
    
    // Update footer
    const footerName = document.getElementById('footerName');
    if (footerName) {
        footerName.textContent = info.name;
    }
    
    // Update nav brand
    const brandText = document.querySelector('.brand-text');
    if (brandText) {
        brandText.textContent = `${info.name}'s Portfolio`;
    }
    
    // Update profile image
    const profileImage = document.getElementById('heroProfileImage');
    if (profileImage && info.profileImage) {
        profileImage.src = info.profileImage;
        profileImage.alt = `${info.name} - Profile Picture`;
    }
}

// Typewriter Effect Function with Loop
function typewriterEffect(element, text) {
    if (!element) return;
    
    // Pre-set the container to prevent layout shift
    const container = element.parentElement;
    if (container) {
        // Reserve space for the full text to prevent resizing
        container.style.minHeight = '3rem';
        container.style.height = '3rem';
    }
    
    const speed = 60; // Typing speed in milliseconds
    const cursor = element.parentElement.querySelector('.typing-cursor');
    const loopDelay = 3000; // 3 seconds delay before restarting
    
    function type() {
        element.textContent = '';
        let i = 0;
        
        // Show cursor when typing starts
        if (cursor) {
            cursor.style.opacity = '1';
            cursor.style.animation = 'cursorBlink 1s infinite, cursorGlow 1.5s ease-in-out infinite';
        }
        
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                // Typing complete - hide cursor after a moment
                if (cursor) {
                    setTimeout(() => {
                        cursor.style.opacity = '0';
                        cursor.style.animation = 'none';
                    }, 1000);
                }
                
                // Wait 3 seconds then restart the loop
                setTimeout(() => {
                    type();
                }, loopDelay);
            }
        }
        
        typeChar();
    }
    
    // Start typing after a short delay
    setTimeout(() => {
        type();
    }, 1200);
}

// Initialize Portfolio
async function initPortfolio() {
    const app = document.getElementById('app');
    if (!app) return;

    try {
        // Load all components
        const navbar = await loadComponent('components/navbar.html');
        const hero = await loadComponent('components/hero.html');
        const about = await loadComponent('components/about.html');
        const skills = await loadComponent('components/skills.html');
        const projects = await loadComponent('components/projects.html');
        const achievements = await loadComponent('components/achievements.html');
        const contact = await loadComponent('components/contact.html');
        const footer = await loadComponent('components/footer.html');

        // Assemble the page
        app.innerHTML = navbar + hero + about + skills + projects + achievements + contact + footer;

        // Wait a bit for DOM to be ready
        setTimeout(() => {
            // Update personal info
            updatePersonalInfo();
            
            // Render dynamic content
            renderSkills();
            renderProjects();
            renderAchievements();
            renderContactInfo();
            
            // Initialize interactive features
            initInteractivity();
            
            // Auto-redirect after 2.5 seconds (wait for content to be fully loaded)
            setTimeout(() => {
                hideWelcomeScreen();
            }, 2500);
        }, 100);
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// Initialize Interactive Features
function initInteractivity() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Create scroll indicator function
    function createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.style.width = '0%';
        indicator.style.opacity = '0';
        document.body.appendChild(indicator);
    }

    // ============================================
    // Improved Scroll Manager
    // ============================================
    const ScrollManager = {
        // Configuration
        config: {
            navbarHeight: 80,
            duration: 800, // Increased duration for smoother, more elegant scrolling
            minDistance: 50,
            easing: 'easeInOutCubic'
        },
        
        // State
        state: {
            isScrolling: false,
            animationId: null,
            lastScrollY: 0,
            ticking: false,
            navLinkUpdatePending: false
        },
        
        // Easing functions
        easingFunctions: {
            easeInOutCubic(t) {
                return t < 0.5 
                    ? 4 * t * t * t 
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            },
            easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            },
            easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }
        },
        
        // Get current scroll position
        getScrollPosition() {
            return window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
        },
        
        // Calculate target position with offset
        calculateTargetPosition(element, offset = 0) {
            const rect = element.getBoundingClientRect();
            const currentScroll = this.getScrollPosition();
            return Math.max(0, rect.top + currentScroll - offset);
        },
        
        // Cancel ongoing scroll animation
        cancel() {
            if (this.state.animationId) {
                cancelAnimationFrame(this.state.animationId);
                this.state.animationId = null;
            }
            this.state.isScrolling = false;
        },
        
        // Smooth scroll to target position
        scrollTo(targetPosition, duration = this.config.duration) {
            // Cancel any existing animation
            this.cancel();
            
            const startPosition = this.getScrollPosition();
            const distance = targetPosition - startPosition;
            
            // If distance is very small, use native smooth scroll
            if (Math.abs(distance) < this.config.minDistance) {
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                // Update section visibility after a short delay for native scroll
                setTimeout(() => {
                    if (window.updateSectionVisibility) {
                        window.updateSectionVisibility();
                    }
                }, 100);
                return;
            }
            
            this.state.isScrolling = true;
            let startTime = null;
            
            // Use the configured easing function for smoother transitions
            const easingFunction = this.easingFunctions[this.config.easing] || this.easingFunctions.easeInOutCubic;
            const easing = (t) => {
                // Clamp t between 0 and 1
                t = Math.max(0, Math.min(1, t));
                return easingFunction(t);
            };

            const animate = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easing(progress);
                
                const currentPosition = startPosition + distance * ease;
                // Use scrollTo with instant behavior for smoother animation
                window.scrollTo({ top: currentPosition, behavior: 'auto' });
                
                if (timeElapsed < duration) {
                    this.state.animationId = requestAnimationFrame(animate);
                } else {
                    // Ensure exact target position
                    window.scrollTo({ top: targetPosition, behavior: 'auto' });
                    this.cancel();
                    // Update section visibility after scroll completes
                    if (window.updateSectionVisibility) {
                        requestAnimationFrame(() => {
                            window.updateSectionVisibility();
                        });
                    }
                }
            };

            this.state.animationId = requestAnimationFrame(animate);
        },
        
        // Scroll to element
        scrollToElement(selector, offset = this.config.navbarHeight) {
            const element = typeof selector === 'string' 
                ? document.querySelector(selector) 
                : selector;
            
            if (!element) return false;
            
            const targetPosition = this.calculateTargetPosition(element, offset);
            this.scrollTo(targetPosition);
            return true;
        },
        
        // Unified scroll handler (optimized for smoothness)
        handleScroll() {
            if (!this.state.ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollEffects();
                    this.state.ticking = false;
                });
                this.state.ticking = true;
            }
        },
        
        // Update all scroll-based effects in one place (optimized)
        updateScrollEffects() {
            const currentScroll = this.getScrollPosition();
            this.state.lastScrollY = currentScroll;
            
            // Batch DOM reads and writes for better performance
            const navbar = document.getElementById('navbar');
            const indicator = document.querySelector('.scroll-indicator');
            
            // Update navbar (use class toggle for better performance)
            if (navbar) {
                const shouldBeScrolled = currentScroll > 50;
                if (shouldBeScrolled !== navbar.classList.contains('scrolled')) {
                    navbar.classList.toggle('scrolled', shouldBeScrolled);
                }
            }
            
            // Update scroll indicator (use transform for better performance)
            if (indicator) {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = windowHeight > 0 ? Math.min((currentScroll / windowHeight), 1) : 0;
                
                // Use transform scale instead of width for better performance (GPU accelerated)
                // Add slight easing for smoother feel
                const easedProgress = progress < 0.5 
                    ? 2 * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
                indicator.style.transform = `scaleX(${easedProgress})`;
                indicator.style.transformOrigin = 'left';
                
                // Always update opacity to ensure visibility
                if (progress > 0) {
                    indicator.style.opacity = '1';
                    indicator.style.visibility = 'visible';
                } else {
                    indicator.style.opacity = '0';
                    indicator.style.visibility = 'hidden';
                }
            }
            
            // Update section visibility (which also updates navbar active link)
            if (window.updateSectionVisibility) {
                window.updateSectionVisibility();
            }
        },
        
        // Initialize scroll handlers
        init() {
            // Handle navigation link clicks with smooth animation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href');
                    
                    // Skip invalid targets
                    if (!targetId || targetId === '#') {
                        e.preventDefault();
                        return;
                    }
                    
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        
                        // Add quick click feedback
                        anchor.style.transform = 'scale(0.98)';
                        setTimeout(() => {
                            anchor.style.transform = '';
                        }, 100);
                        
                        // Smooth scroll
                        requestAnimationFrame(() => {
                            this.scrollToElement(target);
                        });
                    }
                });
            });
            
            // Allow manual scroll to interrupt smooth scroll
            const interruptEvents = ['wheel', 'touchmove', 'keydown'];
            interruptEvents.forEach(eventType => {
                window.addEventListener(eventType, () => {
                    if (this.state.isScrolling) {
                        this.cancel();
                    }
                }, { passive: true });
            });
            
            // Single unified scroll handler with passive listener
            // Use passive: true for better scroll performance
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                // Cancel any pending updates to prevent queue buildup
                if (scrollTimeout) {
                    cancelAnimationFrame(scrollTimeout);
                }
                
                scrollTimeout = requestAnimationFrame(() => {
                    this.handleScroll();
                    scrollTimeout = null;
                });
            }, { passive: true, capture: false });
            
            // Initial update
            requestAnimationFrame(() => {
                this.updateScrollEffects();
            });
        }
    };
    
    // Create scroll indicator first
    createScrollIndicator();
    
    // Initialize scroll manager
    ScrollManager.init();

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const sendButton = contactForm.querySelector('.btn-send-message');
        const formMessage = document.getElementById('formMessage');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Hide previous messages
            if (formMessage) {
                formMessage.classList.remove('show', 'success', 'error');
            }
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Add loading state
            if (sendButton) {
                sendButton.classList.add('loading');
                sendButton.disabled = true;
            }
            
            // Simulate form submission delay
            setTimeout(() => {
                // Show success message
                showFormMessage(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`, 'success');
                
                // Scroll to message
                if (formMessage) {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // Reset form
                contactForm.reset();
                
                // Remove loading state
                if (sendButton) {
                    sendButton.classList.remove('loading');
                    sendButton.disabled = false;
                }
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (formMessage) {
                        formMessage.classList.remove('show');
                    }
                }, 5000);
            }, 1500);
        });
        
        // Function to show form messages
        function showFormMessage(text, type) {
            if (formMessage) {
                formMessage.textContent = text;
                formMessage.className = `form-message ${type} show`;
            }
        }
    }


    // Function to determine which section is currently most visible
    function getCurrentActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const viewportHeight = window.innerHeight;
        const scrollY = window.pageYOffset || window.scrollY;
        const navbarHeight = ScrollManager.config.navbarHeight;
        
        let activeSection = null;
        let bestScore = -Infinity;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            const sectionHeight = rect.height;
            
            // Calculate how much of the section is visible in viewport
            const visibleTop = Math.max(0, -sectionTop);
            const visibleBottom = Math.min(sectionHeight, viewportHeight - sectionTop);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            // Calculate visibility ratio
            const visibilityRatio = sectionHeight > 0 ? visibleHeight / sectionHeight : 0;
            
            // Check if section is in viewport
            const isInViewport = sectionTop < viewportHeight && sectionBottom > 0;
            
            // Calculate a score that considers:
            // 1. How much of the section is visible (visibilityRatio)
            // 2. How close the section top is to the top of viewport (prefer sections near top)
            // 3. Whether the section is actually in the viewport
            let score = 0;
            
            if (isInViewport) {
                // Base score from visibility ratio
                score = visibilityRatio * 100;
                
                // Bonus if section top is near the top of viewport (within navbar + 100px)
                const distanceFromTop = Math.abs(sectionTop - navbarHeight);
                if (distanceFromTop < 150) {
                    score += (150 - distanceFromTop) / 150 * 50; // Up to 50 bonus points
                }
                
                // Prefer sections that are more in viewport
                if (sectionTop >= 0 && sectionTop < viewportHeight * 0.5) {
                    score += 30; // Bonus for sections starting in upper half of viewport
                }
            }
            
            if (score > bestScore) {
                bestScore = score;
                activeSection = section;
            }
        });
        
        // If no section scored (all are out of viewport), determine by scroll position
        if (!activeSection || bestScore <= 0) {
            // Find the section that should be active based on scroll position
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                // If scroll position is within this section's bounds
                if (scrollY >= sectionTop - navbarHeight - 50 && scrollY < sectionBottom - navbarHeight + 50) {
                    activeSection = section;
                }
            });
        }
        
        // Default to home if still no section found
        if (!activeSection) {
            activeSection = document.getElementById('home');
        }
        
        return activeSection;
    }
    
    // Function to show only the active section and hide others
    function updateSectionVisibility() {
        const activeSection = getCurrentActiveSection();
        const allSections = document.querySelectorAll('section[id]');
        
        allSections.forEach(section => {
            if (section === activeSection) {
                // Show active section - use class for CSS transitions
                section.classList.add('visible');
                // Remove inline styles to let CSS handle transitions
                section.style.opacity = '';
                section.style.visibility = '';
                section.style.transform = '';
            } else {
                // Hide all other sections - use class removal for CSS transitions
                section.classList.remove('visible');
                // Keep inline styles as fallback but let CSS class handle the transition
                // The CSS already has section { opacity: 0; visibility: hidden; } as default
            }
        });
        
        // Update navbar active link
        if (activeSection) {
            const sectionId = activeSection.getAttribute('id');
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Make function globally accessible
    window.updateSectionVisibility = updateSectionVisibility;

    // Initialize scroll observers function (can be called again after welcome screen)
    function initializeScrollObservers() {
        // Clean up existing observers if any
        if (window.sectionObserver) {
            window.sectionObserver.disconnect();
        }
        if (window.cardObserver) {
            window.cardObserver.disconnect();
        }

        // Enhanced scroll-triggered animations
        // More conservative settings to prevent sections from showing before scrolling
        const sectionObserverOptions = {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Multiple thresholds for better detection
            rootMargin: '0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            // Update section visibility based on which is most visible
            updateSectionVisibility();
        }, sectionObserverOptions);

        // Observe sections
        document.querySelectorAll('section[id]').forEach(section => {
            // Initially hide all sections except home
            // CSS already handles the default hidden state
            if (section.id !== 'home') {
                section.classList.remove('visible');
            } else {
                // Home section should be visible initially
                section.classList.add('visible');
            }
            sectionObserver.observe(section);
        });

        // Store observer globally for cleanup
        window.sectionObserver = sectionObserver;
        
        // Initial visibility update
        updateSectionVisibility();

        // Enhanced card animations with better stagger
        // More conservative to prevent cards from showing before scrolling
        const cardObserverOptions = {
            threshold: [0.15, 0.25], // Require at least 15% visibility
            rootMargin: '0px 0px -100px 0px' // Only trigger when card is 100px into viewport
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const rect = entry.boundingClientRect;
                const viewportHeight = window.innerHeight;
                // Only show if card is actually in viewport (not below it)
                const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
                
                if (entry.isIntersecting && entry.intersectionRatio >= 0.15 && isInViewport) {
                    entry.target.classList.add('card-visible');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, cardObserverOptions);

        // Observe project cards, flip cards (achievements), and accordion items (skills)
        document.querySelectorAll('.project-card, .achievement-card, .accordion-item').forEach((card) => {
            // Reset card state if needed
            if (!card.classList.contains('card-visible')) {
                cardObserver.observe(card);
            }
        });

        // Store observer globally for cleanup
        window.cardObserver = cardObserver;
    }

    // Make function globally accessible
    window.initializeScrollObservers = initializeScrollObservers;

    // Function to check and update section visibility (used for resize and edge cases)
    window.checkSectionsInViewport = function checkSectionsInViewport() {
        // Use the centralized updateSectionVisibility function
        if (window.updateSectionVisibility) {
            window.updateSectionVisibility();
        }
    }

    // Initialize scroll observers after a delay (only if app is visible)
    setTimeout(() => {
        const app = document.getElementById('app');
        if (app && !app.classList.contains('app-hidden')) {
            // Initialize observers - they will handle section visibility
            initializeScrollObservers();
        }
    }, 100);

    // Re-check sections visibility on window resize (resolution change)
    // Only re-initialize observers, don't force visibility
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Re-initialize observers to ensure they work with new dimensions
            if (window.initializeScrollObservers) {
                window.initializeScrollObservers();
            }
            // Only check viewport for sections that are significantly visible (conservative check)
            if (window.checkSectionsInViewport) {
                window.checkSectionsInViewport();
            }
        }, 250);
    });

    // Removed parallax effect to prevent conflicts with scroll animations

    // Smooth scroll on page load if hash exists
    if (window.location.hash) {
        setTimeout(() => {
            ScrollManager.scrollToElement(window.location.hash);
        }, 100);
    }

    // Heart click animation
    initHeartAnimation();
}

// Heart Pop-up Animation
function initHeartAnimation() {
    const heart = document.querySelector('.heart');
    if (!heart) return;

    heart.addEventListener('click', function(e) {
        e.preventDefault();
        createFloatingHearts(e.clientX, e.clientY);
    });
}

function createFloatingHearts(x, y) {
    const heartCount = 20; // Number of hearts to create
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '❤️';
            
            // Random position across entire screen
            const randomX = Math.random() * viewportWidth;
            const randomY = Math.random() * viewportHeight;
            
            // Random horizontal movement during animation
            const randomOffsetX = (Math.random() - 0.5) * 300; // -150px to 150px
            heart.style.setProperty('--random-x', `${randomOffsetX}px`);
            heart.style.left = `${randomX}px`;
            heart.style.top = `${randomY}px`;
            
            // Random size variation
            const size = 1.2 + Math.random() * 0.8; // 1.2x to 2x
            heart.style.fontSize = `${size}rem`;
            
            // Random animation duration
            const duration = 1.5 + Math.random() * 1.5; // 1.5s to 3s
            heart.style.animationDuration = `${duration}s`;
            
            // Random starting rotation
            const startRotation = Math.random() * 360;
            heart.style.setProperty('--start-rotation', `${startRotation}deg`);
            
            document.body.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, duration * 1000);
        }, i * 30); // Stagger the creation
    }
}

// Hide welcome screen with fade out animation
function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const app = document.getElementById('app');
    
    if (welcomeScreen) {
        // Start fade out animation
        welcomeScreen.classList.add('fade-out');
        
        // Create elegant curtain reveal effect
        createCurtainReveal();
        
        // After fade out completes, show the main content
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            
            if (app) {
                // Show the app content (CSS transition will handle the fade-in)
                app.classList.remove('app-hidden');
                
                // Re-enable scrolling
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                
                // Wait for layout to settle, then initialize all effects
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        // Trigger aesthetic entrance effects first (curtain, gradient, fade-ins)
                        triggerAestheticEffects();
                        
                        // Initialize scroll observers after welcome screen is gone
                        if (window.initializeScrollObservers) {
                            window.initializeScrollObservers();
                        }
                        
                        // Update scroll effects
                        if (window.ScrollManager) {
                            window.ScrollManager.updateScrollEffects();
                        }
                    });
                });
            }
        }, 600);
    }
}

// Create elegant curtain reveal effect
function createCurtainReveal() {
    const curtain = document.createElement('div');
    curtain.className = 'curtain-reveal';
    document.body.appendChild(curtain);
    
    // Force reflow to ensure the element is rendered
    void curtain.offsetHeight;
    
    // Start the reveal animation after a brief moment
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            curtain.classList.add('open');
        });
    });
    
    // Remove curtain after animation completes
    setTimeout(() => {
        if (curtain.parentNode) {
            curtain.remove();
        }
    }, 800);
}

// Trigger aesthetic entrance effects
function triggerAestheticEffects() {
    // Create gradient overlay that fades in
    createGradientOverlay();
    
    // The app content should already be visible after removing app-hidden class
    // Just ensure smooth fade-in if needed
    const app = document.getElementById('app');
    if (app) {
        // Ensure transition is set
        app.style.transition = 'opacity 0.8s ease-in, visibility 0.8s ease-in';
        
        // If opacity is still 0, fade it in
        if (app.style.opacity === '0' || window.getComputedStyle(app).opacity === '0') {
            requestAnimationFrame(() => {
                app.style.opacity = '1';
                app.style.visibility = 'visible';
            });
        }
    }
    
    // Fade in navbar and hero with staggered timing
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.opacity = '0';
        navbar.style.transition = 'opacity 0.6s ease-in';
        setTimeout(() => {
            navbar.style.opacity = '1';
        }, 200);
    }
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transition = 'opacity 0.8s ease-in';
        setTimeout(() => {
            hero.style.opacity = '1';
        }, 300);
    }
    
    // Sections will be animated by scroll observer
}

// Create gradient overlay effect
function createGradientOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'gradient-overlay';
    document.body.appendChild(overlay);
    
    // Force reflow to ensure the element is rendered
    overlay.offsetHeight;
    
    setTimeout(() => {
        overlay.classList.add('fade-in');
    }, 100);
    
    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 2000);
    }, 1500);
}

// Start the portfolio when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
