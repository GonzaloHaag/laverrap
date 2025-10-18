# LAVERRAP - Sistema de Gestión para Lavadero de Autos

Una aplicación web moderna para la gestión integral de un lavadero de autos, desarrollada con React, TypeScript, Vite y Supabase.

## Características

- **Gestión de Clientes**: Registro y administración de clientes
- **Servicios**: Catálogo de servicios de lavado con precios
- **Lavados**: Control de lavados realizados y seguimiento
- **Dashboard**: Estadísticas y gráficos de ingresos mensuales
- **Autenticación**: Sistema de login seguro
- **Responsive**: Diseño adaptable para dispositivos móviles y desktop

## Tecnologías Utilizadas

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn, Lucide React
- **Forms**: React Hook Form + Valibot
- **State Management**: TanStack Query (React Query)
- **Backend**: Supabase
- **Charts**: Recharts
- **Notificationes**: Sonner

## Requisitos Previos

- **Node.js** (versión 18 o superior)
- **pnpm** (recomendado) o npm/yarn
- Cuenta en **Supabase**

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/GonzaloHaag/laverrap.git
cd laverrap
```

### 2. Instalar dependencias

```bash
pnpm install
# o si usas npm:
# npm install
```

### 3. Configurar variables de entorno

Reenombrar archivo `.env.example` a `.env.local` y colocar tus credenciales de supabase:

```
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 4. Configurar la base de datos

El proyecto utiliza Supabase como backend. Asegúrate de:

1. Configurar las tablas necesarias en tu proyecto de Supabase
2. Configurar las políticas de seguridad (RLS) si es necesario
3. Si tienes el esquema SQL, ejecútalo en el SQL Editor de Supabase

### 5. Generar tipos de TypeScript (Opcional)

Si has modificado la estructura de la base de datos:

```bash
pnpm run gen-types
```

Este comando generará los tipos de TypeScript actualizados basados en tu esquema de Supabase.

## Ejecutar el Proyecto

### Modo desarrollo

```bash
pnpm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
pnpm run build
```

### Preview del build

```bash
pnpm run preview
```

## 🔑 Funcionalidades Principales

### Dashboard
- Visualización de ingresos mensuales
- Gráficos de tipos de lavado más populares
- Tarjetas con estadísticas rápidas

### Gestión de Clientes
- CRUD completo de clientes
- Búsqueda y filtrado
- Paginación

### Servicios
- Catálogo de servicios de lavado
- Gestión de precios
- Categorización por tipos

### Control de Lavados
- Registro de lavados realizados
- Asociación cliente-servicio
- Seguimiento de fechas y montos

## Contribuir

1. Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
---
