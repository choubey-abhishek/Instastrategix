// ============================================================================
// Main JavaScript – Instastrategix (Premium Upgraded Version)
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       PARTICLE BACKGROUND (Lightweight Canvas – Metallic Dust Effect)
       ========================================================================== */

    const canvas = document.getElementById('particles-canvas');
    let ctx, particlesArray = [];

    if (canvas) {
        ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const createParticles = () => {
            const count = 130; // Optimized for performance
            particlesArray = [];
            for (let i = 0; i < count; i++) {
                const size = Math.random() * 2 + 0.5;
                particlesArray.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: -(Math.random() * 0.8 + 0.3), // Rising motion
                    color: ['#c0c0c0', '#e5e5e5', '#a0a0a0'][Math.floor(Math.random() * 3)],
                    opacity: Math.random() * 0.4 + 0.4
                });
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesArray.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.shadowBlur = 12;
                ctx.shadowColor = p.color;
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                // Reset when particle reaches top
                if (p.y + p.size < 0) {
                    p.y = canvas.height + p.size;
                    p.x = Math.random() * canvas.width;
                }

                // Gentle side bounds bounce
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            });

            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;

            requestAnimationFrame(animateParticles);
        };

        createParticles();
        animateParticles();
    }

    /* ==========================================================================
       SCROLL ENTRANCE ANIMATIONS (Intersection Observer)
       ========================================================================== */

    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

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
       STICKY HEADER WITH HIDE-ON-SCROLL-DOWN
       ========================================================================== */

    const navbar = document.querySelector('.site-header');
    let lastScroll = 0;

    if (navbar) {
        const handleScroll = throttle(() => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 80) {
                navbar.classList.add('navbar-scrolled');

                if (currentScroll > lastScroll && currentScroll > 200 && !document.body.classList.contains('nav-open')) {
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

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

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
       SCROLL TO TOP BUTTON
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
   UTILITY: Throttle
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
