document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
            const isOpen = mobileMenu.classList.contains('show');
            const toggleIcon = menuToggle.querySelector('i');
            if (toggleIcon) {
                toggleIcon.classList.toggle('fa-bars', !isOpen);
                toggleIcon.classList.toggle('fa-times', isOpen);
            }
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                const toggleIcon = menuToggle.querySelector('i');
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-times');
                    toggleIcon.classList.add('fa-bars');
                }
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

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Sync Cart Count with Local Storage
    const cartCountElem = document.querySelectorAll('.cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    function updateCartCount() {
        cartCountElem.forEach(elem => {
            elem.textContent = cart.length;
        });
    }
    updateCartCount();

    // Optional: Make cart icon clickable to redirect to cart page
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                window.location.href = 'cart.html';
            }
        });
    }

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const observerOptions = {
            threshold: 0.1 // Trigger when 10% of the item is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
});