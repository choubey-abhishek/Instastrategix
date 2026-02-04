// js/gsap-animations.js – Character reveal + Tilt init + Stat counter
gsap.registerPlugin(ScrollTrigger);

// Character reveal animation
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

// Section title character reveal on scroll
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

// 3D Tilt Cards
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 18,
    speed: 500,
    glare: true,
    "max-glare": 0.4,
    scale: 1.08,
    perspective: 1000
});

// Stat counter
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
