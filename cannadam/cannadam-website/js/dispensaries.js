// ==========================================
// JAVASCRIPT PARA PÁGINA DE DISPENSARIOS
// ==========================================

// Variables específicas de la página
let allDispensaries = [];
let filteredDispensaries = [];
let currentFilters = {
    type: 'all',
    services: [],
    rating: 'all',
    sort: 'distance'
};
let currentPage = 1;
const itemsPerPage = 9;

// Inicializar página de dispensarios
document.addEventListener('DOMContentLoaded', function() {
    initializeDispensariesPage();
});

function initializeDispensariesPage() {
    loadAllDispensaries();
    initializeFilters();
    initializeSearch();
    initializeLoadMore();
}

// Cargar todos los dispensarios
function loadAllDispensaries() {
    // Datos simulados de dispensarios
    allDispensaries = [
        {
            id: 1,
            name: "Green Paradise Dispensary",
            address: "123 Main Street, Toronto, ON M5V 2T6",
            type: "medical",
            typeLabel: "Médico & Recreativo",
            rating: 4.8,
            reviews: 120,
            distance: "0.5 km",
            phone: "+1-416-555-0123",
            hours: "9:00 AM - 10:00 PM",
            services: ['delivery', 'pickup', 'curbside'],
            image: "imgs/modern_cannabis_dispensary_flower_shop_exterior.jpg",
            isOpen: true,
            description: "Dispensario premium con productos de alta calidad y servicio excepcional."
        },
        {
            id: 2,
            name: "Cannabis Plus Medical",
            address: "456 Queen Street West, Toronto, ON M5V 2A8",
            type: "medical",
            typeLabel: "Solo Médico",
            rating: 4.6,
            reviews: 98,
            distance: "1.2 km",
            phone: "+1-416-555-0124",
            hours: "8:00 AM - 9:00 PM",
            services: ['pickup', 'consultation'],
            image: "imgs/treehouse_cannabis_dispensary_exterior_night_modern.jpg",
            isOpen: true,
            description: "Especialistas en cannabis médico con consultas personalizadas."
        },
        {
            id: 3,
            name: "Leaf & Co Recreation",
            address: "789 King Street, Toronto, ON M5H 1J9",
            type: "recreational",
            typeLabel: "Solo Recreativo",
            rating: 4.9,
            reviews: 156,
            distance: "0.8 km",
            phone: "+1-416-555-0125",
            hours: "10:00 AM - 11:00 PM",
            services: ['delivery', 'pickup'],
            image: "imgs/common_citizen_modern_cannabis_dispensary_exterior.jpg",
            isOpen: false,
            description: "El mejor lugar para productos recreativos premium."
        },
        {
            id: 4,
            name: "Premium Cannabis Co",
            address: "321 Spadina Avenue, Toronto, ON M5T 2E3",
            type: "recreational",
            typeLabel: "Médico & Recreativo",
            rating: 4.7,
            reviews: 203,
            distance: "2.1 km",
            phone: "+1-416-555-0126",
            hours: "9:00 AM - 10:00 PM",
            services: ['delivery', 'pickup', 'curbside'],
            image: "imgs/modern_cannabis_dispensary_flower_shop_exterior.jpg",
            isOpen: true,
            description: "Variedad premium con los mejores precios de la ciudad."
        },
        {
            id: 5,
            name: "The Green Room",
            address: "654 College Street, Toronto, ON M6G 1B4",
            type: "medical",
            typeLabel: "Solo Médico",
            rating: 4.5,
            reviews: 87,
            distance: "3.2 km",
            phone: "+1-416-555-0127",
            hours: "9:00 AM - 8:00 PM",
            services: ['pickup', 'consultation'],
            image: "imgs/treehouse_cannabis_dispensary_exterior_night_modern.jpg",
            isOpen: true,
            description: "Ambiente relajado con enfoque en bienestar y salud."
        },
        {
            id: 6,
            name: "Urban Cannabis",
            address: "987 Bloor Street West, Toronto, ON M6H 1M1",
            type: "recreational",
            typeLabel: "Médico & Recreativo",
            rating: 4.4,
            reviews: 142,
            distance: "1.8 km",
            phone: "+1-416-555-0128",
            hours: "10:00 AM - 11:00 PM",
            services: ['delivery', 'pickup'],
            image: "imgs/common_citizen_modern_cannabis_dispensary_exterior.jpg",
            isOpen: true,
            description: "Moderno dispensario en el corazón de la ciudad."
        }
    ];
    
    filteredDispensaries = [...allDispensaries];
    displayDispensaries(true);
}

