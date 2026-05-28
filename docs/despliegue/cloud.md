---
sidebar_position: 1
title: Despliegue en la nube
---

# Despliegue en la nube

Guía para desplegar DIKË en producción.

## Plataformas recomendadas

| Componente   | Plataforma recomendada | Alternativas |
|--------------|------------------------|--------------|
| **Frontend** | Vercel (Next.js) o Netlify (SPA) | AWS S3 + CloudFront, GitHub Pages |
| **Backend**  | Railway, Render, Fly.io | Heroku, AWS EC2, DigitalOcean |
| **BD**       | PlanetScale, Railway, Supabase | AWS RDS, CockroachDB |
| **Imágenes** | Cloudinary (ya configurado) | AWS S3, Imgix |

---

## Opción 1: Railway (Recomendado - Simplicidad)

### Frontend en Railway

1. Conecta tu repositorio GitHub a [Railway.app](https://railway.app)
2. Crea un nuevo proyecto.
3. Selecciona el repositorio `DikeFront`.
4. Railway detectará que es un proyecto Vite/React.
5. Configura estas variables:
   ```
   VITE_API_URL=https://tu-backend.railway.app/api
   ```
6. Deploy automático: cada push a `main` se despliega.

### Backend en Railway

1. En el mismo proyecto de Railway, añade un nuevo servicio.
2. Selecciona `DikeBck`.
3. Configura variables de entorno (ver sección de variables).
4. Railway creará automáticamente una BD MySQL si lo requieres.
5. El backend estará disponible en `https://dike-back.railway.app`

---

## Opción 2: Vercel + Railway

### Frontend en Vercel

1. Ve a [Vercel.com](https://vercel.com)
2. Importa el repositorio `DikeFront`.
3. Configura variables de entorno:
   ```
   VITE_API_URL=https://tu-backend.railway.app/api
   ```
4. Deploya automáticamente desde `main`.

### Backend en Railway

(Igual que la opción anterior)

---

## Opción 3: Despliegue manual en servidor propio

### Requisitos

- Un servidor (DigitalOcean, Linode, AWS EC2, etc.) con Ubuntu/Debian
- SSH acceso al servidor
- Node.js 18+ instalado

### Pasos

1. **Clona el repositorio en el servidor:**
   ```bash
   cd /opt
   git clone https://github.com/tuusuario/DikeBack.git
   git clone https://github.com/tuusuario/DikeFront.git
   ```

2. **Instala dependencias:**
   ```bash
   cd DikeBack && npm install --production
   cd ../Dike-frontend && npm install --production
   ```

3. **Build del frontend:**
   ```bash
   cd Dike-frontend
   npm run build
   # Genera carpeta 'dist' con archivos estáticos
   ```

4. **Configura Nginx como proxy:**
   ```nginx
   server {
     listen 80;
     server_name tu-dominio.com;

     # Frontend
     location / {
       root /opt/Dike-frontend/dist;
       try_files $uri $uri/ /index.html;
     }

     # Backend API
     location /api/ {
       proxy_pass http://localhost:3002;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
     }
   }
   ```

5. **Usa PM2 para mantener el backend ejecutándose:**
   ```bash
   npm install -g pm2
   cd /opt/DikeBack
   pm2 start index.js --name "dike-backend"
   pm2 startup
   pm2 save
   ```

---

## Variables de entorno en producción

Consulta la sección [Variables de entorno](/despliegue/variables-entorno) para la lista completa.

**Cambios importantes respecto a local:**

```env
# Backend
DB_HOST=mysql.railway.internal  # (si usas Railway) o tu RDS host
DB_PASSWORD=contraseña_fuerte   # Usa una contraseña segura
JWT_SECRET=clave_super_secreta_larga  # Genera con: openssl rand -hex 32

# Frontend
VITE_API_URL=https://tu-backend-en-produccion.com/api

# CORS
CORS_ORIGIN=https://tu-frontend.com
```

---

## Despliegue continuo (CI/CD)

### Con GitHub Actions

Crea un archivo `.github/workflows/deploy.yml` (ya puede existir):

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy Backend
        run: |
          # Envía señal a tu servidor/plataforma de despliegue
          # Ejemplo: webhook a Railway, Render, etc.

      - name: Deploy Frontend
        run: |
          # Build y deploy a Vercel/Netlify
```

### Con webhooks

Si usas una plataforma como Railway o Render:
1. Genera un webhook de deploy.
2. Ve a GitHub Repo → Settings → Webhooks.
3. Añade el webhook URL.
4. Ahora cada push a `main` dispara el deploy automáticamente.

---

## SSL/HTTPS

**En plataformas como Vercel, Railway, Netlify:** SSL está incluido gratuitamente.

**En servidor propio:**

```bash
# Usando Let's Encrypt + Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d tu-dominio.com
```

---

## URLs de producción (ejemplo)

Una vez desplegado:

| Servicio  | URL                                  |
|-----------|--------------------------------------|
| Frontend  | https://dike-app.vercel.app          |
| Backend   | https://dike-api.railway.app         |
| API Base  | https://dike-api.railway.app/api     |

---

## Monitoreo y logs

### En Railway/Vercel
- Los logs aparecen en el dashboard de cada plataforma.
- Configura alertas para downtime.

### En servidor propio
```bash
# Ver logs del backend
pm2 logs dike-backend

# Ver logs de Nginx
tail -f /var/log/nginx/error.log
```

---

## Rollback (en caso de error)

### Railway/Vercel
- Haz push a una rama anterior o revert en Git.
- El deploy automático lo deshace.

### Manual
```bash
# Vuelve a la versión anterior
git checkout <commit-hash>
npm run build
# Reinicia servicios
```
