document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
    });
  }
});
