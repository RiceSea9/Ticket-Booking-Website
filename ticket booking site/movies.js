// -----------------------------
// movies.js - final version
// -----------------------------

// Helper to create element safely (avoid duplicates)
function ensureOnce(selector, createFn) {
  if (!document.querySelector(selector)) createFn();
}

/* ---------------------------
   DARK / LIGHT MODE (persist)
   --------------------------- */
ensureOnce(".theme-toggle", () => {
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "theme-toggle";
  document.querySelector("header").appendChild(toggleBtn);

  // set text based on state
  function updateToggleText() {
    toggleBtn.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  }

  // initialize from localStorage
  if (localStorage.getItem("tnf_theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateToggleText();

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "tnf_theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
    updateToggleText();
  });
});

/* ---------------------------
   SIDEBAR / BURGER (mobile)
   --------------------------- */
ensureOnce(".burger", () => {
  const burger = document.createElement("button");
  burger.className = "burger";
  burger.setAttribute("aria-label", "Open menu");
  burger.innerHTML = "☰";
  document.querySelector("header").prepend(burger);

  const nav = document.querySelector("nav");

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("nav-active");
    burger.classList.toggle("open");
  });

  // close when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove("nav-active");
      burger.classList.remove("open");
    }
  });

  // close on link click for mobile
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("nav-active");
    burger.classList.remove("open");
  }));
});

/* ---------------------------
   SEARCH BAR (with icon)
   --------------------------- */
ensureOnce(".search-container", () => {
  const container = document.createElement("div");
  container.className = "search-container";
  container.innerHTML = `
    <span class="search-icon" aria-hidden="true">🔍</span>
    <input class="movie-search" type="text" placeholder="Search movies..." aria-label="Search movies">
  `;
  const allMovies = document.querySelector(".all-movies");
  allMovies.prepend(container);

  const input = container.querySelector(".movie-search");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll(".movie-card").forEach(card => {
      const title = (card.querySelector("h4")?.textContent || "").toLowerCase();
      // If query empty show all
      card.style.display = q === "" || title.includes(q) ? "block" : "none";
    });
  });
});

/* ---------------------------
   HORIZONTAL SCROLL / CARD SIZE
   --------------------------- */
// On small screens we will enable horizontal scrolling for .movie-list
function enableResponsiveScroll() {
  document.querySelectorAll(".movie-list").forEach(list => {
    // ensure cards don't shrink: flex children set in CSS (below)
    list.style.overflowY = "hidden";
    // allow horizontal scroll (CSS handles it, but ensure smooth)
    list.style.webkitOverflowScrolling = "touch";
  });
}
enableResponsiveScroll();
window.addEventListener("resize", enableResponsiveScroll);

/* ---------------------------
   MOVIE CARD CLICK -> MODAL
   --------------------------- */
function showModal(title, message) {
  // prevent multiple modals
  const existing = document.querySelector(".custom-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.className = "custom-modal";
  modal.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true">
      <h3>${title}</h3>
      <p>${message}</p>
      <div class="modal-actions">
        <button class="close-modal">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(".close-modal").focus();
  modal.querySelector(".close-modal").addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

// attach click handlers to all cards (delegation safe)
document.addEventListener("click", (e) => {
  const card = e.target.closest(".movie-card");
  if (!card) return;
  const href = card.getAttribute("href");
  const title = card.querySelector("h4")?.textContent || "Movie";
  if (!href || href === "#") {
    e.preventDefault();
    showModal(`🎬 ${title}`, "Details coming soon — tickets & info will appear here.");
  }
});

/* ---------------------------
   ACTIVE NAV LINK HIGHLIGHT
   --------------------------- */
(function markActiveLink() {
  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href === "" || href === "#") return;
    if (href.includes(path) || (path === "" && href.includes("frontpage"))) {
      a.classList.add("active-link");
    }
  });
})();
