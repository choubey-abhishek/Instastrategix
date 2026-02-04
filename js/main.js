// ============================================================================
// Main JavaScript – Instastrategix (Final Upgraded Version)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       UPGRADED SAND-LIKE FLOATING PARTICLES (Silver + Gold #786e57)
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let logicalWidth, logicalHeight, cx, cy;
        const focalLength = 500;
        const particleCount = 600;
        const speed = 0.5;
        let particles = [];

        class Particle {
            constructor() {
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.sizeVariation = Math.random() * 0.6 + 0.8;
                this.reset();
            }
            reset() {
                this.x = (Math.random() - 0.5) * 2000;
                this.y = (Math.random() - 0.5) * 2000;
                this.z = Math.random() * 1000 + 300;

                if (Math.random() > 0.4) {
                    const shade = 180 + Math.random() * 75;
                    this.color = `rgb(${shade}, ${shade}, ${shade})`;
                    this.glow = '#ffffff';
                } else {
                    const base = 100 + Math.random() * 100;
                    this.color = `rgb(${base + 80}, ${base + 60}, ${base})`;
                    this.glow = '#786e57';
                }
                this.baseSize = Math.random() * 2 + 0.5;
            }
            update() {
                this.z -= speed;
                this.x += this.vx;
                this.y += this.vy;
                if (this.z <= 0) this.reset();
            }
            draw() {
                const scale = focalLength / this.z;
                const px = cx + this.x * scale;
                const py = cy + this.y * scale;
                const size = this.baseSize * scale * 5 * this.sizeVariation;

                if (px + size < 0 || px - size > logicalWidth || py + size < 0 || py - size > logicalHeight) return;

                ctx.globalAlpha = Math.min(scale * 2, 1);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 30 * scale;
                ctx.shadowColor = this.glow;
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
            for (let i = 0; i < particleCount; i++) particles.push(new Particle());
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, logicalWidth, logicalHeight);
            particles.forEach(p => { p.update(); p.draw(); });
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
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    animateElements.forEach(el => observer.observe(el));

    // [Keep any other original code you had: menu toggle, sticky header, etc.]
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
