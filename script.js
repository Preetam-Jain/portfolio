// Base Script Content from your provided code
document.addEventListener('DOMContentLoaded', () => {

  // === START: Render Portfolio Content from JSON ===

  // Render Experience Section (Road Timeline)
  function renderExperiences() {
    const container = document.getElementById('experience-container');
    if (!container || typeof portfolioData === 'undefined') return;

    portfolioData.experiences.forEach((exp, index) => {
      const roadStop = document.createElement('div');
      roadStop.className = 'road-stop reveal-on-scroll';
      roadStop.setAttribute('data-animate', index % 2 === 0 ? 'fade-in-left' : 'fade-in-right');
      roadStop.style.setProperty('--animation-delay', `${index * 0.15}s`);

      // Generate bullets HTML
      const bulletsHtml = exp.bullets.map(bullet =>
        `<li class="mb-2">${bullet}</li>`
      ).join('');

      // Generate tags HTML
      const tagsHtml = exp.tags.map(tag =>
        `<span class="tech-tag">${tag}</span>`
      ).join('');

      // Generate feedback HTML if exists
      let feedbackHtml = '';
      if (exp.feedback && exp.feedback.length > 0) {
        const feedbackItems = exp.feedback.map(fb => `
          <blockquote class="border-l-2 border-blue-400 pl-4 mb-4">
            <p class="italic text-slate-300 text-sm">"${fb.quote}"</p>
            <footer class="text-blue-400 text-sm mt-2">— ${fb.author}</footer>
            ${fb.modalId ? `<button data-modal-open="${fb.modalId}" class="text-xs text-blue-300 hover:text-blue-200 underline mt-1">${fb.linkText}</button>` : ''}
          </blockquote>
        `).join('');

        feedbackHtml = `
          <div class="experience-feedback mt-4 pt-4 border-t border-slate-600/30">
            <h5 class="text-sm font-semibold text-blue-400 mb-3">What my colleagues had to say:</h5>
            ${feedbackItems}
          </div>
        `;
      }

      roadStop.innerHTML = `
        <div class="road-stop-marker"></div>
        <div class="road-stop-content">
          <div class="road-stop-card timeline-item" data-exp-id="${exp.id}">
            <div class="road-stop-header">
              <h3 class="road-stop-title">${exp.title}</h3>
              <span class="road-stop-company">${exp.company}</span>
              <span class="road-stop-date">${exp.date}</span>
            </div>
            <p class="road-stop-expand-hint">Click to expand</p>
            <div class="road-stop-details">
              <div class="experience-accomplishments">
                <ul class="list-disc list-inside text-slate-300 text-sm mt-2 space-y-1">
                  ${bulletsHtml}
                </ul>
                <div class="flex flex-wrap gap-2 mt-4">
                  ${tagsHtml}
                </div>
              </div>
              ${feedbackHtml}
              ${exp.feedback && exp.feedback.length > 0 ? `
                <button class="experience-toggle-btn text-xs text-blue-400 hover:text-blue-300 mt-4 flex items-center gap-1">
                  <span>See what my colleagues had to say</span>
                  <svg class="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;

      container.appendChild(roadStop);
    });

    // Add click handlers for expansion
    container.querySelectorAll('.road-stop-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't toggle if clicking a link or button inside
        if (e.target.closest('a') || e.target.closest('button')) return;
        card.classList.toggle('expanded');
      });
    });
  }

  // Render Projects Section
  function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container || typeof portfolioData === 'undefined') return;

    portfolioData.projects.forEach((project, index) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'glass-card project-card p-6 reveal-on-scroll flex flex-col';
      projectCard.setAttribute('data-animate', 'fade-in-up');
      projectCard.style.setProperty('--animation-delay', `${index * 0.1}s`);

      // Generate tags HTML
      const tagsHtml = project.tags.map(tag =>
        `<span class="tech-tag">${tag}</span>`
      ).join('');

      // Generate media HTML based on type
      let mediaHtml = '';
      if (project.media) {
        switch (project.media.type) {
          case 'youtube':
            mediaHtml = `
              <div class="project-video-content">
                <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                  <iframe src="${project.media.src}" title="${project.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full"></iframe>
                </div>
              </div>
            `;
            break;
          case 'vimeo':
            mediaHtml = `
              <div class="project-video-content">
                <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                  <iframe src="${project.media.src}" title="${project.title}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen class="w-full h-full"></iframe>
                </div>
              </div>
            `;
            break;
          case 'gif':
            mediaHtml = `
              <div class="project-video-content">
                <div class="rounded-lg overflow-hidden mb-4">
                  <img src="${project.media.src}" alt="${project.title}" class="w-full h-auto">
                </div>
              </div>
            `;
            break;
        }
      }

      // Add diagram toggle if project has a diagram
      let diagramHtml = '';
      let diagramToggleBtn = '';
      if (project.diagram) {
        diagramHtml = `
          <div class="project-diagram-content">
            <div class="rounded-lg overflow-hidden mb-4">
              <img src="${project.diagram}" alt="${project.title} UML Diagram" class="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity">
            </div>
          </div>
        `;
        diagramToggleBtn = `
          <button class="project-diagram-toggle text-xs text-blue-400 hover:text-blue-300 mt-2 flex items-center gap-1">
            <span>View System UML Diagram</span>
            <svg class="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        `;
      }

      projectCard.innerHTML = `
        ${mediaHtml}
        ${diagramHtml}
        <h3 class="text-xl font-semibold text-white mb-2">${project.title}</h3>
        <p class="text-slate-300 text-sm mb-4 flex-grow">${project.description}</p>
        <div class="flex flex-wrap gap-2">
          ${tagsHtml}
        </div>
        ${diagramToggleBtn}
      `;

      container.appendChild(projectCard);
    });
  }

  // Render Skills Section
  function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container || typeof portfolioData === 'undefined') return;

    portfolioData.skills.forEach((skill, index) => {
      const skillCard = document.createElement('div');
      skillCard.className = 'skill-card reveal-on-scroll';
      skillCard.setAttribute('data-animate', 'fade-in');
      skillCard.style.setProperty('--animation-delay', `${index * 0.05}s`);

      skillCard.innerHTML = `
        <div class="skill-card-inner">
          <img src="${skill.logo}" alt="${skill.name} logo" class="h-12 w-auto mx-auto mb-2 object-contain">
          <p class="text-sm font-medium">${skill.name}</p>
          <button class="skill-toggle-button" aria-expanded="false">
            How have I used it?
            <span class="arrow">▼</span>
          </button>
        </div>
        <div class="skill-description" aria-hidden="true">
          <button class="skill-close-button" aria-label="Close description">&times;</button>
          <div class="skill-description-content">
            <p>${skill.description}</p>
          </div>
        </div>
      `;

      container.appendChild(skillCard);
    });
  }

  // Initialize all renders
  renderExperiences();
  renderProjects();
  renderSkills();

  // === Initialize Toggle Functionality (after render) ===

  // Experience feedback toggle
  document.querySelectorAll('.experience-toggle-btn').forEach(toggleBtn => {
    const card = toggleBtn.closest('.timeline-item');
    if (!card) return;

    const accomplishmentsDiv = card.querySelector('.experience-accomplishments');
    const feedbackDiv = card.querySelector('.experience-feedback');

    if (!accomplishmentsDiv || !feedbackDiv) return;

    const btnText = toggleBtn.querySelector('span');
    const btnIcon = toggleBtn.querySelector('svg');

    // Set initial styles for animation
    feedbackDiv.style.maxHeight = '0';
    feedbackDiv.style.opacity = '0';
    feedbackDiv.style.overflow = 'hidden';
    feedbackDiv.style.transition = 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out 0.1s';

    accomplishmentsDiv.style.overflow = 'hidden';
    accomplishmentsDiv.style.transition = 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out';
    accomplishmentsDiv.style.maxHeight = accomplishmentsDiv.scrollHeight + 'px';

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card collapse
      const isFeedbackShown = feedbackDiv.style.maxHeight !== '0px';

      if (isFeedbackShown) {
        feedbackDiv.style.maxHeight = '0';
        feedbackDiv.style.opacity = '0';
        accomplishmentsDiv.style.maxHeight = accomplishmentsDiv.scrollHeight + 'px';
        accomplishmentsDiv.style.opacity = '1';
        btnText.textContent = 'See what my colleagues had to say';
        btnIcon.style.transform = 'rotate(0deg)';
      } else {
        accomplishmentsDiv.style.maxHeight = '0';
        accomplishmentsDiv.style.opacity = '0';
        feedbackDiv.style.maxHeight = feedbackDiv.scrollHeight + 'px';
        feedbackDiv.style.opacity = '1';
        btnText.textContent = 'Show key accomplishments';
        btnIcon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Project diagram toggle
  document.querySelectorAll('.project-diagram-toggle').forEach(toggleBtn => {
    const card = toggleBtn.closest('.project-card');
    if (!card) return;

    const diagramContent = card.querySelector('.project-diagram-content');
    const videoContent = card.querySelector('.project-video-content');
    if (!diagramContent || !videoContent) return;

    const btnText = toggleBtn.querySelector('span');
    const btnIcon = toggleBtn.querySelector('svg');

    // Set initial styles
    diagramContent.style.maxHeight = '0';
    diagramContent.style.opacity = '0';
    diagramContent.style.overflow = 'hidden';
    diagramContent.style.transition = 'max-height 0.5s ease-in-out, opacity 0.4s ease-in-out';

    videoContent.style.maxHeight = videoContent.scrollHeight + 'px';
    videoContent.style.opacity = '1';
    videoContent.style.overflow = 'hidden';
    videoContent.style.transition = 'max-height 0.5s ease-in-out, opacity 0.4s ease-in-out';

    toggleBtn.addEventListener('click', () => {
      const isDiagramShown = diagramContent.style.maxHeight !== '0px';

      if (isDiagramShown) {
        diagramContent.style.maxHeight = '0';
        diagramContent.style.opacity = '0';
        videoContent.style.maxHeight = videoContent.scrollHeight + 'px';
        videoContent.style.opacity = '1';
        btnText.textContent = 'View System UML Diagram';
        btnIcon.style.transform = 'rotate(0deg)';
      } else {
        videoContent.style.maxHeight = '0';
        videoContent.style.opacity = '0';
        diagramContent.style.maxHeight = diagramContent.scrollHeight + 'px';
        diagramContent.style.opacity = '1';
        btnText.textContent = 'Hide System UML Diagram';
        btnIcon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Modal functionality
  const htmlEl = document.documentElement;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('hidden');
    htmlEl.classList.add('overflow-hidden');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    htmlEl.classList.remove('overflow-hidden');
  }

  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-modal-open]');
    if (openBtn) {
      openModal(openBtn.getAttribute('data-modal-open'));
      return;
    }

    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      closeModal(closeBtn.closest('[role="dialog"]'));
      return;
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const visibleModal = document.querySelector('[role="dialog"]:not(.hidden)');
      closeModal(visibleModal);
    }
  });

  // === END: Render Portfolio Content from JSON ===


  // --- Sticky Navigation Background ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
    };
    handleScroll(); window.addEventListener('scroll', handleScroll);
  }

  // --- Hamburger Menu ---
  const hamburgerButton = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');
  if (hamburgerButton && mobileMenu && iconOpen && iconClose) {
    const toggleMenu = () => {
      const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
      mobileMenu.classList.toggle('hidden');
      hamburgerButton.setAttribute('aria-expanded', !isExpanded);
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    };
    hamburgerButton.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburgerButton.getAttribute('aria-expanded') === 'true') { toggleMenu(); }
        });
    });
  } else {
     // console.warn('Hamburger menu elements not found.');
  }

  // --- Scroll Animations ---
  const animatedElements = document.querySelectorAll('.reveal-on-scroll');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.matches('#top .animate-bounce')) {
              setTimeout(() => { if (entry.target.classList.contains('is-visible')) { entry.target.classList.remove('opacity-0'); } }, 800);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    animatedElements.forEach(el => { observer.observe(el); });
  }

  // --- START: Interactive Skill Card Logic (Final Version) ---
  const allSkillCards = document.querySelectorAll('.skill-card');

  allSkillCards.forEach(card => {
    const toggleButton = card.querySelector('.skill-toggle-button');
    const closeButton = card.querySelector('.skill-close-button');
    const panel = card.querySelector('.skill-description'); // The main container panel
    const contentWrapper = panel?.querySelector('.skill-description-content'); // The inner scrollable div

    if (!toggleButton || !closeButton || !panel || !contentWrapper) {
        // console.warn('Skill card missing required elements:', card);
        return; // Skip this card if setup is incomplete
    }

    let scrollIntervalId = null; // Holds the interval ID for this card's animation
    let userHasInteracted = false; // Flag to check if user manually scrolled/clicked

    // --- Function to Stop Animation ---
    const stopScrollAnimation = (clearStoredId = true) => {
        const intervalId = card.dataset.scrollIntervalId;
        if (intervalId) {
            clearInterval(parseInt(intervalId));
            if (clearStoredId) { card.dataset.scrollIntervalId = null; }
            // console.log('Stopped animation for:', panel.id);
        }
    };

    // --- Scrolling Animation Function ---
    const startScrollAnimation = () => {
        stopScrollAnimation(); // Clear previous interval first
        userHasInteracted = false; // Reset interaction flag

        requestAnimationFrame(() => { // Ensure dimensions are ready
            // Check if scrollable *after* ensuring rendering
            if (!(contentWrapper.scrollHeight > contentWrapper.clientHeight)) {
                // console.log('Panel not scrollable:', panel.id);
                return; // Not scrollable
            }
            // console.log('Starting scroll animation for:', panel.id);

            let direction = 'down';
            let scrollAmount = 1; // Pixels per step
            let intervalDuration = 35; // Milliseconds (adjust for speed)

            contentWrapper.scrollTop = 0; // Start from top
            direction = 'down';

            scrollIntervalId = setInterval(() => {
                if (userHasInteracted || !card.classList.contains('is-expanded')) {
                    stopScrollAnimation(); // Stop if user interacted or panel closed
                    return;
                }

                let maxScrollTop = contentWrapper.scrollHeight - contentWrapper.clientHeight;

                if (direction === 'down') {
                    contentWrapper.scrollTop += scrollAmount;
                    if (contentWrapper.scrollTop >= maxScrollTop) {
                        contentWrapper.scrollTop = maxScrollTop; // Pin to bottom
                        direction = 'up'; // Change direction
                    }
                } else { // direction === 'up'
                    contentWrapper.scrollTop -= scrollAmount;
                    if (contentWrapper.scrollTop <= 0) {
                        contentWrapper.scrollTop = 0; // Pin to top
                        direction = 'down'; // Change direction
                    }
                }
            }, intervalDuration);
            card.dataset.scrollIntervalId = scrollIntervalId; // Store ID
        });
    };


    // --- Panel Open/Close Logic ---
    const closePanel = () => {
      stopScrollAnimation(); // Stop animation FIRST
      card.classList.remove('is-expanded');
      toggleButton.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
      contentWrapper.scrollTop = 0; // Reset scroll on the wrapper
      userHasInteracted = false; // Reset interaction flag
    };

    const openPanel = () => {
      userHasInteracted = false; // Reset interaction flag
      card.classList.add('is-expanded');
      toggleButton.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');
      // Start animation slightly after CSS transition allows visibility
      setTimeout(startScrollAnimation, 350); // Small delay
    };

    // --- Event Listeners ---
    toggleButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (card.classList.contains('is-expanded')) { closePanel(); }
      else { openPanel(); }
    });

    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      closePanel();
    });

    // --- Stop animation if user interacts with the SCROLL WRAPPER ---
    const userInteractionListeners = ['wheel', 'touchmove', 'pointerdown'];
    const handleUserInteraction = () => {
        if (!userHasInteracted && card.classList.contains('is-expanded')) {
            // console.log('User interaction detected, stopping animation for:', panel.id);
            userHasInteracted = true;
            stopScrollAnimation(); // Stop the automatic scroll
        }
    };

    userInteractionListeners.forEach(type => {
        // Attach listeners to the actual scrolling element
        contentWrapper.addEventListener(type, handleUserInteraction, { passive: true, capture: true });
    });

  });
  // --- END: Interactive Skill Card Logic ---

}); // End DOMContentLoaded