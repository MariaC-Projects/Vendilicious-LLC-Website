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

// Contact form submission via FormSubmit
const contactForm = document.forms['contact-form'];

if (contactForm) {
  const statusEl = contactForm.querySelector('.form-status');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!statusEl || !submitBtn) return contactForm.submit();

    statusEl.textContent = 'Sending…';
    statusEl.className = 'form-status';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) throw new Error('Request failed');

      statusEl.textContent = 'Thanks! We received your inquiry and will respond soon.';
      statusEl.classList.add('success');
      contactForm.reset();
    } catch (err) {
      statusEl.textContent = 'Something went wrong. Please email info@vendiliciousllc.com.';
      statusEl.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
      }, 6000);
    }
  });
}
