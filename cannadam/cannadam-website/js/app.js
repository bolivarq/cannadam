// ==========================================
// CANNADAM - JAVASCRIPT PRINCIPAL
// ==========================================

// Variables globales
let map, heroMap;
let dispensaries = [];
let products = [];
let userLocation = null;

// Configuración
const CONFIG = {
    mapCenter: [43.6532, -79.3832], // Toronto
    mapZoom: 12,
    apiEndpoints: {
        dispensaries: '/api/dispensaries',
        products: '/api/products',
        search: '/api/search'
    }
};

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Verificar si ya se verificó la edad
    if (!localStorage.getItem('ageVerified')) {
        showAgeVerification();
    } else {
        initializeFeatures();
    }
}

function initializeFeatures() {
    initializeNavigation();
    initializeMaps();
    initializeSearch();
    initializeFilters();
    loadDispensaries();
    loadProducts();
    initializeGeolocation();
    initializeScrollEffects();
}

// ==========================================
// VERIFICACIÓN DE EDAD
// ==========================================

function showAgeVerification() {
    const modal = document.getElementById('age-verification-modal');
    const yesBtn = document.getElementById('age-yes');
    const noBtn = document.getElementById('age-no');
    
    modal.style.display = 'flex';
    
    yesBtn.addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        modal.style.display = 'none';
        initializeFeatures();
        
        // Animación de bienvenida
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    noBtn.addEventListener('click', function() {
        alert('Debes tener al menos 21 años para acceder a este sitio.');
        window.location.href = 'https://google.com';
    });
}

// ==========================================
// NAVEGACIÓN
// ==========================================

