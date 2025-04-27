// index.js for MediSafe

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  // Mobile Menu Toggle with Animation
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navLinks.style.transition = 'all 0.5s ease';
  });

  // Particle Animation Background
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particlesContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 10000);
  }

  for (let i = 0; i < 50; i++) createParticle();
  setInterval(createParticle, 200);

  // Rotating Banner for Home Page (Enhanced with Modal)
  const heroImages = ['img/home-banner.jpg', 'img/doctor.jpg', 'img/medicine.jpg'];
  let currentImageIndex = 0;
  const heroImage = document.querySelector('.hero-image');

  if (heroImage) {
    setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % heroImages.length;
      heroImage.src = heroImages[currentImageIndex];
      heroImage.style.opacity = 0;
      setTimeout(() => (heroImage.style.opacity = 1), 50);
    }, 5000);

    // Modal for Appointment Booking
    const bookButton = document.querySelector('button');
    if (bookButton) {
      bookButton.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1001;">
            <div style="background: white; padding: 20px; border-radius: 10px; max-width: 400px; text-align: center;">
              <h3>Book Appointment</h3>
              <input type="text" placeholder="Your Name" style="width: 90%; margin: 10px 0; padding: 10px;">
              <input type="email" placeholder="Your Email" style="width: 90%; margin: 10px 0; padding: 10px;">
              <input type="text" placeholder="Symptoms" style="width: 90%; margin: 10px 0; padding: 10px;">
              <button onclick="this.parentElement.parentElement.remove()" style="padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 5px;">Confirm</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      });
    }
  }

  // Form Handling with Creative Feedback and Sound
  const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const messageDiv = form.nextElementSibling || document.getElementById('message');
      if (messageDiv) {
        form.classList.add('submitted');
        audio.play();
        messageDiv.textContent = 'Processing...';
        messageDiv.style.background = '#f1c40f';
        messageDiv.style.transition = 'all 0.5s';

        setTimeout(() => {
          messageDiv.textContent = 'Submission successful! 🎉';
          messageDiv.style.background = '#27ae60';
          messageDiv.style.color = 'white';
          form.reset();
          setTimeout(() => form.classList.remove('submitted'), 1000);
        }, 1000);
      }
    });
  });

  // Sign-In Specific Validation (Demo)
  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const messageDiv = document.getElementById('signinMessage');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        messageDiv.textContent = 'Invalid email! 😕';
        messageDiv.style.color = '#e74c3c';
        return;
      }
      if (password.length < 6) {
        messageDiv.textContent = 'Password too short! 🔒';
        messageDiv.style.color = '#e74c3c';
        return;
      }

      if (email === 'user@medisafe.com' && password === 'password123') {
        messageDiv.textContent = 'Welcome back! 🚀 Redirecting...';
        messageDiv.style.color = '#27ae60';
        audio.play();
        setTimeout(() => (window.location.href = 'index.html'), 2000);
      } else {
        messageDiv.textContent = 'Wrong credentials! ❌ Try again.';
        messageDiv.style.color = '#e74c3c';
      }
    });
  }

  // Sign-Up Form Validation (Demo)
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const messageDiv = document.getElementById('signupMessage');

      if (!name || !email || !password) {
        messageDiv.textContent = 'All fields are required! 😟';
        messageDiv.style.color = '#e74c3c';
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        messageDiv.textContent = 'Invalid email! 😕';
        messageDiv.style.color = '#e74c3c';
        return;
      }
      if (password.length < 6) {
        messageDiv.textContent = 'Password too short! 🔒';
        messageDiv.style.color = '#e74c3c';
        return;
      }

      messageDiv.textContent = 'Account created! 🎉 Redirecting...';
      messageDiv.style.color = '#27ae60';
      audio.play();
      setTimeout(() => (window.location.href = 'signin.html'), 2000);
    });
  }

  // Search Bar for Alternatives (Enhanced with Debouncing, Highlighting, and No Results Message)
  const searchInput = document.querySelector('#searchInput');
  const alternativesSection = document.querySelector('.alternatives');
  const alternativesList = document.querySelector('.alternatives ul');

  if (searchInput && alternativesList && alternativesSection) {
    // Create a "No results" message element
    const noResultsMessage = document.createElement('p');
    noResultsMessage.id = 'noResultsMessage';
    noResultsMessage.style.color = '#e74c3c';
    noResultsMessage.style.display = 'none';
    noResultsMessage.textContent = 'No results found. Try a different search term. 🔍';
    alternativesSection.appendChild(noResultsMessage);

    // Debounce function to limit search frequency
    let debounceTimeout;
    const debounceSearch = (callback, delay) => {
      return (...args) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => callback(...args), delay);
      };
    };

    // Search functionality with highlighting
    const performSearch = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const items = alternativesList.querySelectorAll('li');
      let hasResults = false;

      items.forEach(item => {
        const originalText = item.textContent;
        const text = originalText.toLowerCase();

        if (text.includes(searchTerm)) {
          hasResults = true;
          item.style.display = ''; // Restore default display (list-item)
          
          // Highlight matching text
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          item.innerHTML = originalText.replace(regex, '<span style="background: #f1c40f; color: #2c3e50;">$1</span>');
        } else {
          item.style.display = 'none';
          item.innerHTML = originalText; // Reset highlighting
        }
      });

      // Show/hide "No results" message
      noResultsMessage.style.display = hasResults ? 'none' : 'block';
    };

    // Attach debounced search to input event
    searchInput.addEventListener('input', debounceSearch(performSearch, 300));
  }

  // Clickable Remedy Cards
  const remedyItems = document.querySelectorAll('.remedies ul li');
  if (remedyItems) {
    remedyItems.forEach(item => {
      item.addEventListener('click', () => {
        alert(`More info: ${item.textContent} - Consult a doctor for details!`);
      });
    });
  }
});