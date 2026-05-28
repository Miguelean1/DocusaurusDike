---
sidebar_position: 1
title: Repositorios
---

# GitHub — Repositorios

## Estructura: Multirrepo

DIKË está organizado como un **multirrepo**, con dos repositorios independientes:

- **[DikeBack](https://github.com/Miguelean1/DikeBack)** — Backend Express.js + API REST
- **[DikeFront](https://github.com/Miguelean1/DikeFront)** — Frontend React + Vite

### Razón de esta estructura

- **Separación de responsabilidades:** Frontend y backend tienen tecnologías, dependencias y ciclos de vida diferentes.
- **Equipos independientes:** Permite que diferentes equipos trabajen en paralelo sin conflictos.
- **Despliegue independiente:** El frontend se puede desplegar en Vercel y el backend en Railway sin sincronización.
- **Control de versiones limpio:** Cada repositorio tiene su propio historial de commits sin ruido del otro.

---

## Ramas principales

### Convención de nombres

| Rama      | Propósito                                    | Se actualiza de |
|-----------|----------------------------------------------|-----------------|
| `main`    | Rama de producción, siempre estable          | `develop` (vía PR) |
| `develop` | Rama de integración / desarrollo activo      | `feature/*` y `fix/*` (vía PR) |
| `feature/*` | Nuevas funcionalidades (ej: `feature/messaging`) | `develop` |
| `fix/*`   | Corrección de bugs (ej: `fix/auth-logout`)   | `develop` |
| `hotfix/*` | Fixes críticos en producción (ej: `hotfix/security-patch`) | `main` y `develop` |

### Ejemplo de historial de ramas

```
main           ──○──────────○──────────○──
               /              /          /
develop       ─────○────○────○────○─────
             /     /   /     /    \
feature/*    ○─────o   ○─────o     (merge)
            /
fix/*       ○─────o (merge)
```

---

## Estrategia de integración (Git Flow)

### Flujo para una nueva funcionalidad

1. **Crear rama desde `develop`:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nombre-funcionalidad
   ```

2. **Desarrollar y hacer commits:**
   ```bash
   git add .
   git commit -m "feat(modulo): descripción del cambio"
   # Múltiples commits bien documentados
   ```

3. **Abrir Pull Request (PR) a `develop`:**
   - Título: `feat: Descripción de la funcionalidad`
   - Descripción: Qué cambios, por qué, cómo testear
   - Solicitadores de review: equipo

4. **Revisar, aprobar y mergear:**
   ```bash
   # Una vez aprobada la PR
   git merge --no-ff feature/nombre-funcionalidad
   git push origin develop
   ```

5. **Borrar rama local y remota:**
   ```bash
   git branch -d feature/nombre-funcionalidad
   git push origin --delete feature/nombre-funcionalidad
   ```

### Flujo para integración en main (release)

Cuando `develop` está lista para producción:

1. **Crear rama `release` desde `develop`:**
   ```bash
   git checkout -b release/v1.0.0 develop
   ```

2. **Cambios finales (versionado, changelog):**
   ```bash
   git commit -m "chore: bumping version to 1.0.0"
   ```

3. **Mergear en main con tag:**
   ```bash
   git checkout main
   git merge --no-ff release/v1.0.0
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin main
   git push origin v1.0.0
   ```

4. **Mergear de vuelta a develop:**
   ```bash
   git checkout develop
   git merge --no-ff release/v1.0.0
   git push origin develop
   ```

5. **Borrar rama release:**
   ```bash
   git branch -d release/v1.0.0
   git push origin --delete release/v1.0.0
   ```

### Flujo para hotfix en producción

Si hay un bug crítico en main:

1. **Crear hotfix desde main:**
   ```bash
   git checkout -b hotfix/nombre-del-bug main
   ```

2. **Arreglar el bug y mergear a main:**
   ```bash
   git add .
   git commit -m "fix(critico): descripción"
   git checkout main
   git merge --no-ff hotfix/nombre-del-bug
   git tag v1.0.1
   git push origin main
   git push origin v1.0.1
   ```

3. **Mergear también a develop:**
   ```bash
   git checkout develop
   git merge --no-ff hotfix/nombre-del-bug
   git push origin develop
   ```

---

## Protecciones de rama

Se recomienda configurar en GitHub:

### Para `main`
- ✅ Requerir pull requests antes de mergear
- ✅ Requerir al menos 1 review antes de mergear
- ✅ Requerir que todas las verificaciones CI/CD pasen
- ✅ Descartar cambios aprobados cuando hay nuevos commits

### Para `develop`
- ✅ Requerir pull requests antes de mergear
- ✅ Requerir que CI/CD pase (tests, lint)
- ⚠️ Review opcional (depende del equipo)

---

## Versionado semántico

Se sigue [Semantic Versioning](https://semver.org/es/):

- **MAJOR.MINOR.PATCH** (ej: v1.2.3)
- **MAJOR:** Cambios incompatibles
- **MINOR:** Nuevas funcionalidades compatibles
- **PATCH:** Fixes sin cambios de API

**Tags en GitHub:**
```bash
git tag v1.2.3
git push origin v1.2.3
```

---

## Checklist para iniciar desarrollo

- [ ] Rama creada desde `develop` (nunca desde `main`)
- [ ] Nombre de rama sigue el patrón `feature/` o `fix/`
- [ ] Commits siguen [Conventional Commits](./commits.md)
- [ ] Tests pasan localmente (`npm test`)
- [ ] Linting pasa (`npm run lint`)
- [ ] Pull request abierta hacia `develop` (no `main`)
- [ ] Descripción clara en la PR (qué, por qué, cómo)
- [ ] Esperar review antes de mergear
