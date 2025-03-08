// Products Data
const productsData = [
    {
        id: 1,
        name: "جهاز المساج المحمول برو",
        category: "massage",
        price: 899,
        oldPrice: 1200,
        rating: 4.9,
        reviewCount: 124,
        image: "product1.jpg",
        isNew: true,
        isBestseller: true
    },
    {
        id: 2,
        name: "وسادة طبية لدعم الرقبة",
        category: "pillows",
        price: 199,
        oldPrice: 249,
        rating: 4.7,
        reviewCount: 86,
        image: "product2.jpg",
        isNew: false,
        isBestseller: true
    },
    {
        id: 3,
        name: "دعامة الركبة المرنة",
        category: "supports",
        price: 149,
        oldPrice: null,
        rating: 4.5,
        reviewCount: 52,
        image: "product3.jpg",
        isNew: false,
        isBestseller: false
    },
    {
        id: 4,
        name: "جهاز قياس ضغط الدم الرقمي",
        category: "measuring",
        price: 299,
        oldPrice: 399,
        rating: 4.8,
        reviewCount: 73,
        image: "product4.jpg",
        isNew: true,
        isBestseller: false
    },
    {
        id: 5,
        name: "جهاز ركض منزلي احترافي",
        category: "treadmill",
        price: 3999,
        oldPrice: 4500,
        rating: 4.6,
        reviewCount: 38,
        image: "product5.jpg",
        isNew: true,
        isBestseller: false
    },
    {
        id: 6,
        name: "جهاز مساج القدم الكهربائي",
        category: "massage",
        price: 599,
        oldPrice: 699,
        rating: 4.4,
        reviewCount: 64,
        image: "product6.jpg",
        isNew: false,
        isBestseller: true
    },
    {
        id: 7,
        name: "وسادة لومبار لدعم أسفل الظهر",
        category: "pillows",
        price: 159,
        oldPrice: null,
        rating: 4.3,
        reviewCount: 47,
        image: "product7.jpg",
        isNew: false,
        isBestseller: false
    },
    {
        id: 8,
        name: "جهاز قياس السكر المنزلي",
        category: "measuring",
        price: 249,
        oldPrice: 299,
        rating: 4.7,
        reviewCount: 91,
        image: "product8.jpg",
        isNew: false,
        isBestseller: true
    },
    {
        id: 9,
        name: "دعامة الكاحل الطبية",
        category: "supports",
        price: 129,
        oldPrice: 159,
        rating: 4.2,
        reviewCount: 43,
        image: "product9.jpg",
        isNew: false,
        isBestseller: false
    },
    {
        id: 10,
        name: "جهاز ركض قابل للطي",
        category: "treadmill",
        price: 2499,
        oldPrice: 2799,
        rating: 4.5,
        reviewCount: 56,
        image: "product10.jpg",
        isNew: true,
        isBestseller: false
    },
    {
        id: 11,
        name: "وسادة طبية للنوم على الجانب",
        category: "pillows",
        price: 179,
        oldPrice: 229,
        rating: 4.6,
        reviewCount: 62,
        image: "product11.jpg",
        isNew: true,
        isBestseller: false
    },
    {
        id: 12,
        name: "جهاز مساج اليد الذكي",
        category: "massage",
        price: 349,
        oldPrice: 399,
        rating: 4.8,
        reviewCount: 78,
        image: "product12.jpg",
        isNew: false,
        isBestseller: true
    }
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

// State variables
let currentPage = 1;
let productsPerPage = 6;
let filteredProducts = [...productsData];
let currentCategory = 'all';
let currentSort = 'popular';
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Initialize cart from localStorage

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Initialize mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
    });

    // Initialize product display
    displayProducts();
    updatePagination();

    // Event listeners for filters and pagination
    categoryFilter.addEventListener('change', handleCategoryChange);
    sortFilter.addEventListener('change', handleSortChange);
    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);

    // Category cards click event
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            categoryFilter.value = category;
            handleCategoryChange();
        });
    });

    // Testimonial slider
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    showTestimonial(currentTestimonial);

    prevTestimonialBtn.addEventListener('click', () => {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonialCards.length - 1;
        }
        showTestimonial(currentTestimonial);
    });

    nextTestimonialBtn.addEventListener('click', () => {
        currentTestimonial++;
        if (currentTestimonial >= testimonialCards.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            if (i === index) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('شكراً للاشتراك في نشرتنا البريدية!');
            emailInput.value = '';
        }
    });

    // NEW: Add event listener for the "اطلب الآن وخصم 25%" button in the Featured Product section
    const orderButton = document.querySelector('.featured-product .primary-btn');
    if (orderButton) {
        orderButton.addEventListener('click', () => {
            const featuredProduct = {
                name: "جهاز المساج المحمول برو",
                price: 899,
                image: "im/5.jpg"
            };
            addToCart(featuredProduct);
            alert('تمت إضافة جهاز المساج المحمول برو إلى السلة! يرجى اتباع التعليمات لإكمال الشراء.');
            // Optionally redirect: window.location.href = 'checkout.html';
        });
    }
});