// Inicializar filtros
function initializeFilters() {
    // Botones de tipo
    const typeButtons = document.querySelectorAll('.filter-btn');
    typeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            typeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilters.type = this.dataset.filter;
            applyFilters();
        });
    });
    
    // Checkboxes de servicios
    const serviceCheckboxes = document.querySelectorAll('input[data-service]');
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const service = this.dataset.service;
            if (this.checked) {
                if (!currentFilters.services.includes(service)) {
                    currentFilters.services.push(service);
                }
            } else {
                currentFilters.services = currentFilters.services.filter(s => s !== service);
            }
            applyFilters();
        });
    });
    
    // Select de rating
    const ratingSelect = document.querySelector('select[data-filter="rating"]');
    if (ratingSelect) {
        ratingSelect.addEventListener('change', function() {
            currentFilters.rating = this.value;
            applyFilters();
        });
    }
    
    // Select de ordenamiento
    const sortSelect = document.querySelector('select[data-sort="order"]');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentFilters.sort = this.value;
            applyFilters();
        });
    }
}

// Aplicar filtros
function applyFilters() {
    filteredDispensaries = allDispensaries.filter(dispensary => {
        // Filtro por tipo
        if (currentFilters.type !== 'all') {
            if (currentFilters.type === 'medical' && !dispensary.type.includes('medical')) {
                return false;
            }
            if (currentFilters.type === 'recreational' && !dispensary.type.includes('recreational')) {
                return false;
            }
        }
        
        // Filtro por servicios
        if (currentFilters.services.length > 0) {
            const hasRequiredServices = currentFilters.services.every(service => 
                dispensary.services.includes(service)
            );
            if (!hasRequiredServices) {
                return false;
            }
        }
        
        // Filtro por rating
        if (currentFilters.rating !== 'all') {
            const minRating = parseFloat(currentFilters.rating);
            if (dispensary.rating < minRating) {
                return false;
            }
        }
        
        return true;
    });
    
    // Aplicar ordenamiento
    filteredDispensaries.sort((a, b) => {
        switch (currentFilters.sort) {
            case 'rating':
                return b.rating - a.rating;
            case 'reviews':
                return b.reviews - a.reviews;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'distance':
            default:
                return parseFloat(a.distance) - parseFloat(b.distance);
        }
    });
    
    currentPage = 1;
    displayDispensaries(true);
}

// Mostrar dispensarios
function displayDispensaries(reset = false) {
    const grid = document.getElementById('dispensaries-grid');
    const resultsCount = document.querySelector('.results-count');
    
    if (reset) {
        grid.innerHTML = '';
    }
    
    // Actualizar contador de resultados
    if (resultsCount) {
        resultsCount.textContent = `${filteredDispensaries.length} resultado${filteredDispensaries.length !== 1 ? 's' : ''}`;
    }
    
    // Calcular índices para paginación
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dispensariesToShow = filteredDispensaries.slice(0, endIndex);
    
    // Mostrar dispensarios
    if (reset) {
        grid.innerHTML = dispensariesToShow.map(dispensary => 
            createDispensaryCard(dispensary)
        ).join('');
    } else {
        const newDispensaries = filteredDispensaries.slice(startIndex, endIndex);
        grid.innerHTML += newDispensaries.map(dispensary => 
            createDispensaryCard(dispensary)
        ).join('');
    }
    
    // Actualizar botón "Cargar más"
    updateLoadMoreButton();
    
    // Si no hay resultados
    if (filteredDispensaries.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No se encontraron dispensarios</h3>
                <p>Intenta ajustar tus filtros para obtener más resultados.</p>
                <button class="btn-clear-filters" onclick="clearAllFilters()">Limpiar filtros</button>
            </div>
        `;
    }
}

// Crear tarjeta de dispensario
function createDispensaryCard(dispensary) {
    const servicesHtml = dispensary.services.map(service => {
        const serviceLabels = {
            'delivery': 'Delivery',
            'pickup': 'Pickup',
            'curbside': 'Curbside',
            'consultation': 'Consulta'
        };
        return `<span class="service-tag">${serviceLabels[service] || service}</span>`;
    }).join('');
    
    return `
        <div class="dispensary-card" data-id="${dispensary.id}" onclick="viewDispensaryDetails(${dispensary.id})">
            <div class="dispensary-image">
                <img src="${dispensary.image}" alt="${dispensary.name}" onerror="this.src='assets/placeholder-dispensary.jpg'">
                <div class="dispensary-badge">${dispensary.typeLabel}</div>
                <div class="dispensary-status ${dispensary.isOpen ? 'open' : 'closed'}">
                    ${dispensary.isOpen ? 'Abierto' : 'Cerrado'}
                </div>
            </div>
            <div class="dispensary-content">
                <h3 class="dispensary-name">${dispensary.name}</h3>
                <p class="dispensary-address">${dispensary.address}</p>
                <div class="dispensary-rating">
                    <div class="stars">${'★'.repeat(Math.floor(dispensary.rating))}</div>
                    <span class="rating-text">${dispensary.rating} (${dispensary.reviews} reseñas)</span>
                </div>
                <div class="dispensary-services">
                    ${servicesHtml}
                </div>
                <div class="dispensary-meta">
                    <span class="distance">${dispensary.distance}</span>
                    <button class="btn-view-details" onclick="event.stopPropagation(); viewDispensaryDetails(${dispensary.id})">
                        Ver detalles
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Inicializar botón "Cargar más"
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            displayDispensaries(false);
        });
    }
}

