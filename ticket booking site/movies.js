// search bar code
const searchBar = document.getElementById("searchBar");
const movies = document.querySelectorAll(".movie-card");

searchBar.addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase();
  movies.forEach(movie => {
    const title = movie.querySelector("h4").textContent.toLowerCase();
    const genre = movie.querySelector("p").textContent.toLowerCase();
    movie.style.display = (title.includes(query) || genre.includes(query)) ? "block" : "none";
  });
});

// light dark mode
const themeBtn = document.getElementById("toggle-theme");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
