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
    
    initAccordion();
}

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
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

function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    const sortedProjects = [...portfolioData.projects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        const yearA = a.year || a.completionDate || '0';
        const yearB = b.year || b.completionDate || '0';
        return yearB.localeCompare(yearA);
    });

    let html = '';
    sortedProjects.forEach((project, index) => {
        const originalIndex = portfolioData.projects.indexOf(project);
        
        const hasScreenshot = project.screenshot && project.screenshot.trim() !== '';
        const imageContent = hasScreenshot 
            ? `<img src="${project.screenshot}" alt="${project.title} Screenshot" class="project-screenshot" loading="lazy">`
            : `<div class="project-placeholder">${project.icon}</div>`;
        
        const status = project.status || 'completed';
        const statusConfig = {
            'completed': { text: 'Completed', icon: '✅', class: 'status-completed' },
            'in-progress': { text: 'In Progress', icon: '🚧', class: 'status-in-progress' },
            'maintained': { text: 'Maintained', icon: '🔄', class: 'status-maintained' },
            'planned': { text: 'Planned', icon: '🎯', class: 'status-planned' }
        };
        const statusInfo = statusConfig[status] || statusConfig['completed'];
        const statusBadge = `<div class="project-status ${statusInfo.class}">${statusInfo.icon} ${statusInfo.text}</div>`;
        
        const featuredBadge = project.featured ? '<div class="project-featured-badge">⭐ Featured</div>' : '';
        
        const year = project.year || project.completionDate || '';
        const yearBadge = year ? `<div class="project-year">📅 ${year}</div>` : '';
        
        const category = project.category || '';
        const categoryBadge = category ? `<div class="project-category">🏷️ ${category}</div>` : '';
        
        let actionButtons = '';
        
        if (project.liveDemo && project.liveDemo.trim() !== '' && project.liveDemo !== '#') {
            actionButtons += `
                <a href="${project.liveDemo}" class="project-action-btn project-demo-btn" target="_blank" rel="noopener noreferrer" title="View Live Demo">
                    <span class="btn-icon">🌐</span>
                    <span class="btn-text">Live Demo</span>
                </a>
            `;
        }
        
        if (project.videoDemo && project.videoDemo.trim() !== '' && project.videoDemo !== '#') {
            actionButtons += `
                <a href="${project.videoDemo}" class="project-action-btn project-video-btn" target="_blank" rel="noopener noreferrer" title="Watch Video Walkthrough">
                    <span class="btn-icon">▶️</span>
                    <span class="btn-text">Video</span>
                </a>
            `;
        }
        
        if (project.caseStudy && project.caseStudy.trim() !== '' && project.caseStudy !== '#') {
            actionButtons += `
                <a href="${project.caseStudy}" class="project-action-btn project-case-btn" target="_blank" rel="noopener noreferrer" title="Read Case Study">
                    <span class="btn-icon">📄</span>
                    <span class="btn-text">Case Study</span>
                </a>
            `;
        }
        
        if (project.githubLink && project.githubLink.trim() !== '' && project.githubLink !== '#') {
            actionButtons += `
                <a href="${project.githubLink}" class="project-action-btn project-github-btn" target="_blank" rel="noopener noreferrer" title="View on GitHub">
                    <span class="btn-icon">💻</span>
                    <span class="btn-text">Code</span>
                </a>
            `;
        }
        
        if (!actionButtons && project.link && project.link !== '#') {
            actionButtons = `
                <a href="${project.link}" class="project-action-btn project-link-btn" target="_blank" rel="noopener noreferrer">
                    <span class="btn-text">${project.linkText || 'View Project'}</span>
                    <span class="link-icon">→</span>
                </a>
            `;
        }
        
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
        
        const techString = project.technologies ? project.technologies.join(' ').toLowerCase() : '';
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
                            ${categoryBadge}
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
    
    initProjectFilters();
    initProjectModal();
    updateProjectCount();
    
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

function initProjectFilters() {
    const searchInput = document.getElementById('projectSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('projectSort');
    const noProjectsMessage = document.getElementById('noProjectsMessage');
    
    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'newest';
    
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
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterProjects(currentFilter, currentSearch, currentSort);
        });
    });
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterProjects(currentFilter, currentSearch, currentSort);
        });
    }
    
    function filterProjects(filter, search, sort) {
        const cards = document.querySelectorAll('.project-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            let show = true;
            
            if (filter === 'featured') {
                show = card.dataset.featured === 'true';
            } else if (filter === 'completed') {
                show = card.dataset.status === 'completed';
            } else if (filter === 'in-progress') {
                show = card.dataset.status === 'in-progress';
            }
            if (show && search) {
                show = card.dataset.search.includes(search);
            }
            
            if (show) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (noProjectsMessage) {
            noProjectsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        
        updateProjectCount(visibleCount);
    }
}

function updateProjectCount(count) {
    const countElement = document.getElementById('projectCount');
    if (countElement) {
        const total = portfolioData.projects.length;
        const visible = count !== undefined ? count : total;
        countElement.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    }
}

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');
    
    if (!modal || !modalBody) return;
    
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    document.addEventListener('click', (e) => {
        if (e.target.closest('.project-view-details-btn')) {
            const btn = e.target.closest('.project-view-details-btn');
            const projectIndex = parseInt(btn.dataset.projectIndex);
            openProjectModal(projectIndex);
        }
        
        if (e.target.closest('.project-card')) {
            const card = e.target.closest('.project-card');
            const projectIndex = parseInt(card.dataset.project);
            if (e.target.closest('.project-image') || e.target.closest('.screenshot-overlay')) {
                openProjectModal(projectIndex);
            }
        }
    });
    
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

function renderAchievements() {
    const container = document.getElementById('achievementsContainer');
    if (!container) {
        console.warn('Achievements container not found');
        return;
    }

    if (!portfolioData.achievements || portfolioData.achievements.length === 0) {
        container.innerHTML = '<p class="no-content">No achievements to display.</p>';
        return;
    }

    container.innerHTML = '<div class="achievements-slideshow-wrapper"><div class="achievements-slideshow-track"></div></div>';
    
    const track = container.querySelector('.achievements-slideshow-track');
    
    const duplicates = 3;
    let html = '';
    
    for (let i = 0; i < duplicates; i++) {
        html += portfolioData.achievements
            .map((achievement, index) => createAchievementCard(achievement, index))
            .join('');
    }
    
    track.innerHTML = html;
    
    setTimeout(() => {
        initAchievementsSlideshow();
    }, 100);
}

function initAchievementsSlideshow() {
    const track = document.querySelector('.achievements-slideshow-track');
    if (!track) return;
    
    const cards = track.querySelectorAll('.achievement-card');
    if (cards.length === 0) return;
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const achievementsCount = portfolioData.achievements.length;
            let oneSetWidth = 0;
            
            for (let i = 0; i < achievementsCount; i++) {
                if (cards[i]) {
                    const cardRect = cards[i].getBoundingClientRect();
                    oneSetWidth += cardRect.width;
                }
            }
            
            const computedGap = window.getComputedStyle(track).gap;
            const gapValue = parseFloat(computedGap) || 32;
            oneSetWidth += gapValue * (achievementsCount - 1);
            
            const animationDuration = 30;
            
            track.style.setProperty('--slide-width', `${oneSetWidth}px`);
            track.style.setProperty('--animation-duration', `${animationDuration}s`);
            track.classList.add('animate');
        });
    });
}

