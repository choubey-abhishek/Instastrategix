// ============================================================================
// Main JavaScript – Instastrategix (FINAL COMPLETE VERSION)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       SAND DISPERSING ANIMATION (Tiny particles, black/silver/#786e57 gold)
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let width, height;
        const particleCount = 1200; // dense sand
        let particles = [];

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                // Spawn from left for dispersing effect
                this.x = Math.random() * width * 0.4 - width * 0.2;
                this.y = Math.random() * height;
                this.vx = Math.random() * 3 + 2; // strong rightward wind
                this.vy = Math.random() * 2 - 1;
                this.life = 1;
                this.decay = Math.random() * 0.01 + 0.005;
                this.size = Math.random() * 1.5 + 0.5; // tiny grains

                // Sand colors: silver, dark gray, gold #786e57
                const rand = Math.random();
                if (rand < 0.4) {
                    const shade = 180 + Math.random() * 75;
                    this.color = `rgba(${shade}, ${shade}, ${shade}, 0.8)`;
                } else if (rand < 0.7) {
                    const shade = 50 + Math.random() * 80;
                    this.color = `rgba(${shade}, ${shade}, ${shade}, 0.7)`;
                } else {
                    const base = 80 + Math.random() * 60;
                    this.color = `rgba(${base + 80}, ${base + 50}, ${base}, 0.8)`;
                }
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.05; // gentle fall
                this.life -= this.decay;

                if (this.life <= 0 || this.x > width + 50) {
                    this.reset();
                }
            }
            draw() {
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const resize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        init();
        animate();
    }

    /* ==========================================================================
       SCROLL ENTRANCE ANIMATIONS (Original feature - preserved)
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
       MOBILE MENU TOGGLE (Original standard feature - preserved)
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
       STICKY HEADER & ACTIVE LINK (Original standard features - preserved)
       ========================================================================== */
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlight
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }, 100));

    /* ==========================================================================
       CURRENT YEAR IN FOOTER (Original feature - preserved)
       ========================================================================== */
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       SMOOTH SCROLL & SCROLL TO TOP (Original standard features - preserved)
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const scrollTopBtn = document.querySelector('.scroll-to-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, 100));
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
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