function initializeNavigation() {
    const header = document.querySelector('.main-header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Scroll del header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Menú móvil
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Enlaces suaves
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// MAPAS
// ==========================================

function initializeMaps() {
    // Mapa Hero
    if (document.getElementById('hero-map')) {
        heroMap = L.map('hero-map', {
            zoomControl: false,
            scrollWheelZoom: false,
            dragging: false,
            touchZoom: false,
            doubleClickZoom: false
        }).setView(CONFIG.mapCenter, CONFIG.mapZoom);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(heroMap);
        
        // Agregar algunos pins de ejemplo
        addSamplePins(heroMap);
    }
    
    // Mapa Principal
    if (document.getElementById('main-map')) {
        map = L.map('main-map').setView(CONFIG.mapCenter, CONFIG.mapZoom);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Agregar pins de dispensarios
        addDispensaryPins();
    }
}

function addSamplePins(mapInstance) {
    const sampleLocations = [
        { lat: 43.6532, lng: -79.3832, name: "Green Paradise", rating: 4.8, distance: "0.5 km" },
        { lat: 43.6612, lng: -79.3803, name: "Cannabis Plus", rating: 4.6, distance: "1.2 km" },
        { lat: 43.6482, lng: -79.3892, name: "Leaf & Co", rating: 4.9, distance: "0.8 km" }
    ];
    
    sampleLocations.forEach(location => {
        const marker = L.marker([location.lat, location.lng]).addTo(mapInstance);
        marker.bindPopup(`
            <div class="map-popup">
                <h4>${location.name}</h4>
                <p>⭐ ${location.rating} • ${location.distance}</p>
                <button class="popup-btn">Ver detalles</button>
            </div>
        `);
    });
}

function addDispensaryPins() {
    if (!map) return;
    
    // Esta función se llamará cuando se carguen los datos reales
    dispensaries.forEach(dispensary => {
        if (dispensary.lat && dispensary.lng) {
            const marker = L.marker([dispensary.lat, dispensary.lng]).addTo(map);
            marker.bindPopup(createDispensaryPopup(dispensary));
        }
    });
}

function createDispensaryPopup(dispensary) {
    return `
        <div class="dispensary-popup">
            <h4>${dispensary.name}</h4>
            <p class="dispensary-address">${dispensary.address}</p>
            <div class="dispensary-rating">
                <span class="stars">${'★'.repeat(Math.floor(dispensary.rating))}</span>
                <span>${dispensary.rating} (${dispensary.reviews} reseñas)</span>
            </div>
            <div class="dispensary-info">
                <span class="dispensary-type">${dispensary.type}</span>
                <span class="dispensary-distance">${dispensary.distance}</span>
            </div>
            <div class="popup-actions">
                <button class="btn-popup-primary" onclick="viewDispensary(${dispensary.id})">
                    Ver detalles
                </button>
                <button class="btn-popup-secondary" onclick="getDirections(${dispensary.lat}, ${dispensary.lng})">
                    Direcciones
                </button>
            </div>
        </div>
    `;
}

// ==========================================
// BÚSQUEDA Y GEOLOCALIZACIÓN
// ==========================================

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const locationBtn = document.querySelector('.location-btn');
    const startSearchBtn = document.getElementById('start-search');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value;
            performSearch(query);
        });
    }
    
    if (locationBtn) {
        locationBtn.addEventListener('click', getCurrentLocation);
    }
    
    if (startSearchBtn) {
        startSearchBtn.addEventListener('click', function() {
            document.getElementById('interactive-map').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

function performSearch(query) {
    if (!query.trim()) return;
    
    console.log('Buscando:', query);
    
    // Aquí implementarías la llamada a la API
    // Por ahora, simulamos una búsqueda
    showLoadingState();
    
    setTimeout(() => {
        const results = simulateSearchResults(query);
        displaySearchResults(results);
        hideLoadingState();
    }, 1000);
}

function simulateSearchResults(query) {
    // Simulación de resultados de búsqueda
    return {
        dispensaries: [
            {
                id: 1,
                name: "Green Paradise",
                address: "123 Main St, Toronto, ON",
                rating: 4.8,
                reviews: 120,
                type: "Médico & Recreativo",
                distance: "0.5 km",
                image: "assets/dispensary-1.jpg"
            },
            {
                id: 2,
                name: "Cannabis Plus",
                address: "456 Queen St, Toronto, ON",
                rating: 4.6,
                reviews: 98,
                type: "Recreativo",
                distance: "1.2 km",
                image: "assets/dispensary-2.jpg"
            }
        ],
        products: [
            {
                id: 1,
                name: "Blue Dream",
                type: "Hybrid",
                thc: "20%",
                cbd: "2%",
                price: "$35/g",
                image: "assets/product-1.jpg"
            }
        ]
    };
}

function displaySearchResults(results) {
    const dispensaryList = document.getElementById('dispensary-list');
    
    if (dispensaryList && results.dispensaries) {
        dispensaryList.innerHTML = results.dispensaries.map(dispensary => 
            createDispensaryCard(dispensary)
        ).join('');
    }
}

function createDispensaryCard(dispensary) {
    return `
        <div class="dispensary-card" data-id="${dispensary.id}">
            <div class="dispensary-image">
                <img src="${dispensary.image}" alt="${dispensary.name}" onerror="this.src='assets/placeholder-dispensary.jpg'">
                <div class="dispensary-badge">${dispensary.type}</div>
            </div>
            <div class="dispensary-content">
                <h4 class="dispensary-name">${dispensary.name}</h4>
                <p class="dispensary-address">${dispensary.address}</p>
                <div class="dispensary-rating">
                    <div class="stars">${'★'.repeat(Math.floor(dispensary.rating))}</div>
                    <span class="rating-text">${dispensary.rating} (${dispensary.reviews})</span>
                </div>
                <div class="dispensary-meta">
                    <span class="distance">${dispensary.distance}</span>
                    <button class="btn-view-details" onclick="viewDispensary(${dispensary.id})">
                        Ver detalles
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// GEOLOCALIZACIÓN
// ==========================================

function initializeGeolocation() {
    if ('geolocation' in navigator) {
        // Intentar obtener ubicación automáticamente
        navigator.geolocation.getCurrentPosition(
            position => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                updateMapsWithUserLocation();
            },
            error => {
                console.log('Error obteniendo ubicación:', error);
            },
            { timeout: 10000 }
        );
    }
}

function getCurrentLocation() {
    if ('geolocation' in navigator) {
        const locationBtn = document.querySelector('.location-btn');
        locationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        navigator.geolocation.getCurrentPosition(
            position => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                locationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
                updateMapsWithUserLocation();
                performNearbySearch();
            },
            error => {
                locationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
                alert('No se pudo obtener tu ubicación. Por favor, ingresa tu dirección manualmente.');
            }
        );
    }
}

function updateMapsWithUserLocation() {
    if (userLocation) {
        if (map) {
            map.setView([userLocation.lat, userLocation.lng], 14);
            L.marker([userLocation.lat, userLocation.lng])
                .addTo(map)
                .bindPopup('Tu ubicación');
        }
        
        if (heroMap) {
            heroMap.setView([userLocation.lat, userLocation.lng], 14);
        }
    }
}

function performNearbySearch() {
    if (userLocation) {
        performSearch('dispensarios cerca de mi');
    }
}

// ==========================================
// FILTROS
// ==========================================

function initializeFilters() {
    // Filtros de mapa
    const mapFilters = document.querySelectorAll('.filter-btn');
    mapFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            mapFilters.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterDispensaries(this.dataset.filter);
        });
    });
    
    // Filtros de productos
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProducts(this.dataset.category);
        });
    });
}

function filterDispensaries(filter) {
    console.log('Filtrando dispensarios por:', filter);
    // Implementar lógica de filtrado
    loadDispensaries(filter);
}

function filterProducts(category) {
    console.log('Filtrando productos por:', category);
    // Implementar lógica de filtrado
    loadProducts(category);
}

// ==========================================
// CARGA DE DATOS
// ==========================================

function loadDispensaries(filter = 'all') {
    // Simulación de datos de dispensarios
    dispensaries = [
        {
            id: 1,
            name: "Green Paradise",
            address: "123 Main St, Toronto, ON",
            lat: 43.6532,
            lng: -79.3832,
            rating: 4.8,
            reviews: 120,
            type: "medical",
            typeLabel: "Médico & Recreativo",
            distance: "0.5 km",
            image: "imgs/treehouse_cannabis_dispensary_exterior_night_modern.jpg",
            hours: "9:00 AM - 10:00 PM",
            phone: "+1-416-555-0123"
        },
        {
            id: 2,
            name: "Cannabis Plus",
            address: "456 Queen St, Toronto, ON",
            lat: 43.6612,
            lng: -79.3803,
            rating: 4.6,
            reviews: 98,
            type: "recreational",
            typeLabel: "Recreativo",
            distance: "1.2 km",
            image: "imgs/common_citizen_modern_cannabis_dispensary_exterior.jpg",
            hours: "10:00 AM - 11:00 PM",
            phone: "+1-416-555-0124"
        },
        {
            id: 3,
            name: "Leaf & Co",
            address: "789 King St, Toronto, ON",
            lat: 43.6482,
            lng: -79.3892,
            rating: 4.9,
            reviews: 156,
            type: "medical",
            typeLabel: "Médico",
            distance: "0.8 km",
            image: "imgs/modern_cannabis_dispensary_flower_shop_exterior.jpg",
            hours: "8:00 AM - 9:00 PM",
            phone: "+1-416-555-0125"
        }
    ];
    
    // Filtrar según el filtro seleccionado
    let filteredDispensaries = dispensaries;
    if (filter !== 'all') {
        filteredDispensaries = dispensaries.filter(d => {
            switch(filter) {
                case 'medical': return d.type === 'medical';
                case 'recreational': return d.type === 'recreational';
                case 'delivery': return d.hasDelivery;
                default: return true;
            }
        });
    }
    
    displayDispensaries(filteredDispensaries);
    updateResultsCount(filteredDispensaries.length);
}

function displayDispensaries(dispensariesToShow) {
    const dispensaryList = document.getElementById('dispensary-list');
    
    if (dispensaryList) {
        dispensaryList.innerHTML = dispensariesToShow.map(dispensary => 
            createDispensaryCard(dispensary)
        ).join('');
    }
    
    // Actualizar pins en el mapa
    if (map) {
        // Limpiar pins existentes (excepto el de usuario)
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
        
        // Agregar nuevos pins
        dispensariesToShow.forEach(dispensary => {
            if (dispensary.lat && dispensary.lng) {
                const marker = L.marker([dispensary.lat, dispensary.lng]).addTo(map);
                marker.bindPopup(createDispensaryPopup(dispensary));
            }
        });
        
        // Re-agregar marcador de usuario si existe
        if (userLocation) {
            L.marker([userLocation.lat, userLocation.lng])
                .addTo(map)
                .bindPopup('Tu ubicación');
        }
    }
}

function loadProducts(category = 'all') {
    // Simulación de datos de productos
    products = [
        {
            id: 1,
            name: "Blue Dream",
            category: "flowers",
            type: "Hybrid",
            thc: "20%",
            cbd: "2%",
            price: 35,
            priceUnit: "g",
            rating: 4.7,
            reviews: 89,
            image: "imgs/premium_cannabis_product_display_flowers_edibles_vape_orange.jpg",
            description: "Un híbrido equilibrado perfecto para el día"
        },
        {
            id: 2,
            name: "Chocolate Gummies",
            category: "edibles",
            type: "Edible",
            thc: "10mg",
            cbd: "5mg",
            price: 25,
            priceUnit: "pack",
            rating: 4.5,
            reviews: 124,
            image: "imgs/STIIIZY_cannabis_product_display_edibles_vapes_flowers_promo.jpg",
            description: "Gominolas artesanales con dosis perfecta"
        },
        {
            id: 3,
            name: "Premium Vape Cart",
            category: "vapes",
            type: "Cartridge",
            thc: "85%",
            cbd: "1%",
            price: 60,
            priceUnit: "cart",
            rating: 4.8,
            reviews: 67,
            image: "imgs/cannabis_products_edibles_vapes_flowers_display.jpg",
            description: "Cartucho de alta potencia, sabor puro"
        },
        {
            id: 4,
            name: "Live Resin",
            category: "concentrates",
            type: "Concentrate",
            thc: "78%",
            cbd: "3%",
            price: 80,
            priceUnit: "g",
            rating: 4.9,
            reviews: 45,
            image: "imgs/premium_cannabis_products_display_storefront.jpg",
            description: "Concentrado de alta calidad, máxima potencia"
        }
    ];
    
    // Filtrar productos según categoría
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    displayProducts(filteredProducts);
}

function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('products-grid');
    
    if (productsGrid) {
        productsGrid.innerHTML = productsToShow.map(product => 
            createProductCard(product)
        ).join('');
    }
}

function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder-product.jpg'">
                <div class="product-badge">${product.category}</div>
                <button class="product-wishlist" onclick="toggleWishlist(${product.id})">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-content">
                <h4 class="product-name">${product.name}</h4>
                <p class="product-type">${product.type}</p>
                <div class="product-potency">
                    <span class="thc">THC: ${product.thc}</span>
                    <span class="cbd">CBD: ${product.cbd}</span>
                </div>
                <div class="product-rating">
                    <div class="stars">${'★'.repeat(Math.floor(product.rating))}</div>
                    <span class="rating-text">${product.rating} (${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">
                        <span class="price">$${product.price}</span>
                        <span class="unit">/${product.priceUnit}</span>
                    </div>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// FUNCIONES DE INTERACCIÓN
// ==========================================

function viewDispensary(id) {
    console.log('Ver dispensario:', id);
    // Implementar navegación a página de detalles
    // window.location.href = `/dispensary/${id}`;
}

function getDirections(lat, lng) {
    if (userLocation) {
        const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${lat},${lng}`;
        window.open(url, '_blank');
    } else {
        const url = `https://www.google.com/maps/search/${lat},${lng}`;
        window.open(url, '_blank');
    }
}

function addToCart(productId) {
    console.log('Agregar al carrito:', productId);
    
    // Animación de éxito
    const btn = event.target.closest('.btn-add-cart');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Agregado';
    btn.style.background = '#228B22';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
    
    // Aquí implementarías la lógica del carrito
    updateCartCount();
}

function toggleWishlist(productId) {
    console.log('Toggle wishlist:', productId);
    const btn = event.target.closest('.product-wishlist');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.className = 'fas fa-heart';
        btn.style.color = '#ff4757';
    } else {
        icon.className = 'far fa-heart';
        btn.style.color = '';
    }
}

function updateCartCount() {
    // Simulación de actualización del contador del carrito
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const current = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = current + 1;
        cartCount.style.display = 'block';
    }
}

