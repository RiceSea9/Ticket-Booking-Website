const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const promoSection = document.querySelector('.promo-section');

// Check saved theme from localStorage
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  body.classList.remove('light-mode'); // Default is dark mode
  toggleBtn.textContent = '☀️ Light Mode';
  promoSection.style.backgroundColor = "#000";
} else {
  body.classList.add('light-mode');
  toggleBtn.textContent = '🌙 Dark Mode';
  promoSection.style.backgroundColor = "#fff";
}

//  Toggle when clicked
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  const isLightMode = body.classList.contains('light-mode');
  if (isLightMode) {
    toggleBtn.textContent = '🌙 Dark Mode'; // Show next mode option
    promoSection.style.backgroundColor = "#fff";
    localStorage.setItem('theme', 'light');
  } else {
    toggleBtn.textContent = '☀️ Light Mode';
    promoSection.style.backgroundColor = "#000";
    localStorage.setItem('theme', 'dark');
  }
});

console.log("Theme toggle ready");


//  Auto-scroll for promo banner
const container = document.querySelector('.promo-container');
let scrollAmount = 0;

function autoScroll() {
  if (container.scrollWidth - container.clientWidth <= scrollAmount) {
    scrollAmount = 0;
  } else {
    scrollAmount += 1;
  }
  container.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

setInterval(autoScroll, 50);
// let scrollInterval = setInterval(autoScroll, 50);

container.addEventListener("mouseenter", () => clearInterval(scrollInterval));
container.addEventListener("mouseleave", () => {
  scrollInterval = setInterval(autoScroll, 50);
});



//  Validate search input before "searching"
const searchInput = document.querySelector('.navbar-right input[type="text"]');

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query === "") {
      alert("Please type something before searching!");
    } else {
      alert(`Searching for "${query}"...`);
    }
  }
});

//  Fetch API example using async/await
async function getMovieData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    console.log("Fetched Data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getMovieData();



//  USER MANAGEMENT USING FETCH API
// const API_URL = "http://localhost:3000/users";
// const userList = document.getElementById("userList");
// const userForm = document.getElementById("userform");

// function getUsers() {
//   fetch(API_URL)
//     .then(response => response.json())
//     .then(users => {
//       userList.innerHTML = "";
//       users.forEach(user => {
//         const div = document.createElement("div");
//         div.className = "user";
//         div.innerHTML = `
//           <div class="user-info">
//             <strong>${user.name}</strong>
//             <span>Age: ${user.age}</span>
//             <span>Email: ${user.email}</span>
//           </div>
//           <button class="delete-btn" onclick="deleteUser('${user.id}')">Delete</button>
//         `;
//         userList.appendChild(div);
//       });
//     });
// }

// userForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const name = document.getElementById("name").value.trim();
//   const age = document.getElementById("age").value.trim();
//   const email = document.getElementById("email").value.trim();

//   if (!name || !age || !email) {
//     alert("Please fill all fields!");
//     return;
//   }

//   fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, age, email }),
//   })
//     .then(() => {
//       userForm.reset();
//       getUsers();
//     });
// });

// function deleteUser(id) {
//   fetch(`${API_URL}/${id}`, { method: "DELETE" })
//     .then(() => getUsers());
// }

// getUsers();

const API_URL = "http://localhost:3000/users";
const userList = document.getElementById("userList");
const userForm = document.getElementById("userform");

function getUsers() {
  fetch(API_URL)
    .then(response => response.json())
    .then(users => {
      userList.innerHTML = "";
      users.forEach(user => {
        const div = document.createElement("div");
        div.className = "user";
        div.innerHTML = `
          <div class="user-info">
            <strong>${user.name}</strong>
            <span>Age: ${user.age}</span>
            <span>Email: ${user.email}</span>
          </div>
          <div>
            <button class="edit-btn" onclick="editUser('${user.id}', '${user.name}', '${user.age}', '${user.email}')">Edit</button>
            <button class="delete-btn" onclick="deleteUser('${user.id}')">Delete</button>
          </div>
        `;
        userList.appendChild(div);
      });
    });
}

function addUserHandler(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !age || !email) {
    alert("Please fill all fields!");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, email }),
  })
    .then(() => {
      userForm.reset();
      getUsers();
    });
}

userForm.addEventListener("submit", addUserHandler);

function deleteUser(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => getUsers());
}

function editUser(id, name, age, email) {
  document.getElementById("name").value = name;
  document.getElementById("age").value = age;
  document.getElementById("email").value = email;

  const submitBtn = userForm.querySelector("button[type='submit']");
  submitBtn.textContent = "Update User";

  userForm.onsubmit = function (e) {
    e.preventDefault();
    const updatedName = document.getElementById("name").value.trim();
    const updatedAge = document.getElementById("age").value.trim();
    const updatedEmail = document.getElementById("email").value.trim();

    if (!updatedName || !updatedAge || !updatedEmail) {
      alert("Please fill all fields!");
      return;
    }

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updatedName, age: updatedAge, email: updatedEmail }),
    })
      .then(() => {
        userForm.reset();
        submitBtn.textContent = "Add User";
        userForm.onsubmit = addUserHandler;
        getUsers();
      });
  };
}

getUsers();
