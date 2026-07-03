/* ══════════════════════════════
   E-COM Planner – JavaScript
══════════════════════════════ */

// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── Scroll-triggered animations (AOS-like) ───
function initAnimations() {
  const targets = document.querySelectorAll('[data-aos]');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

// ─── Lightbox ───
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  img.src = src;
  img.alt = caption;
  cap.textContent = caption;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ─── FAQ accordion ───
function toggleFaq(id) {
  const item = document.getElementById(id);
  const btn  = item.querySelector('.faq-question');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });

  // Toggle clicked
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// ─── Smooth scroll for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// ─── Hero CTA pulse animation on load ───
function pulseHeroCTA() {
  const cta = document.getElementById('hero-btn');
  if (!cta) return;
  setTimeout(() => {
    cta.style.animation = 'ctaPulse 2s ease-in-out 2';
  }, 1500);
}

// Inject CTA pulse keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes ctaPulse {
    0%, 100% { box-shadow: 0 4px 24px rgba(23,201,100,0.35); }
    50%       { box-shadow: 0 4px 48px rgba(23,201,100,0.65), 0 0 0 8px rgba(23,201,100,0.12); }
  }
`;
document.head.appendChild(style);

// ─── Number counter animation ───
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    const duration = 1800;
    const start = performance.now();
    const isFloat = el.getAttribute('data-count').includes('.');

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const value = target * ease;
      el.textContent = isFloat ? value.toFixed(2) : Math.round(value).toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ─── Gallery keyboard support ───
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

// ─── Carousel logic ───
function moveCarousel(direction) {
  const carousel = document.getElementById('preview-carousel');
  if (!carousel) return;
  const scrollAmount = carousel.clientWidth * 0.8;
  carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  pulseHeroCTA();
});