// Filter and sort products
function filterAndSortProducts() {
    // Filter by category
    if (currentCategory === 'all') {
        filteredProducts = [...productsData];
    } else {
        filteredProducts = productsData.filter(product => product.category === currentCategory);
    }

    // Sort products
    switch (currentSort) {
        case 'popular':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => {
                if (a.isNew && !b.isNew) return -1;
                if (!a.isNew && b.isNew) return 1;
                return 0;
            });
            break;
    }

    // Reset to first page when filters change
    currentPage = 1;
    
    // Update UI
    displayProducts();
    updatePagination();
}

// Display products
function displayProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Clear products container
    productsContainer.innerHTML = '';

    if (currentProducts.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">لا توجد منتجات متاحة في هذه الفئة</p>';
        return;
    }

    // Create product cards
    currentProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Add badges
        let badges = '';
        if (product.isNew) {
            badges += '<span class="badge new-badge">جديد</span>';
        }
        if (product.isBestseller) {
            badges += '<span class="badge bestseller-badge">الأكثر مبيعاً</span>';
        }
        
        // Format price
        let priceHTML = '';
        if (product.oldPrice) {
            priceHTML = `
                <div class="product-price">
                    <span class="current-price">${product.price} دولار</span>
                    <span class="old-price">${product.oldPrice} دولار</span>
                </div>
            `;
        } else {
            priceHTML = `
                <div class="product-price">
                    <span class="current-price">${product.price} دولار</span>
                </div>
            `;
        }
        
        // Create product HTML
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${badges}
                <div class="product-actions">
                    <button class="action-btn"><i class="far fa-heart"></i></button>
                    <button class="action-btn"><i class="fas fa-shopping-cart"></i></button>
                    <button class="action-btn"><i class="fas fa-eye"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="review-count">(${product.reviewCount})</span>
                </div>
                ${priceHTML}
                <button class="btn add-to-cart-btn">أضف للسلة</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });

    // Add event listeners to action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i');
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const product = productsData.find(p => p.name === productName);

            if (icon.classList.contains('fa-heart')) {
                // Toggle heart icon for wishlist
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                alert(icon.classList.contains('fas') ? 'تمت الإضافة للمفضلة' : 'تمت الإزالة من المفضلة');
            } else if (icon.classList.contains('fa-shopping-cart')) {
                addToCart(product);
                alert(`${productName} تمت إضافته للسلة`);
            } else if (icon.classList.contains('fa-eye')) {
                alert(`عرض تفاصيل المنتج: ${productName}`);
            }
        });
    });

    // Add event listeners to add-to-cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const product = productsData.find(p => p.name === productName);
            addToCart(product);
            alert(`تمت إضافة ${productName} للسلة بنجاح`);
        });
    });
}

// NEW: Function to add products to cart using localStorage
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart updated:', cart);
}

// Generate star rating
function generateStars(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    totalPagesElem.textContent = totalPages;
    currentPageElem.textContent = currentPage;
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;

    // Debug: Log pagination state
    console.log(`Pagination updated: Page ${currentPage} of ${totalPages}, Products: ${filteredProducts.length}`);
}

// Event handlers
function handleCategoryChange() {
    currentCategory = categoryFilter.value;
    filterAndSortProducts();
}

function handleSortChange() {
    currentSort = sortFilter.value;
    filterAndSortProducts();
}

function goToPrevPage() {
    if (currentPage > 1) {
        console.log('Previous page clicked');
        currentPage--;
        displayProducts();
        updatePagination();
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage < totalPages) {
        console.log('Next page clicked');
        currentPage++;
        displayProducts();
        updatePagination();
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
    }
}