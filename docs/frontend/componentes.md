---
sidebar_position: 1
title: Componentes
---

# Componentes principales

Descripción de los componentes más relevantes del frontend.

---

## `<Navbar />`

- **Ubicación:** `src/components/Navbar.jsx`
- **Descripción:** Barra de navegación principal. Muestra logo, enlaces de navegación y opciones de usuario. Cambia según si el usuario está autenticado.
- **Props:** Ninguno (usa `useAuth()` del contexto)
- **Features:**
  - Links a Feed, Crear Post, Mis Solicitudes, Mensajes
  - Dropdown con Perfil, Configuración, Logout
  - Responsive en mobile

---

## `<ProtectedRoute />`

- **Ubicación:** `src/components/ProtectedRoute.jsx`
- **Descripción:** Componente wrapper que protege rutas. Redirige a login si no hay token.
- **Props:**
  ```javascript
  {
    children: ReactNode,
    requiredRole?: 'user' | 'admin'
  }
  ```
- **Uso:** `<ProtectedRoute><Feed /></ProtectedRoute>`

---

## `<AdminRoute />`

- **Ubicación:** `src/components/AdminRoute.jsx`
- **Descripción:** Protege rutas de administrador. Solo permite acceso si rol es 'admin'.
- **Props:** `{ children: ReactNode }`

---

## `<Card />`

- **Ubicación:** `src/components/Card.jsx`
- **Descripción:** Componente para mostrar artículos en la lista (Feed). Muestra imagen, título, categoría, tipo y usuario.
- **Props:**
  ```javascript
  {
    post: {
      id, title, image, category, type, author: {username, profile_picture}
    },
    onClick?: () => void
  }
  ```

---

## `<Footer />`

- **Ubicación:** `src/components/Footer.jsx`
- **Descripción:** Pie de página con enlaces y copyright.

---

## `<Logo />`

- **Ubicación:** `src/components/Logo.jsx`
- **Descripción:** Logo/marca del proyecto.

---

## Componentes UI (shadcn/ui)

Localizados en `src/components/ui/`:

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `<Button />` | `button.jsx` | Botones estilizados |
| `<Input />` | `input.jsx` | Campos de entrada |
| `<Card />` | `card.jsx` | Contenedores de tarjetas |
| `<Avatar />` | `avatar.jsx` | Imágenes de perfil |
| `<Badge />` | `badge.jsx` | Etiquetas/badges |
| `<Label />` | `label.jsx` | Etiquetas de formulario |
| `<DropdownMenu />` | `dropdown-menu.jsx` | Menús desplegables |
| `<Separator />` | `separator.jsx` | Divisores |
| `<Tabs />` | `tabs.jsx` | Pestañas |

---

## Páginas principales

Aunque no son exactamente "componentes", las páginas más importantes son:

### `<Feed />`
- **Ubicación:** `src/pages/Feed.jsx`
- **Descripción:** Listado de artículos con filtros (categoría, tipo, búsqueda).
- **Features:**
  - Búsqueda en tiempo real
  - Filtros por categoría y tipo
  - Lazy loading / paginación
  - Clic para ver detalles

### `<DetailCard />`
- **Ubicación:** `src/pages/DetailCard.jsx`
- **Descripción:** Vista detallada de un artículo.
- **Features:**
  - Galería de imágenes
  - Botón "Solicitar" o "Reservar"
  - Perfil del autor con opción de contactar
  - Valoraciones del autor

### `<CreatePost />`
- **Ubicación:** `src/pages/CreatePost.jsx`
- **Descripción:** Formulario para crear/editar un artículo.
- **Fields:**
  - Título, descripción, categoría, tipo
  - Upload de imagen (Cloudinary)
  - Seleccionar etiquetas

### `<UserProfile />`
- **Ubicación:** `src/pages/UserProfile.jsx`
- **Descripción:** Perfil del usuario.
- **Muestra:** Foto, bio, reputación, artículos publicados, valoraciones

### `<MyRequests />`
- **Ubicación:** `src/pages/MyRequests.jsx`
- **Descripción:** Solicitudes recibidas y realizadas por el usuario.
- **Features:** Aceptar/rechazar solicitudes, ver detalles

### `<Messages />`
- **Ubicación:** `src/pages/Messages.jsx`
- **Descripción:** Lista de conversaciones activas.

### `<Chat />`
- **Ubicación:** `src/pages/Chat.jsx`
- **Descripción:** Vista detallada de un chat con otro usuario.
- **Features:** Enviar mensajes, historial, marcar como leído

### `<AdminPanel />`
- **Ubicación:** `src/pages/AdminPanel.jsx`
- **Descripción:** Panel de administración (solo admin).
- **Features:** Gestionar usuarios, posts, ver estadísticas
