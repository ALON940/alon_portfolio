document.addEventListener('DOMContentLoaded', () => {
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  const hexagons = document.querySelectorAll('.hive-grid .hexagon');
  const profileMeta = document.querySelector('.profile-meta');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (downloadCvBtn && profileMeta) {
    downloadCvBtn.addEventListener('click', () => {
      profileMeta.textContent = 'Download ready — your CV is coming!';
      setTimeout(() => {
        profileMeta.textContent = 'Download a polished CV and explore a modern blue technology identity.';
      }, 2800);
    });
  }

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const nameValue = formData.get('name')?.toString() || '';
      const emailValue = formData.get('email')?.toString() || '';
      const messageValue = formData.get('message')?.toString() || '';
      const subject = encodeURIComponent('New message from portfolio contact form');
      const body = encodeURIComponent(`Name: ${nameValue}\nEmail: ${emailValue}\n\n${messageValue}`);
      const mailtoLink = `mailto:hello@example.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;
      formStatus.textContent = 'Opening your email client...';
      setTimeout(() => {
        formStatus.textContent = 'If your mail app did not open, please send an email to hello@example.com.';
      }, 4000);
    });
  }

  if (hexagons.length) {
    document.addEventListener('mousemove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      hexagons.forEach((hex, index) => {
        const sign = index % 2 === 0 ? 1 : -1;
        hex.style.transform = `translate3d(${x * sign}px, ${y * sign}px, 0)`;
      });
    });
  }
});

// Send visit data to a Google Apps Script endpoint for private tracking
const VISIT_WEBHOOK_URL ='https://script.google.com/macros/s/AKfycbw7IV5yxaZLOj_vONoZ7pIDas_uPmizbZfXsWjLSjf8HmrGdDZ25yKRzzliQNNgwlTk/exec'; // paste your Apps Script web app URL here

async function reportVisitToSheet() {

  if (!VISIT_WEBHOOK_URL) return;

  try {

    const ipData = await fetch('https://ipapi.co/json/')
      .then(response => response.json());

    const payload = {
      timestamp: new Date().toISOString(),
      ip: ipData.ip || '',
      country: ipData.country_name || '',
      city: ipData.city || '',
      page: window.location.pathname,
      url: window.location.href,
      userAgent: navigator.userAgent,
      language: navigator.language || navigator.userLanguage,
      referrer: document.referrer || null,
    };

    fetch(VISIT_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(payload),
    }).catch(() => {});

  } catch (error) {
    console.error('Tracking error:', error);
  }
}

// Run on DOM ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(reportVisitToSheet, 800);
} else {
  document.addEventListener('DOMContentLoaded', reportVisitToSheet);
}
