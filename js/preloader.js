document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Minimum time to guarantee the full animation plays (~2.8s)
  const minDuration = 3000; // Changed from 1000 → 3000ms

  const hidePreloader = () => {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 2000); // Wait for fade-out to complete
  };

  window.addEventListener('load', () => {
    // Show for at least the animation duration
    setTimeout(hidePreloader, minDuration);
  });

  // Safety fallback in case page load takes too long
  setTimeout(hidePreloader, 12000);
});
