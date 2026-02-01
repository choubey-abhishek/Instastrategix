/* ==========================================================================
   Global Reset & Design Tokens
   ========================================================================== */

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    /* Brand Colors */
    --primary-color: #4f46e5;
    --primary-dark: #4338ca;
    --primary-light: #818cf8;

    --secondary-color: #10b981;
    --secondary-dark: #059669;

    --accent-color: #f59e0b;

    --dark-color: #1f2937;
    --dark-light: #374151;
    --gray-color: #9ca3af;

    --light-color: #f9fafb;
    --white: #ffffff;
    --black: #111827;

    /* Typography */
    --font-primary: 'Inter', sans-serif;
    --font-secondary: 'Poppins', sans-serif;

    /* Spacing Scale */
    --space-xs: 0.5rem;
    --space-sm: 1rem;
    --space-md: 1.5rem;
    --space-lg: 2rem;
    --space-xl: 3rem;
    --space-xxl: 5rem;

    /* Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-full: 9999px;

    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 10px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.12);

    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-normal: 300ms ease;
    --transition-slow: 500ms ease;
}

/* ==========================================================================
   Base HTML & Body
   ========================================================================== */

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    font-family: var(--font-primary);
    color: var(--dark-color);
    background: transparent; /* REQUIRED for animated background */
    line-height: 1.7;
    overflow-x: hidden;
}

/* ==========================================================================
   GLOBAL BACKGROUND ANIMATION (NEW)
   ========================================================================== */

.bg-animation {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    background: linear-gradient(
        120deg,
        var(--primary-color),
        var(--primary-light),
        var(--secondary-color)
    );
    background-size: 400% 400%;
    animation: gradientMove 16s ease infinite;
}

.bg-animation span {
    position: absolute;
    display: block;
    width: 140px;
    height: 140px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    filter: blur(2px);
    animation: floatUp 25s linear infinite;
}

.bg-animation span:nth-child(1) { left: 10%; top: 90%; }
.bg-animation span:nth-child(2) { left: 30%; top: 60%; width: 180px; height: 180px; animation-duration: 32s; }
.bg-animation span:nth-child(3) { left: 55%; top: 85%; animation-duration: 28s; }
.bg-animation span:nth-child(4) { left: 75%; top: 40%; width: 100px; height: 100px; animation-duration: 20s; }
.bg-animation span:nth-child(5) { left: 90%; top: 95%; width: 220px; height: 220px; animation-duration: 40s; }

@keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes floatUp {
    0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0.6;
    }
    100% {
        transform: translateY(-1400px) translateX(200px) rotate(360deg);
        opacity: 0;
    }
}

/* Keep content readable */
section,
.site-header,
.footer {
    position: relative;
    background: rgba(255, 255, 255, 0.96);
}

/* ==========================================================================
   Global Elements
   ========================================================================== */

img {
    max-width: 100%;
    display: block;
}

ul {
    list-style: none;
}

a {
    color: inherit;
    text-decoration: none;
    transition: color var(--transition-normal);
}

a:hover {
    color: var(--primary-color);
}

button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
}

button:focus-visible,
a:focus-visible {
    outline: 3px solid var(--primary-light);
    outline-offset: 3px;
}

/* ==========================================================================
   Layout Helpers
   ========================================================================== */

.container {
    width: 100%;
    max-width: 1280px;
    margin-inline: auto;
    padding-inline: var(--space-md);
}

.section-padding {
    padding: var(--space-xxl) 0;
}

.section-header {
    max-width: 720px;
    margin-inline: auto;
    margin-bottom: var(--space-xl);
    text-align: center;
}

.text-center {
    text-align: center;
}

/* ==========================================================================
   Typography System
   ========================================================================== */

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: var(--font-secondary);
    font-weight: 700;
    line-height: 1.2;
    color: var(--dark-color);
}

h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
}

h2 {
    font-size: clamp(2rem, 4vw, 2.5rem);
}

h3 {
    font-size: 1.75rem;
}

h4 {
    font-size: 1.25rem;
}

p {
    font-size: 1rem;
    color: var(--dark-light);
    margin-bottom: var(--space-md);
}

/* Section Titles */

.section-title {
    position: relative;
    margin-bottom: var(--space-sm);
}

.section-title::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    margin: 12px auto 0;
    background: linear-gradient(
        90deg,
        var(--primary-color),
        var(--secondary-color)
    );
    border-radius: var(--radius-full);
}

.section-subtitle {
    font-size: 1.125rem;
    color: var(--gray-color);
    max-width: 700px;
    margin: 0 auto;
}

/* ==========================================================================
   Animation Hooks (Used by animations.js)
   ========================================================================== */

.animate-fade-up {
    opacity: 0;
    transform: translateY(30px);
}

.animate-fade-in {
    opacity: 0;
}

.animate-hover {
    transition: transform var(--transition-normal),
                box-shadow var(--transition-normal);
}

.animate-hover:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
}

/* ==========================================================================
   Accessibility Utilities
   ========================================================================== */

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* ================= Animated Background Circles ================= */

.animated-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.bg-circle {
    position: absolute;
    bottom: -150px;
    border-radius: 50%;
    background: rgba(147, 197, 253, 0.25); /* light blue */
    animation: floatUp linear infinite;
}

.bg-circle.pink {
    background: rgba(251, 182, 206, 0.25); /* light pink */
}

@keyframes floatUp {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-120vh);
    }
}

@media (prefers-reduced-motion: reduce) {
    .bg-circle {
        animation: none;
    }
}
