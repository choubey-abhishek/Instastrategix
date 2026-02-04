    /* ==========================================================================
       FINAL SAND DISPERSING ANIMATION (Small particles, black/silver/#786e57)
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let width, height;
        const particleCount = 1200; // denser for fine sand look
        let particles = [];

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                // Spawn mostly from left side for dispersing effect
                this.x = Math.random() * width * 0.4 - width * 0.2; // left side
                this.y = Math.random() * height;
                this.vx = Math.random() * 3 + 2; // strong rightward wind
                this.vy = Math.random() * 2 - 1; // slight up/down drift
                this.life = 1; // opacity
                this.decay = Math.random() * 0.01 + 0.005;
                this.size = Math.random() * 1.5 + 0.5; // tiny particles

                // Colors: silver, dark gray, gold #786e57 mix
                const rand = Math.random();
                if (rand < 0.4) {
                    // Silver
                    const shade = 180 + Math.random() * 75;
                    this.color = `rgba(${shade}, ${shade}, ${shade}, 0.8)`;
                } else if (rand < 0.7) {
                    // Dark gray/black tones
                    const shade = 50 + Math.random() * 80;
                    this.color = `rgba(${shade}, ${shade}, ${shade}, 0.7)`;
                } else {
                    // Gold #786e57 tones
                    const base = 80 + Math.random() * 60;
                    this.color = `rgba(${base + 80}, ${base + 50}, ${base}, 0.8)`;
                }
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.05; // gentle gravity fall
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
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // subtle trails
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
