document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // ✅ Fetch users from JSON Server
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      // ✅ Find user by email
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        alert(`Welcome back, ${user.name}! 🎉`);
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "new.html"; // ✅ Redirect to homepage
      } else {
        alert("Incorrect email or password.");
      }
    } catch (error) {
      console.error("Error connecting to API:", error);
      alert("Server error. Please try again later.");
    }
  });
});
