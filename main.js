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

  // ---------- Projects slider arrows ----------
  // The grid is 2-up on desktop, 1-up on mobile; arrows scroll the grid horizontally on mobile.
  const grid = document.getElementById('projGrid');
  const prevBtn = document.getElementById('projPrev');
  const nextBtn = document.getElementById('projNext');

  if (grid && prevBtn && nextBtn) {
    const scrollByCard = (dir) => {
      const card = grid.querySelector('.project-card');
      if (!card) return;
      const distance = card.getBoundingClientRect().width + 32; // gap
      grid.scrollBy({ left: dir * distance, behavior: 'smooth' });
    };

    prevBtn.addEventListener('click', () => scrollByCard(-1));
    nextBtn.addEventListener('click', () => scrollByCard(1));
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
