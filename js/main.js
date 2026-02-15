// js/main.js – Fully upgraded mobile menu with overlay, outside close, Esc close + safe init

document.addEventListener('DOMContentLoaded', function () {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {

        // Toggle Menu
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Auto-close when clicking nav link
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', function (e) {
            if (
                navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    /* =========================
       CURRENT YEAR
    ========================= */

    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* =========================
       SCROLL TO TOP
    ========================= */

    const scrollTopBtn = document.querySelector('.scroll-to-top');

    if (scrollTopBtn) {

        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (typeof gsap !== "undefined") {
                gsap.to(window, { duration: 1, scrollTo: 0 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    /* =========================
       SWIPER TESTIMONIALS
    ========================= */

    if (typeof Swiper !== "undefined") {
        new Swiper('.testimonials-swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 30,
        });
    }

    /* =========================
       SIMPLE MARKETING SLIDER
    ========================= */

    let currentSlide = 0;
    const slides = document.querySelectorAll('.simple-marketing-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');

    function showSlide(index) {
        slides.forEach(function (slide) {
            slide.classList.remove('active');
        });

        dots.forEach(function (dot) {
            dot.classList.remove('active');
        });

        if (slides[index]) slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }

    function changeSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {

        setInterval(function () {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);

        showSlide(0);
    }

    window.changeSlide = changeSlide;

});
