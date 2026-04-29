/* =====================================================
   PETR NOHEL — main.js
   - Sticky nav blur on scroll
   - Mobile menu toggle
   - IntersectionObserver-based reveal animations
   - Project slider arrows (horizontal scroll)
   ===================================================== */

(function () {
  'use strict';

  // ---------- Nav scroll state ----------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
  const toggle = document.getElementById('navToggle');
  const navInner = document.querySelector('.nav__inner');

  if (toggle && navInner) {
    toggle.addEventListener('click', () => {
      const open = navInner.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close menu when clicking a link
    navInner.querySelectorAll('.nav__links a').forEach(link => {
      link.addEventListener('click', () => {
        navInner.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // ---------- Projects carousel ----------
  // Slides the grid via transform. Works at any number of projects.
  // Desktop: 2 cards visible per "page". Mobile: 1 card per page.
  const grid = document.getElementById('projGrid');
  const prevBtn = document.getElementById('projPrev');
  const nextBtn = document.getElementById('projNext');
  const dotsEl = document.getElementById('projDots');

  if (grid && prevBtn && nextBtn && dotsEl) {
    const cards = Array.from(grid.querySelectorAll('.project-card'));
    let currentIndex = 0;

    const getVisibleCount = () => (window.innerWidth <= 1024 ? 1 : 2);
    const getPageCount = () => Math.max(1, cards.length - getVisibleCount() + 1);

    const buildDots = () => {
      dotsEl.innerHTML = '';
      const pages = getPageCount();
      // Hide the dots container entirely if there's nothing to navigate
      if (pages <= 1) {
        dotsEl.style.display = 'none';
        return;
      }
      dotsEl.style.display = 'flex';
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.className = 'projects__dot' + (i === currentIndex ? ' is-active' : '');
        dot.setAttribute('aria-label', `Go to project ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
      }
    };

    const updateView = () => {
      const visible = getVisibleCount();
      const cardWidth = grid.querySelector('.project-card').getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(grid).columnGap) || 32;
      const offset = currentIndex * (cardWidth + gap);
      grid.style.transform = `translateX(-${offset}px)`;

      // Update arrow disabled states
      const atStart = currentIndex === 0;
      const atEnd = currentIndex >= cards.length - visible;
      prevBtn.setAttribute('aria-disabled', atStart);
      nextBtn.setAttribute('aria-disabled', atEnd);

      // Update active dot
      Array.from(dotsEl.children).forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentIndex);
      });
    };

    const goTo = (index) => {
      const maxIndex = cards.length - getVisibleCount();
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateView();
    };

    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    // Rebuild on resize so mobile/desktop transitions stay correct
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Clamp index in case viewport got narrower and current is beyond max
        const maxIndex = Math.max(0, cards.length - getVisibleCount());
        currentIndex = Math.min(currentIndex, maxIndex);
        buildDots();
        updateView();
      }, 120);
    });

    buildDots();
    updateView();
  }

  // ---------- Smooth-scroll offset for fixed nav ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
