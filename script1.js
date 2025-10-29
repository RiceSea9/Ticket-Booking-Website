const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const valuesGrid = document.getElementById('values-grid');
const contactForm = document.getElementById('contact-form');

// Theme Toggle
const toggleTheme = () => {
  document.body.classList.toggle('dark-mode');
  const dark = document.body.classList.contains('dark-mode');
  themeIcon.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
};
const loadTheme = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  }
};

// Fetch Helper (API)
const fetchData = async endpoint => {
  try {
    const res = await fetch(`http://localhost:3000/${endpoint}`);
    return await res.json();
  } catch (err) {
    console.error(`Error loading ${endpoint}:`, err);
    return [];
  }
};

// Load Core Values
const loadValues = async () => {
  const data = await fetchData('values');
  valuesGrid.innerHTML = data.map(v => `
    <div class="card">
      <div class="icon">${v.icon}</div>
      <h3>${v.title}</h3>
      <p>${v.description}</p>
    </div>
  `).join('');
};

// Load FAQs
const loadFAQs = async () => {
  const data = await fetchData('faqs');
  faqContainer.innerHTML = data.map(f => `
    <div class="faq-item">
      <button class="faq-question">
        <span>${f.question}</span><span class="faq-icon">▼</span>
      </button>
      <div class="faq-answer"><div>${f.answer}</div></div>
    </div>
  `).join('');

  document.querySelectorAll('.faq-question').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      btn.parentElement.classList.toggle('active');
    })
  );
};

// Form Validation
const validate = {
  name: n => n.trim().length < 2 ? 'Name too short' : '',
  email: e => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? 'Invalid email' : '',
  message: m => m.trim().length < 10 ? 'Message too short' : ''
};

// Handle Form Submission
const handleFormSubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name'),
        email = document.getElementById('email'),
        msg = document.getElementById('message'),
        errors = {
          name: document.getElementById('name-error'),
          email: document.getElementById('email-error'),
          msg: document.getElementById('message-error')
        };

  Object.values(errors).forEach(e => e && (e.textContent = ''));

  const nameErr = validate.name(name.value),
        emailErr = validate.email(email.value),
        msgErr = validate.message(msg.value);
  if (nameErr || emailErr || msgErr) return alert(nameErr || emailErr || msgErr);

  const data = {
    name: name.value.trim(),
    email: email.value.trim(),
    message: msg.value.trim(),
    timestamp: new Date().toISOString()
  };

  try {
    await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    contactForm.reset();
    document.getElementById('form-success').classList.remove('hidden');
    setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 3000);
  } catch (err) {
    console.error('Error submitting form:', err);
    alert('Error sending message. Please try again.');
  }
};

// Events
themeToggle.addEventListener('click', toggleTheme);
contactForm.addEventListener('submit', handleFormSubmit);

// Init
loadTheme();
loadValues();
loadFAQs();
