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
    
    // Timeline Animation on Scroll - IMPROVED
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Improved isInViewport function with better mobile support
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Consider element in view when it's at least partially visible
        return (
            (rect.top <= windowHeight && rect.top + 100 >= 0) ||
            (rect.bottom <= windowHeight && rect.bottom >= 0) ||
            (rect.top <= 0 && rect.bottom >= windowHeight)
        );
    };
    
    const animateTimeline = () => {
        timelineItems.forEach((item, index) => {
            if (isInViewport(item)) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150); // Shorter staggered delay for mobile
            }
        });
    };
    
    // Initial check with a slight delay to ensure elements are properly rendered
    setTimeout(animateTimeline, 300);
    
    // Throttled scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                animateTimeline();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Also trigger on resize to handle orientation changes
    window.addEventListener('resize', animateTimeline);
    
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
