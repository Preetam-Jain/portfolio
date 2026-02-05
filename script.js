document.addEventListener('DOMContentLoaded', () => {

  // === Render Portfolio Content from JSON ===

  // Render Experience Section (New Timeline)
  function renderExperiences() {
    const container = document.getElementById('experience-container');
    if (!container || typeof portfolioData === 'undefined') return;

    portfolioData.experiences.forEach((exp, index) => {
      const item = document.createElement('div');
      item.className = 'timeline-item reveal-on-scroll';
      item.setAttribute('data-animate', index % 2 === 0 ? 'fade-in-left' : 'fade-in-right');
      item.style.setProperty('--animation-delay', `${index * 0.15}s`);

      const bulletsHtml = exp.bullets.map(bullet =>
        `<li class="mb-2">${bullet}</li>`
      ).join('');

      const tagsHtml = exp.tags.map(tag =>
        `<span class="tech-tag">${tag}</span>`
      ).join('');

      let feedbackHtml = '';
      if (exp.feedback && exp.feedback.length > 0) {
        const feedbackItems = exp.feedback.map(fb => `
          <blockquote class="border-l-2 border-blue-400/40 pl-4 mb-4">
            <p class="italic text-slate-300 text-sm">"${fb.quote}"</p>
            <footer class="text-blue-400 text-sm mt-2">&mdash; ${fb.author}</footer>
            ${fb.modalId ? `<button data-modal-open="${fb.modalId}" class="text-xs text-blue-300 hover:text-blue-200 underline mt-1">${fb.linkText}</button>` : ''}
          </blockquote>
        `).join('');

        feedbackHtml = `
          <div class="experience-feedback mt-4 pt-4 border-t border-slate-600/20">
            <h5 class="text-sm font-semibold text-blue-400 mb-3">What my colleagues had to say:</h5>
            ${feedbackItems}
          </div>
        `;
      }

      // Don't render expandable content for entries with no bullets
      const hasDetails = exp.bullets.length > 0;

      item.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-connector"></div>
        <div class="timeline-content">
          <div class="timeline-card liquid-glass${!hasDetails ? ' no-expand' : ''}" data-exp-id="${exp.id}">
            <div class="card-glow"></div>
            <div class="timeline-card-header" style="position:relative;z-index:1;">
              <h3 class="timeline-card-title">${exp.title}</h3>
              <span class="timeline-card-company">${exp.company}</span>
              <span class="timeline-card-date">${exp.date}</span>
            </div>
            ${hasDetails ? `<p class="timeline-card-hint" style="position:relative;z-index:1;">Click to expand</p>` : ''}
            ${hasDetails ? `
            <div class="timeline-card-details" style="position:relative;z-index:1;">
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
                <button class="experience-toggle-btn text-xs text-blue-400 hover:text-blue-300 mt-4 inline-flex items-center gap-1" style="position:relative;z-index:2;">
                  <span>See what my colleagues had to say</span>
                  <svg class="transition-transform" style="width:12px;height:12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              ` : ''}
              <button class="timeline-collapse-btn text-xs text-slate-500 hover:text-slate-300 mt-3 inline-flex items-center gap-1 transition-colors" style="position:relative;z-index:2;">
                <span>Collapse</span>
                <svg style="width:12px;height:12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                </svg>
              </button>
            </div>
            ` : ''}
          </div>
        </div>
      `;

      container.appendChild(item);
    });

    // Click handlers for expansion
    container.querySelectorAll('.timeline-card:not(.no-expand)').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        card.classList.toggle('expanded');
      });

      // Collapse button
      const collapseBtn = card.querySelector('.timeline-collapse-btn');
      if (collapseBtn) {
        collapseBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.classList.remove('expanded');
        });
      }
    });
  }

  // Render Projects Section
  function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container || typeof portfolioData === 'undefined') return;

    portfolioData.projects.forEach((project, index) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'liquid-glass project-card reveal-on-scroll';
      projectCard.setAttribute('data-animate', 'fade-in-up');
      projectCard.style.setProperty('--animation-delay', `${index * 0.1}s`);

      const tagsHtml = project.tags.map(tag =>
        `<span class="tech-tag">${tag}</span>`
      ).join('');

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
        <div class="card-glow"></div>
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
            <span class="arrow">&#9660;</span>
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

  // === Toggle Functionality ===

  // Experience feedback toggle
  document.querySelectorAll('.experience-toggle-btn').forEach(toggleBtn => {
    const card = toggleBtn.closest('.timeline-card');
    if (!card) return;

    const accomplishmentsDiv = card.querySelector('.experience-accomplishments');
    const feedbackDiv = card.querySelector('.experience-feedback');

    if (!accomplishmentsDiv || !feedbackDiv) return;

    const btnText = toggleBtn.querySelector('span');
    const btnIcon = toggleBtn.querySelector('svg');

    feedbackDiv.style.maxHeight = '0';
    feedbackDiv.style.opacity = '0';
    feedbackDiv.style.overflow = 'hidden';
    feedbackDiv.style.transition = 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out 0.1s';

    accomplishmentsDiv.style.overflow = 'hidden';
    accomplishmentsDiv.style.transition = 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out';
    accomplishmentsDiv.style.maxHeight = accomplishmentsDiv.scrollHeight + 'px';

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
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

  // === Sticky Navigation ===
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  }

  // === Hamburger Menu ===
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
  }

  // === Scroll Animations ===
  const animatedElements = document.querySelectorAll('.reveal-on-scroll');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    animatedElements.forEach(el => { observer.observe(el); });
  }

  // === Mouse-tracking glow effect on liquid-glass cards ===
  document.querySelectorAll('.liquid-glass').forEach(card => {
    const glow = card.querySelector('.card-glow');
    if (!glow) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
    });
  });

  // === Interactive Skill Card Logic ===
  const allSkillCards = document.querySelectorAll('.skill-card');

  allSkillCards.forEach(card => {
    const toggleButton = card.querySelector('.skill-toggle-button');
    const closeButton = card.querySelector('.skill-close-button');
    const panel = card.querySelector('.skill-description');
    const contentWrapper = panel?.querySelector('.skill-description-content');

    if (!toggleButton || !closeButton || !panel || !contentWrapper) return;

    let scrollIntervalId = null;
    let userHasInteracted = false;

    const stopScrollAnimation = () => {
      const intervalId = card.dataset.scrollIntervalId;
      if (intervalId) {
        clearInterval(parseInt(intervalId));
        card.dataset.scrollIntervalId = null;
      }
    };

    const startScrollAnimation = () => {
      stopScrollAnimation();
      userHasInteracted = false;

      requestAnimationFrame(() => {
        if (!(contentWrapper.scrollHeight > contentWrapper.clientHeight)) return;

        let direction = 'down';
        let scrollAmount = 1;
        let intervalDuration = 35;

        contentWrapper.scrollTop = 0;

        scrollIntervalId = setInterval(() => {
          if (userHasInteracted || !card.classList.contains('is-expanded')) {
            stopScrollAnimation();
            return;
          }

          let maxScrollTop = contentWrapper.scrollHeight - contentWrapper.clientHeight;

          if (direction === 'down') {
            contentWrapper.scrollTop += scrollAmount;
            if (contentWrapper.scrollTop >= maxScrollTop) {
              contentWrapper.scrollTop = maxScrollTop;
              direction = 'up';
            }
          } else {
            contentWrapper.scrollTop -= scrollAmount;
            if (contentWrapper.scrollTop <= 0) {
              contentWrapper.scrollTop = 0;
              direction = 'down';
            }
          }
        }, intervalDuration);
        card.dataset.scrollIntervalId = scrollIntervalId;
      });
    };

    const closePanel = () => {
      stopScrollAnimation();
      card.classList.remove('is-expanded');
      toggleButton.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
      contentWrapper.scrollTop = 0;
      userHasInteracted = false;
    };

    const openPanel = () => {
      userHasInteracted = false;
      card.classList.add('is-expanded');
      toggleButton.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');
      setTimeout(startScrollAnimation, 350);
    };

    toggleButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (card.classList.contains('is-expanded')) { closePanel(); }
      else { openPanel(); }
    });

    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      closePanel();
    });

    const handleUserInteraction = () => {
      if (!userHasInteracted && card.classList.contains('is-expanded')) {
        userHasInteracted = true;
        stopScrollAnimation();
      }
    };

    ['wheel', 'touchmove', 'pointerdown'].forEach(type => {
      contentWrapper.addEventListener(type, handleUserInteraction, { passive: true, capture: true });
    });
  });

}); // End DOMContentLoaded
