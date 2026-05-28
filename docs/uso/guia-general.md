---
sidebar_position: 3
title: Guía de uso
---

# Guía de uso general

Una vez dentro de la aplicación, aquí están las acciones principales que puedes realizar.

---

## Ver artículos (Feed)

1. Después de iniciar sesión, llegarás automáticamente al **Feed** (`/feed`).
2. Aquí verás un listado de todos los artículos disponibles compartidos por otros usuarios.
3. Puedes:
   - **Filtrar por categoría** (Electrónica, Libros, Muebles, etc.)
   - **Filtrar por tipo** (Préstamo, Donación, Intercambio)
   - **Buscar** artículos por palabras clave
   - **Hacer clic en un artículo** para ver más detalles

---

## Ver detalles de un artículo

1. Haz clic en cualquier artículo en el Feed.
2. Se abrirá la página de detalles (`/anuncio/:id`) con:
   - Imagen/galería del artículo
   - Título, descripción completa
   - Categoría, tipo (préstamo/donación/intercambio), estado
   - Perfil del propietario con opción de contactar
   - Valoración del propietario

3. **Acciones disponibles:**
   - **Solicitar** (si quieres pedir el artículo)
   - **Contactar** (enviar mensaje al propietario)
   - **Volver al Feed**

---

## Crear un anuncio

1. Haz clic en **Publicar** en la navegación o ve a `/publicar`.
2. Rellena el formulario:
   - **Título:** Nombre descriptivo del artículo (ej: "Bicicleta montaña 26 pulgadas")
   - **Descripción:** Detalles, estado, por qué lo compartes, etc.
   - **Categoría:** Elige la más apropiada
   - **Tipo:** 
     - **Préstamo:** Quieres que te lo devuelvan
     - **Donación:** Lo regalas sin devolución
     - **Intercambio:** Quieres algo a cambio
   - **Imagen:** Sube una foto clara del artículo
   - **Etiquetas** (opcional): Añade etiquetas relevantes

3. Pulsa **Publicar artículo**.
4. Tu anuncio aparecerá en el Feed inmediatamente.

---

## Editar un anuncio

1. Ve a tu **Perfil** (`/perfil/:tu_id`).
2. En la sección "Mis artículos", busca el que quieres editar.
3. Haz clic en el botón **Editar** (icono de lápiz).
4. Modifica los campos que necesites.
5. Pulsa **Guardar cambios**.

---

## Eliminar un anuncio

1. Ve a tu perfil y busca el artículo.
2. Haz clic en el botón **Eliminar** (icono de papelera).
3. Confirma la eliminación.
4. El artículo se eliminará permanentemente.

---

## Cambiar el estado de un artículo

Si tienes un préstamo activo o alguien aceptó una solicitud:

1. Ve a **Mis artículos** en tu perfil.
2. El estado puede ser:
   - **Disponible:** Alguien puede solicitarlo
   - **Reservado:** Alguien tiene una solicitud en proceso
   - **Prestado:** Está siendo usado por otra persona
3. Actualiza el estado manualmente según sea necesario.

---

## Enviar una solicitud

1. Encuentra un artículo que te interese.
2. Haz clic en **Solicitar**.
3. (Opcional) Escribe un mensaje al propietario explicando tu necesidad.
4. Si es un préstamo, indica una fecha aproximada de devolución.
5. Pulsa **Enviar solicitud**.
6. El propietario recibirá tu solicitud y podrá aceptarla o rechazarla.

---

## Gestionar solicitudes recibidas

1. Ve a **Mis solicitudes** (`/mis-solicitudes`).
2. Verás dos pestañas:
   - **Solicitudes recibidas:** Peticiones que otros usuarios hacen sobre tus artículos
   - **Solicitudes enviadas:** Peticiones que tú has hecho

3. Para solicitudes **recibidas**, puedes:
   - **Aceptar:** El usuario podrá retirar el artículo
   - **Rechazar:** Comunicar que no es posible

4. Para solicitudes **enviadas**, puedes:
   - Ver el **estado actual** (pendiente, aceptada, rechazada)
   - **Cancelar** tu solicitud

---

## Enviar un mensaje

### Opción 1: Desde un artículo
1. En la página de detalles, haz clic en **Contactar**.
2. Se abrirá un chat con el propietario.

### Opción 2: Desde Mensajes
1. Ve a **Mensajes** (`/mensajes`).
2. Si ya tienes conversaciones, haz clic en una para continuar.
3. Si es primera vez, ve al perfil del usuario y selecciona **Contactar**.

### Enviar un mensaje en el chat
1. En la página de chat (`/mensajes/:userId`), escribe tu mensaje en el cuadro inferior.
2. Pulsa **Enviar** (o Enter).
3. Tu mensaje aparecerá inmediatamente en la conversación.

---

## Ver tu perfil

1. Haz clic en tu avatar/nombre en la barra de navegación.
2. Se abrirá tu perfil (`/perfil/:tu_id`) con:
   - Foto de perfil
   - Bio / descripción
   - Reputación (puntuación basada en valoraciones)
   - Tus artículos publicados
   - Tus valoraciones recibidas

3. Puedes **editar tu perfil** haciendo clic en **Editar**.

---

## Editar tu perfil

1. Ve a tu perfil.
2. Haz clic en **Editar perfil**.
3. Modifica:
   - Nombre de usuario
   - Foto de perfil
   - Bio / descripción personal
4. Pulsa **Guardar cambios**.

---

## Ver perfil de otros usuarios

1. Haz clic en el nombre/avatar de cualquier usuario en:
   - Un artículo del Feed
   - Detalles de un anuncio
   - Una solicitud

2. Verás su perfil con:
   - Su información
   - Sus artículos
   - Sus valoraciones
   - Opción de **contactar**

---

## Valorar a un usuario

Después de una transacción (préstamo completado, intercambio realizado):

1. Ve a la página del artículo o busca al usuario.
2. Haz clic en **Valorar usuario**.
3. Rellena:
   - **Puntuación:** 1-5 estrellas
   - **Comentario:** Una reseña breve de la experiencia
4. Pulsa **Enviar valoración**.
5. Tu valoración se mostrará en el perfil del usuario y afectará su reputación.

---

## Panel de administración (solo admin)

Si tienes rol de administrador, puedes acceder a `/admin` para:
- Ver todos los usuarios
- Cambiar roles o editar usuarios
- Ver y moderar todos los artículos
- Eliminar contenido inapropiado
- Ver estadísticas generales
