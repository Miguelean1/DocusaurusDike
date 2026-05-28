---
sidebar_position: 2
title: Estructura de commits
---

# Estructura de commits

El proyecto sigue la convención [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/).

---

## Formato general

```
<tipo>(<ámbito opcional>): <descripción corta>

<cuerpo opcional>

<footer opcional>
```

### Ejemplos

```
feat(auth): add JWT login

Implements JWT-based authentication with 7-day tokens.
Token is stored in localStorage and sent in every request.

Closes #123
```

```
fix(posts): validate empty title on post creation

Backend was accepting empty titles when creating posts.
Added validation in the controller.
```

```
docs(readme): update setup instructions
```

---

## Tipos de commit

| Tipo      | Cuándo usarlo | Ejemplo |
|-----------|---------------|---------|
| `feat`    | **Nueva funcionalidad** | `feat(chat): add real-time messaging` |
| `fix`     | **Corrección de un bug** | `fix(auth): redirect to login on expired token` |
| `docs`    | **Cambios en documentación** | `docs(readme): update environment variables` |
| `style`   | **Formato, espacios, semicolons** (sin cambio lógico) | `style(frontend): format code with Prettier` |
| `refactor`| **Refactorización sin cambio de comportamiento** | `refactor(api): extract validation to middleware` |
| `test`    | **Añadir o corregir tests** | `test(auth): add cases for failed login` |
| `chore`   | **Tareas de mantenimiento, deps, CI** | `chore(deps): update React to 19.2.0` |
| `perf`    | **Mejoras de rendimiento** | `perf(feed): lazy load feed images` |
| `ci`      | **Cambios en CI/CD** | `ci(github-actions): add test on PR` |
| `revert`  | **Revertir un commit anterior** | `revert: feat(chat)` |

---

## Ámbito (scope)

Especifica qué parte del proyecto se modifica:

| Ámbito        | Qué afecta |
|---------------|-----------|
| `auth`        | Autenticación, login, register |
| `posts`       | Creación, edición, eliminación de artículos |
| `messages`    | Chat y mensajería |
| `requests`    | Solicitudes de artículos |
| `users`       | Perfiles de usuario |
| `ratings`     | Valoraciones |
| `api`         | Backend general |
| `frontend`    | Frontend general |
| `db`          | Cambios en base de datos / migraciones |
| `deps`        | Dependencias (package.json) |

---

## Descripción corta

- **Siempre en inglés.**
- Usa **imperativo** (add, fix, update) no pasado (added, fixed).
- **No capitalizar** la primera letra.
- **Sin punto** al final.
- **Máximo 50 caracteres**.

### ✅ Correcto
```
feat(auth): add JWT authentication
fix(feed): show filtered posts correctly
docs: update installation instructions
```

### ❌ Incorrecto
```
feat(auth): Add JWT authentication.   ← primera letra en mayúscula y punto al final
feat(auth): added JWT authentication  ← en pasado, no imperativo
fix(feed): fix posts                  ← demasiado vago, sin contexto
```

---

## Cuerpo (opcional pero recomendado)

Explica **QUÉ** y **POR QUÉ**, no el HOW (el código ya lo muestra).

**Características:**
- Separado de la descripción por una línea en blanco.
- Envuelve en 72 caracteres.
- Detalla cambios importantes.

**Ejemplo:**
```
feat(posts): añadir descripción extendida

Los usuarios pueden ahora añadir descripciones largas
a sus artículos. Esto mejora la experiencia al permitir
detalles de estado, instrucciones de uso, etc.

La vista detallada también muestra la descripción expandida.
```

---

## Footer (opcional)

Referencia issues, breaking changes, etc.

```
Closes #123
Refs #456
BREAKING CHANGE: ya no soportamos Node 16
```

---

## Ejemplos reales

### Nuevo endpoint
```
feat(api): add POST /posts/search with advanced filters

Adds a new endpoint for advanced search with:
- Filter by category
- Filter by type (loan/donation/exchange)
- Filter by status
- Sort by date or relevance

Closes #42
```

### Bugfix
```
fix(frontend): autoscroll in chat triggers twice

useEffect had a dependency causing unnecessary re-renders,
scrolling to the bottom of the chat twice per message.

Fixed by using [] as the correct dependency.

Closes #89
```

### Refactoring
```
refactor(auth): consolidate JWT validation

Extracted JWT validation to a shared middleware
to avoid duplication across routes.
No behavior changes.
```

### Actualización de dependencias
```
chore(deps): update Express 5.1.0 → 5.2.1

Includes security fixes and performance improvements.
```

---

## Recomendaciones

### ✅ Buenas prácticas

- ✅ **Commits atómicos:** Un commit = un cambio lógico
- ✅ **Frecuentes:** Haz commits regularmente, no todo al final
- ✅ **Descriptivos:** Alguien que lea el commit sin ver el código entienda qué pasó
- ✅ **Sin code comentado:** No hagas commits con código comentado
- ✅ **Tests deben pasar:** Cada commit debe ser compilable y pasar tests

### ❌ Evitar

- ❌ "fix typo" como 50 commits separados → `chore: fix typos`
- ❌ "Update" → sé específico: "Update dependencies" o "Update README"
- ❌ Mezclar múltiples funcionalidades en un commit
- ❌ Cambios no relacionados en el mismo commit
- ❌ Commits con información sensible (.env, passwords)

---

## Integración con GitHub

### Convención en PRs

El título de la PR debe seguir el mismo formato:

```
feat(chat): add typing notifications

[body of PR with description]
Closes #123
```

### Labels automáticas

Basadas en el tipo de commit:
- `feature` → `feat:`, `feature:`
- `bugfix` → `fix:`
- `documentation` → `docs:`
- `chore` → `chore:`, `ci:`, `deps:`

---

## Comandos útiles

```bash
# Ver commits en bonito
git log --oneline

# Ver commits con más detalles
git log --pretty=format:"%h %s" -10

# Ver commits de un archivo
git log -- src/components/Navbar.jsx

# Ver commits de un tipo
git log --grep="^feat" --oneline
```

---

## Checklist antes de hacer commit

- [ ] Cambios relacionados (un solo propósito lógico)
- [ ] Tests pasan localmente
- [ ] Código formateado (Prettier, ESLint)
- [ ] No hay archivos `.env` o secretos
- [ ] Mensaje sigue Conventional Commits
- [ ] Descripción clara sin puntos
- [ ] Máximo 50 caracteres en el título
