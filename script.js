// ===== THEME =====
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDark = saved ? saved === 'dark' : prefersDark;

function applyTheme() {
  if (isDark) { html.classList.add('dark-theme'); themeBtn.textContent = '☀️'; }
  else { html.classList.remove('dark-theme'); themeBtn.textContent = '🌙'; }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
applyTheme();
themeBtn.addEventListener('click', () => { isDark = !isDark; applyTheme(); });

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => nav.classList.toggle('nav-open'));
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('nav-open'));
});

// ===== TYPING ANIMATION =====
const words = ['Frontend Developer', 'Web Designer', 'AI Enthusiast'];
let wordIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = words[wordIndex % words.length];
  typedEl.textContent = deleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
  let speed = deleting ? 30 : 150;
  if (!deleting && charIndex === current.length + 1) { deleting = true; speed = 500; }
  else if (deleting && charIndex === 0) { deleting = false; wordIndex++; speed = 200; }
  setTimeout(type, speed);
}
type();

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== SKILLS =====
const skillsData = {
  frontend: [
    { name: 'HTML5', level: 90, icon: '🌐' },
    { name: 'CSS3', level: 85, icon: '🎨' },
    { name: 'JavaScript', level: 80, icon: '⚡' },
    { name: 'React', level: 75, icon: '⚛️' },
    { name: 'Responsive Design', level: 88, icon: '📱' },
    { name: 'Sass/SCSS', level: 70, icon: '💅' }
  ],
  tools: [
    { name: 'Git & GitHub', level: 75, icon: '🔧' },
    { name: 'VS Code', level: 90, icon: '💻' },
    { name: 'Vite', level: 70, icon: '⚡' },
    { name: 'npm/yarn', level: 80, icon: '📦' },
    { name: 'Chrome DevTools', level: 85, icon: '🔍' },
    { name: 'Figma', level: 65, icon: '🎯' }
  ],
  soft: [
    { name: 'Problem Solving', level: 85, icon: '🧩' },
    { name: 'Communication', level: 80, icon: '💬' },
    { name: 'Team Work', level: 88, icon: '👥' },
    { name: 'Time Management', level: 82, icon: '⏰' },
    { name: 'Creativity', level: 90, icon: '💡' },
    { name: 'Adaptability', level: 85, icon: '🔄' }
  ]
};

function renderSkills(category) {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = skillsData[category].map(s => `
    <div class="skill-card">
      <div class="skill-header">
        <span class="skill-icon">${s.icon}</span>
        <h3>${s.name}</h3>
      </div>
      <div class="skill-progress">
        <div class="progress-bar"><div class="progress-fill" style="width:0%" data-width="${s.level}%"></div></div>
        <span class="skill-percentage">${s.level}%</span>
      </div>
    </div>`).join('');
  requestAnimationFrame(() => {
    document.querySelectorAll('.progress-fill').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  });
}
renderSkills('frontend');
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSkills(btn.dataset.category);
  });
});

// ===== PROJECTS =====
const projects = [
  {
    title: 'E-Commerce Shop App',
    description: 'A full-featured e-commerce shopping application with product listings, cart management, and a smooth checkout experience.',
    image: 'assets/ecommerce.jpg',
    technologies: ['React', 'JavaScript', 'CSS3', 'LocalStorage'],
    category: 'react',
    github: 'https://github.com/megersa93/Ecommerce-shop-app',
    live: 'https://megersa93.github.io/ecommerce-shop-app'
  },
  {
    title: 'Restaurant Landing Page',
    description: 'A beautiful restaurant landing page built with vanilla JavaScript, featuring smooth animations, interactive menu, and a fully responsive layout.',
    image: 'assets/food.jpg',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Responsive'],
    category: 'javascript',
    github: 'https://github.com/megersa93/Resturant_land-by-javascript',
    live: 'https://megersa93.github.io/restaurant-landing'
  },
  {
    title: 'Weather App',
    description: 'A responsive weather application built with JavaScript that fetches real-time weather data, displays forecasts, and features a clean animated UI.',
    image: 'assets/weather.jpg',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Weather API'],
    category: 'javascript',
    github: 'https://github.com/megersa93/Weather-App-by-Javascript',
    live: 'https://megersa93.github.io/weather-app'
  },
  {
    title: 'Online Platform',
    description: 'A modern online platform with user-friendly interface, dynamic content management, and interactive features for an engaging user experience.',
    image: 'assets/learning-education.jpg',
    technologies: ['React', 'JavaScript', 'CSS3', 'API'],
    category: 'react',
    github: 'https://github.com/megersa93/Online-learning-platform',
    live: 'https://megersa93.github.io/online-platform'
  }
];

function renderProjects(filter) {
  const grid = document.getElementById('projectsGrid');
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="project-card">
      <div class="project-image">
        <img src="${p.image}" alt="${p.title}" class="project-img"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="image-placeholder"><span>Project Image</span></div>
        <div class="project-overlay">
          <a href="${p.github}" class="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="${p.live}" class="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>
        </div>
      </div>
      <div class="project-content">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-technologies">
          ${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>`).join('');
}
renderProjects('all');
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

// ===== CONTACT FORM =====
emailjs.init('rcfZ5LW7cByuqiXay');
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const msgEl = document.getElementById('submitMessage');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  const data = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };
  emailjs.send('service_bwy0b9c', 'template_hya959s', data)
    .then(() => {
      msgEl.textContent = 'Message sent successfully! ✅';
      msgEl.className = 'submit-message';
      msgEl.style.display = 'block';
      form.reset();
      setTimeout(() => { msgEl.style.display = 'none'; }, 5000);
    })
    .catch(() => {
      msgEl.textContent = 'Failed to send message ❌';
      msgEl.className = 'submit-message error';
      msgEl.style.display = 'block';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
});
