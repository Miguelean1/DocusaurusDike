---
sidebar_position: 2
title: Variables de entorno
---

# Variables de entorno

Lista de todas las variables de entorno necesarias para ejecutar DIKË.

:::caution
Nunca subas archivos `.env` o `.env.local` al repositorio. Están en `.gitignore` por seguridad.
:::

---

## Backend

Archivo: `DikeBack/.env`

### Base de datos

| Variable    | Descripción                              | Ejemplo Local      | Ejemplo Producción |
|-------------|------------------------------------------|--------------------|-------------------|
| `DB_HOST`   | Host del servidor MySQL                  | `localhost`        | `mysql.railway.internal` |
| `DB_PORT`   | Puerto de MySQL                          | `3306`             | `3306`             |
| `DB_NAME`   | Nombre de la base de datos               | `dikhe_db`         | `dikhe_prod`       |
| `DB_USER`   | Usuario de MySQL                         | `root`             | `admin`            |
| `DB_PASSWORD` | Contraseña de MySQL                    | `1234`             | Contraseña fuerte  |

### Autenticación

| Variable      | Descripción                           | Ejemplo |
|---------------|---------------------------------------|---------|
| `JWT_SECRET`  | Clave secreta para firmar JWT (genera con `openssl rand -hex 32`) | `abc123xyz...` |

### Servidor

| Variable      | Descripción                           | Ejemplo |
|---------------|---------------------------------------|---------|
| `PORT`        | Puerto en el que escucha Express      | `3002`  |
| `NODE_ENV`    | Entorno (development / production)    | `development` |

### CORS y URLs

| Variable       | Descripción                                 | Ejemplo |
|----------------|---------------------------------------------|---------|
| `CORS_ORIGIN`  | URL permitida para CORS (frontend)          | `http://localhost:5173` |
| `FRONTEND_URL` | URL del frontend (para links en emails)     | `http://localhost:5173` |

### Cloudinary (Imágenes)

| Variable                    | Descripción                          | Ejemplo |
|-----------------------------|--------------------------------------|---------|
| `CLOUDINARY_CLOUD_NAME`     | Cloud name de Cloudinary             | `dhhxrrgut` |
| `CLOUDINARY_API_KEY`        | API Key de Cloudinary                | `687499682736147` |
| `CLOUDINARY_API_SECRET`     | API Secret de Cloudinary (SECRETO)   | `OCM1SxU...` |

**Cómo obtener credenciales de Cloudinary:**
1. Registrate en [Cloudinary.com](https://cloudinary.com)
2. Ve a tu Dashboard → Settings
3. Copia Cloud Name, API Key y API Secret

### Email (Nodemailer - opcional)

| Variable      | Descripción                           | Ejemplo |
|---------------|---------------------------------------|---------|
| `EMAIL_USER`  | Email para enviar notificaciones      | `noreply@dike.com` |
| `EMAIL_PASS`  | Contraseña de aplicación (no tu contraseña Gmail) | `xxxx xxxx xxxx xxxx` |

**Para Gmail:**
1. Activa [2FA](https://myaccount.google.com/security)
2. Genera una [contraseña de aplicación](https://myaccount.google.com/apppasswords)
3. Copia esa contraseña (16 caracteres) en `EMAIL_PASS`

---

## Frontend

Archivo: `Dike-frontend/.env` (o `.env.local` para valores locales)

| Variable          | Descripción                          | Ejemplo Local | Ejemplo Producción |
|-------------------|--------------------------------------|---------------|--------------------|
| `VITE_API_URL`    | URL base de la API del backend       | `http://localhost:3002/api` | `https://api.dike.com/api` |

---

## Ejemplos de configuración

### .env local (desarrollo)

```env
# Backend
PORT=3002
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dikhe_db
DB_USER=root
DB_PASSWORD=1234

# JWT
JWT_SECRET=secret001

# CORS
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=dhhxrrgut
CLOUDINARY_API_KEY=687499682736147
CLOUDINARY_API_SECRET=OCM1SxUXmWhSDK1Xmhz0iUG6yVI

# Email
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_app_password
```

### .env producción

```env
# Backend
PORT=3002
NODE_ENV=production

# Database (Railway/PlanetScale)
DB_HOST=mysql.railway.internal
DB_PORT=3306
DB_NAME=dikhe_prod
DB_USER=admin
DB_PASSWORD=GeneratedRandomPassword123!

# JWT
JWT_SECRET=GeneratedWithOpenssl...

# CORS
CORS_ORIGIN=https://dike-app.vercel.app
FRONTEND_URL=https://dike-app.vercel.app

# Cloudinary
CLOUDINARY_CLOUD_NAME=dhhxrrgut
CLOUDINARY_API_KEY=687499682736147
CLOUDINARY_API_SECRET=OCM1SxUXmWhSDK1Xmhz0iUG6yVI

# Email
EMAIL_USER=noreply@dike.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

---

## Generación segura de secretos

Para generar claves seguras en producción:

```bash
# Generar JWT_SECRET (recomendado: 32 caracteres hex)
openssl rand -hex 32

# Ejemplo de salida
# a3b5c7d9e1f3g5h7i9j1k3l5m7n9o1p3q5r7s9t1u3v5w7x9y1z3a5b7c9d1e3f5
```

---

## Checklist de configuración

- [ ] Base de datos creada y credenciales configuradas
- [ ] JWT_SECRET generado y configurado
- [ ] Cloudinary credentials obtenidas y configuradas
- [ ] CORS_ORIGIN configurado a la URL del frontend
- [ ] EMAIL_USER y EMAIL_PASS configurados (si usas emails)
- [ ] VITE_API_URL en frontend apunta a la URL correcta del backend
- [ ] Archivo `.env` está en `.gitignore` (nunca hacer commit)
- [ ] Todas las variables requeridas están presentes

---

## Troubleshooting

### "Cannot find variable X"
- Asegúrate de que la variable está en el archivo `.env` correcto.
- Reinicia el servidor después de cambiar `.env`.

### "CORS error"
- Verifica que `CORS_ORIGIN` coincide con la URL exacta del frontend.
- Incluye el protocolo (`http://` o `https://`).

### "JWT signature invalid"
- Asegúrate de que `JWT_SECRET` es el mismo en producción y desarrollo.
- Si cambias `JWT_SECRET`, todos los tokens anteriores dejarán de funcionar.

### "Cloudinary error"
- Verifica que las credenciales son correctas.
- Asegúrate de que tienes cuota disponible en Cloudinary.
