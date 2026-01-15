# Sistema de Likes - Almacenamiento en Archivo JSON

Este proyecto guarda los likes en un archivo JSON dentro del proyecto (`public/likes.json`), permitiendo que los datos persistan y se compartan entre todos los usuarios.

## 📁 Estructura

```
public/
  └── likes.json  # Archivo JSON con todos los likes
```

## 🔄 Funcionamiento

### Modo Desarrollo (Sin GitHub)
- Los likes se guardan en **localStorage** del navegador
- El archivo `likes.json` se lee al cargar la página
- Los cambios se guardan localmente y se pueden sincronizar manualmente

### Modo Producción (Con GitHub - Opcional)
- Los likes se guardan en **localStorage** (inmediato)
- Si está configurado GitHub, se sincronizan automáticamente con el archivo `likes.json` en el repositorio
- Todos los usuarios ven los mismos conteos de likes

## ⚙️ Configuración

### Opción 1: Solo Archivo JSON (Recomendado para desarrollo)

1. El archivo `public/likes.json` ya existe con contenido inicial: `{}`
2. Los likes se guardan en localStorage
3. Para actualizar el archivo manualmente, copia el contenido de localStorage:
   ```javascript
   // En la consola del navegador:
   localStorage.getItem('usac-rectores-likes-backup')
   ```
4. Pega el contenido en `public/likes.json`

### Opción 2: Sincronización Automática con GitHub

Si quieres que los likes se actualicen automáticamente en el archivo del proyecto:

1. **Crear un Personal Access Token en GitHub:**
   - Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Crea un nuevo token con permisos `repo` (acceso completo a repositorios)
   - Copia el token (solo se muestra una vez)

2. **Configurar variables de entorno:**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_GITHUB_OWNER=tu-usuario-github
   VITE_GITHUB_REPO=nombre-del-repo
   VITE_GITHUB_TOKEN=tu-personal-access-token
   VITE_GITHUB_BRANCH=main
   VITE_GITHUB_LIKES_PATH=public/likes.json
   ```

3. **⚠️ IMPORTANTE - Seguridad:**
   - **NUNCA** subas el archivo `.env` al repositorio
   - Agrega `.env` a tu `.gitignore`
   - Para producción, usa variables de entorno del servicio de hosting (Netlify, Vercel, etc.)

### Opción 3: Webhook o Función Serverless (Avanzado)

Para producción sin exponer el token de GitHub, puedes crear:

- **Netlify Function** que actualice el archivo
- **Vercel Serverless Function** 
- **GitHub Action** que se active por webhook

## 📊 Formato del Archivo JSON

El archivo `likes.json` tiene este formato:

```json
{
  "rector_1": {
    "count": 125,
    "likedBy": ["user-1234567890-abc", "user-0987654321-xyz"]
  },
  "rector_2": {
    "count": 89,
    "likedBy": ["user-1111111111-def"]
  }
}
```

## 🔧 Sincronización Manual

Si necesitas sincronizar manualmente los likes desde localStorage al archivo:

1. Abre la consola del navegador (F12)
2. Ejecuta:
   ```javascript
   const likes = localStorage.getItem('usac-rectores-likes-backup');
   console.log(likes);
   ```
3. Copia el JSON resultante
4. Pégalo en `public/likes.json`

## 🚀 Despliegue

### Netlify / Vercel

1. Configura las variables de entorno en el panel de control
2. El archivo `likes.json` se actualizará automáticamente cuando los usuarios den likes
3. Los cambios se reflejan en el repositorio de GitHub

### GitHub Pages

1. Configura las variables de entorno (si usas GitHub Actions)
2. O sincroniza manualmente el archivo después de cambios importantes

## 📝 Notas

- **Sin configuración de GitHub**: Los likes funcionan perfectamente, solo se guardan localmente
- **Con GitHub configurado**: Los likes se sincronizan automáticamente con el archivo del proyecto
- **Fallback automático**: Si GitHub falla, siempre se guarda en localStorage
- **Sincronización periódica**: El sistema intenta sincronizar cada 30 segundos si hay cambios pendientes

## 🔒 Seguridad

- El token de GitHub debe mantenerse privado
- Usa variables de entorno, nunca hardcodees el token
- En producción, usa las variables de entorno del servicio de hosting
