# 🏋️‍♀️ Lorza's Fitness - Frontend

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.9.0-4B32C3?style=for-the-badge&logo=eslint)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Gimnasio inclusivo** - Una plataforma web moderna para entrenamientos adaptados y comunidad respetuosa, construida con tecnologías de vanguardia.

## ✨ Características

- 🎯 **Accesibilidad WCAG 2.1 AA** - Diseño inclusivo para todos los usuarios
- 🚀 **Rendimiento Optimizado** - Vite para builds ultra-rápidos
- 🎨 **UI Moderna** - Tailwind CSS con componentes reutilizables
- 📱 **Responsive Design** - Experiencia perfecta en todos los dispositivos
- 🔒 **Gestión de Usuarios** - Sistema completo de autenticación y perfiles
- 📊 **Dashboard Administrativo** - Panel de control para gestión del gimnasio
- 🌐 **Multilenguaje** - Soporte completo para español

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **React 18** - Framework para interfaces de usuario
- **Vite 8** - Herramienta de build y desarrollo
- **React Router** - Navegación SPA

### Estilos y UI
- **Tailwind CSS** - Framework CSS utility-first
- **Heroicons** - Iconos SVG optimizados

### Calidad y Accesibilidad
- **ESLint** - Linting y estándares de código
- **Lighthouse** - Auditoría de rendimiento y accesibilidad
- **axe-core** - Testing de accesibilidad automatizado

### Desarrollo
- **npm** - Gestión de dependencias
- **Git** - Control de versiones

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

## 📖 Uso

### Desarrollo Local
```bash
npm run dev          # Servidor de desarrollo en localhost:5177
npm run build        # Build de producción
npm run preview      # Vista previa del build
npm run lint         # Ejecutar ESLint
```

### Scripts Disponibles
- `dev` - Inicia el servidor de desarrollo con hot reload
- `build` - Genera build optimizado para producción
- `lint` - Ejecuta análisis de código estático
- `preview` - Vista previa del build de producción

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

### Proceso de Desarrollo
1. **Planificación** - Diseño de componentes y arquitectura
2. **Desarrollo** - Implementación con React + Tailwind
3. **Testing** - ESLint + Lighthouse para calidad
4. **Build** - Optimización con Vite
5. **Deploy** - Despliegue continuo

## 🔗 Backend

**API Backend**: [Enlace al repositorio backend](URL_DEL_BACKEND)

La aplicación frontend se conecta con una API RESTful que maneja:
- Autenticación de usuarios
- Gestión de actividades y clases
- Perfiles de profesores y usuarios
- Sistema de reservas

## 📸 Capturas de Pantalla

### Página Principal
![Home Page](screenshots/home.png)

### Dashboard Administrativo
![Admin Dashboard](screenshots/dashboard.png)

### Página de Actividades
![Activities Page](screenshots/activities.png)

*Las capturas de pantalla se actualizarán próximamente.*

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Seguir estándares de accesibilidad WCAG 2.1 AA
- Mantener cobertura de Lighthouse > 95%
- Usar commits convencionales
- Documentar componentes nuevos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Desarrollo Frontend**: Equipo Lorza's Fitness
- **Diseño UI/UX**: Especialistas en accesibilidad
- **Testing**: QA Automation Team

---

**Lorza's Fitness** - Construyendo comunidad inclusiva, un componente a la vez. 💪
