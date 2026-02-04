// ============================================================================
// Main JavaScript – Instastrategix (Premium Upgraded Version)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       3D CINEMATIC FLOATING SILVER PARTICLES (Vanilla Canvas – Premium Effect)
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let logicalWidth, logicalHeight, cx, cy;

        const focalLength = 500;
        const particleCount = 300;
        const speed = 1.0;
        let particles = [];

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = (Math.random() - 0.5) * 1800;
                this.y = (Math.random() - 0.5) * 1800;
                this.z = Math.random() * 800 + 200;
                this.baseSize = Math.random() * 1.2 + 0.5;
                const shade = 200 + Math.floor(Math.random() * 55);
                this.color = `rgb(${shade}, ${shade}, ${shade})`;
            }
            update() {
                this.z -= speed;
                if (this.z <= 10) {
                    this.reset();
                }
            }
            draw() {
                const scale = focalLength / this.z;
                const px = cx + this.x * scale;
                const py = cy + this.y * scale;
                const size = this.baseSize * scale * 4;

                if (px + size < 0 || px - size > logicalWidth || py + size < 0 || py - size > logicalHeight) return;

                ctx.globalAlpha = Math.min(scale * 1.5, 1);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 25 * scale;
                ctx.shadowColor = '#ffffff';
                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const resizeCanvas = () => {
            logicalWidth = canvas.offsetWidth;
            logicalHeight = canvas.offsetHeight;
            canvas.width = logicalWidth * dpr;
            canvas.height = logicalHeight * dpr;
            ctx.scale(dpr, dpr);
            cx = logicalWidth / 2;
            cy = logicalHeight / 2;
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, logicalWidth, logicalHeight);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;

            requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        initParticles();
        animate();
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

    /* Rest of your original main.js code (mobile nav, sticky header, etc.) remains unchanged */
    // ... (all the other functions you had: menu toggle, sticky header, active link, footer year, smooth scroll, scroll to top, throttle)
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
