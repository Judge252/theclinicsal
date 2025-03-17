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

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Cart Count Sync
    const cartCountElem = document.querySelectorAll('.cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    function updateCartCount() {
        cartCountElem.forEach(elem => {
            if (elem) elem.textContent = cart.length;
        });
    }
    updateCartCount();

    // Contact Icon Dropdown
    const contactIcon = document.querySelector('.contact-icon');
    const contactOptions = document.querySelector('.contact-options');
    if (contactIcon && contactOptions) {
        contactIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent any parent event handlers from interfering
            contactOptions.classList.toggle('show');
            // Close dropdown when clicking outside
            document.addEventListener('click', function closeDropdown(event) {
                if (!contactIcon.contains(event.target) && !contactOptions.contains(event.target)) {
                    contactOptions.classList.remove('show');
                    document.removeEventListener('click', closeDropdown);
                }
            }, { once: true }); // Ensure the listener is removed after one execution
        });

        // Prevent hover interference (optional, since CSS will handle this)
        contactIcon.addEventListener('mouseover', (e) => {
            e.stopPropagation(); // Prevent hover from triggering unwanted behavior
        });
    }

    // Products Data
    const productsData = [
        { id: 1, name: "جهاز المساج المحمول برو", category: "massage", price: 899, oldPrice: 1200, rating: 4.9, reviewCount: 124, image: "product1.jpg", isNew: true, isBestseller: true },
        { id: 2, name: "وسادة طبية لدعم الرقبة", category: "pillows", price: 199, oldPrice: 249, rating: 4.7, reviewCount: 86, image: "product2.jpg", isNew: false, isBestseller: true },
        { id: 3, name: "جهاز قياس ضغط الدم الرقمي", category: "measuring", price: 299, oldPrice: 399, rating: 4.8, reviewCount: 73, image: "product4.jpg", isNew: true, isBestseller: false },
        { id: 4, name: "جهاز ركض منزلي احترافي", category: "treadmill", price: 3999, oldPrice: 4500, rating: 4.6, reviewCount: 38, image: "product5.jpg", isNew: true, isBestseller: false },
        { id: 5, name: "جهاز مساج القدم الكهربائي", category: "massage", price: 599, oldPrice: 699, rating: 4.4, reviewCount: 64, image: "product6.jpg", isNew: false, isBestseller: true },
        { id: 6, name: "وسادة لومبار لدعم أسفل الظهر", category: "pillows", price: 159, oldPrice: null, rating: 4.3, reviewCount: 47, image: "product7.jpg", isNew: false, isBestseller: false },
        { id: 7, name: "جهاز قياس السكر المنزلي", category: "measuring", price: 249, oldPrice: 299, rating: 4.7, reviewCount: 91, image: "product8.jpg", isNew: false, isBestseller: true },
        { id: 8, name: "جهاز ركض قابل للطي", category: "treadmill", price: 2499, oldPrice: 2799, rating: 4.5, reviewCount: 56, image: "product10.jpg", isNew: true, isBestseller: false },
        { id: 9, name: "وسادة طبية للنوم على الجانب", category: "pillows", price: 179, oldPrice: 229, rating: 4.6, reviewCount: 62, image: "product11.jpg", isNew: true, isBestseller: false },
        { id: 10, name: "جهاز مساج اليد الذكي", category: "massage", price: 349, oldPrice: 399, rating: 4.8, reviewCount: 78, image: "product12.jpg", isNew: false, isBestseller: true },
        { id: 11, name: "عكاز تقليدي", category: "supports", price: 99, oldPrice: null, rating: 4.5, reviewCount: 50, image: "im/eldry/O404504_3152017131858-9-9.png", isNew: false, isBestseller: false },
        { id: 12, name: "مشايه لكبار السن Rollator Walker", category: "supports", price: 499, oldPrice: 599, rating: 4.7, reviewCount: 85, image: "im/eldry/H357049_315201710530-9-29.png", isNew: true, isBestseller: true },
        { id: 13, name: "عكاز ٤ نقاط", category: "supports", price: 149, oldPrice: 179, rating: 4.6, reviewCount: 60, image: "im/eldry/Cat_240429_866.jpg", isNew: false, isBestseller: false },
        { id: 14, name: "عكاكيز canadian crutches", category: "supports", price: 199, oldPrice: 249, rating: 4.4, reviewCount: 45, image: "im/eldry/Crutches8.jpg", isNew: false, isBestseller: false },
        { id: 15, name: "عكاكيز axillary crutches", category: "supports", price: 179, oldPrice: 219, rating: 4.5, reviewCount: 55, image: "im/eldry/25_4_1.jpg", isNew: false, isBestseller: false }
    ];

    // DOM Elements
    const productsContainer = document.getElementById('products-container');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageElem = document.querySelector('.current-page');
    const totalPagesElem = document.querySelector('.total-pages');
    const categoryCards = document.querySelectorAll('.category-card');

    // State Variables
    let currentPage = 1;
    const productsPerPage = 6;
    let filteredProducts = [...productsData];
    let currentCategory = 'all';
    let currentSort = 'popular';

    // Initialize
    filterAndSortProducts();
    displayProducts();
    updatePagination();

    // Event Listeners
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            currentCategory = categoryFilter.value;
            filterAndSortProducts();
        });
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', () => {
            currentSort = sortFilter.value;
            filterAndSortProducts();
        });
    }
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayProducts();
                updatePagination();
            }
        });
    }
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts();
                updatePagination();
            }
        });
    }
    if (categoryCards) {
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                currentCategory = card.dataset.category;
                if (categoryFilter) categoryFilter.value = currentCategory;
                filterAndSortProducts();
            });
        });
    }

    // Filter and Sort Products
    function filterAndSortProducts() {
        filteredProducts = currentCategory === 'all' 
            ? [...productsData] 
            : productsData.filter(product => product.category === currentCategory);

        switch (currentSort) {
            case 'popular': filteredProducts.sort((a, b) => b.rating - a.rating); break;
            case 'price-low': filteredProducts.sort((a, b) => a.price - b.price); break;
            case 'price-high': filteredProducts.sort((a, b) => b.price - a.price); break;
            case 'newest': filteredProducts.sort((a, b) => (a.isNew && !b.isNew ? -1 : 0)); break;
        }

        currentPage = 1;
        displayProducts();
        updatePagination();
    }

    // Display Products
    function displayProducts() {
        if (!productsContainer) return;
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = filteredProducts.slice(startIndex, endIndex);

        productsContainer.innerHTML = '';
        currentProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const badges = `${product.isNew ? '<span class="badge new-badge">جديد</span>' : ''}${product.isBestseller ? '<span class="badge bestseller-badge">الأكثر مبيعاً</span>' : ''}`;
            const priceHTML = product.oldPrice 
                ? `<div class="product-price"><span class="current-price">${product.price} دولار</span><span class="old-price">${product.oldPrice} دولار</span></div>`
                : `<div class="product-price"><span class="current-price">${product.price} دولار</span></div>`;

            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${badges}
                    <div class="product-actions">
                        <button class="action-btn"><i class="far fa-heart"></i></button>
                        <button class="action-btn add-to-cart"><i class="fas fa-shopping-cart"></i></button>
                        <button class="action-btn"><i class="fas fa-eye"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">${generateStars(product.rating)}</div>
                        <span class="review-count">(${product.reviewCount})</span>
                    </div>
                    ${priceHTML}
                    <button class="btn add-to-cart-btn">أضف للسلة</button>
                </div>
            `;

            productsContainer.appendChild(productCard);

            // Add to Cart Functionality
            productCard.querySelectorAll('.add-to-cart, .add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    cart.push(product);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    alert(`تمت إضافة ${product.name} للسلة`);
                });
            });
        });
    }

    // Generate Stars
    function generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
        if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
        for (let i = 0; i < 5 - fullStars - (halfStar ? 1 : 0); i++) stars += '<i class="far fa-star"></i>';
        return stars;
    }

    // Update Pagination
    function updatePagination() {
        if (!totalPagesElem || !currentPageElem) return;
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        totalPagesElem.textContent = totalPages || 1;
        currentPageElem.textContent = currentPage;
        if (prevPageBtn) prevPageBtn.disabled = currentPage === 1;
        if (nextPageBtn) nextPageBtn.disabled = currentPage === totalPages;
    }
});
