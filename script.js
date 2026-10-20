/**
 * =====================================================================
 * FIDELITY MEDIA — SITE CONFIGURATION BLOCK
 * =====================================================================
 * Edit all proof statistics, platform links, and contact options here.
 * The animated counters, proof cards, and modal links will update
 * across the site based on these values.
 */
const FIDELITY_CONFIG = {
  // PROOF NUMBERS (Only confirmed business facts)
  stats: {
    postsPublished: {
      count: 10863,
      suffix: "+",
      label: "Posts Published",
      detail: "1.84% avg engagement rate verified in dashboard analytics"
    },
    totalViews: {
      count: 4,
      isDecimal: false,
      suffix: "B+",
      label: "Views Across Network",
      detail: "4B+ cumulative views generated across managed creator channels"
    },
    averageVideoViews: {
      count: 175202,
      suffix: "",
      label: "Average Video Views",
      detail: "Documented average video reach baseline across distributed clips"
    },
    // The prompt explicitly states:
    // "[TODO: add 5B+ views / 5K+ fan pages ONLY if I confirm I have a dashboard that proves it. Until then, leave them out.]"
    enterpriseProofPending: {
      isPending: true,
      label: "Large-Scale Distribution",
      tag: "[TODO: Pending Proof]",
      detail: "[TODO: add 5B+ views / 5K+ fan pages ONLY if I confirm I have a dashboard that proves it. Until then, leave them out.]"
    }
  },

  // CASE STUDY REAL EXAMPLE (images/case-1.jpg)
  caseStudy: {
    views: 175202,
    date: "Oct 14",
    caption: "A benchmark video documenting an average video reach of 175,202 views with a steep retention-driven growth curve. High viewer watch time enabled algorithmic distribution across target audience segments with zero paid advertising.",
    imagePath: "images/case-1.jpg"
  },

  // BOOKING & CONTACT INFO
  booking: {
    callDuration: "30 minutes",
    calendlyUrl: "https://calendly.com/fidelitymedia",
    whatsAppNumber: "+1234567890",      // [TODO: WhatsApp phone number]
    whatsAppMessage: "Hi Fidelity Media, I would like to schedule a call about short-form content distribution.",
    email: "fidelitymediaa@gmail.com"
  },

  // SOCIAL HANDLES & PLATFORMS
  social: {
    instagram: "https://instagram.com/rizzscaledd",
    instagramHandle: "@rizzscaledd",
    email: "fidelitymediaa@gmail.com",
    tiktok: "https://tiktok.com",       // [TODO: TikTok handle]
    youtube: "https://youtube.com",     // [TODO: YouTube Shorts]
    x: "https://x.com"                  // [TODO: X handle]
  }
};

/* =====================================================================
   APPLET INITIALIZATION & INTERACTIVITY
   Clean, vanilla JS without external dependencies or build step.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initStatsRollup();
  initFaqAccordion();
  initBookingModal();
  initMobileNav();
  initScrollReveals();
  initResultsShowcase();
});

/**
 * 1. Dark / Light Mode Switch
 * Persists user preference in localStorage; defaults to dark theme.
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('fidelity_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('fidelity_theme', nextTheme);
    updateThemeIcon(nextTheme);
  });
}

function updateThemeIcon(theme) {
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  if (sunIcon && moonIcon) {
    if (theme === 'light') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }
}

/**
 * 2. Animated Stats Counters
 * Roll up from 0 to target number when scrolled into view.
 */
