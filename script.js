const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu');
const nav = document.querySelector('.nav');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Close nav on link click (mobile)
nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});
