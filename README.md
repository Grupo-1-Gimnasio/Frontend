<a name="spanish"></a>
<div align="center">

# 🏋️‍♀️ Lorza's Fitness - Frontend

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.9.0-4B32C3?style=for-the-badge&logo=eslint)](https://eslint.org/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](https://github.com/Grupo-1-Gimnasio/Frontend/releases)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Gimnasio inclusivo** — Plataforma web moderna para entrenamientos adaptados y comunidad respetuosa, construida con tecnologías de vanguardia.

[🇬🇧 English version](#english)

[Capturas](#-capturas-de-pantalla) · [Tecnologías](#️-tecnologías-utilizadas) · [Características](#-características) · [Lighthouse](#-calidad-y-auditorías-con-lighthouse) · [Requisitos](#-requisitos-del-sistema) · [Instalación](#-instalación) · [Arquitectura](#️-arquitectura-del-proyecto) · [Backend](#-backend) · [Contribución](#-contribución)

</div>

---

[<img src="./gadget-icon.png" alt="Demo Video" width="250" />](https://1drv.ms/v/c/e10641b190451823/IQBPolX2Vt83SrlqFkdGXWh7AbX-tZ3se0v_thdWh16cBt4?e=pArekb)


---

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **React 18** — Framework para interfaces de usuario
- **Vite 8** — Herramienta de build y desarrollo
- **React Router** — Navegación SPA

### Estilos y UI
- **Tailwind CSS** — Framework CSS utility-first
- **Heroicons** — Iconos SVG optimizados

### Calidad y Accesibilidad
- **ESLint** — Linting y estándares de código
- **Lighthouse** — Auditoría de rendimiento y accesibilidad
- **axe-core** — Testing de accesibilidad automatizado

### Desarrollo
- **npm** — Gestión de dependencias
- **Git** — Control de versiones

---

## ✨ Características

- 🎯 **Accesibilidad WCAG 2.1 AA** — Diseño inclusivo para todos los usuarios
- 🚀 **Rendimiento Optimizado** — Vite para builds ultra-rápidos
- 🎨 **UI Moderna** — Tailwind CSS con componentes reutilizables
- 📱 **Responsive Design** — Experiencia perfecta en todos los dispositivos
- 🔒 **Gestión de Usuarios** — Sistema completo de perfiles
- 📊 **Dashboard Administrativo** — Panel de control para gestión del gimnasio
- 🌐 **Multilenguaje** — Soporte completo para español

---

## 📊 Calidad y Auditorías con Lighthouse

[![Lighthouse Accessibility](https://img.shields.io/badge/Lighthouse-Accessibility_100%25-brightgreen?style=for-the-badge&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-Performance_95%2B%25-green?style=for-the-badge&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)
[![Lighthouse Best Practices](https://img.shields.io/badge/Lighthouse-Best_Practices_95%2B%25-green?style=for-the-badge&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)
[![Lighthouse SEO](https://img.shields.io/badge/Lighthouse-SEO_95%2B%25-green?style=for-the-badge&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)

### 🎯 Accesibilidad (100%)
Cumplimiento WCAG 2.1 AA completo, navegación por teclado, contraste de colores optimizado, estructura semántica HTML5 y atributos ARIA apropiados.

### ⚡ Rendimiento (95%+)
Carga rápida con Vite, optimización de imágenes y recursos, Core Web Vitals optimizados y bundle splitting eficiente.

### 🏆 Mejores Prácticas (95%+)
Código moderno y seguro, librerías actualizadas, HTTPS obligatorio y seguridad de recursos.

### 🔍 SEO (95%+)
Meta tags optimizados, estructura de headings correcta, mobile-friendly design y velocidad de carga indexable.

### Ejecutar Auditorías

```bash
# Auditoría completa
npx lighthouse http://localhost:5177 --output=json --output-path=./report.json

# Solo accesibilidad
npx lighthouse http://localhost:5177 --only-categories=accessibility

# Con Chrome flags para CI
npx lighthouse http://localhost:5177 --chrome-flags="--headless --no-sandbox"
```

---

## 📈 Estado del Proyecto

### Completado
- [x] Accesibilidad WCAG 2.1 AA (100% Lighthouse)
- [x] Diseño responsive completo
- [x] Sistema de navegación con React Router
- [x] Componentes UI con Tailwind CSS
- [x] Layout administrativo y público

### En Desarrollo
- [ ] Integración completa con backend API
- [ ] Dashboard administrativo funcional
- [ ] Gestión de actividades y clases

---

## 💻 Requisitos del Sistema

- **Node.js**: 18.0.0 o superior
- **npm**: 9.0.0 o superior
- **Git**: 2.30.0 o superior
- **Navegadores**: Chrome 90+, Firefox 88+, Safari 14+

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Grupo-1-Gimnasio/Frontend.git
cd Frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

---

## 📖 Uso

```bash
npm run dev          # Servidor de desarrollo en localhost:5177
npm run build        # Build de producción
npm run preview      # Vista previa del build
npm run lint         # Ejecutar ESLint
```

---

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── home/           # Páginas de inicio
│   ├── layout/         # Layouts y navegación
│   └── ...
├── pages/              # Páginas principales
├── routes/             # Configuración de rutas
├── data/               # Datos estáticos
├── assets/             # Imágenes y recursos
└── main.jsx           # Punto de entrada
```

---

## 🔗 Backend

**API Backend**: [Repositorio Backend](https://github.com/Grupo-1-Gimnasio/Backend)

La aplicación frontend se conecta con una API RESTful Spring Boot que gestiona usuarios, entrenadores, actividades e inscripciones. Consulta el README del backend para documentación completa de endpoints.

---

## 🚀 Despliegue

```bash
# Generar build optimizado
npm run build

# El contenido se genera en la carpeta 'dist/'
```

Variables de entorno (crear `.env` en la raíz):

```bash
VITE_API_URL=http://localhost:8080
VITE_APP_ENV=development
```

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'feat: descripción del cambio'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### Guías
- Seguir estándares de accesibilidad WCAG 2.1 AA
- Mantener cobertura de Lighthouse > 95%
- Usar commits convencionales

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT — ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

Hecho con ❤️ por **Grupo 1 — Inditex Gym Bootcamp**

</div>

---
---

<a name="english"></a>
<div align="center">

# 🏋️‍♀️ Lorza's Fitness - Frontend

**Modern web platform for inclusive gym management**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[🇪🇸 Versión en español](#spanish)

[Screenshots](#-screenshots) · [Tech Stack](#️-tech-stack) · [Features](#-features) · [Lighthouse](#-quality-and-lighthouse-audits) · [Requirements](#-system-requirements) · [Installation](#-installation-1) · [Architecture](#️-project-architecture) · [Backend](#-backend-1) · [Contributing](#-contributing)

</div>

---

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Admin Dashboard
![Admin Dashboard](screenshots/dashboard.png)

### Activities Page
![Activities Page](screenshots/activities.png)

---

## 🛠️ Tech Stack

### Frontend Core
- **React 18** — UI framework
- **Vite 8** — Build tool and dev server
- **React Router** — SPA navigation

### Styling and UI
- **Tailwind CSS** — Utility-first CSS framework
- **Heroicons** — Optimized SVG icons

### Quality and Accessibility
- **ESLint** — Code linting and standards
- **Lighthouse** — Performance and accessibility auditing
- **axe-core** — Automated accessibility testing

---

## ✨ Features

- 🎯 **WCAG 2.1 AA Accessibility** — Inclusive design for all users
- 🚀 **Optimized Performance** — Ultra-fast builds with Vite
- 🎨 **Modern UI** — Tailwind CSS with reusable components
- 📱 **Responsive Design** — Seamless experience across all devices
- 🔒 **User Management** — Complete profile system
- 📊 **Admin Dashboard** — Control panel for gym management
- 🌐 **Spanish language** — Full Spanish support

---

## 📊 Quality and Lighthouse Audits

[![Lighthouse Accessibility](https://img.shields.io/badge/Lighthouse-Accessibility_100%25-brightgreen?style=for-the-badge&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-Performance_95%2B%25-green?style=for-the-badge&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)
[![Lighthouse Best Practices](https://img.shields.io/badge/Lighthouse-Best_Practices_95%2B%25-green?style=for-the-badge&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)
[![Lighthouse SEO](https://img.shields.io/badge/Lighthouse-SEO_95%2B%25-green?style=for-the-badge&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)

### 🎯 Accessibility (100%)
Full WCAG 2.1 AA compliance, keyboard navigation, optimized color contrast, semantic HTML5 structure, and proper ARIA attributes.

### ⚡ Performance (95%+)
Fast loading with Vite, image and resource optimization, optimized Core Web Vitals, and efficient bundle splitting.

### 🏆 Best Practices (95%+)
Modern and secure code, up-to-date libraries, mandatory HTTPS, and resource security.

### 🔍 SEO (95%+)
Optimized meta tags, correct heading structure, mobile-friendly design, and indexable loading speed.

### Running Audits

```bash
# Full audit
npx lighthouse http://localhost:5177 --output=json --output-path=./report.json

# Accessibility only
npx lighthouse http://localhost:5177 --only-categories=accessibility

# With Chrome flags for CI
npx lighthouse http://localhost:5177 --chrome-flags="--headless --no-sandbox"
```

---

## 📈 Project Status

### Completed
- [x] WCAG 2.1 AA Accessibility (100% Lighthouse)
- [x] Full responsive design
- [x] Navigation system with React Router
- [x] UI components with Tailwind CSS
- [x] Admin and public layouts

### In Progress
- [ ] Full backend API integration
- [ ] Functional admin dashboard
- [ ] Activity and class management

---

## 💻 System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: 2.30.0 or higher
- **Browsers**: Chrome 90+, Firefox 88+, Safari 14+

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/Grupo-1-Gimnasio/Frontend.git
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📖 Usage

```bash
npm run dev          # Development server at localhost:5177
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🏗️ Project Architecture

```
src/
├── components/          # Reusable components
│   ├── home/           # Home pages
│   ├── layout/         # Layouts and navigation
│   └── ...
├── pages/              # Main pages
├── routes/             # Route configuration
├── data/               # Static data
├── assets/             # Images and resources
└── main.jsx           # Entry point
```

---

## 🔗 Backend

**Backend API**: [Backend Repository](https://github.com/Grupo-1-Gimnasio/Backend)

The frontend connects to a Spring Boot RESTful API that manages users, trainers, activities, and enrollments. See the backend README for full endpoint documentation.

---

## 🚀 Deployment

```bash
# Generate optimized build
npm run build

# Output is generated in the 'dist/' folder
```

Environment variables (create `.env` in root):

```bash
VITE_API_URL=http://localhost:8080
VITE_APP_ENV=development
```

---

## 🤝 Contributing

1. Fork the project
2. Create your branch: `git checkout -b feature/new-feature`
3. Commit: `git commit -m 'feat: change description'`
4. Push: `git push origin feature/new-feature`
5. Open a Pull Request

### Guidelines
- Follow WCAG 2.1 AA accessibility standards
- Maintain Lighthouse coverage > 95%
- Use conventional commits

---

## 📄 License

This project is under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by **Grupo 1 — Inditex Gym Bootcamp**

</div>
