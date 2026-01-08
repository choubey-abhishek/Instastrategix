// ============================================================================
// Floating Background Circles Animation
// ============================================================================

function initBackgroundCircles() {
    const container = document.querySelector('.animated-bg');
    if (!container) return;

    const circleCount = 22; // total circles
    const colors = ['blue', 'pink'];

    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('span');
        circle.classList.add('bg-circle');

        // Random color
        if (colors[Math.floor(Math.random() * colors.length)] === 'pink') {
            circle.classList.add('pink');
        }

        // Random size (small to large)
        const size = Math.random() * 60 + 15; // 15px – 75px
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        // Random horizontal position
        circle.style.left = `${Math.random() * 100}%`;

        // Random animation duration & delay
        const duration = Math.random() * 20 + 20; // 20s – 40s
        const delay = Math.random() * -40; // negative delay for natural flow
        circle.style.animationDuration = `${duration}s`;
        circle.style.animationDelay = `${delay}s`;

        container.appendChild(circle);
    }
}
