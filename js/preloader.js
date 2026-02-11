document.addEventListener('DOMContentLoaded', () => {
  // Ensure full animation plays before fade-out
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.remove(); // Fully remove from DOM for cleaner load
      }, 1200);
    }
  }, 4400); // Slightly longer buffer for smooth finish
});
