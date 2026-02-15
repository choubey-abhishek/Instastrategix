// js/preloader.js - Guarantees full animation plays (4.5+ seconds)
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');

  if (!preloader) return;

  const minTime = 4500; // Covers full animation + ripples
  let timePassed = false;

  setTimeout(() => {
    timePassed = true;
    checkHide();
  }, minTime);

  window.addEventListener('load', () => {
    checkHide();
  });

  function checkHide() {
    if (timePassed && preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => {
        if (preloader && preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 1000);
    }
  }
});
