// IX Preloader - shows for at least ~3.5 seconds on page open
const preloader = document.getElementById('preloader');
if (preloader) {
  const startTime = performance.now();
  const minDuration = 3500; // minimum show time in ms

  const hidePreloader = () => {
    preloader.classList.add('hidden');
  };

  window.addEventListener('load', () => {
    const elapsed = performance.now() - startTime;
    const delay = Math.max(0, minDuration - elapsed);
    setTimeout(hidePreloader, delay);
  });

  // Safety fallback in case load takes too long
  setTimeout(hidePreloader, 12000);
}