function renderStatistics() {
    const container = document.getElementById('statisticsContainer');
    if (!container) return;

    if (!portfolioData.statistics || portfolioData.statistics.length === 0) {
        container.innerHTML = '';
        return;
    }

    let html = '';
    portfolioData.statistics.forEach((stat, index) => {
        html += `
            <div class="stat-item" data-value="${stat.value}">
                <div class="stat-icon">${stat.icon}</div>
                <div class="stat-content">
                    <div class="stat-value">
                        <span class="stat-number">0</span>${stat.suffix || ''}
                    </div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;

    initStatisticsCounter();
}

function initStatisticsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    statItems.forEach(item => {
        observer.observe(item);
    });
}

function animateCounter(element) {
    const targetValue = parseInt(element.dataset.value);
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement) return;

    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutCubic);
        
        numberElement.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            numberElement.textContent = targetValue;
        }
    }

    requestAnimationFrame(updateCounter);
}

function renderContactInfo() {
    const container = document.getElementById('contactInfoContainer');
    if (!container) return;

    const contact = portfolioData.contact;
    
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

function updatePersonalInfo() {
    const info = portfolioData.personalInfo;
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = `Hi, I'm <a href="https://www.facebook.com/nerick69" target="_blank" rel="noopener noreferrer" class="highlight highlight-link">${info.name}</a>`;
    }
    
    const heroSubtitleText = document.getElementById('heroSubtitleText');
    if (heroSubtitleText && info.title) {
        typewriterEffect(heroSubtitleText, info.title);
    }
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        heroDescription.textContent = info.description;
    }
    
    const footerName = document.getElementById('footerName');
    if (footerName) {
        footerName.textContent = info.name;
    }
    
    const brandText = document.querySelector('.brand-text');
    if (brandText) {
        brandText.textContent = `${info.name}'s Portfolio`;
    }
    
    const profileImage = document.getElementById('heroProfileImage');
    if (profileImage && info.profileImage) {
        profileImage.src = info.profileImage;
        profileImage.alt = `${info.name} - Profile Picture`;
    }
}

