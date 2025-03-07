document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle (Same as Homepage)
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
        const isOpen = mobileMenu.classList.contains('show');
        menuToggle.querySelector('i').classList.toggle('fa-bars', !isOpen);
        menuToggle.querySelector('i').classList.toggle('fa-times', isOpen);
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // Sticky Header (Same as Homepage)
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        header.classList.toggle('sticky', window.scrollY > 50);
    });

    // Smooth Scrolling for Anchor Links (Same as Homepage)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Timeline Animation on Scroll
    const timelineItems = document.querySelectorAll('.timeline-item');

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const animateTimeline = () => {
        timelineItems.forEach((item, index) => {
            if (isInViewport(item)) {
                item.classList.add('visible');
                item.style.transitionDelay = `${index * 0.2}s`; // Staggered animation
            }
        });
    };

    // Initial check on load
    animateTimeline();

    // Check on scroll
    window.addEventListener('scroll', animateTimeline);

    // Team Card Hover Effect (Optional Enhancement)
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.team-image').style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.team-image').style.transform = 'scale(1)';
        });
    });
});