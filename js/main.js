// ============================================================================
// Main JavaScript – Instastrategix (FIXED & STABLE)
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION
       ========================================================================== */

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.classList.toggle('nav-open', isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            });
        });
    }

    /* ==========================================================================
       STICKY HEADER (SAFE)
       ========================================================================== */

    const navbar = document.querySelector('.site-header');
    let lastScroll = 0;

    if (navbar) {
        const handleScroll = throttle(() => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 80) {
                navbar.classList.add('navbar-scrolled');

                if (
                    currentScroll > lastScroll &&
                    currentScroll > 200 &&
                    !document.body.classList.contains('nav-open')
                ) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }
            } else {
                navbar.classList.remove('navbar-scrolled', 'navbar-hidden');
            }

            lastScroll = currentScroll;
            toggleScrollTopButton(currentScroll);
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }

    /* ==========================================================================
       ACTIVE NAV LINK
       ========================================================================== */

    const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });

    /* ==========================================================================
       FOOTER YEAR
       ========================================================================== */

    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ==========================================================================
       SMOOTH SCROLL
       ========================================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    /* ==========================================================================
       SCROLL TO TOP
       ========================================================================== */

    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function toggleScrollTopButton(scrollY) {
        scrollBtn.classList.toggle('visible', scrollY > 300);
    }

});

/* ==========================================================================
   UTIL
   ========================================================================== */

function throttle(fn, limit = 100) {
    let waiting = false;
    return function (...args) {
        if (!waiting) {
            fn.apply(this, args);
            waiting = true;
            setTimeout(() => (waiting = false), limit);
        }
    };
}
