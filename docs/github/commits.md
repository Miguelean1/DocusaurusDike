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
feat(auth): añadir login con JWT

Implementa autenticación basada en JWT con tokens de 7 días.
El token se almacena en localStorage y se envía en cada petición.

Closes #123
```

```
fix(posts): corregir validación de título vacío

El backend aceptaba títulos vacíos en la creación de posts.
Se añadió validación en el controlador.
```

```
docs(readme): actualizar instrucciones de setup
```

---

## Tipos de commit

| Tipo      | Cuándo usarlo | Ejemplo |
|-----------|---------------|---------|
| `feat`    | **Nueva funcionalidad** | `feat(chat): añadir mensajería en tiempo real` |
| `fix`     | **Corrección de un bug** | `fix(auth): token expirado no redirige a login` |
| `docs`    | **Cambios en documentación** | `docs(readme): actualizar variables de entorno` |
| `style`   | **Formato, espacios, semicolons** (sin cambio lógico) | `style(frontend): formatear código con Prettier` |
| `refactor`| **Refactorización sin cambio de comportamiento** | `refactor(api): extraer validación a middleware` |
| `test`    | **Añadir o corregir tests** | `test(auth): añadir casos para login fallido` |
| `chore`   | **Tareas de mantenimiento, deps, CI** | `chore(deps): actualizar React a 19.2.0` |
| `perf`    | **Mejoras de rendimiento** | `perf(feed): lazy load imágenes en feed` |
| `ci`      | **Cambios en CI/CD** | `ci(github-actions): añadir test en PR` |
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

- Usa **imperativo** (añadir, corregir, mejorar) no pasado (añadió, corrigió).
- **No capitalizar** la primera letra.
- **Sin punto** al final.
- **Máximo 50 caracteres**.

### ✅ Correcto
```
feat(auth): añadir autenticación JWT
fix(feed): mostrar posts filtrados correctamente
docs: actualizar instrucciones de instalación
```

### ❌ Incorrecto
```
feat(auth): Añadir autenticación JWT.
feat(auth): added JWT authentication
fix(feed): posts not showing
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
feat(api): POST /posts/search con filtros avanzados

Añade un nuevo endpoint para búsqueda avanzada con:
- Filtro por categoría
- Filtro por tipo (loan/donation/exchange)
- Filtro por estado
- Ordenamiento por fecha o relevancia

Closes #42
```

### Bugfix
```
fix(frontend): autoscroll en chat se dispara dos veces

El hook useEffect había una dependencia que causaba
re-renders innecesarios, haciendo scroll al final
del chat dos veces por cada mensaje.

Se agregó [] como dependencia correcta.

Closes #89
```

### Refactoring
```
refactor(auth): consolidar validación de JWT

Se extrajo la validación de JWT a un middleware
compartido para evitar duplicación entre rutas.
No hay cambios en el comportamiento.
```

### Actualización de dependencias
```
chore(deps): actualizar Express 5.1.0 → 5.2.1

Incluye fixes de seguridad y mejoras de rendimiento.
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
feat(chat): añadir notificaciones de escritura

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
