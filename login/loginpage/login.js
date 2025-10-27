document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // ⚡ Validation 1: Empty fields
    if (!email || !password) {
      alert("⚠️ Please enter both email and password!");
      return;
    }

    // ⚡ Validation 2: Email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("📧 Please enter a valid email address!");
      return;
    }

    // ⚡ Check user in localStorage
    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
      alert("❌ No account found! Please sign up first.");
      window.location.href = "signup.html";
      return;
    }

    const userData = JSON.parse(storedUser);

    // ⚡ Check password
    if (userData.password === password) {
      alert(`🎉 Welcome back, ${userData.name}!`);
      
      // ✅ Save login session
      sessionStorage.setItem("loggedInUser", email);

      // ✅ Redirect to home page
      window.location.href = "new.html";
    } else {
      alert("🔒 Incorrect password! Please try again.");
    }
  });
});




