document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const startTime = performance.now();
  const minDuration = 3500; // show for at least 3.5 seconds

  const hidePreloader = () => {
    preloader.classList.add('hidden');
    // Optional: remove from DOM after fade
    setTimeout(() => preloader.remove(), 2000);
  };

  window.addEventListener('load', () => {
    const elapsed = performance.now() - startTime;
    const delay = Math.max(0, minDuration - elapsed);
    setTimeout(hidePreloader, delay);
  });

  // Safety fallback
  setTimeout(hidePreloader, 12000);
});
