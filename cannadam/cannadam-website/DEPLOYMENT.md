# 🚀 Guía para Subir tu Sitio Cannadam Online

Esta guía te ayudará a hacer tu sitio web accesible en internet de forma gratuita y rápida.

## 🌟 Mejores Opciones (Gratuitas y Rápidas)

### 1. 🔥 **Netlify** (MÁS RECOMENDADO)
**¿Por qué Netlify?** Es la opción más fácil y rápida. Solo arrastra tu carpeta y ya tienes tu sitio online.

**Pasos:**
1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta gratuita
3. Ve a "Sites" → "Add new site" → "Deploy manually"
4. **Arrastra tu carpeta `cannadam-website`** completa al área de drop
5. ¡Listo! Tu sitio estará disponible en una URL como: `https://amazing-name-123456.netlify.app`

**✅ Ventajas:**
- Despliegue en segundos
- HTTPS automático
- URL personalizable (en plan gratuito con limitaciones)
- Actualizaciones fáciles (arrastra nueva carpeta)

---

### 2. 📂 **GitHub Pages** (Ideal para Desarrolladores)
**¿Por qué GitHub Pages?** Es gratis, profesional, y te da control total sobre tu código.

**Pasos:**
1. Crea cuenta en [github.com](https://github.com)
2. Crea un nuevo repositorio (puede ser privado o público)
3. Sube todos los archivos de tu carpeta `cannadam-website/`
4. Ve a Settings → Pages
5. En "Source", selecciona "Deploy from a branch" → "main" → "/ (root)"
6. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repositorio`

**✅ Ventajas:**
- Completamente gratis
- Control de versiones
- Fácil actualizar con nuevos commits
- URLs profesionales

---

### 3. ⚡ **Vercel** (Para Desarrolladores Avanzados)
Similar a Netlify, pero con más opciones técnicas.

**Pasos:**
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa tu repositorio
4. Deploy automático

---

## 📋 **Antes de Subir: Checklist Final**

### ✅ Archivos que DEBES verificar que tienes:
```
cannadam-website/
├── ✅ index.html
├── ✅ dispensaries.html  
├── ✅ products.html
├── ✅ css/style.css
├── ✅ css/dispensaries.css
├── ✅ css/products.css
├── ✅ js/app.js
├── ✅ js/dispensaries.js
├── ✅ js/products.js
└── ✅ README.md
```

### ⚠️ **Importante:** Verificación de Links
Antes de subir, asegúrate que todos los enlaces internos funcionen:
- Enlaces de navegación (index.html ↔ dispensaries.html ↔ products.html)
- Enlaces a CSS y JS
- Imágenes (si tienes)

---

## 🎯 **Opción Rápida: 5 Minutos con Netlify**

**VIDEO TUTORIAL PASO A PASO:**

1. **Comprimir tu carpeta** (opcional pero recomendado):
   - Selecciona toda la carpeta `cannadam-website`
   - Clic derecho → "Comprimir" o "Zip"

2. **Ir a Netlify:**
   - [netlify.com/drop](https://app.netlify.com/drop)
   - (No necesitas cuenta para prueba rápida)

3. **Arrastrar y soltar:**
   - Arrastra tu carpeta o archivo ZIP
   - Espera 30-60 segundos
   - ¡Tu sitio está online!

4. **Tu URL será algo como:**
   ```
   https://clever-tesla-123456.netlify.app
   ```

---

## 🎨 **Personalización Avanzada**

### Dominio Personalizado
- **Netlify:** `yoursite.netlify.app` → `www.cannadam.com`
- **GitHub Pages:** Configurar CNAME
- **Dominio propio:** Comprar en Namecheap, GoDaddy, etc.

### HTTPS Automático
- ✅ **Netlify:** Automático
- ✅ **GitHub Pages:** Automático
- ✅ **Vercel:** Automático

---

## 🔧 **Solución de Problemas Comunes**

### 📱 "Mi sitio no se ve bien en móvil"
- Verifica que tengas: `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`

### 🗺️ "Los mapas no cargan"
- Asegúrate que el sitio esté en HTTPS (las opciones de arriba lo hacen automático)

### 🎯 "Los enlaces no funcionan"
- Verifica que los archivos estén en las rutas correctas
- Ejemplo: `href=\"css/style.css\"` debe tener el archivo en la carpeta `css/`

### 📸 "Las imágenes no aparecen"
- Revisa que las rutas de imágenes sean correctas
- Ejemplo: `<img src=\"imgs/hero.jpg\">` debe tener el archivo en la carpeta `imgs/`

---

## 📞 **¿Necesitas Ayuda?**

Si tienes problemas:

1. **Revisa el checklist** de archivos arriba
2. **Intenta primero con Netlify** (es la más fácil)
3. **Verifica que todos los archivos estén en la carpeta** antes de subir
4. **Usa la consola del navegador** (F12) para ver errores

---

## 🎉 **¡Felicitaciones!**

Una vez que tu sitio esté online, podrás:
- ✅ Compartir la URL con cualquier persona
- ✅ Ver tu sitio desde cualquier dispositivo
- ✅ Actualizarlo fácilmente subiendo nuevos archivos
- ✅ Agregar más páginas cuando quieras

**Tu sitio Cannadam estará accesible las 24/7 desde cualquier parte del mundo** 🌍

---

*Creado con ❤️ por MiniMax Agent*