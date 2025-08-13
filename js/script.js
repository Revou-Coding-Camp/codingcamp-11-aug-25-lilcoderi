// Greeting fill functionality
const inputName = document.getElementById('input-name');
const fillBtn = document.getElementById('fill-name');
const greeting = document.getElementById('greeting');

function updateGreeting(name) {
  const n = (name || '').trim();
  greeting.textContent = n
    ? `Hi ${n}, Welcome to Little Coder!`
    : 'Hi —, Welcome to Little Coder!';
}

fillBtn?.addEventListener('click', () => {
  updateGreeting(inputName.value);
});

updateGreeting(inputName.value);

// Current time display (updates every second)
const timeEl = document.getElementById('current-time');
function refreshTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, 
  };
  timeEl.textContent = now.toLocaleDateString('en-US', options);
}
setInterval(refreshTime, 1000);
refreshTime();

// Navbar sticky and Scrollspy functionality
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.navbar .nav-link');

function handleScroll() {
  if (window.scrollY > 10) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }

  let currentSection = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navbar.offsetHeight - 50;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);
handleScroll();

// Form handling and validation
const form = document.getElementById('contact-form');
const out = document.getElementById('submitted-values');

form?.addEventListener('submit', (e) => {
  e.preventDefault(); 

  // Clear previous error messages
  ['name', 'email', 'phone', 'message'].forEach((id) => {
    const err = document.getElementById(`${id}-error`);
    if (err) err.textContent = '';
  });

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true; 

  // Validate Name
  if (!name) {
    document.getElementById('name-error').textContent = 'Full name is required.';
    valid = false;
  }

  // Validate Email
  if (!email) {
    document.getElementById('email-error').textContent = 'Email address is required.';
    valid = false;
  } else if (!isValidEmail(email)) {
    document.getElementById('email-error').textContent =
      'Invalid email format.';
    valid = false;
  }

  // Validate Phone
  if (phone && !isValidPhone(phone)) {
    document.getElementById('phone-error').textContent =
      'Invalid phone number format.';
    valid = false;
  }

  // Validate Message
  if (!message) {
    document.getElementById('message-error').textContent = 'A message is required.';
    valid = false;
  }

  if (!valid) {
    return;
  }

  out.innerHTML = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || '-')}</p>
    <p><strong>Message:</strong> ${escapeHtml(message)}</p>
  `;

  updateGreeting(name);

  form.reset();
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+]+$/; 
  return phoneRegex.test(phone);
}

function escapeHtml(unsafe) {
  return (unsafe || '')
    .toString()
    .replace(/[&<>"']/g, function (m) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[m];
    });
}

/* Scroll Animation Functionality */
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '0px 0px -100px 0px',
  threshold: 0.1 
});

animatedElements.forEach(element => {
  observer.observe(element);
});