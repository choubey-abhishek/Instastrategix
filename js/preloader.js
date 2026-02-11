document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');

  // Minimum display time to ensure full animation plays (~3 seconds total)
  const minTime = 3000;

  let timePassed = false;
  setTimeout(() => { timePassed = true; checkHide(); }, minTime);

  window.addEventListener('load', () => {
    checkHide();
  });

  function checkHide() {
    if (timePassed) {
      preloader.classList.add('hidden');
      // Remove from DOM after fade
      setTimeout(() => {
        if (preloader) preloader.remove();
      }, 1000);
    }
  }
});
