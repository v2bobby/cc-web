/* ================================================================
   XCurve AI — shared.js v2
   ================================================================ */
'use strict';

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Arm reveal animations ──────────────────────────────────────
   Content is visible by default in CSS. Only once we know JS is
   running AND IntersectionObserver exists do we add .js-armed to
   <html>, which switches .reveal elements to their animated state.
   This guarantees content is never hidden by a JS failure.       */
(function armReveal() {
  if (!('IntersectionObserver' in window)) return; // stay visible, no animation
  document.documentElement.classList.add('js-armed');

  const els = $$('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el, i) => {
    el.style.transitionDelay = ((i % 6) * 60) + 'ms';
    io.observe(el);
  });

  // Fail-safe: if for any reason elements haven't revealed within
  // 2.5s (e.g. observer edge case, layout thrash), force them visible.
  setTimeout(() => {
    $$('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 2500);
})();

/* ── Navbar ─────────────────────────────────────────────────── */
(function navbar() {
  const nav    = $('#nav');
  const burger = $('#nav-burger');
  const links  = $('#nav-links');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('nav--scrolled', scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    links?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  $$('#nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('open');
      links?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // mark active link by pathname
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('#nav-links a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('is-active');
  });
})();

/* ── Animated counters ──────────────────────────────────────── */
(function counters() {
  const els = $$('[data-count]');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    // fallback: just render final values immediately
    els.forEach(el => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      el.textContent = prefix + target.toLocaleString() + suffix;
    });
    return;
  }

  els.forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    let started = false;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const dur = 1400;
      let t0;
      function step(now) {
        if (!t0) t0 = now;
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.floor(eased * target).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.disconnect();
    }, { threshold: .5 });
    io.observe(el);
  });
})();

/* ── Waitlist form (Coming Soon — no real signups) ─────────────*/
(function waitlist() {
  const form    = $('#waitlist-form');
  const input   = $('#waitlist-email');
  const success = $('#waitlist-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      input.classList.add('input--error');
      input.focus();
      setTimeout(() => input.classList.remove('input--error'), 1800);
      return;
    }
    form.style.transition = 'opacity .25s ease, transform .25s ease';
    form.style.opacity = '0';
    form.style.transform = 'translateY(-6px)';
    form.style.pointerEvents = 'none';
    setTimeout(() => {
      form.style.display = 'none';
      if (success) {
        success.style.display = 'flex';
        requestAnimationFrame(() => success.classList.add('show'));
      }
    }, 250);
  });
})();

/* ── Smooth scroll for in-page anchors ─────────────────────────*/
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const t = document.querySelector(href);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── Magnetic hover for primary buttons (subtle, premium touch) ─*/
(function magneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch
  $$('.btn--teal, .btn--primary, .btn--gold').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .15;
      const y = (e.clientY - r.top - r.height / 2) * .25;
      btn.style.transform = `translate(${x}px, ${y - 2}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();
