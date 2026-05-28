---
sidebar_position: 1
title: Decisiones de diseño
---

# Decisiones de diseño

Registro de las decisiones técnicas más relevantes tomadas durante el desarrollo de DIKË.

---

## 1. Multirrepo (Frontend/Backend separados)

**Contexto:** Al inicio del proyecto, se decidió cómo organizar los repositorios.

**Decisión:** Usar una estructura **multirrepo** con dos repositorios independientes (DikeBack y DikeFront).

**Consecuencias:**
- ✅ Frontend y backend se despliegan de forma independiente
- ✅ Cada equipo puede trabajar en paralelo sin bloqueos
- ✅ Diferentes tecnologías y ciclos de vida bien separados
- ❌ Requiere sincronización manual de cambios en API

---

## 2. React + Vite para Frontend

**Contexto:** Se necesitaba elegir framework y build tool para el frontend.

**Decisión:** **React 19** con **Vite 7** como herramienta de build.

**Consecuencias:**
- ✅ Hot Module Replacement (HMR) rápidísimo en desarrollo
- ✅ Build muy optimizado para producción
- ✅ Ecosistema React amplio con muchas librerías
- ❌ Curva de aprendizaje para nuevos miembros sin experiencia React
- ❌ Bundle size potencialmente grande sin tree-shaking cuidadoso

---

## 3. Express.js para Backend

**Contexto:** Se necesitaba elegir framework Node.js para la API REST.

**Decisión:** **Express.js 5.2.1** para el backend.

**Consecuencias:**
- ✅ Rápido de desarrollar, bajo overhead
- ✅ Amplio ecosistema de middleware
- ✅ Comunidad grande con muchos ejemplos
- ❌ Arquitectura menos estructurada que NestJS (requiere disciplina del equipo)
- ❌ Menos validación automática de tipos

---

## 4. MySQL con Sequelize ORM

**Contexto:** Se necesitaba elegir base de datos y ORM.

**Decisión:** **MySQL 8** como BD relacional, con **Sequelize 6** como ORM.

**Consecuencias:**
- ✅ Relaciones bien definidas y consistencia ACID
- ✅ Sequelize maneja migraciones automáticamente
- ✅ Queries type-safe con métodos de Sequelize
- ❌ Menos flexible que NoSQL para cambios de schema frecuentes
- ❌ Requiere planeación de migraciones antes de deployar

---

## 5. JWT para Autenticación

**Contexto:** Se necesitaba elegir mecanismo de autenticación.

**Decisión:** **JWT (JSON Web Tokens)** con duración de 7 días.

**Consecuencias:**
- ✅ Stateless (sin necesidad de almacenar sesiones)
- ✅ Escalable horizontalmente (múltiples servidores sin sincronización)
- ✅ Funciona bien con SPAs y múltiples dominios (CORS)
- ❌ Token no se puede revocar instantáneamente (existe 7 días)
- ❌ Si alguien obtiene el token, tiene acceso completo
- ⚠️ Requiere HTTPS en producción (mitigado)

---

## 6. Cloudinary para Almacenamiento de Imágenes

**Contexto:** Se necesitaba manejar uploads de imágenes de usuarios.

**Decisión:** **Cloudinary** para almacenar y servir imágenes.

**Consecuencias:**
- ✅ Imágenes servidas desde CDN (rápido a nivel global)
- ✅ Redimensionamiento automático on-the-fly
- ✅ Sin necesidad de gestionar almacenamiento local
- ✅ Plan gratuito suficiente para MVP
- ❌ Dependencia de servicio externo
- ❌ Posible downtime de Cloudinary afecta la app

---

## 7. Tailwind CSS para Estilos

**Contexto:** Se necesitaba elegir estrategia de estilos.

**Decisión:** **Tailwind CSS 4** con utility-first approach.

**Consecuencias:**
- ✅ Desarrollo rápido sin escribir CSS personalizado
- ✅ Consistencia de diseño automatizada
- ✅ Bundle size optimizado (purge automático)
- ❌ HTML con muchas clases puede ser menos legible
- ❌ Curva de aprendizaje para desenvolverse sin Bootstrap

---

## 8. Multirrepo vs Monorrepo

**Contexto:** Estructura de repositorios ya discutida en Decisión 1.

**Conclusión:** La decisión de multirrepo fue la correcta para este MVP porque:
- Permite despliegue independiente (Frontend en Vercel, Backend en Railway)
- Equipos pequeños trabajan sin bloqueos
- Cada repo tiene su propio CI/CD simplificado

**Revisión futura:** Si el equipo crece a 10+ desarrolladores, reconsiderar monorrepo con Turborepo.

---

## 9. React Context para State Management

**Contexto:** Se necesitaba estado global para autenticación y datos de usuario.

**Decisión:** **React Context API** para almacenar JWT y datos de usuario.

**Consecuencias:**
- ✅ Mínimas dependencias externas
- ✅ Nativa de React, sin boilerplate
- ✅ Suficiente para casos de uso actual
- ❌ Performance si estado crece mucho
- ⚠️ Si el estado se hace complejo, migrar a Redux/Zustand en futuro

---

## 10. Arquitectura de Carpetas (Features-Based)

**Contexto:** Se necesitaba estructura clara para el frontend.

**Decisión:** Estructura basada en funcionalidades:
```
features/auth/      (Login, Register, Recover)
pages/              (Feed, DetailCard, CreatePost)
components/         (Navbar, Footer, Card, UI)
services/           (API client)
context/            (Auth state)
```

**Consecuencias:**
- ✅ Claro dónde buscar código de una feature
- ✅ Fácil de escalar agregando features
- ✅ Menos imports cruzados entre carpetas
- ❌ Algunas carpetas comparten (components/ es compartida)

---

## Potenciales cambios futuros

Si el proyecto crece:

1. **Mirar a TypeScript** — Añade type-safety sin complejidad innecesaria en MVP
2. **Testing:** Implementar Vitest/Jest más rigoroso
3. **Redis:** Si hay caché/sesiones
4. **GraphQL:** Si las queries REST se hacen demasiado complejas
5. **Logging centralizado:** Con observabilidad (Sentry, LogRocket)
6. **Rate limiting:** Si los abusos aumentan
7. **WebSockets:** Si se requiere actualización en tiempo real (actualmente Polling)
