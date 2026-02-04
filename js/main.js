// ============================================================================
// Main JavaScript – Instastrategix (FINAL - Small particles moving together in clusters)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       SAND BURST ANIMATION (Tiny particles moving together in waves/clusters)
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let width, height;
        const particles = [];
        const burstSize = 80; // particles per burst
        const burstInterval = 40; // frames between bursts
        let frameCount = 0;

        class Particle {
            constructor(x, y, vx, vy) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.life = 1;
                this.decay = Math.random() * 0.008 + 0.006;
                this.size = Math.random() * 0.7 + 0.3; // very tiny grains

                // Sand colors
                const rand = Math.random();
                if (rand < 0.4) {
                    const shade = 180 + Math.random() * 75;
                    this.color = `rgba(${shade}, ${shade}, ${shade}, 0.9)`;
                } else if (rand < 0.7) {
                    const shade = 40 + Math.random() * 70;
                    this.color = `rgba(${shade}, ${shade}, ${shade}, 0.8)`;
                } else {
                    const base = 80 + Math.random() * 50;
                    this.color = `rgba(${base + 80}, ${base + 50}, ${base}, 0.9)`;
                }
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.03; // gentle gravity
                this.life -= this.decay;

                // Curve the flow slightly for crescent shape
                this.vx += Math.sin(this.y * 0.01) * 0.05;
            }
            draw() {
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function createBurst() {
            const centerX = width * 0.15; // dense burst on left
            const centerY = height * 0.5 + (Math.random() - 0.5) * height * 0.4;
            for (let i = 0; i < burstSize; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3 + 2;
                const vx = Math.cos(angle) * speed + 3; // strong right + slight spread
                const vy = Math.sin(angle) * speed * 0.5;
                particles.push(new Particle(centerX, centerY, vx, vy));
            }
        }

        const resize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, width, height);

            frameCount++;
            if (frameCount % burstInterval === 0) {
                createBurst();
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw();
                if (p.life <= 0 || p.x > width + 50) {
                    particles.splice(i, 1);
                }
            }

            requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        animate();
    }

    /* ==========================================================================
       SCROLL ENTRANCE ANIMATIONS (Original - preserved)
       ========================================================================== */
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    animateElements.forEach(el => observer.observe(el));

    /* ==========================================================================
       MOBILE MENU TOGGLE (Original - preserved)
       ========================================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
            navMenu.classList.toggle('active');
        });
    }

    /* ==========================================================================
       STICKY HEADER & ACTIVE LINK (Original - preserved)
       ========================================================================== */
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id') || '';
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').replace('.html', '') === current || link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }, 100));

    /* ==========================================================================
       CURRENT YEAR IN FOOTER (Original - preserved)
       ========================================================================== */
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       SMOOTH SCROLL & SCROLL TO TOP (Original - preserved)
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const scrollTopBtn = document.querySelector('.scroll-to-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', throttle(() => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
        }, 100));
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});

/* ==========================================================================
   UTILITY: Throttle (Original - preserved)
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