function initStatsRollup() {
  const statElements = document.querySelectorAll('[data-counter-target]');
  if (!statElements.length) return;

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseFloat(el.getAttribute('data-counter-target') || '0');
        const isDecimal = el.getAttribute('data-is-decimal') === 'true';
        const suffix = el.getAttribute('data-suffix') || '';

        if (prefersReduced) {
          el.textContent = (isDecimal ? targetValue.toFixed(1) : formatNumber(targetValue)) + suffix;
        } else {
          animateCounter(el, targetValue, isDecimal, suffix, 1600);
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  statElements.forEach(el => observer.observe(el));
}

function animateCounter(el, target, isDecimal, suffix, duration) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Smooth ease-out curve (cubic-bezier(0.16, 1, 0.3, 1))
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = start + (target - start) * easeOut;

    if (isDecimal) {
      el.textContent = currentVal.toFixed(1) + suffix;
    } else {
      el.textContent = formatNumber(Math.floor(currentVal)) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = (isDecimal ? target.toFixed(1) : formatNumber(target)) + suffix;
    }
  }

  requestAnimationFrame(update);
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 3. FAQ Accordion
 * Accessible accordion with smooth expanding/collapsing.
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items for a clean single-open behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked item
      if (isOpen) {
        item.classList.remove('open');
        content.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 4. Interactive Consultation Booking Modal
 * Direct Calendly, WhatsApp, or instant inquiry.
 */
function initBookingModal() {
  const modalOverlay = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const bookTriggers = document.querySelectorAll('[data-action="book-call"]');
  const calendlyAction = document.getElementById('modal-calendly-btn');
  const whatsappAction = document.getElementById('modal-whatsapp-btn');
  const inquiryForm = document.getElementById('modal-inquiry-form');
  const successBanner = document.getElementById('modal-success-banner');

  if (!modalOverlay) return;

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (successBanner) successBanner.classList.remove('active');
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  bookTriggers.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close when clicking backdrop
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Connect Calendly link
  if (calendlyAction) {
    calendlyAction.addEventListener('click', () => {
      const url = FIDELITY_CONFIG.booking.calendlyUrl;
      if (url) calendlyAction.setAttribute('href', url);
    });
  }

  // Connect WhatsApp button
  if (whatsappAction) {
    whatsappAction.addEventListener('click', () => {
      const num = FIDELITY_CONFIG.booking.whatsAppNumber.replace(/[^0-9]/g, '');
      const text = encodeURIComponent(FIDELITY_CONFIG.booking.whatsAppMessage);
      const url = `https://wa.me/${num}?text=${text}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // Inquiry form submission handler
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      // Show instant confirmation
      if (successBanner) {
        successBanner.classList.add('active');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      inquiryForm.reset();
    });
  }
}

/**
 * 5. Mobile Menu Toggle
 */
function initMobileNav() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const menu = document.getElementById('mobile-nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    const isExpanded = menu.classList.contains('active');
    toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  });

  // Close mobile nav on link click
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 6. Smooth Scroll Reveal on Enter
 */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

/**
 * 7. Interactive Results Showcase & Lightbox
 * Handles tab filtering, video hover previews, and full media lightbox.
 */
function initResultsShowcase() {
  const filterBtns = document.querySelectorAll('.results-filter-btn');
  const showcaseCards = document.querySelectorAll('.showcase-card');
  const lightbox = document.getElementById('media-lightbox');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxMedia = document.getElementById('lightbox-media-container');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxMetric = document.getElementById('lightbox-metric');

  // Filter tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';
      showcaseCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Hover video autoplay preview for showcase cards
  showcaseCards.forEach(card => {
    const video = card.querySelector('video');
    if (video) {
      card.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });
      card.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });

  // Lightbox opener function
  function openLightbox(src, type, title, metric) {
    if (!lightbox || !lightboxMedia) return;

    lightboxMedia.innerHTML = '';
    if (type === 'video' || (src && src.endsWith('.mp4'))) {
      const vid = document.createElement('video');
      vid.src = src;
      vid.controls = true;
      vid.autoplay = true;
      vid.playsInline = true;
      vid.style.maxWidth = '100%';
      vid.style.maxHeight = '70vh';
      lightboxMedia.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title || 'Preview';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '70vh';
      img.style.objectFit = 'contain';
      lightboxMedia.appendChild(img);
    }

    if (lightboxTitle) lightboxTitle.textContent = title || 'Verified Performance';
    if (lightboxMetric) lightboxMetric.textContent = metric || 'Documented Reach';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lightboxMedia) {
      // Pause any running audio
      const vid = lightboxMedia.querySelector('video');
      if (vid) vid.pause();
      lightboxMedia.innerHTML = '';
    }
  }

  // Bind clicks on all showcase cards
  showcaseCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      const cat = card.getAttribute('data-category');
      const title = card.getAttribute('data-title');
      const metric = card.getAttribute('data-metric');
      openLightbox(src, cat, title, metric);
    });
  });

  // Bind clicks on marquee cards with data-src
  const marqueeCards = document.querySelectorAll('.marquee-card[data-src]');
  marqueeCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      const type = card.getAttribute('data-type');
      const title = card.getAttribute('data-title');
      const metric = card.getAttribute('data-metric');
      openLightbox(src, type, title, metric);
    });
  });

  // Bind clicks on case study proof cards
  const caseProofCards = document.querySelectorAll('.case-proof-card[data-src]');
  caseProofCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      const title = card.getAttribute('data-title');
      const metric = card.getAttribute('data-metric');
      openLightbox(src, 'image', title, metric);
    });
  });

  // Close triggers
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}
