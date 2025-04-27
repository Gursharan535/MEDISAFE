/**
 * MediSafe Website - Main JavaScript file
 * Contains functionality for site interactions and animations
 */

// Wait for document to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize loading screen
  handleLoadingScreen();
  
  // Initialize mobile menu toggle
  initMobileMenu();
  
  // Create particle background effect
  createParticles();
  
  // Handle form submissions
  initFormHandlers();
  
  // Add scroll animations
  initScrollAnimations();
});

/**
 * Handle the loading screen animation
 */
function handleLoadingScreen() {
  // Hide loading screen after page has loaded
  setTimeout(function() {
    const loadingScreen = document.querySelector('.loading');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }, 800);
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      document.querySelector('.nav-links').classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = event.target.closest('.nav-links') || event.target.closest('#mobile-menu');
      if (!isClickInsideMenu && document.querySelector('.nav-links.active')) {
        document.querySelector('.nav-links').classList.remove('active');
      }
    });
  }
}

/**
 * Create particles for the background animation
 */
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particlesCount = 20;
  
  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position, size and delay
    const size = Math.random() * 15 + 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    
    particlesContainer.appendChild(particle);
  }
}

/**
 * Initialize form submission handlers
 */
function initFormHandlers() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Simple validation
      const isValid = validateForm(form);
      
      if (isValid) {
        // Show success message
        showMessage('Your request has been submitted successfully! We will contact you soon.', 'success', form);
        
        // Reset form
        form.reset();
      }
    });
  });
}

/**
 * Validate form fields
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    if (input.required && !input.value.trim()) {
      input.style.borderColor = '#ff3860';
      isValid = false;
    } else {
      input.style.borderColor = '';
    }
    
    // Add input event to clear error on typing
    input.addEventListener('input', function() {
      this.style.borderColor = '';
    });
  });
  
  if (!isValid) {
    showMessage('Please fill in all required fields.', 'error', form);
  }
  
  return isValid;
}

/**
 * Show a message after form submission
 * @param {string} text - Message text
 * @param {string} type - Message type ('success' or 'error')
 * @param {HTMLFormElement} form - The form element
 */
function showMessage(text, type, form) {
  // Find the message element after the form
  const messageElement = form.nextElementSibling;
  if (messageElement && messageElement.id === 'message') {
    messageElement.textContent = text;
    messageElement.className = type;
    messageElement.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000);
  }
}

/**
 * Initialize scroll animations for elements
 */
function initScrollAnimations() {
  // Animate elements when they come into view
  const animateElements = document.querySelectorAll('.feature-card, section');
  
  // Create observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe each element
  animateElements.forEach(element => {
    observer.observe(element);
  });
}