gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);
gsap.defaults({ ease: "none" });

// Hero Timeline
const heroTL = gsap.timeline({
    scrollTrigger: { trigger: ".hero", start: "top top", end: "+=500", pin: true, scrub: 1 }
});
heroTL
    .from(".hero-title", { y: 200, opacity: 0, duration: 1.5 })
    .from(".hero-subtitle", { y: 150, opacity: 0, duration: 1 }, "-=1")
    .from(".hero-description", { y: 100, opacity: 0, duration: 1 }, "-=1")
    .from(".hero-buttons .btn", { y: 80, opacity: 0, stagger: 0.3, duration: 1 }, "-=0.8");

// Split Text
const splitTitle = new SplitText(".hero-title", { type: "chars" });
gsap.from(splitTitle.chars, { opacity: 0, y: 50, stagger: 0.05, duration: 0.8, ease: "back.out(1.7)" });

// Pinned Sections
document.querySelectorAll(".section-padding").forEach((section) => {
    gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "+=100%", pin: true, scrub: 1 }
    })
    .from(section.querySelectorAll(".info-card, .service-card"), { y: 300, opacity: 0, rotation: -10, stagger: 0.2, duration: 1.5 })
    .from(section.querySelector(".section-title"), { scale: 0.5, opacity: 0, duration: 1 }, "-=1");
});

// Card Hover Timeline
document.querySelectorAll(".info-card, .service-card").forEach(card => {
    const cardTL = gsap.timeline({ paused: true });
    cardTL
        .to(card, { y: -30, scale: 1.08, duration: 0.6 })
        .to(card.querySelector(".card-icon, .service-icon i"), { scale: 1.4, rotation: 360, color: "#9b8a6b", duration: 0.8 }, "-=0.6")
        .to(card, { boxShadow: "0 30px 60px rgba(120,110,87,0.4)", duration: 0.6 }, 0);
    card.addEventListener("mouseenter", () => cardTL.play());
    card.addEventListener("mouseleave", () => cardTL.reverse());
});

// Parallax (optimized)
gsap.utils.toArray(".parallax-layer").forEach(layer => {
    const speed = layer.classList.contains("parallax-bg") ? 0.25 : 0.4;
    gsap.to(layer, { yPercent: speed * 100, force3D: true, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.5 } });
});

gsap.to(".hero-content", { yPercent: -45, force3D: true, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 } });

ScrollTrigger.batch(".info-card, .service-card", {
    onEnter: batch => gsap.to(batch, { yPercent: -25, force3D: true, duration: 1.2, stagger: 0.1 }),
    onLeave: batch => gsap.to(batch, { yPercent: 0, force3D: true, duration: 0.8 }),
    start: "top 90%", end: "bottom 10%", scrub: 1
});
