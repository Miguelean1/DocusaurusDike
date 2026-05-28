---
sidebar_position: 2
title: Autenticación
---

# Mecanismos de autenticación

## JWT (JSON Web Tokens)

El proyecto utiliza **JWT** como principal mecanismo de autenticación.

- **Duración del token:** 7 días
- **Algoritmo:** HS256 (HMAC with SHA-256)
- **Clave secreta:** Almacenada en `JWT_SECRET` de `.env`
- **Dónde se almacena:** 
  - **Frontend:** `localStorage` con clave `'token'`
  - **Backend:** Incluido en cada request en la cabecera
- **Cómo se envía:** Cabecera `Authorization: Bearer <token>`
- **Contenido:** Incluye `id` del usuario y `role`

### Flujo de autenticación

1. Usuario se registra o inicia sesión → Backend genera JWT
2. JWT se almacena en `localStorage` del navegador
3. Frontend incluye el token en todas las peticiones protegidas
4. Backend valida el token con `authGuard` middleware
5. Si es válido, `req.user` contiene los datos del usuario

### Token en Frontend

En `src/services/api.js` hay un interceptor de Axios que añade automáticamente el token:

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

## Roles y permisos

El sistema implementa un modelo de roles simple para control de acceso:

| Rol       | Permisos                                      |
|-----------|-----------------------------------------------|
| `visitor` | Ver artículos, navegar (sin autenticación)    |
| `user`    | Crear/editar posts, enviar solicitudes, mensajes, valorar |
| `admin`   | Gestión de usuarios y posts, acceso a `/admin` |

### Middleware de autenticación

En `src/middleware/auth.middleware.js`:

- **`authGuard`:** Verifica que el token sea válido y obtiene los datos del usuario.
- **`adminGuard`:** Comprueba que `req.user.role === 'admin'`.

Las rutas protegidas se declaran así:

```javascript
router.get('/admin/users', authGuard, adminGuard, controller)
```

## Seguridad de contraseña

- **Hashing:** Se usa `bcryptjs` 3.0.3 para hashear contraseñas
- **Requisitos mínimos:** Mínimo 6 caracteres
- **Salt rounds:** Se aplica salt en el hash (bcrypt)
- **Almacenamiento:** Solo el hash se guarda en la BD, nunca la contraseña en texto plano

## Email y verificación

- **Verificación de email:** El usuario puede verificar su email mediante un token enviado al correo.
- **Token de reset:** Para recuperar contraseña, se genera un token temporal que expira.
- **Email service:** Se usa `nodemailer` 8.0.7 para enviar correos.

## Variables de entorno requeridas

```env
JWT_SECRET=secret001              # Clave para firmar JWT
EMAIL_USER=tu_correo@gmail.com   # Para nodemailer
EMAIL_PASS=tu_app_password       # Contraseña de aplicación
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

:::warning
El `JWT_SECRET` actual es débil (`secret001`). En producción debe ser una cadena aleatoria larga y fuerte.
:::
