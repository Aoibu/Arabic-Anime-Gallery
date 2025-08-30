// Nav toggle (mobile)
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Flight form (demo validation)
const flightForm = document.getElementById('flight-form');
const formMsg = document.getElementById('form-message');
if (flightForm) {
  flightForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(flightForm));
    if (!data.from || !data.to || !data.depart) {
      formMsg.textContent = 'رجاءً أكمل الحقول المطلوبة.';
      return;
    }
    // Demo placeholder: Replace this with a real search request to your backend or API.
    formMsg.textContent = `تم البحث: ${data.from} → ${data.to} (${data.depart}${data.return ? ' - ' + data.return : ''}) لعدد ${data.passengers} مسافر/ين.`;
  });
}

// Contact form (demo)
const contactForm = document.getElementById('contact-form');
const contactMsg = document.getElementById('contact-message');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactMsg.textContent = 'تم استلام رسالتك! سنرد عليك قريبًا.';
    contactForm.reset();
  });
}
