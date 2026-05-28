---
sidebar_position: 1
title: Endpoints
---

# API — Endpoints

Listado completo de los endpoints disponibles en la API REST del backend.

**Base URL:** `http://localhost:3002/api`

---

## Autenticación (`/api/auth`)

### `POST /auth/register`
- **Descripción:** Registra un nuevo usuario.
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string (mín. 6 caracteres)"
  }
  ```
- **Respuesta exitosa:** `201 Created`
  ```json
  {
    "message": "Usuario registrado exitosamente",
    "user": { "id", "username", "email" }
  }
  ```

### `POST /auth/login`
- **Descripción:** Inicia sesión y devuelve un JWT.
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Respuesta exitosa:** `200 OK`
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { "id", "username", "email", "role" }
  }
  ```

### `GET /auth/verify-email/:token`
- **Descripción:** Verifica el email del usuario con un token.
- **Respuesta:** `200 OK` si es válido, `400 Bad Request` si expira.

### `POST /auth/forgot-password`
- **Descripción:** Solicita reset de contraseña.
- **Body:** `{ "email": "string" }`
- **Respuesta:** `200 OK` (envía email con token)

### `POST /auth/reset-password`
- **Descripción:** Restaura la contraseña con token.
- **Body:**
  ```json
  {
    "token": "string",
    "newPassword": "string"
  }
  ```

---

## Usuarios (`/api/users`)

### `GET /users/:id`
- **Descripción:** Obtiene el perfil de un usuario.
- **Respuesta:**
  ```json
  {
    "id": "number",
    "username": "string",
    "email": "string",
    "profile_picture": "string",
    "bio": "string",
    "reputation": "number",
    "role": "user|admin"
  }
  ```

### `GET /users/:id/posts`
- **Descripción:** Obtiene los artículos publicados por un usuario.
- **Respuesta:** Array de posts.

### `PUT /users/:id`
- **Descripción:** Actualiza el perfil del usuario (requiere autenticación).
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "username": "string",
    "bio": "string",
    "profile_picture": "file"
  }
  ```

---

## Artículos - Posts (`/api/posts`)

### `GET /posts`
- **Descripción:** Lista todos los artículos publicados.
- **Query Params (opcionales):**
  - `category=string` — filtrar por categoría
  - `type=loan|donation|exchange` — filtrar por tipo
  - `status=available|borrowed|reserved` — filtrar por estado
  - `search=string` — búsqueda en título y descripción
- **Respuesta:** Array de posts con detalles.

### `GET /posts/:id`
- **Descripción:** Obtiene los detalles completos de un artículo.
- **Respuesta:**
  ```json
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "image": "url",
    "category": "string",
    "type": "loan|donation|exchange",
    "status": "available|borrowed|reserved",
    "author": { "id", "username", "profile_picture" },
    "tags": ["tag1", "tag2"],
    "creation_date": "ISO date"
  }
  ```

### `POST /posts`
- **Descripción:** Crea un nuevo artículo (requiere autenticación).
- **Headers:** 
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "category": "string",
    "type": "loan|donation|exchange",
    "image": "file",
    "tags": ["tag1", "tag2"]
  }
  ```
- **Respuesta:** `201 Created` con el post creado.

### `PUT /posts/:id`
- **Descripción:** Actualiza un artículo (requiere ser autor).
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Similar a POST.

### `PATCH /posts/:id/status`
- **Descripción:** Cambia el estado de un artículo (autor solo).
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "status": "available|borrowed|reserved" }`

### `DELETE /posts/:id`
- **Descripción:** Elimina un artículo (requiere ser autor).
- **Headers:** `Authorization: Bearer <token>`

---

## Solicitudes (`/api/requests`)

### `GET /requests`
- **Descripción:** Obtiene las solicitudes del usuario autenticado.
- **Headers:** `Authorization: Bearer <token>`

### `POST /requests`
- **Descripción:** Crea una solicitud para un artículo.
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "post_id": "number",
    "message": "string",
    "return_date": "date (si es préstamo)"
  }
  ```

### `PUT /requests/:id`
- **Descripción:** Responde a una solicitud (aceptar/rechazar).
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "status": "accepted|rejected" }`

---

## Mensajes (`/api/messages`)

### `GET /messages`
- **Descripción:** Obtiene todas las conversaciones del usuario.
- **Headers:** `Authorization: Bearer <token>`
- **Respuesta:** Array de últimos mensajes por usuario.

### `GET /messages/:userId`
- **Descripción:** Obtiene el historial de mensajes con un usuario.
- **Headers:** `Authorization: Bearer <token>`

### `POST /messages`
- **Descripción:** Envía un mensaje directo.
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "receiver_id": "number",
    "content": "string"
  }
  ```

### `PUT /messages/:id/read`
- **Descripción:** Marca un mensaje como leído.
- **Headers:** `Authorization: Bearer <token>`

---

## Valoraciones (`/api/ratings`)

### `GET /ratings/user/:userId`
- **Descripción:** Obtiene las valoraciones de un usuario.

### `POST /ratings`
- **Descripción:** Crea una valoración (requiere autenticación).
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "rated_user_id": "number",
    "post_id": "number",
    "score": "1-5",
    "review": "string"
  }
  ```

---

## Categorías (`/api/categories`)

### `GET /categories`
- **Descripción:** Lista todas las categorías disponibles.
- **Respuesta:** `["Electrónica", "Libros", "Muebles", ...]`

### `POST /categories`
- **Descripción:** Crea una categoría (requiere autenticación).
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "name": "string" }`

---

## Etiquetas (`/api/tags`)

### `GET /tags`
- **Descripción:** Lista todas las etiquetas disponibles.

### `POST /tags`
- **Descripción:** Crea una etiqueta (requiere autenticación).
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "name": "string" }`

---

## Newsletter (`/api/newsletter`)

### `POST /newsletter/subscribe`
- **Descripción:** Suscribirse al newsletter.
- **Body:** `{ "email": "string" }`

---

## Admin (`/api/admin`) ⚠️ Requiere rol admin

### `GET /admin/users`
- **Descripción:** Lista todos los usuarios.

### `PUT /admin/users/:id`
- **Descripción:** Actualiza un usuario (rol, reputación).
- **Body:** `{ "role": "user|admin", "reputation": "number" }`

### `DELETE /admin/users/:id`
- **Descripción:** Elimina un usuario.

### `GET /admin/posts`
- **Descripción:** Lista todos los posts.

### `PUT /admin/posts/:id`
- **Descripción:** Actualiza un post.

### `DELETE /admin/posts/:id`
- **Descripción:** Elimina un post.
