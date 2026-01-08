// js/background.js
// ============================================================================
// Floating Background Circles Animation (SAFE – SINGLE INIT ONLY)
// ============================================================================

if (!window.__bgCirclesInitialized) {
    window.__bgCirclesInitialized = true;

    document.addEventListener("DOMContentLoaded", function () {
        const container = document.querySelector(".animated-bg");
        if (!container) return;

        // prevent duplicate circles
        if (container.children.length > 0) return;

        const totalCircles = 25;

        for (let i = 0; i < totalCircles; i++) {
            const circle = document.createElement("span");
            circle.className = "bg-circle";

            if (Math.random() > 0.5) {
                circle.classList.add("pink");
            }

            const size = Math.random() * 60 + 20;
            circle.style.width = size + "px";
            circle.style.height = size + "px";

            circle.style.left = Math.random() * 100 + "%";

            const duration = Math.random() * 20 + 20;
            const delay = Math.random() * -40;

            circle.style.animationDuration = duration + "s";
            circle.style.animationDelay = delay + "s";

            container.appendChild(circle);
        }
    });
}
