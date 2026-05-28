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
