// ================================
// MENU & NAVIGATION
// ================================
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('navOverlay');
const openBtn = document.querySelector('button.nav-toggle.open');
const closeBtn = document.querySelector('button.nav-toggle.close');

function openMenu() {
  navLinks.classList.add('open');
  overlay.classList.add('show');
  openBtn.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  navLinks.classList.remove('open');
  overlay.classList.remove('show');
  openBtn.setAttribute('aria-expanded', 'false');
}

if (openBtn) openBtn.addEventListener('click', openMenu);
if (closeBtn) closeBtn.addEventListener('click', closeMenu);
if (overlay) overlay.addEventListener('click', closeMenu);

if (navLinks) {
  navLinks.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
}

// ================================
// SMOOTH SCROLL
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${id}`);
    }
  });
});

// ================================
// FOOTER YEAR
// ================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ================================
// CONTACT FORM
// ================================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = (document.getElementById('name').value || 'there').split(' ')[0];
    alert(`Thanks, ${name}! Your message has been received.`);
    form.reset();
  });
}

// ================================
// SMOOTH DRAG SLIDER (MOBILE & DESKTOP)
// ================================
function initSliders() {
  const sliders = document.querySelectorAll('.slider-container');
  sliders.forEach(slider => {
    let isDragging = false;
    let startX, scrollLeft;

    // Reset scroll to 0
    slider.scrollLeft = 0;

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      slider.classList.add('dragging');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDragging = false;
      slider.classList.remove('dragging');
    });
    slider.addEventListener('mouseup', () => {
      isDragging = false;
      slider.classList.remove('dragging');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast multiplier
      slider.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('touchend', () => {
      isDragging = false;
    });
    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });

    // Optional: smooth momentum after drag (CSS handles most smoothing)
    slider.style.scrollBehavior = 'smooth';
  });
}

// Initialize sliders on load and resize
window.addEventListener('load', initSliders);
window.addEventListener('resize', () => {
  setTimeout(initSliders, 200);
});
