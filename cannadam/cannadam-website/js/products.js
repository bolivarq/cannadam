// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const categoryButtons = document.querySelectorAll('.category-btn');
    const strainFilter = document.getElementById('strain-type');
    const thcFilter = document.getElementById('thc-range');
    const priceFilter = document.getElementById('price-range');
    const sortFilter = document.getElementById('sort-by');
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');
    const productCards = document.querySelectorAll('.product-card');
    const resultsCount = document.getElementById('results-count');
    const loadMoreBtn = document.querySelector('.load-more');
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // State
    let currentFilters = {
        category: 'all',
        strain: 'all',
        thc: 'all',
        price: 'all'
    };
    let currentSort = 'popular';
    let currentView = 'grid';

    // Initialize
    init();

    function init() {
        setupEventListeners();
        updateResults();
        loadFavorites();
    }

    function setupEventListeners() {
        // Category filter buttons
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active state
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update filter
                currentFilters.category = this.getAttribute('data-category');
                updateResults();
            });
        });

        // Advanced filters
        strainFilter.addEventListener('change', function() {
            currentFilters.strain = this.value;
            updateResults();
        });

        thcFilter.addEventListener('change', function() {
            currentFilters.thc = this.value;
            updateResults();
        });

        priceFilter.addEventListener('change', function() {
            currentFilters.price = this.value;
            updateResults();
        });

        // Sort filter
        sortFilter.addEventListener('change', function() {
            currentSort = this.value;
            sortProducts();
        });

        // View toggle buttons
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                viewButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                currentView = this.getAttribute('data-view');
                toggleView();
            });
        });

        // Load more button
        loadMoreBtn.addEventListener('click', loadMoreProducts);

        // Favorite buttons
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                toggleFavorite(this);
            });
        });

        // Add to cart buttons
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                addToCart(this);
            });
        });
    }

    function updateResults() {
        let visibleCount = 0;
        
        productCards.forEach(card => {
            if (shouldShowCard(card)) {
                card.classList.remove('hidden', 'filtered-out');
                visibleCount++;
            } else {
                card.classList.add('filtered-out');
            }
        });

        // Update results count
        resultsCount.textContent = `Mostrando ${visibleCount} productos`;
        
        // Sort visible products
        sortProducts();
    }

    function shouldShowCard(card) {
        const cardCategory = card.getAttribute('data-category');
        const cardStrain = card.getAttribute('data-strain');
        const cardThc = card.getAttribute('data-thc');
        const cardPrice = card.getAttribute('data-price');

        // Category filter
        if (currentFilters.category !== 'all' && cardCategory !== currentFilters.category) {
            return false;
        }

        // Strain filter
        if (currentFilters.strain !== 'all' && cardStrain !== currentFilters.strain && cardStrain !== 'all') {
            return false;
        }

        // THC filter
        if (currentFilters.thc !== 'all' && cardThc !== currentFilters.thc) {
            return false;
        }

        // Price filter
        if (currentFilters.price !== 'all' && cardPrice !== currentFilters.price) {
            return false;
        }

        return true;
    }

    function sortProducts() {
        const visibleCards = Array.from(productCards).filter(card => 
            !card.classList.contains('filtered-out') && !card.classList.contains('hidden')
        );

        // Sort logic would go here
        // For now, we'll just maintain the original order
        // In a real implementation, you'd sort based on:
        // - popular: number of reviews/sales
        // - price-low/high: extract price from text
        // - rating: extract rating from stars
        // - newest: based on date added

        console.log(`Sorting ${visibleCards.length} products by ${currentSort}`);
    }

    function toggleView() {
        if (currentView === 'list') {
            productsGrid.classList.add('list-view');
        } else {
            productsGrid.classList.remove('list-view');
        }
    }

    function loadMoreProducts() {
        // Simulate loading more products
        loadMoreBtn.innerHTML = '<span class="loading-spinner"></span> Cargando...';
        
        setTimeout(() => {
            // In a real app, this would make an API call
            console.log('Loading more products...');
            loadMoreBtn.innerHTML = 'Cargar Más Productos';
            
            // For demo, we could clone some existing cards or show a message
            showMessage('No hay más productos para mostrar');
        }, 1500);
    }

    function toggleFavorite(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        
        button.classList.toggle('active');
        
        if (button.classList.contains('active')) {
            button.innerHTML = '❤️';
            saveFavorite(productName);
            showMessage(`${productName} agregado a favoritos`);
        } else {
            button.innerHTML = '♡';
            removeFavorite(productName);
            showMessage(`${productName} removido de favoritos`);
        }
    }

    function addToCart(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Animate button
        const originalText = button.textContent;
        button.textContent = 'Agregado ✓';
        button.style.background = 'var(--accent-green, #2ecc71)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);

        // Save to cart (localStorage for demo)
        addItemToCart({
            name: productName,
            price: productPrice,
            image: productCard.querySelector('.product-image img').src
        });

        showMessage(`${productName} agregado al carrito`);
    }

    function saveFavorite(productName) {
        const favorites = getFavorites();
        if (!favorites.includes(productName)) {
            favorites.push(productName);
            localStorage.setItem('cannadam_favorites', JSON.stringify(favorites));
        }
    }

    function removeFavorite(productName) {
        const favorites = getFavorites();
        const index = favorites.indexOf(productName);
        if (index > -1) {
            favorites.splice(index, 1);
            localStorage.setItem('cannadam_favorites', JSON.stringify(favorites));
        }
    }

    function getFavorites() {
        const favorites = localStorage.getItem('cannadam_favorites');
        return favorites ? JSON.parse(favorites) : [];
    }

    function loadFavorites() {
        const favorites = getFavorites();
        favoriteButtons.forEach(button => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            if (favorites.includes(productName)) {
                button.classList.add('active');
                button.innerHTML = '❤️';
            }
        });
    }

    function addItemToCart(item) {
        const cart = getCart();
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({
                ...item,
                quantity: 1,
                id: Date.now() // Simple ID generation
            });
        }
        
        localStorage.setItem('cannadam_cart', JSON.stringify(cart));
        updateCartCount();
    }

    function getCart() {
        const cart = localStorage.getItem('cannadam_cart');
        return cart ? JSON.parse(cart) : [];
    }

    function updateCartCount() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        // Update cart count in header if element exists
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    function showMessage(message, type = 'success') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--primary-color)' : '#e74c3c'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideInUp 0.3s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Search functionality (if search input exists)
    const searchInput = document.querySelector('.nav-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
                const dispensary = card.querySelector('.product-dispensary').textContent.toLowerCase();
                
                const matches = productName.includes(query) || 
                               productDesc.includes(query) || 
                               dispensary.includes(query);
                
                if (matches || query === '') {
                    card.classList.remove('search-hidden');
                } else {
                    card.classList.add('search-hidden');
                }
            });
            
            // Update count
            const visibleCards = document.querySelectorAll('.product-card:not(.search-hidden):not(.filtered-out):not(.hidden)');
            resultsCount.textContent = `Mostrando ${visibleCards.length} productos`;
        });
    }

    // Initialize cart count on page load
    updateCartCount();
});

// CSS animations for toasts (add to head if not in CSS file)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    .product-card.search-hidden {
        display: none !important;
    }
`;
document.head.appendChild(style);