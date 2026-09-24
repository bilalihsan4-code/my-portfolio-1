/* =========================================================
   BILAL IHSAN — PORTFOLIO SCRIPT
   Vanilla JS only. No dependencies.
   ========================================================= */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function () {
    var pre = document.getElementById('preloader');
    if (!pre) return;
    setTimeout(function () {
      pre.classList.add('hidden');
    }, reducedMotion ? 0 : 350);
  });

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  var navbar = document.getElementById('navbar');
  function handleNavScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    navToggle.classList.add('open');
    navLinks.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.contains('open');
      if (isOpen) closeMenu(); else openMenu();
    });
  }

  var navAnchors = document.querySelectorAll('.nav-links a');
  navAnchors.forEach(function (a) {
    a.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) closeMenu();
    });
  });

  /* ---------- Smooth scroll for in-page links (with navbar offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = 76;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: reducedMotion ? 'auto' : 'smooth' });
      history.pushState(null, '', id);
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navMap = {};
  navAnchors.forEach(function (a) {
    navMap[a.getAttribute('href')] = a;
  });

  function updateActiveLink() {
    var scrollPos = window.scrollY + 120;
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollPos) current = sections[i];
    }
    navAnchors.forEach(function (a) { a.classList.remove('active'); });
    var link = navMap['#' + current.id];
    if (link) link.classList.add('active');
  }
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ---------- Scroll reveal (Intersection Observer) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById('backToTop');
  function handleBackToTop() {
    if (window.scrollY > 480) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }
  handleBackToTop();
  window.addEventListener('scroll', handleBackToTop, { passive: true });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Project filtering ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        var cats = (card.getAttribute('data-category') || '').split(' ');
        var show = filter === 'all' || cats.indexOf(filter) !== -1;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Download CV graceful check ---------- */
  var downloadBtn = document.getElementById('downloadCvBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      // If the CV file hasn't been added yet, fetch will fail silently on file://
      // so we simply let the browser attempt the download / open as normal.
      // Placeholder path is assets/Bilal-Ihsan-CV.pdf — see README for setup.
    });
  }

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  function setError(field, message) {
    var wrapper = field.closest('.field');
    wrapper.classList.toggle('has-error', !!message);
    var errEl = wrapper.querySelector('.err-msg');
    if (errEl) errEl.textContent = message || '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#cf-name');
      var email = form.querySelector('#cf-email');
      var subject = form.querySelector('#cf-subject');
      var message = form.querySelector('#cf-message');

      var valid = true;

      if (!name.value.trim()) { setError(name, 'Please enter your name.'); valid = false; }
      else setError(name, '');

      if (!email.value.trim()) { setError(email, 'Please enter your email.'); valid = false; }
      else if (!isValidEmail(email.value.trim())) { setError(email, 'Please enter a valid email address.'); valid = false; }
      else setError(email, '');

      if (!subject.value.trim()) { setError(subject, 'Please add a subject.'); valid = false; }
      else setError(subject, '');

      if (!message.value.trim()) { setError(message, 'Please write a short message.'); valid = false; }
      else if (message.value.trim().length < 10) { setError(message, 'Message should be at least 10 characters.'); valid = false; }
      else setError(message, '');

      formNote.classList.remove('show', 'success', 'error');

      if (!valid) {
        formNote.textContent = 'Please fix the highlighted fields and try again.';
        formNote.classList.add('show', 'error');
        return;
      }

      // NOTE: this is a frontend-only form. There is no backend or email
      // service wired up, so no message is actually transmitted. Connect
      // this form to an email service (e.g. Formspree, EmailJS) or a
      // backend endpoint to make it fully functional.
      formNote.textContent = 'Thanks for reaching out! This form is not yet connected to an email service, so please email bilalihsan4@gmail.com directly for now.';
      formNote.classList.add('show', 'success');
      form.reset();
    });

    // clear error state as the user types
    form.querySelectorAll('input, textarea').forEach(function (el) {
      el.addEventListener('input', function () { setError(el, ''); });
    });
  }

})();
