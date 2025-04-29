// Base Script Content from your provided code
document.addEventListener('DOMContentLoaded', () => {

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