function typewriterEffect(element, text) {
    if (!element) return;
    
    const container = element.parentElement;
    if (container) {
        container.style.minHeight = '3rem';
        container.style.height = '3rem';
    }
    
    const speed = 60;
    const cursor = element.parentElement.querySelector('.typing-cursor');
    const loopDelay = 3000;
    
    function type() {
        element.textContent = '';
        let i = 0;
        
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
                if (cursor) {
                    setTimeout(() => {
                        cursor.style.opacity = '0';
                        cursor.style.animation = 'none';
                    }, 1000);
                }
                
                setTimeout(() => {
                    type();
                }, loopDelay);
            }
        }
        
        typeChar();
    }
    
    setTimeout(() => {
        type();
    }, 1200);
}

async function initPortfolio() {
    const app = document.getElementById('app');
    if (!app) return;

    try {
        const navbar = await loadComponent('components/navbar.html');
        const hero = await loadComponent('components/hero.html');
        const statistics = await loadComponent('components/statistics.html');
        const about = await loadComponent('components/about.html');
        const skills = await loadComponent('components/skills.html');
        const projects = await loadComponent('components/projects.html');
        const achievements = await loadComponent('components/achievements.html');
        const contact = await loadComponent('components/contact.html');
        const footer = await loadComponent('components/footer.html');

        app.innerHTML = navbar + hero + statistics + about + skills + projects + achievements + contact + footer;

        setTimeout(() => {
            updatePersonalInfo();
            
            renderStatistics();
            renderSkills();
            renderProjects();
            renderAchievements();
            renderContactInfo();
            
            initInteractivity();
            
            setTimeout(() => {
                hideWelcomeScreen();
            }, 2500);
        }, 100);
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

function initInteractivity() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    function createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.style.width = '0%';
        indicator.style.opacity = '0';
        document.body.appendChild(indicator);
    }

    const ScrollManager = {
        config: {
            navbarHeight: 80,
            duration: 800,
            minDistance: 50,
            easing: 'easeInOutCubic'
        },
        
        state: {
            isScrolling: false,
            animationId: null,
            lastScrollY: 0,
            ticking: false,
            navLinkUpdatePending: false
        },
        
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
        
        getScrollPosition() {
            return window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
        },
        
        calculateTargetPosition(element, offset = 0) {
            const rect = element.getBoundingClientRect();
            const currentScroll = this.getScrollPosition();
            return Math.max(0, rect.top + currentScroll - offset);
        },
        
        cancel() {
            if (this.state.animationId) {
                cancelAnimationFrame(this.state.animationId);
                this.state.animationId = null;
            }
            this.state.isScrolling = false;
        },
        
        scrollTo(targetPosition, duration = this.config.duration) {
            this.cancel();
            
            const startPosition = this.getScrollPosition();
            const distance = targetPosition - startPosition;
            
            if (Math.abs(distance) < this.config.minDistance) {
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                setTimeout(() => {
                    if (window.updateSectionVisibility) {
                        window.updateSectionVisibility();
                    }
                }, 100);
                return;
            }
            
            this.state.isScrolling = true;
            let startTime = null;
            
            const easingFunction = this.easingFunctions[this.config.easing] || this.easingFunctions.easeInOutCubic;
            const easing = (t) => {
                t = Math.max(0, Math.min(1, t));
                return easingFunction(t);
            };

            const animate = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easing(progress);
                
                const currentPosition = startPosition + distance * ease;
                window.scrollTo({ top: currentPosition, behavior: 'auto' });
                
                if (timeElapsed < duration) {
                    this.state.animationId = requestAnimationFrame(animate);
                } else {
                    window.scrollTo({ top: targetPosition, behavior: 'auto' });
                    this.cancel();
                    if (window.updateSectionVisibility) {
                        requestAnimationFrame(() => {
                            window.updateSectionVisibility();
                        });
                    }
                }
            };

            this.state.animationId = requestAnimationFrame(animate);
        },
        
        scrollToElement(selector, offset = this.config.navbarHeight) {
            const element = typeof selector === 'string' 
                ? document.querySelector(selector) 
                : selector;
            
            if (!element) return false;
            
            const targetPosition = this.calculateTargetPosition(element, offset);
            this.scrollTo(targetPosition);
            return true;
        },
        
        handleScroll() {
            if (!this.state.ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollEffects();
                    this.state.ticking = false;
                });
                this.state.ticking = true;
            }
        },
        
        updateScrollEffects() {
            const currentScroll = this.getScrollPosition();
            this.state.lastScrollY = currentScroll;
            
            const navbar = document.getElementById('navbar');
            const indicator = document.querySelector('.scroll-indicator');
            
            if (navbar) {
                const shouldBeScrolled = currentScroll > 50;
                if (shouldBeScrolled !== navbar.classList.contains('scrolled')) {
                    navbar.classList.toggle('scrolled', shouldBeScrolled);
                }
            }
            
            if (indicator) {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = windowHeight > 0 ? Math.min((currentScroll / windowHeight), 1) : 0;
                
                const easedProgress = progress < 0.5 
                    ? 2 * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
                indicator.style.transform = `scaleX(${easedProgress})`;
                indicator.style.transformOrigin = 'left';
                
                if (progress > 0) {
                    indicator.style.opacity = '1';
                    indicator.style.visibility = 'visible';
                } else {
                    indicator.style.opacity = '0';
                    indicator.style.visibility = 'hidden';
                }
            }
            
            if (window.updateSectionVisibility) {
                window.updateSectionVisibility();
            }
        },
        
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href');
                    
                    if (!targetId || targetId === '#') {
                        e.preventDefault();
                        return;
                    }
                    
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        
                        anchor.style.transform = 'scale(0.98)';
                        setTimeout(() => {
                            anchor.style.transform = '';
                        }, 100);
                        
                        requestAnimationFrame(() => {
                            this.scrollToElement(target);
                        });
                    }
                });
            });
            
            const interruptEvents = ['wheel', 'touchmove', 'keydown'];
            interruptEvents.forEach(eventType => {
                window.addEventListener(eventType, () => {
                    if (this.state.isScrolling) {
                        this.cancel();
                    }
                }, { passive: true });
            });
            
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) {
                    cancelAnimationFrame(scrollTimeout);
                }
                
                scrollTimeout = requestAnimationFrame(() => {
                    this.handleScroll();
                    scrollTimeout = null;
                });
            }, { passive: true, capture: false });
            
            requestAnimationFrame(() => {
                this.updateScrollEffects();
            });
        }
    };
    
    createScrollIndicator();
    ScrollManager.init();

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
            
            if (formMessage) {
                formMessage.classList.remove('show', 'success', 'error');
            }
            
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            if (sendButton) {
                sendButton.classList.add('loading');
                sendButton.disabled = true;
            }
            
            setTimeout(() => {
                showFormMessage(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`, 'success');
                
                if (formMessage) {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                contactForm.reset();
                
                if (sendButton) {
                    sendButton.classList.remove('loading');
                    sendButton.disabled = false;
                }
                
                setTimeout(() => {
                    if (formMessage) {
                        formMessage.classList.remove('show');
                    }
                }, 5000);
            }, 1500);
        });
        
        function showFormMessage(text, type) {
            if (formMessage) {
                formMessage.textContent = text;
                formMessage.className = `form-message ${type} show`;
            }
        }
    }


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
            
            const visibleTop = Math.max(0, -sectionTop);
            const visibleBottom = Math.min(sectionHeight, viewportHeight - sectionTop);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            const visibilityRatio = sectionHeight > 0 ? visibleHeight / sectionHeight : 0;
            
            const isInViewport = sectionTop < viewportHeight && sectionBottom > 0;
            
            let score = 0;
            
            if (isInViewport) {
                score = visibilityRatio * 100;
                
                const distanceFromTop = Math.abs(sectionTop - navbarHeight);
                if (distanceFromTop < 150) {
                    score += (150 - distanceFromTop) / 150 * 50;
                }
                
                if (sectionTop >= 0 && sectionTop < viewportHeight * 0.5) {
                    score += 30;
                }
            }
            
            if (score > bestScore) {
                bestScore = score;
                activeSection = section;
            }
        });
        
        if (!activeSection || bestScore <= 0) {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollY >= sectionTop - navbarHeight - 50 && scrollY < sectionBottom - navbarHeight + 50) {
                    activeSection = section;
                }
            });
        }
        
        if (!activeSection) {
            activeSection = document.getElementById('home');
        }
        
        return activeSection;
    }
    
    function updateSectionVisibility() {
        const activeSection = getCurrentActiveSection();
        const allSections = document.querySelectorAll('section[id]');
        
        allSections.forEach(section => {
            if (section === activeSection) {
                section.classList.add('visible');
                section.style.opacity = '';
                section.style.visibility = '';
                section.style.transform = '';
            } else {
                section.classList.remove('visible');
            }
        });
        
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
    
    window.updateSectionVisibility = updateSectionVisibility;

    function initializeScrollObservers() {
        if (window.sectionObserver) {
            window.sectionObserver.disconnect();
        }
        if (window.cardObserver) {
            window.cardObserver.disconnect();
        }

        const sectionObserverOptions = {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
            rootMargin: '0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            updateSectionVisibility();
        }, sectionObserverOptions);

        document.querySelectorAll('section[id]').forEach(section => {
            if (section.id !== 'home') {
                section.classList.remove('visible');
            } else {
                section.classList.add('visible');
            }
            sectionObserver.observe(section);
        });

        window.sectionObserver = sectionObserver;
        
        updateSectionVisibility();

        const cardObserverOptions = {
            threshold: [0.15, 0.25],
            rootMargin: '0px 0px -100px 0px'
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const rect = entry.boundingClientRect;
                const viewportHeight = window.innerHeight;
                const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
                
                if (entry.isIntersecting && entry.intersectionRatio >= 0.15 && isInViewport) {
                    entry.target.classList.add('card-visible');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, cardObserverOptions);

        document.querySelectorAll('.project-card, .achievement-card, .accordion-item').forEach((card) => {
            if (!card.classList.contains('card-visible')) {
                cardObserver.observe(card);
            }
        });

        window.cardObserver = cardObserver;
    }

    window.initializeScrollObservers = initializeScrollObservers;

    window.checkSectionsInViewport = function checkSectionsInViewport() {
        if (window.updateSectionVisibility) {
            window.updateSectionVisibility();
        }
    }

    setTimeout(() => {
        const app = document.getElementById('app');
        if (app && !app.classList.contains('app-hidden')) {
            initializeScrollObservers();
        }
    }, 100);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.initializeScrollObservers) {
                window.initializeScrollObservers();
            }
            if (window.checkSectionsInViewport) {
                window.checkSectionsInViewport();
            }
        }, 250);
    });

    if (window.location.hash) {
        setTimeout(() => {
            ScrollManager.scrollToElement(window.location.hash);
        }, 100);
    }

    initHeartAnimation();
}

function initHeartAnimation() {
    const heart = document.querySelector('.heart');
    if (!heart) return;

    heart.addEventListener('click', function(e) {
        e.preventDefault();
        createFloatingHearts(e.clientX, e.clientY);
    });
}

function createFloatingHearts(x, y) {
    const heartCount = 20;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '❤️';
            
            const randomX = Math.random() * viewportWidth;
            const randomY = Math.random() * viewportHeight;
            
            const randomOffsetX = (Math.random() - 0.5) * 300;
            heart.style.setProperty('--random-x', `${randomOffsetX}px`);
            heart.style.left = `${randomX}px`;
            heart.style.top = `${randomY}px`;
            
            const size = 1.2 + Math.random() * 0.8;
            heart.style.fontSize = `${size}rem`;
            
            const duration = 1.5 + Math.random() * 1.5;
            heart.style.animationDuration = `${duration}s`;
            
            const startRotation = Math.random() * 360;
            heart.style.setProperty('--start-rotation', `${startRotation}deg`);
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, duration * 1000);
        }, i * 30);
    }
}

function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const app = document.getElementById('app');
    
    if (welcomeScreen) {
        welcomeScreen.classList.add('fade-out');
        
        createCurtainReveal();
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            
            if (app) {
                app.classList.remove('app-hidden');
                
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        triggerAestheticEffects();
                        
                        if (window.initializeScrollObservers) {
                            window.initializeScrollObservers();
                        }
                        
                        if (window.ScrollManager) {
                            window.ScrollManager.updateScrollEffects();
                        }
                    });
                });
            }
        }, 600);
    }
}

function createCurtainReveal() {
    const curtain = document.createElement('div');
    curtain.className = 'curtain-reveal';
    document.body.appendChild(curtain);
    
    void curtain.offsetHeight;
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            curtain.classList.add('open');
        });
    });
    
    setTimeout(() => {
        if (curtain.parentNode) {
            curtain.remove();
        }
    }, 800);
}

function triggerAestheticEffects() {
    createGradientOverlay();
    
    const app = document.getElementById('app');
    if (app) {
        app.style.transition = 'opacity 0.8s ease-in, visibility 0.8s ease-in';
        
        if (app.style.opacity === '0' || window.getComputedStyle(app).opacity === '0') {
            requestAnimationFrame(() => {
                app.style.opacity = '1';
                app.style.visibility = 'visible';
            });
        }
    }
    
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
    
}

function createGradientOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'gradient-overlay';
    document.body.appendChild(overlay);
    
    overlay.offsetHeight;
    
    setTimeout(() => {
        overlay.classList.add('fade-in');
    }, 100);
    
    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 2000);
    }, 1500);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