// Actualizar botón "Cargar más"
function updateLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    const loadMoreContainer = document.querySelector('.load-more');
    
    if (loadMoreBtn && loadMoreContainer) {
        const totalShown = currentPage * itemsPerPage;
        if (totalShown >= filteredDispensaries.length) {
            loadMoreContainer.style.display = 'none';
        } else {
            loadMoreContainer.style.display = 'block';
        }
    }
}

// Inicializar búsqueda
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Realizar búsqueda
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        filteredDispensaries = [...allDispensaries];
    } else {
        filteredDispensaries = allDispensaries.filter(dispensary => 
            dispensary.name.toLowerCase().includes(query) ||
            dispensary.address.toLowerCase().includes(query) ||
            dispensary.description.toLowerCase().includes(query)
        );
    }
    
    // Aplicar filtros adicionales
    applyFilters();
}

// Ver detalles del dispensario
function viewDispensaryDetails(id) {
    console.log('Ver detalles del dispensario:', id);
    // Aquí podrías abrir un modal o navegar a una página de detalles
    // Por ahora, simulamos con una alerta
    const dispensary = allDispensaries.find(d => d.id === id);
    if (dispensary) {
        alert(`Detalles de ${dispensary.name}\n\nDirección: ${dispensary.address}\nTeléfono: ${dispensary.phone}\nHorarios: ${dispensary.hours}\n\n${dispensary.description}`);
    }
}

// Limpiar todos los filtros
function clearAllFilters() {
    // Resetear filtros
    currentFilters = {
        type: 'all',
        services: [],
        rating: 'all',
        sort: 'distance'
    };
    
    // Resetear UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === 'all') {
            btn.classList.add('active');
        }
    });
    
    document.querySelectorAll('input[data-service]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    const ratingSelect = document.querySelector('select[data-filter="rating"]');
    if (ratingSelect) ratingSelect.value = 'all';
    
    const sortSelect = document.querySelector('select[data-sort="order"]');
    if (sortSelect) sortSelect.value = 'distance';
    
    // Aplicar cambios
    filteredDispensaries = [...allDispensaries];
    currentPage = 1;
    displayDispensaries(true);
}

// Función debounce para la búsqueda
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

// CSS para no-results
if (!document.querySelector('#no-results-style')) {
    const style = document.createElement('style');
    style.id = 'no-results-style';
    style.textContent = `
        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 80px 20px;
            color: #666;
        }
        
        .no-results-icon {
            font-size: 4rem;
            color: #ddd;
            margin-bottom: 20px;
        }
        
        .no-results h3 {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 10px;
        }
        
        .no-results p {
            font-size: 1rem;
            margin-bottom: 30px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .btn-clear-filters {
            background: linear-gradient(135deg, #228B22 0%, #32CD32 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-clear-filters:hover {
            background: linear-gradient(135deg, #1e7b1e 0%, #2eb82e 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(34, 139, 34, 0.3);
        }
    `;
    document.head.appendChild(style);
}

console.log('🌿 Dispensaries page initialized successfully!');

// Exportar funciones para uso global
window.viewDispensaryDetails = viewDispensaryDetails;
window.clearAllFilters = clearAllFilters;