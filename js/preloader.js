document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Minimum time for IX animation (1s)
  const minDuration = 1000;

  const hidePreloader = () => {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 2000); // fade-out complete
  };

  window.addEventListener('load', () => {
    // Show for at least IX animation duration
    setTimeout(hidePreloader, minDuration);
  });

  // Safety fallback in case load takes too long
  setTimeout(hidePreloader, 12000);
});
