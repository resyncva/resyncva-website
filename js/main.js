// Resync VA — Main JavaScript
// Add your custom scripts here

// Mobile nav — side drawer
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  navLinks.classList.add('open');
  navOverlay.classList.add('open');
  navToggle.innerHTML = '&#10005;';
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  navOverlay.classList.remove('open');
  navToggle.innerHTML = '&#9776;';
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Scroll fade-in — individual elements with stagger
const FADE_SELECTORS = [
  '.tag', '.heading', '.subtext',
  '.service-card', '.how-step', '.who-card',
  '.trust-label', '.trust-items',
  '.staffing-card',
  '.testi-card', '.faq-item', '.faq-cta-head', '.faq-cta-body', '.faq-cta .btn-dark',
  '.about-left', '.about-right', '.pricing-card',
  '.hero-badge', '.hero-headline', '.hero-sub', '.hero-cta', '.hero-visual',
  '.who-nudge'
].join(', ');

const FADE_DURATION = 700; // ms — match this with the CSS transition duration
const STAGGER = 120;       // ms between siblings

const allEls = document.querySelectorAll(FADE_SELECTORS);

// Pre-calculate stagger delay and apply inline transition so it always wins
allEls.forEach(el => {
  el.classList.add('fade-item');
  el.style.transition = `opacity ${FADE_DURATION}ms ease, transform ${FADE_DURATION}ms ease`;
  const siblings = Array.from(el.parentElement.children).filter(c => c.matches(FADE_SELECTORS));
  el.dataset.fadeDelay = siblings.indexOf(el) * STAGGER;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    observer.unobserve(entry.target);
    const el = entry.target;
    const delay = parseInt(el.dataset.fadeDelay) || 0;
    setTimeout(() => {
      el.classList.add('visible');
      // Restore the element's natural CSS transition after fade completes
      setTimeout(() => { el.style.transition = ''; }, FADE_DURATION);
    }, delay);
  });
}, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

allEls.forEach(el => observer.observe(el));
