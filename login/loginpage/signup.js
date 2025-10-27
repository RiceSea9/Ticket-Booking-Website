const backgrounds = [
  'url("as.jpg")',
  'url("fff.jpg")',
  'url("J2SpZ5.jpg")'
];

let index = 0;
const body = document.body;

body.style.backgroundImage = backgrounds[index];

setInterval(() => {
  index = (index + 1) % backgrounds.length;
  body.style.backgroundImage = backgrounds[index];
}, 5000);


document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('.signup-form');

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = signupForm.querySelector('input[placeholder="Full Name"]').value.trim();
    const email = signupForm.querySelector('input[placeholder="Email"]').value.trim();
    const password = signupForm.querySelector('input[placeholder="Password"]').value.trim();
    const dob = document.getElementById('dob').value;

    // ⚡ Validation 1: Check all fields
    if (!name || !email || !password || !dob) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    // ⚡ Validation 2: Valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("📧 Please enter a valid email address!");
      return;
    }

    // ⚡ Validation 3: Password length
    if (password.length < 6) {
      alert("🔒 Password must be at least 6 characters long!");
      return;
    }

    // ⚡ Validation 4: Age check (must be 13+ for this site)
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 13) {
      alert("🎟️ You must be at least 13 years old to join Ticket Next Door!");
      return;
    }

    // ⚡ Validation 5: Prevent duplicate signup
    if (localStorage.getItem(email)) {
      alert("⚠️ This email is already registered. Please log in instead.");
      window.location.href = "login.html";
      return;
    }

    // ✅ Save user data locally
    const userData = { name, email, password, dob, age };
    localStorage.setItem(email, JSON.stringify(userData));

    alert(`✅ Welcome to Ticket Next Door, ${name}! Your account has been created successfully.`);
    window.location.href = "login.html";
  });
});