function updateResultsCount(count) {
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `${count} resultado${count !== 1 ? 's' : ''}`;
    }
}

// ==========================================
// EFECTOS DE SCROLL Y ANIMACIONES
// ==========================================

function initializeScrollEffects() {
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    document.querySelectorAll('.feature-card, .education-card, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// ESTADOS DE CARGA
// ==========================================

function showLoadingState() {
    const dispensaryList = document.getElementById('dispensary-list');
    if (dispensaryList) {
        dispensaryList.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>Buscando dispensarios cercanos...</p>
            </div>
        `;
    }
}

function hideLoadingState() {
    // El contenido se reemplaza automáticamente
}

// ==========================================
// UTILIDADES
// ==========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatDistance(meters) {
    if (meters < 1000) {
        return `${Math.round(meters)} m`;
    } else {
        return `${(meters / 1000).toFixed(1)} km`;
    }
}

function formatPrice(price, currency = '$') {
    return `${currency}${price.toFixed(2)}`;
}

// ==========================================
// MANEJO DE ERRORES
// ==========================================

window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    // Aquí podrías enviar errores a un servicio de monitoreo
});

// ==========================================
// INICIALIZACIÓN FINAL
// ==========================================

// Cargar datos iniciales cuando la aplicación esté lista
setTimeout(() => {
    if (localStorage.getItem('ageVerified')) {
        loadDispensaries();
        loadProducts();
    }
}, 500);

console.log('🌿 Cannadam App initialized successfully!');