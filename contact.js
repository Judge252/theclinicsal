document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('show');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-times', isOpen);
        });

        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 50);
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const formFields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            message: document.getElementById('message')
        };

        const submitBtn = contactForm.querySelector('.submit-btn');

        // Real-time Validation
        Object.values(formFields).forEach(field => {
            field.addEventListener('input', () => {
                validateField(field);
                toggleSubmitButton();
            });
        });

        // Form Submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (validateForm()) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

                try {
                    const formData = {
                        name: formFields.name.value.trim(),
                        email: formFields.email.value.trim(),
                        phone: formFields.phone.value.trim(),
                        message: formFields.message.value.trim(),
                        timestamp: new Date().toISOString()
                    };

                    await simulateApiCall(formData);
                    showSuccessMessage();
                    contactForm.reset();
                    clearValidationStyles();

                } catch (error) {
                    showErrorMessage('حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.');
                    console.error('Form submission error:', error);
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة';
                }
            }
        });

        // Validation Functions
        function validateField(field) {
            let isValid = false;

            switch (field.id) {
                case 'name':
                    isValid = field.value.trim().length >= 2;
                    break;
                case 'email':
                    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
                    break;
                case 'phone':
                    isValid = /^\+?\d{9,15}$/.test(field.value.trim().replace(/\s/g, ''));
                    break;
                case 'message':
                    isValid = field.value.trim().length >= 10;
                    break;
            }

            field.classList.toggle('valid', isValid);
            field.classList.toggle('invalid', !isValid);
            return isValid;
        }

        function validateForm() {
            return Object.values(formFields).every(field => validateField(field));
        }

        function toggleSubmitButton() {
            submitBtn.disabled = !Object.values(formFields).every(field => field.value.trim().length > 0);
        }

        function clearValidationStyles() {
            Object.values(formFields).forEach(field => {
                field.classList.remove('valid', 'invalid');
            });
        }

        // Simulated API Call (Replace with real endpoint)
        function simulateApiCall(data) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Form submitted:', data);
                    resolve();
                }, 1500);
            });
        }

        // Success Message
        function showSuccessMessage() {
            const successDiv = document.createElement('div');
            successDiv.className = 'form-message success';
            successDiv.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</p>
            `;
            contactForm.prepend(successDiv);
            setTimeout(() => successDiv.remove(), 5000);
        }

        // Error Message
        function showErrorMessage(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-message error';
            errorDiv.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            `;
            contactForm.prepend(errorDiv);
            setTimeout(() => errorDiv.remove(), 5000);
        }
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Social Links Animation
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });
});