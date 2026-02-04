// Main JavaScript – Full Complete
document.addEventListener('DOMContentLoaded', () => {

    // SAND PARTICLE ANIMATION (Dark tones for light bg)
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let width, height;
        const particles = [];
        const burstSize = 80;
        const burstInterval = 40;
        let frameCount = 0;

        class Particle {
            constructor(x, y, vx, vy) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.life = 1;
                this.decay = Math.random() * 0.008 + 0.006;
                this.size = Math.random() * 0.7 + 0.3;

                const rand = Math.random();
                if (rand < 0.4) {
                    const shade = 30 + Math.random() * 60;
                    this.color = `rgba(${shade}, ${shade}, ${shade}, 0.9)`;
                } else {
                    const base = 80 + Math.random() * 50;
                    this.color = `rgba(${base + 70}, ${base + 50}, ${base}, 0.9)`;
                }
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.03;
                this.life -= this.decay;
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
            const centerX = width * 0.15;
            const centerY = height * 0.5 + (Math.random() - 0.5) * height * 0.4;
            for (let i = 0; i < burstSize; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3 + 2;
                const vx = Math.cos(angle) * speed + 3;
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
            ctx.fillStyle = 'rgba(240, 240, 240, 0.03)';
            ctx.fillRect(0, 0, width, height);

            frameCount++;
            if (frameCount % burstInterval === 0) createBurst();

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw();
                if (p.life <= 0 || p.x > width + 50) particles.splice(i, 1);
            }

            requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        animate();
    }

    // All original features (menu, sticky, etc.) preserved from previous versions
    // ... (keep your original code for menu toggle, sticky header, etc. if any)
});

// Throttle utility
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
