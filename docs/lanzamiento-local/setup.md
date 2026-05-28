---
sidebar_position: 1
title: Lanzamiento en local
---

# Lanzamiento en local

Instrucciones para ejecutar DIKË en tu propio equipo.

## Requisitos previos

| Herramienta   | Versión mínima | Enlace de descarga |
|---------------|----------------|-------------------|
| Node.js       | 18.0.0         | https://nodejs.org |
| npm           | 9.0.0          | (Incluido con Node) |
| MySQL         | 8.0            | https://dev.mysql.com/downloads/mysql/ |
| Git           | 2.0+           | https://git-scm.com |

### Requisitos de base de datos

- MySQL 8.0+ debe estar **instalado y ejecutándose** en tu máquina.
- Se recomienda usar MySQL Workbench o phpMyAdmin para gestionar la BD.

---

## 1. Clonar los repositorios

Abre una terminal y ejecuta:

```bash
# Clonar backend
git clone https://github.com/Miguelean1/DikeBack
cd DikeBack

# Clonar frontend (en otra carpeta)
cd ..
git clone https://github.com/Miguelean1/DikeFront
cd Dike-frontend
```

---

## 2. Instalar dependencias

### Backend

```bash
cd ../DikeBack
npm install
```

### Frontend

```bash
cd ../DikeFront/Dike-frontend
npm install
```

---

## 3. Configurar variables de entorno

### Backend (`.env`)

En la carpeta raíz del backend, crea un archivo `.env` (si no existe) con estos valores:

```env
PORT=3002

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dikhe_db
DB_USER=root
DB_PASSWORD=1234

# JWT
JWT_SECRET=secret001

# Cloudinary (para imágenes)
CLOUDINARY_CLOUD_NAME=dhhxrrgut
CLOUDINARY_API_KEY=687499682736147
CLOUDINARY_API_SECRET=OCM1SxUXmWhSDK1Xmhz0iUG6yVI

# URLs
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173

# Email (opcional, para nodemailer)
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_app_password
```

:::warning
Para cambiar la contraseña de la BD, modifica tanto `DB_PASSWORD` como la configuración en MySQL.
:::

### Frontend (`.env`)

En `Dike-frontend/`, crea un archivo `.env` (generalmente ya contiene los defaults):

```env
VITE_API_URL=http://localhost:3002/api
```

---

## 4. Preparar la base de datos

### Paso 4a: Crear la base de datos

Abre MySQL (línea de comandos o cliente gráfico) y ejecuta:

```sql
CREATE DATABASE IF NOT EXISTS dikhe_db;
```

### Paso 4b: Ejecutar migraciones (opcional)

Si el proyecto tiene migraciones Sequelize, ejecuta:

```bash
cd DikeBack
npm run db:migrate
```

Esto creará todas las tablas automáticamente.

### Alternativa: Si no hay migraciones

Las migraciones se ejecutarán automáticamente en el primer `npm start` del backend gracias a Sequelize.

---

## 5. Arrancar la aplicación

### Opción A: Arrancar por separado (recomendado para desarrollo)

**Terminal 1 — Backend:**

```bash
cd DikeBack
npm run dev
```

Esperaras ver:
```
Server running on port 3002
```

**Terminal 2 — Frontend:**

```bash
cd Dike-frontend
npm run dev
```

Esperarás ver:
```
VITE v7.2.4 ready in 245 ms

➜ Local: http://localhost:5173/
```

### Opción B: Arrancar ambos simultáneamente

Desde la carpeta del frontend:

```bash
npm run dev-start
```

Esto ejecuta backend y frontend en paralelo.

---

## 6. Acceder a la aplicación

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3002/api
- **Base de datos:** localhost:3306 (MySQL)

---

## Primeros pasos

1. Abre http://localhost:5173 en el navegador.
2. Haz clic en **Registrarse** y crea una cuenta.
3. Verifica tu email (si está configurado).
4. Inicia sesión y comienza a usar la app.

---

## Resolución de problemas

### Error: "Cannot find module 'react'"

```bash
# Solución: Reinstalar dependencias
npm install
```

### Error: "Port 3002 already in use"

```bash
# Ver qué proceso está usando el puerto (en Windows)
netstat -ano | findstr :3002

# En Mac/Linux
lsof -i :3002

# Matar el proceso o usa otro puerto en .env
```

### Error: "connect ECONNREFUSED 127.0.0.1:3306"

- MySQL no está ejecutándose.
- Inicia el servicio MySQL desde Servicios (Windows) o terminal.
- Verifica que la contraseña en `.env` es la correcta.

### Error: "Unknown column..." en migraciones

- Elimina la base de datos y vuelve a crear: `DROP DATABASE dikhe_db;`
- Luego: `CREATE DATABASE dikhe_db;`
- Ejecuta las migraciones de nuevo.

### La página muestra "Failed to fetch"

- El backend no está corriendo. Asegúrate de ejecutar `npm run dev` en `DikeBack`.
- Comprueba que `VITE_API_URL` en `.env` del frontend es correcto.

---

## Datos de prueba

Para rellenar la BD con datos de ejemplo (si existen seeds):

```bash
cd DikeBack
npm run db:seed
```

Esto insertará usuarios, categorías y artículos de prueba.

---

## Comandos útiles

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Inicia servidor con nodemon (auto-reload) |
| `npm run build` | Compila para producción |
| `npm test` | Ejecuta tests |
| `npm run lint` | Ejecuta ESLint |
| `npm run db:migrate` | Ejecuta migraciones pendientes |
| `npm run db:seed` | Inserta datos de prueba |
