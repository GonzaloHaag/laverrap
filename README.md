# LAVERRAP - Sistema de Gestión para Lavadero de Autos

Sistema integral para la gestión de un lavadero de autos, desarrollado con tecnologías modernas y arquitectura separada frontend/backend.

## 📋 Descripción

LAVERRAP es una aplicación web completa que permite administrar un lavadero de autos de manera eficiente. El sistema está dividido en dos proyectos independientes:

- **Frontend**: Aplicación web construida con React + TypeScript + Vite
- **Backend**: API REST desarrollada con Node.js + Express + Prisma(postgresql)

## Características Principales

- **Gestión de Clientes**: Registro y administración completa de clientes
- **Catálogo de Servicios**: Gestión de servicios de lavado con precios
- **Control de Lavados**: Seguimiento de lavados realizados y facturación
- **Dashboard**: Estadísticas e informes visuales de ingresos
- **Autenticación**: Sistema de login seguro con JWT
- **Responsive**: Diseño adaptable para todos los dispositivos
- **Notificaciones Email**: Integración con nodemailer para envío de notificaciones al finalizar un lavado

## Estructura del Proyecto

```
laverrap/
├── laverrap_frontend/    # Aplicación web (React + Vite)
└── laverrap_backend/     # API REST (Node.js + Express)
```

## Correr el proyecto en desarrollo

### Requisitos Previos

- Node.js 18 o superior
- pnpm (recomendado) o npm
- Cuenta de Supabase
- Cuenta de Twilio (opcional, para SMS)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/GonzaloHaag/laverrap.git
cd laverrap
```

2. **Configurar y ejecutar el backend**
```bash
cd laverrap_backend
pnpm install
# Configurar variables de entorno (ver README del backend)
pnpm run dev
```

3. **Configurar y ejecutar el frontend**
```bash
cd ../laverrap_frontend
pnpm install
# Configurar variables de entorno (ver README del frontend)
pnpm run dev
```

## 🔧 Configuración

Consulta los archivos README específicos de cada proyecto para instrucciones detalladas de configuración:

- Variables de entorno necesarias
- Configuración de base de datos
- Configuración de APIs externas

## Contribuir

1. Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

**Gonzalo Haag**

- GitHub: [@GonzaloHaag](https://github.com/GonzaloHaag)

---

Si este proyecto te fue útil, considera darle una estrella en GitHub

Backend desplegado en fl0.
Frontend desplegado en vercel.
