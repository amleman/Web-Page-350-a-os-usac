# Iniciar el Servidor

Para que los likes funcionen correctamente, **debes iniciar el servidor backend**.

## Desarrollo

### Terminal 1: Servidor Backend
```bash
npm run server
```

### Terminal 2: Frontend (opcional, si quieres hot-reload)
```bash
npm run dev
```

## Producción

```bash
npm start
```

Esto construye la aplicación y inicia el servidor.

## Verificar que el servidor está corriendo

Abre en el navegador o usa curl:
```bash
curl http://localhost:3001/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "..."
}
```

## Solución de Problemas

### El contador se queda en 0

1. **Verifica que el servidor esté corriendo:**
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Verifica la conexión a MySQL:**
   - Revisa el archivo `.env` con las credenciales correctas
   - Verifica que MySQL esté corriendo: `sudo systemctl status mysql`

3. **Revisa los logs del servidor:**
   - Deberías ver: `✅ Conexión a MySQL establecida`

4. **Verifica en la consola del navegador (F12):**
   - Busca errores de red o CORS
   - Verifica que las peticiones a `/api/likes` se estén haciendo

### Error de conexión a MySQL

```bash
# Verificar que MySQL esté corriendo
sudo systemctl status mysql

# Iniciar MySQL si no está corriendo
sudo systemctl start mysql

# Verificar que la base de datos existe
mysql -u root -p -e "SHOW DATABASES LIKE 'rectores_usac';"
```

### El servidor no inicia

1. Verifica que el puerto 3001 no esté en uso:
   ```bash
   lsof -i :3001
   ```

2. Verifica las variables de entorno en `.env`

3. Verifica que las dependencias estén instaladas:
   ```bash
   npm install
   ```
