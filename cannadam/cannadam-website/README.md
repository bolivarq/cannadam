# 🌿 Cannadam - Plataforma de Cannabis Legal

## Descripción del Proyecto

Cannadam es una plataforma tecnológica integral que conecta consumidores con dispensarios verificados, servicios de delivery y productos premium de cannabis legal. Diseñada con enfoque mobile-first, cumplimiento regulatorio y experiencia de usuario excepcional.

## ✨ Características Principales

### 🎯 Funcionalidades Core
- **Verificación de Edad** - Modal obligatorio para acceso (21+)
- **Búsqueda Geolocalizada** - Encuentra dispensarios y servicios cercanos
- **Mapas Interactivos** - Integración con Leaflet para visualización
- **Filtros Avanzados** - Por tipo, servicios, rating y distancia
- **Catálogo de Productos** - Flowers, edibles, vapes y concentrados
- **Sistema de Reseñas** - Ratings y comentarios verificados
- **Centro Educativo** - Artículos y guías sobre cannabis legal

### 🛡️ Compliance y Seguridad
- Verificación de edad obligatoria
- Disclaimers legales prominentes
- Cumplimiento WCAG para accesibilidad
- Diseño responsive mobile-first
- Optimización SEO para búsquedas locales

## 🎨 Diseño y Paleta de Colores

### Paleta Principal
- **Verde Bosque**: `#228B22` - CTAs principales, logos
- **Azul Eléctrico**: `#00BFFF` - Enlaces, acentos tech
- **Amarillo Eléctrico**: `#FFFF00` - Highlights, energía
- **Naranja Vivo**: `#FFA500` - Productos, frescura
- **Neutros**: Blanco `#FFFFFF`, Gris `#F5F5F5`, Marrón Tierra `#8B4513`

### Esquema de Color
- **Análogo**: Verdes-azules con acentos cálidos
- **Alto Contraste**: WCAG compliant
- **Inspiración**: Sunnyside (teal y lavanda)

## 📁 Estructura del Proyecto

```
cannadam-website/
├── index.html              # Página principal
├── dispensaries.html       # Listado de dispensarios
├── products.html           # Catálogo de productos
├── css/
│   ├── style.css          # Estilos principales
│   ├── dispensaries.css   # Estilos específicos dispensarios
│   └── products.css       # Estilos específicos productos
├── js/
│   ├── app.js            # JavaScript principal
│   ├── dispensaries.js   # JS específico dispensarios
│   └── products.js       # JS específico productos
├── imgs/                 # Imágenes descargadas
├── assets/              # Recursos estáticos
├── package.json        # Dependencias del proyecto
├── SITEMAP.md          # Mapa del sitio completo
└── README.md           # Documentación
```

## 🚀 Instalación y Configuración

### Requisitos
- Servidor web (Apache/Nginx) o servidor local
- Navegador moderno con soporte ES6+
- Conexión a internet para mapas y fuentes

### Configuración Rápida
1. Clonar/descargar el proyecto
2. Configurar servidor web apuntando a la carpeta raíz
3. Abrir `index.html` en el navegador
4. La verificación de edad aparecerá automáticamente

### Configuración Avanzada
```javascript
// En js/app.js - Configuración principal
const CONFIG = {
    mapCenter: [43.6532, -79.3832], // Toronto por defecto
    mapZoom: 12,
    apiEndpoints: {
        dispensaries: '/api/dispensaries',
        products: '/api/products',
        search: '/api/search'
    }
};
```

## 🗺️ Páginas y Estructura

### 1. Página Principal (index.html)
- **Hero Section** con búsqueda y mapa
- **Características principales** (3 cards)
- **Mapa interactivo** con dispensarios
- **Productos destacados** con filtros
- **Sección educativa** con artículos
- **Footer completo** con enlaces

### 2. Dispensarios (dispensaries.html)
- **Hero específico** con estadísticas
- **Filtros avanzados** (tipo, servicios, rating)
- **Grid responsive** de dispensarios
- **Paginación** con "Cargar más"
- **Búsqueda en tiempo real**

### 3. Productos (products.html)
- **Hero específico** con descripción del catálogo
- **Filtros por categorías** (Flowers, Edibles, Vapes, etc.)
- **Filtros avanzados** (THC/CBD, precio, strain type)
- **Grid responsive** de productos con badges
- **Vista lista/grid** intercambiables
- **Sistema de favoritos** y carrito
- **Búsqueda en tiempo real**

### Páginas Adicionales Planificadas
- `deliveries.html` - Servicios de entrega
- `education.html` - Centro de aprendizaje
- `about.html` - Sobre nosotros
- `contact.html` - Contacto y soporte

## ⚡ Funcionalidades JavaScript

### Verificación de Edad
```javascript
// Modal obligatorio al cargar la página
function showAgeVerification() {
    // Verificar localStorage
    // Mostrar modal si no verificado
    // Redirigir si menor de edad
}
```

### Geolocalización
```javascript
// Obtener ubicación del usuario
function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        position => updateMapsWithUserLocation(),
        error => showManualLocationInput()
    );
}
```

