// ============================================================================
// Form Validation for Contact Page - Instastrategix
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // ============================================================================
    // Validation Functions
    // ============================================================================
    
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(nameInput, nameError, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        } else {
            clearError(nameInput, nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (email === '') {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!emailPattern.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            clearError(emailInput, emailError);
            return true;
        }
    }
    
    function validateSubject() {
        const subject = subjectInput.value.trim();
        
        if (subject === '') {
            showError(subjectInput, subjectError, 'Subject is required');
            return false;
        } else if (subject.length < 5) {
            showError(subjectInput, subjectError, 'Subject must be at least 5 characters');
            return false;
        } else {
            clearError(subjectInput, subjectError);
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            showError(messageInput, messageError, 'Message is required');
            return false;
        } else if (message.length < 20) {
            showError(messageInput, messageError, 'Message must be at least 20 characters');
            return false;
        } else {
            clearError(messageInput, messageError);
            return true;
        }
    }
    
    // ============================================================================
    // Helper Functions
    // ============================================================================
    
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    }
    
    // ============================================================================
    // Real-time Validation
    // ============================================================================
    
    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);
    
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
    
    subjectInput.addEventListener('input', validateSubject);
    subjectInput.addEventListener('blur', validateSubject);
    
    messageInput.addEventListener('input', validateMessage);
    messageInput.addEventListener('blur', validateMessage);
    
    // ============================================================================
    // Form Submission
    // ============================================================================
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Disable submit button to prevent multiple submissions
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // ============================================================================
            // EMAILJS INTEGRATION SETUP INSTRUCTIONS:
            // ============================================================================
            /*
            1. Sign up for a free EmailJS account at https://www.emailjs.com/
            2. Create an email template in EmailJS dashboard
            3. Get your:
               - User ID
               - Service ID
               - Template ID
            4. Uncomment and configure the EmailJS code below:
            
            // Initialize EmailJS with your User ID
            emailjs.init("YOUR_USER_ID");
            
            // Prepare template parameters
            const templateParams = {
                from_name: nameInput.value.trim(),
                from_email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim(),
                to_email: "instastrategixdigitalcreator@gmail.com"
            };
            
            // Send email using EmailJS
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessMessage();
                }, function(error) {
                    console.log('FAILED...', error);
                    showErrorMessage("Failed to send message. Please try again later.");
                });
            */
            
            // ============================================================================
            // For demonstration - simulate API call with timeout
            // ============================================================================
            setTimeout(function() {
                // Show success message
                formSuccess.style.display = 'block';
                contactForm.reset();
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-control.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
    
    // ============================================================================
    // Success/Error Message Functions
    // ============================================================================
    
    function showSuccessMessage() {
        formSuccess.style.display = 'block';
        contactForm.reset();
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);
    }
    
    function showErrorMessage(message) {
        // Create error message element if it doesn't exist
        let errorAlert = document.getElementById('formError');
        
        if (!errorAlert) {
            errorAlert = document.createElement('div');
            errorAlert.id = 'formError';
            errorAlert.className = 'form-error-alert';
            errorAlert.style.cssText = `
                background-color: #fee2e2;
                color: #dc2626;
                padding: var(--space-md);
                border-radius: var(--radius-md);
                margin-bottom: var(--space-md);
                border-left: 4px solid #dc2626;
            `;
            contactForm.insertBefore(errorAlert, contactForm.firstChild);
        }
        
        errorAlert.textContent = message;
        errorAlert.style.display = 'block';
        
        // Scroll to error message
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            errorAlert.style.display = 'none';
        }, 5000);
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
    
    // ============================================================================
    // Input Character Counters (Optional Enhancement)
    // ============================================================================
    
    function addCharacterCounters() {
        // Add character counter for message
        const messageCounter = document.createElement('div');
        messageCounter.className = 'char-counter';
        messageCounter.style.cssText = `
            font-size: 0.875rem;
            color: var(--gray-color);
            text-align: right;
            margin-top: 4px;
        `;
        messageInput.parentElement.appendChild(messageCounter);
        
        function updateMessageCounter() {
            const length = messageInput.value.length;
            messageCounter.textContent = `${length}/500 characters`;
            
            if (length > 450) {
                messageCounter.style.color = '#f59e0b';
            } else if (length > 490) {
                messageCounter.style.color = '#ef4444';
            } else {
                messageCounter.style.color = 'var(--gray-color)';
            }
        }
        
        messageInput.addEventListener('input', updateMessageCounter);
        updateMessageCounter(); // Initial update
    }
    
    // Uncomment to enable character counters
    // addCharacterCounters();
});
