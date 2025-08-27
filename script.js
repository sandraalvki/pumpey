// Modern JavaScript for PUMPEY website
(function () {
  'use strict';

  // DOM elements
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  const year = document.getElementById('year');
  const form = document.querySelector('.cta-form');
  const emailInput = document.getElementById('email');

  // Navigation toggle
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      
      // Animate hamburger menu
      const spans = toggle.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Set current year
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // Enhanced form handling
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      if (!emailInput || !emailInput.value.trim()) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }

      const email = emailInput.value.trim();
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }

      // Simulate form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="2" stroke-dasharray="44" stroke-dashoffset="44" stroke-linecap="round"/>
        </svg>
        <span>Submitting...</span>
      `;
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        showNotification('Thanks! You\'re on the list.', 'success');
        emailInput.value = '';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span class="notification-message">${message}</span>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: ${type === 'success' ? 'var(--green-100)' : type === 'error' ? 'var(--destructive)' : 'var(--gray-100)'};
      color: ${type === 'success' ? 'var(--green-800)' : type === 'error' ? 'var(--white)' : 'var(--gray-800)'};
      border: 1px solid ${type === 'success' ? 'var(--green-200)' : type === 'error' ? 'var(--destructive)' : 'var(--gray-200)'};
      border-radius: var(--radius);
      padding: 1rem 1.5rem;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      max-width: 24rem;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 2rem;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.feature-card, .roadmap-item, .about-grid > div').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(2rem)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add animation class
  document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
  });

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .notification-icon {
      font-weight: bold;
      font-size: 1.125rem;
    }
    
    .notification-message {
      font-weight: 500;
    }
    
    body.loaded .hero-card {
      animation-delay: 0.5s;
    }
  `;
  document.head.appendChild(style);

  // Parallax effect for hero section
  let ticking = false;
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);

  // Add loading animation
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

})();


