// ============================================================================
// Main JavaScript – Instastrategix
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION
       ========================================================================== */

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
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
       STICKY NAVBAR (THROTTLED)
       ========================================================================== */

    let lastScroll = 0;

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

    /* ==========================================================================
       ACTIVE NAV LINK HIGHLIGHTING
       ========================================================================== */

    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.remove('active');

            if (
                linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && linkHref === 'index.html')
            ) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    /* ==========================================================================
       FOOTER YEAR
       ========================================================================== */

    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ==========================================================================
       SMOOTH ANCHOR SCROLL
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
       LAZY LOADING IMAGES
       ========================================================================== */

    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            });
        }, { rootMargin: '100px' });

        lazyImages.forEach(img => observer.observe(img));
    } else {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }

    /* ==========================================================================
       SCROLL TO TOP BUTTON
       ========================================================================== */

    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function toggleScrollTopButton(scrollY) {
        scrollBtn.classList.toggle('visible', scrollY > 300);
    }

    /* ==========================================================================
       FORM INPUT FOCUS
       ========================================================================== */

    document.querySelectorAll('.form-control').forEach(input => {
        const parent = input.parentElement;
        if (input.value) parent.classList.add('focused');

        input.addEventListener('focus', () => parent.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (!input.value) parent.classList.remove('focused');
        });
    });

    /* ==========================================================================
       INIT ANIMATIONS
       ========================================================================== */

    if (typeof initAnimations === 'function') {
        initAnimations();
    }
});

/* ==========================================================================
   UTILITIES
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
