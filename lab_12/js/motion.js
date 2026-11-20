/**
 * Motion & Kinetic Scroll Controller for Lab 12
 * Handles smooth scroll progress, 3D card perspective tilt,
 * intersection observer reveal animations, and kinetic scroll interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initHeaderScroll();
  initIntersectionReveals();
  init3DCardTilt();
  initParallaxFloatingElements();
});

/**
 * Updates dynamic top progress bar as user scrolls down the page.
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * Toggles header glassmorphic density and elevation on scroll.
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeader, { passive: true });
  handleHeader();
}

/**
 * Uses IntersectionObserver to reveal elements as they scroll into view.
 */
function initIntersectionReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 3D Mouse Parallax and Tilt Effect on Product Cards
 */
function init3DCardTilt() {
  const attachTilt = () => {
    const tiltCards = document.querySelectorAll('.tilt-card, .product-card, .hero-card-3d');
    tiltCards.forEach(card => {
      // Prevent double listener
      if (card.dataset.tiltInit) return;
      card.dataset.tiltInit = 'true';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      });
    });
  };

  attachTilt();
  // Expose for dynamic cards rendered after XML loads
  window.reinitCardTilt = attachTilt;
}

/**
 * Parallax floating decorative objects on scroll
 */
function initParallaxFloatingElements() {
  const floatingBadges = document.querySelectorAll('.floating-badge');
  if (!floatingBadges.length) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    floatingBadges.forEach((el, idx) => {
      const speed = (idx + 1) * 0.08;
      el.style.transform = `translateY(${scrolled * speed * -0.5}px)`;
    });
  }, { passive: true });
}

/**
 * Utility: Animated Number Counter
 */
window.animateCountUp = function(element, targetValue, duration = 1200, prefix = '', suffix = '') {
  if (!element) return;
  const start = 0;
  const startTime = performance.now();

  const updateNumber = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(start + (targetValue - start) * easeProgress);

    element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = `${prefix}${targetValue.toLocaleString()}${suffix}`;
    }
  };

  requestAnimationFrame(updateNumber);
};
