---
sidebar_position: 2
title: Estructura del proyecto
---

# Estructura del proyecto frontend

```
src/
├── main.jsx                   # Entry point - React root
├── App.jsx                    # Router wrapper
├── App.css                    # (vacío)
├── index.css                  # Estilos globales
├── components/
│   ├── Navbar.jsx             # Barra de navegación
│   ├── Footer.jsx             # Pie de página
│   ├── Logo.jsx               # Logo
│   ├── Card.jsx               # Card de artículos
│   ├── ProtectedRoute.jsx     # Guard para rutas autenticadas
│   ├── AdminRoute.jsx         # Guard para rutas admin
│   └── ui/                    # shadcn/ui components
│       ├── button.jsx
│       ├── input.jsx
│       ├── card.jsx
│       ├── avatar.jsx
│       ├── badge.jsx
│       ├── label.jsx
│       ├── dropdown-menu.jsx
│       ├── separator.jsx
│       └── tabs.jsx
├── features/auth/             # Páginas de autenticación
│   ├── Landing.jsx            # Página de inicio
│   ├── Login.jsx              # Login
│   ├── Register.jsx           # Registro
│   ├── ForgotPassword.jsx     # Recuperación de contraseña
│   ├── ResetPassword.jsx      # Reset de contraseña
│   └── VerifyEmail.jsx        # Verificación de email
├── pages/                     # Páginas principales
│   ├── Feed.jsx               # Listado de artículos
│   ├── DetailCard.jsx         # Detalle de artículo
│   ├── CreatePost.jsx         # Crear/editar artículo
│   ├── UserProfile.jsx        # Perfil de usuario
│   ├── MyRequests.jsx         # Mis solicitudes
│   ├── Messages.jsx           # Bandeja de mensajes
│   ├── Chat.jsx               # Conversación
│   └── AdminPanel.jsx         # Panel admin
├── routes/
│   └── index.jsx              # Configuración de React Router v7
├── layouts/
│   └── MainLayout.jsx         # Layout compartido (Nav + Footer)
├── context/
│   └── AuthContext.jsx        # Contexto de autenticación + JWT
├── services/
│   └── api.js                 # Axios instance + endpoints
├── lib/                       # Funciones auxiliares
├── tests/                     # Tests (Vitest)
└── assets/                    # Imágenes, iconos
```

## Descripción de cada carpeta

| Carpeta      | Contenido                                      |
|--------------|------------------------------------------------|
| `components` | Componentes UI reutilizables (Navbar, Card, etc.) |
| `features/auth` | Páginas relacionadas con autenticación |
| `pages`      | Componentes que representan rutas/páginas principales |
| `routes`     | Configuración de React Router y definición de rutas |
| `layouts`    | Componentes wrapper para layouts compartidos |
| `context`    | React Context para estado global (Auth) |
| `services`   | Cliente HTTP (Axios) y funciones API |
| `lib`        | Funciones de utilidad y helpers |
| `tests`      | Tests unitarios e integración (Vitest) |
| `ui`         | Componentes shadcn/ui (button, input, etc.) |

## Tecnologías principales en Frontend

| Librería | Versión | Uso |
|----------|---------|-----|
| React | 19.2.0 | Framework |
| Vite | 7.2.4 | Build tool |
| React Router | 7.13.0 | Routing |
| Axios | 1.16.1 | HTTP client |
| Tailwind CSS | 4.1.18 | Styling |
| shadcn/ui | 4.7.0 | Component library |
| Radix UI | 1.4.1 | Headless primitives |
| Lucide React | 1.16.0 | Icons |
| SweetAlert2 | 11.26.25 | Alert dialogs |
