// js/gsap-animations.js – Removed pinning/scrub (causing performance issues), improved smoothness, added stat counter
gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.defaults({ ease: "power3.out" });

// Hero reveal (no pin, plays on entrance)
gsap.timeline({
    scrollTrigger: {
        trigger: ".hero",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
})
.from(".hero-title", { y: 120, opacity: 0, duration: 1.4 })
.from(".hero-subtitle", { y: 80, opacity: 0, duration: 1.2 }, "-=1")
.from(".hero-description", { y: 60, opacity: 0, duration: 1 }, "-=1")
.from(".hero-buttons .btn", { y: 60, opacity: 0, stagger: 0.2, duration: 1 }, "-=0.8");

// Card hover effects (enhanced)
document.querySelectorAll(".info-card, .service-card").forEach(card => {
    const cardTL = gsap.timeline({ paused: true });
    cardTL
        .to(card, { y: -30, scale: 1.08, duration: 0.6 })
        .to(card.querySelector(".card-icon, .service-icon i"), { scale: 1.4, rotation: 360, color: "#9b8a6b", duration: 0.8 }, "-=0.6")
        .to(card, { boxShadow: "0 35px 70px rgba(120,110,87,0.45)", duration: 0.6 }, 0);

    card.addEventListener("mouseenter", () => cardTL.play());
    card.addEventListener("mouseleave", () => cardTL.reverse());
});

// Card entrance on scroll
ScrollTrigger.batch(".info-card, .service-card", {
    onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, stagger: 0.15, duration: 1 }),
    start: "top 85%",
    once: true
});

// Stat counter animation
gsap.utils.toArray(".stat-number").forEach(stat => {
    const hasPlus = stat.textContent.includes('+');
    const hasPercent = stat.textContent.includes('%');
    const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
    
    gsap.fromTo(stat, 
        { innerText: 0 },
        {
            innerText: target,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".social-proof",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            onUpdate: function() {
                const value = Math.ceil(this.targets()[0].innerText);
                stat.innerText = value + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            }
        }
    );
});
