# 🎨 Portfolio Web — María Mesa

Portfolio personal de ilustración, sketchbook, animación y proyectos artesanos, desarrollado como una **web estática con React + Vite**.

El proyecto combina una **presentación visual cuidada** con una **arquitectura frontend limpia y mantenible**, pensada para crecer y actualizarse fácilmente sin tocar código innecesario.

---

## ✨ Características principales

- 🖼️ **Ilustraciones finalizadas**  
  Galería responsive con vista ampliada en modal.

- 📖 **Sketchbook interactivo**  
  Navegación por páginas mediante:
  - botones
  - teclado
  - gestos táctiles (móvil)

- 🎞️ **Animaciones en formato reel**  
  Vídeos optimizados para web (loop, muted, responsive).

- 🧱 **Proyectos artesanos**  
  Mini carruseles independientes por proyecto, agrupados automáticamente.

- 📂 **Carga automática del contenido**  
  Las imágenes y vídeos se importan dinámicamente desde carpetas, sin imports manuales uno a uno.

- 📱 **Diseño responsive**  
  Adaptado a móvil, tablet y escritorio.

---

## 🛠️ Tecnologías utilizadas

- React
- Vite
- TypeScript
- CSS puro (sin frameworks externos)
- ESLint (configuración estricta)

---

## 📁 Estructura del proyecto

```txt
src/
  assets/
  art/
    finished/ # Ilustraciones terminadas
    sketchbook/ # Páginas del sketchbook
    animations/ # Vídeos / reels
    crafts/ # Proyectos artesanos
  icons/
  labels/
  App.tsx
  main.tsx
  App.css
```

---

## 🎯 Organización del contenido artístico

### Carga automática

El contenido de `src/assets/art` se carga automáticamente mediante `import.meta.glob`, lo que permite:

- Añadir o eliminar obras sin modificar el código
- Mantener el proyecto limpio y escalable
- Separar claramente contenido y lógica

### Proyectos artesanos

En la carpeta `crafts`, los proyectos se agrupan por **prefijo del nombre del archivo**:

craft-a-1.jpg
craft-a-2.jpg
craft-b-1.jpg
craft-b-2.jpg


Cada prefijo genera automáticamente un **mini carrusel independiente**.

---

## 🚀 Instalación y uso

### Requisitos

- Node.js LTS (v18 o superior)

### Instalación

`npm install`

### Servidor de desarrollo

`npm run dev`

La aplicación estará disponible en:

`http://localhost:5173`

### Build de producción

`npm run build`

---

## 🧠 Decisiones de diseño y arquitectura

- Separación clara entre contenido y código
- Evitar dependencias innecesarias de UI
- Control total del diseño con CSS nativo
- Componentes simples y reutilizables
- Accesibilidad básica respetada (focus visible, navegación por teclado)

Este proyecto funciona tanto como:

- Portfolio artístico
- Ejercicio de frontend moderno
- Base escalable para una web personal

---

## 👩‍🎨 Autora

**María Mesa**  
Ilustración · Sketchbook · Artesanía · Web  

- Email: mariagmesa37@gmail.com  
- GitHub: https://github.com/mesa-maria  
- Instagram: https://www.instagram.com/por_la_acera/

---

## 📄 Licencia

Este proyecto es de uso personal.

Las obras artísticas mostradas en este repositorio están protegidas por derechos de autor y no pueden reproducirse, modificarse ni utilizarse sin el consentimiento expreso de la autora.
