// js/gsap-animations.js – Upgraded card stagger + tilt
gsap.registerPlugin(ScrollTrigger);
gsap.timeline({
    scrollTrigger: {
        trigger: ".hero",
        start: "top 70%",
        toggleActions: "play none none reverse"
    }
})
.from(".hero-title .char", { y: 120, opacity: 0, stagger: 0.06, duration: 1.2, ease: "power4.out" })
.from(".hero-subtitle", { y: 80, opacity: 0, duration: 1 }, "-=0.8")
.from(".hero-description", { y: 60, opacity: 0, duration: 1 }, "-=0.8")
.from(".hero-buttons .btn", { y: 60, opacity: 0, stagger: 0.2, duration: 1 }, "-=0.6");

// Section titles
document.querySelectorAll(".section-title").forEach(title => {
    gsap.from(title.querySelectorAll(".char"), {
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Cards stagger reveal
gsap.utils.toArray(".info-card, .service-card").forEach((card, i) => {
    gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });
});

VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15, /* Slightly more tilt */
    speed: 500,
    glare: true,
    "max-glare": 0.3, /* Subtle glow */
    scale: 1.06,
    perspective: 1000
});

gsap.utils.toArray(".stat-number").forEach(stat => {
    const hasPlus = stat.textContent.includes('+');
    const hasPercent = stat.textContent.includes('%');
    const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
   
    gsap.fromTo(stat,
        { innerText: 0 },
        {
            innerText: target,
            duration: 3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".social-proof",
                start: "top 80%"
            },
            onUpdate: function() {
                const value = Math.ceil(this.targets()[0].innerText);
                stat.innerText = value + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            }
        }
    );
});
