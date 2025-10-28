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


document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".signup-form");

  if (!signupForm) {
    console.error("Signup form not found!");
    return;
  }

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ Get form values
    const name = signupForm.querySelector("input[placeholder='Full Name']").value.trim();
    const email = signupForm.querySelector("input[placeholder='Email']").value.trim();
    const password = signupForm.querySelector("input[placeholder='Password']").value.trim();
    const dob = signupForm.querySelector("#dob").value.trim();

    // ✅ Basic validation
    if (!name || !email || !password || !dob) {
      alert("Please fill in all fields!");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      // ✅ Check existing users
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();

      const userExists = users.some(user => user.email === email);
      if (userExists) {
        alert("User already exists! Please log in instead.");
        window.location.href = "login.html"; // redirect to login
        return;
      }

      // ✅ Create new user
      const newUser = { name, email, password, dob };

      const addRes = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (addRes.ok) {
        alert("Account created successfully! Redirecting to login...");
        signupForm.reset();
        window.location.href = "login.html"; // ✅ redirect to login page
      } else {
        alert("Failed to create account. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error! Please try again later.");
    }
  });
});
