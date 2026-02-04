/* css/responsive.css – Upgraded Mobile */
@media (max-width: 768px) {
    .nav-container {
        position: relative;
    }
    .nav-menu {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(0,0,0,0.95);
        flex-direction: column;
        padding: 2rem;
        gap: 1rem;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
    }
    .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }
    .menu-toggle {
        display: flex;
    }
    .nav-cta {
        margin-top: 1rem;
        text-align: center;
    }
    .hero-content {
        padding: var(--space-xl) var(--space-md);
    }
    .hero-title {
        font-size: 3rem;
    }
    .hero-subtitle {
        font-size: 1.8rem;
    }
    .cards-grid, .services-grid {
        grid-template-columns: 1fr;
        gap: var(--space-md);
    }
    .footer-grid {
        grid-template-columns: 1fr;
        gap: var(--space-md);
    }
    .social-icons {
        justify-content: center;
    }
    .hero-buttons {
        flex-direction: column;
        gap: 1rem;
    }
    .subscribe-form {
        max-width: 100%;
    }
}
@media (max-width: 480px) {
    .container {
        padding: 0 var(--space-sm);
    }
    .section-padding {
        padding: var(--space-xl) 0;
    }
}
