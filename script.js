const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const year = document.getElementById('year');

function syncHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 12);
}
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (year) {
  year.textContent = new Date().getFullYear();
}

menuBtn?.addEventListener('click', () => {
  const open = !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuBtn.innerHTML = open ? '<svg><use href="#i-close"/></svg>' : '<svg><use href="#i-menu"/></svg>';
  mobileMenu.setAttribute('aria-hidden', String(!open));
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    menuBtn.innerHTML = '<svg><use href="#i-menu"/></svg>';
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

document.querySelectorAll('.faq-item button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item?.querySelector('.faq-answer');
    const open = item?.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    if (answer) {
      answer.style.maxHeight = open ? `${answer.scrollHeight}px` : '0px';
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
