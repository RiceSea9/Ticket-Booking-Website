/*const popup = document.getElementById('seatPopup');
const bookBtn = document.querySelector('.book-btn');
const closeBtn = document.querySelector('.close-btn');
const seatsGrid = document.querySelector('.seats-grid');
const selectedCount = document.getElementById('selectedCount');
const totalPrice = document.getElementById('totalPrice');
const confirmBtn = document.getElementById('confirmBooking');

const seatPrice = 250;
const totalSeats = 30; // Change this number if you want more or fewer seats
let selectedSeats = [];

// Open popup
bookBtn.addEventListener('click', () => {
  popup.style.display = 'flex';
  generateSeats();
});

// Close popup
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  selectedSeats = [];
  updateInfo();
});

// Generate seat layout
function generateSeats() {
  seatsGrid.innerHTML = '';
  for (let i = 1; i <= totalSeats; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.textContent = i;
    seat.addEventListener('click', () => toggleSeat(i, seat));
    seatsGrid.appendChild(seat);
  }
}

// Select/unselect seat
function toggleSeat(num, seat) {
  if (selectedSeats.includes(num)) {
    selectedSeats = selectedSeats.filter(n => n !== num);
    seat.classList.remove('selected');
  } else {
    selectedSeats.push(num);
    seat.classList.add('selected');
  }
  updateInfo();
}

// Update ticket count and total
function updateInfo() {
  selectedCount.textContent = selectedSeats.length;
  totalPrice.textContent = selectedSeats.length * seatPrice;
}

//first select the showtime
const timeCards = document.querySelectorAll('.time-card');
let selectedShowtime = null;

// Confirm booking
confirmBtn.addEventListener('click', () => {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat!");
    return;
  }
  alert(`🎉 Booking confirmed for ${selectedSeats.length} seat(s)!\nTotal: ₹${selectedSeats.length * seatPrice}`);
  popup.style.display = 'none';
  selectedSeats = [];
  updateInfo();
});

//night mode
// ---------------- THEME TOGGLE ----------------
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme (if any)
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '🌞';
}

// Handle toggle click
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Update icon and save preference
  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = '🌞';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});
*/

// ---------------- ELEMENTS ----------------
const popup = document.getElementById('seatPopup');
const bookBtn = document.querySelector('.book-btn');
const closeBtn = document.querySelector('.close-btn');
const seatsGrid = document.querySelector('.seats-grid');
const selectedCount = document.getElementById('selectedCount');
const totalPrice = document.getElementById('totalPrice');
const confirmBtn = document.getElementById('confirmBooking');
const timeCards = document.querySelectorAll('.time-card');

const seatPrice = 250;
const totalSeats = 30; // Change this number if you want more or fewer seats
let selectedSeats = [];
let selectedShowtime = null; // store selected showtime

// ---------------- SHOWTIME SELECTION ----------------
timeCards.forEach(card => {
  card.addEventListener('click', () => {
    // Remove selected class from all cards
    timeCards.forEach(c => c.classList.remove('selected'));
    // Add selected class to clicked card
    card.classList.add('selected');
    // Save selected showtime
    selectedShowtime = card.textContent.trim();
  });
});

// ---------------- OPEN POPUP ----------------
bookBtn.addEventListener('click', () => {
  if (!selectedShowtime) {
    alert("❌ Please select a showtime first!");
    return; // stop if no showtime is selected
  }
  popup.style.display = 'flex';
  generateSeats();
});

// ---------------- CLOSE POPUP ----------------
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  selectedSeats = [];
  updateInfo();
});

// ---------------- GENERATE SEAT LAYOUT ----------------
function generateSeats() {
  seatsGrid.innerHTML = '';
  for (let i = 1; i <= totalSeats; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.textContent = i;
    seat.addEventListener('click', () => toggleSeat(i, seat));
    seatsGrid.appendChild(seat);
  }
}

// ---------------- SELECT / UNSELECT SEAT ----------------
function toggleSeat(num, seat) {
  if (selectedSeats.includes(num)) {
    selectedSeats = selectedSeats.filter(n => n !== num);
    seat.classList.remove('selected');
  } else {
    selectedSeats.push(num);
    seat.classList.add('selected');
  }
  updateInfo();
}

// ---------------- UPDATE INFO ----------------
function updateInfo() {
  selectedCount.textContent = selectedSeats.length;
  totalPrice.textContent = selectedSeats.length * seatPrice;
}

// ---------------- CONFIRM BOOKING ----------------
confirmBtn.addEventListener('click', () => {
  if (selectedSeats.length === 0) {
    alert("❌ Please select at least one seat!");
    return;
  }
  alert(`🎉 Booking confirmed for ${selectedSeats.length} seat(s)!\nShowtime: ${selectedShowtime}\nTotal: ₹${selectedSeats.length * seatPrice}`);
  popup.style.display = 'none';
  selectedSeats = [];
  updateInfo();
});

//night mode
// Dark Mode Toggle
const toggleThemeBtn = document.getElementById('toggle-theme');
const body = document.body;

toggleThemeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Optional: change button icon for clarity
  if (body.classList.contains('dark-mode')) {
    toggleThemeBtn.textContent = '☀️'; // Sun for light mode
  } else {
    toggleThemeBtn.textContent = '🌙'; // Moon for dark mode
  }
});

// Load saved theme (if any)
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '🌞';
}

// Handle toggle click
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  // Update icon and save preference
  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = '🌞';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});

