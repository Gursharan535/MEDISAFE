// script.js for MediSafe

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Form Submission Handlers
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const resultDiv = form.nextElementSibling;
      if (resultDiv) {
        resultDiv.innerHTML = '<p style="color: #00a896;">Submission successful! Thank you for your input.</p>';
      }
      form.reset();
    });
  });
});