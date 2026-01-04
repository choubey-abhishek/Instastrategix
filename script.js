// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close menu on link click (mobile)
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Contact Form (EmailJS)
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('contact-form')) {
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS Public Key

        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();

            // Validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const status = document.getElementById('status');

            if (!name || !email || !subject || !message) {
                status.innerHTML = '<p style="color: red;">All fields are required!</p>';
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                status.innerHTML = '<p style="color: red;">Invalid email address!</p>';
                return;
            }

            // Send email
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(() => {
                    status.innerHTML = '<p style="color: green;">Message sent successfully!</p>';
                    this.reset();
                }, (error) => {
                    status.innerHTML = '<p style="color: red;">Failed to send message. Please try again.</p>';
                    console.error('EmailJS error:', error);
                });
        });
    }
});

/* EmailJS Configuration Instructions:
1. Sign up at https://www.emailjs.com/ and connect your Gmail (instastrategixdigitalcreator@gmail.com).
2. Create a Service (Service ID: e.g., service_xxxxxx).
3. Create an Email Template (Template ID: e.g., template_xxxxxx) with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}.
4. Get your Public Key from Account > API Keys.
5. Replace 'YOUR_PUBLIC_KEY', 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID' above.
6. Test the form – emails will go to your Gmail.
*/
// Parallax Scrolling Effect
const parallaxElements = document.querySelectorAll('.parallax-element');

window.addEventListener('scroll', () => {
    const offset = window.pageYOffset;
    
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.speed);
        const yPos = offset * speed;
        el.style.transform = `translateY(${yPos}px)`;
    });
});

// Optional: Trigger on load for initial position
window.dispatchEvent(new Event('scroll'));
