// This script allows users to switch between dark mode and light mode for better accessibility.
const darkmode = document.getElementById('darkmode');
const body = document.body;

// Ensures dark mode is still enabled when navigating to other pages
if (localStorage.getItem('dark-mode') === 'on') {
  body.classList.add('dark-mode'); // Enables dark mode
  darkmode.innerText = 'Disable Dark Mode'; // Changes button text
}
else if (localStorage.getItem('dark-mode') === 'off') {
  body.classList.remove('dark-mode'); // Disables dark mode
  darkmode.innerText = 'Enable Dark Mode'; // Changes button text
}

// Adding event listener to toggle button
darkmode.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode'); // Disables dark mode
    darkmode.innerText = 'Enable Dark Mode'; // Changes button text
    localStorage.setItem('dark-mode', 'off'); // Removes dark mode preference to stop it from reverting when navigating to other pages
  } else {
    body.classList.add('dark-mode'); // Enables dark mode
    darkmode.innerText = 'Disable Dark Mode'; // Changes button text
    localStorage.setItem('dark-mode', 'on'); // Saves dark mode preference to stop it from reverting when navigating to other pages
  }
});
