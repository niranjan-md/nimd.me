// Set current year for footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const sunIcon = document.querySelector('.sun');
const moonIcon = document.querySelector('.moon');

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.setAttribute('data-theme', 'dark');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'block';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
});

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.project-card, .social-link').forEach(el => {
  observer.observe(el);
});

// Smooth scroll for navigation (kept for accessibility)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});