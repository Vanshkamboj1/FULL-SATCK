const toggle = document.getElementById('theme-toggle');
const dashboard = document.querySelector('.dashboard');

// Toggle between light and dark theme
toggle.addEventListener('click', () => {
  const newTheme = dashboard.dataset.theme === 'light' ? 'dark' : 'light';
  dashboard.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme); // save preference
});

// Apply saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    dashboard.dataset.theme = savedTheme;
  }
});