### Filtros y Búsqueda
```javascript
// Sistema de filtros avanzados
function applyFilters() {
    // Filtrar por tipo, servicios, rating
    // Aplicar ordenamiento
    // Actualizar UI dinámicamente
}
```

## 🎯 Optimizaciones Implementadas

### SEO
- Meta tags optimizados
- Estructura semántica HTML5
- Schema markup para negocios locales
- URLs amigables
- Sitemap XML

### Performance
- Imágenes optimizadas (WebP cuando sea posible)
- Lazy loading para imágenes
- Minificación CSS/JS para producción
- CDN para librerías externas
- Compresión Gzip

### Accesibilidad
- Contraste WCAG AA compliant
- Navegación por teclado
- Aria labels y roles
- Alt text para imágenes
- Focus visible

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
@media (max-width: 480px)  { /* Móviles pequeños */ }
@media (max-width: 768px)  { /* Móviles y tablets */ }
@media (max-width: 1024px) { /* Tablets y laptops */ }
@media (min-width: 1025px) { /* Desktop */ }
```

### Adaptaciones Móviles
- Menú hamburguesa en móviles
- Búsqueda optimizada para touch
- Cards apiladas en una columna
- Botones con área de toque 44px+
- Texto legible sin zoom

## 🔧 Integraciones de Terceros

### Mapas
- **Leaflet.js** - Mapas interactivos
- **OpenStreetMap** - Tiles gratuitos
- **Geolocation API** - Ubicación del usuario

### Fuentes y Estilos
- **Google Fonts** - Inter (tipografía principal)
- **Font Awesome** - Iconografía completa
- **CSS Grid/Flexbox** - Layouts modernos

## 🚦 Estados y Manejo de Errores

### Estados de Carga
```javascript
// Indicadores visuales durante cargas
function showLoadingState() {
    // Spinner animado
    // Mensaje informativo
    // Desactivar interacciones
}
```

### Manejo de Errores
- Fallbacks para geolocalización
- Imágenes placeholder para errores
- Mensajes user-friendly
- Logs para debugging

## 🔮 Roadmap Futuro

### Fase 2 - Backend Integration
- [ ] API REST para datos dinámicos
- [ ] Base de datos de dispensarios/productos
- [ ] Sistema de usuarios y autenticación
- [ ] Carrito de compras funcional

### Fase 3 - Features Avanzadas
- [ ] App móvil híbrida (React Native/Flutter)
- [ ] Notificaciones push para ofertas
- [ ] Sistema de lealtad y recompensas
- [ ] Chat en vivo para soporte

### Fase 4 - Expansión
- [ ] Múltiples provincias/estados
- [ ] Múltiples idiomas (i18n)
- [ ] Integración con sistemas POS
- [ ] Analytics avanzados

## 💰 Estimación de Costos

### Desarrollo Inicial
- **Sitio básico**: $5,000 - $8,000
- **Con backend**: $12,000 - $18,000
- **App móvil**: +$8,000 - $12,000
- **Tiempo**: 4-8 semanas

### Costos Recurrentes
- **Hosting/CDN**: $50-200/mes
- **Dominio**: $15/año
- **APIs de mapas**: $0-100/mes
- **Mantenimiento**: $500-1000/mes

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos (Grid, Flexbox, Variables)
- **JavaScript ES6+** - Funcionalidad interactiva
- **Leaflet.js** - Mapas interactivos

### Herramientas de Desarrollo
- **Git** - Control de versiones
- **npm/yarn** - Gestión de paquetes
- **Webpack** - Build y optimización
- **Sass/SCSS** - CSS preprocessor

## 📄 Compliance Legal

### Disclaimers Implementados
- ✅ Verificación de edad (21+)
- ✅ "Solo donde es legal"
- ✅ "Consume responsablemente"
- ✅ Links a políticas de privacidad
- ✅ Términos de uso prominentes

### Regulaciones Consideradas
- Health Canada (Canadá)
- State regulations (USA)
- GDPR/CCPA compliance
- ADA accessibility standards

## 🎨 Assets y Recursos Visuales

Todas las imágenes utilizadas son:
- Royalty-free de alta calidad (HD 1920x1080+)
- Sin contenido explícito de consumo
- Enfocadas en productos y dispensarios
- Optimizadas para web (WebP/JPEG)

## 👨‍💻 Contribución y Desarrollo

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de bug
style: cambios de estilos
docs: actualización documentación
refactor: refactorización de código
```

### Proceso de Development
1. Fork del repositorio
2. Crear branch feature
3. Desarrollar y testear
4. Crear pull request
5. Code review
6. Merge a main

## 📞 Soporte y Contacto

Para soporte técnico o consultas sobre el proyecto:
- **Email**: support@cannadam.com
- **Documentación**: Este README.md
- **Issues**: GitHub Issues (si aplica)

---

**Desarrollado por MiniMax Agent** - Especialista en desarrollo web y diseño UX/UI

*"Conectando lo mejor del cannabis legal con tecnología de vanguardia"*

🌿 **Cannadam - Tu plataforma de confianza** 🌿