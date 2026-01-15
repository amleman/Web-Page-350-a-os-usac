# Guía de Despliegue en Servidor Ubuntu con MySQL

Esta guía te ayudará a desplegar la aplicación en un servidor Ubuntu con MySQL.

## 📋 Requisitos Previos

- Servidor Ubuntu (20.04 o superior recomendado)
- Node.js 20.x o superior
- MySQL 8.0 o superior
- npm o yarn
- Acceso SSH al servidor
- (Opcional) Nginx como proxy reverso

## 🚀 Pasos de Instalación

### 1. Conectar al Servidor

```bash
ssh usuario@tu-servidor-ubuntu
```

### 2. Instalar Node.js

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js usando nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

O instalar directamente:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Instalar MySQL

```bash
sudo apt update
sudo apt install mysql-server -y

# Configurar MySQL (ejecutar el script de seguridad)
sudo mysql_secure_installation
```

### 4. Crear Base de Datos

```bash
# Acceder a MySQL
sudo mysql -u root -p

# Ejecutar el script de creación
# (copia el contenido de database/schema.sql)
```

O desde la línea de comandos:

```bash
mysql -u root -p < database/schema.sql
```

### 5. Crear Usuario de Base de Datos (Recomendado)

```bash
mysql -u root -p
```

```sql
CREATE USER 'rectores_user'@'localhost' IDENTIFIED BY 'tu_password_seguro';
GRANT ALL PRIVILEGES ON rectores_usac.* TO 'rectores_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 6. Clonar o Subir el Proyecto

```bash
# Opción 1: Si tienes el proyecto en Git
cd /var/www  # o donde prefieras
git clone tu-repositorio.git rectores-usac
cd rectores-usac

# Opción 2: Subir archivos manualmente
# Usa scp o sftp para subir los archivos
```

### 7. Instalar Dependencias

```bash
cd /ruta/a/tu/proyecto
npm install
```

### 8. Configurar Variables de Entorno

```bash
# Crear archivo .env
nano .env
```

```env
# Puerto del servidor
PORT=3001
NODE_ENV=production

# Configuración de MySQL
DB_HOST=localhost
DB_USER=rectores_user
DB_PASSWORD=tu_password_seguro
DB_NAME=rectores_usac
```

**⚠️ IMPORTANTE**: Agrega `.env` a `.gitignore` para no subir credenciales.

### 9. Construir la Aplicación

```bash
npm run build
```

Esto generará la carpeta `dist/` con los archivos estáticos.

### 10. Probar el Servidor

```bash
npm start
```

O solo el servidor (si ya construiste):

```bash
npm run server
```

Visita `http://tu-servidor-ip:3001` para verificar que funciona.

## 🔄 Usar PM2 para Producción (Recomendado)

PM2 mantiene la aplicación corriendo y la reinicia automáticamente.

### Instalar PM2

```bash
sudo npm install -g pm2
```

### Iniciar la Aplicación con PM2

```bash
# Desde el directorio del proyecto
pm2 start npm --name "rectores-usac" -- start

# O usar el archivo de configuración
pm2 start ecosystem.config.js
```

### Comandos Útiles de PM2

```bash
pm2 list              # Ver procesos
pm2 logs rectores-usac # Ver logs
pm2 restart rectores-usac # Reiniciar
pm2 stop rectores-usac    # Detener
pm2 delete rectores-usac  # Eliminar
pm2 save              # Guardar configuración
pm2 startup           # Iniciar al arrancar el sistema
```

### Crear archivo de configuración PM2

Crea `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'rectores-usac',
    script: 'server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

## 🌐 Configurar Nginx como Proxy Reverso (Opcional pero Recomendado)

### Instalar Nginx

```bash
sudo apt install nginx
```

### Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/rectores-usac
```

Agregar configuración:

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Tamaño máximo de archivos
    client_max_body_size 10M;
}
```

### Habilitar el Sitio

```bash
sudo ln -s /etc/nginx/sites-available/rectores-usac /etc/nginx/sites-enabled/
sudo nginx -t  # Verificar configuración
sudo systemctl restart nginx
```

### Configurar SSL con Let's Encrypt (Recomendado)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

## 🔒 Configurar Firewall

```bash
# Permitir puertos necesarios
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3001/tcp  # Aplicación (solo si no usas Nginx)

sudo ufw enable
sudo ufw status
```

## 📊 Estructura de Base de Datos

La base de datos incluye:

- **likes**: Almacena los likes de cada rector
- **visits**: Registra todas las visitas a las páginas
- **sessions**: Gestiona sesiones de usuarios
- **Vistas**: Estadísticas pre-calculadas

## 🔄 Actualizar la Aplicación

```bash
# 1. Detener PM2
pm2 stop rectores-usac

# 2. Actualizar código (si usas Git)
git pull origin main

# 3. Instalar nuevas dependencias
npm install

# 4. Actualizar base de datos (si hay cambios)
mysql -u rectores_user -p rectores_usac < database/schema.sql

# 5. Reconstruir
npm run build

# 6. Reiniciar
pm2 restart rectores-usac
```

## 📊 Consultar Estadísticas

### Desde MySQL

```bash
mysql -u rectores_user -p rectores_usac
```

```sql
-- Estadísticas generales
SELECT * FROM general_stats;

-- Visitas por rector
SELECT * FROM visits_stats;

-- Likes por rector
SELECT * FROM likes_stats;

-- Top 5 rectores más visitados
SELECT rector_id, COUNT(*) as visits 
FROM visits 
WHERE rector_id IS NOT NULL 
GROUP BY rector_id 
ORDER BY visits DESC 
LIMIT 5;
```

### Desde la API

```bash
# Estadísticas generales
curl http://localhost:3001/api/stats/general

# Estadísticas de un rector específico
curl http://localhost:3001/api/stats/visits/rector/rector_1

# Estadísticas de todos los rectores
curl http://localhost:3001/api/stats/rectors
```

## 🛠️ Solución de Problemas

### El servidor no inicia

```bash
# Verificar que Node.js esté instalado
node --version
npm --version

# Verificar logs
pm2 logs rectores-usac

# Verificar que el puerto no esté en uso
sudo netstat -tulpn | grep 3001
```

### Error de conexión a MySQL

```bash
# Verificar que MySQL esté corriendo
sudo systemctl status mysql

# Verificar conexión
mysql -u rectores_user -p rectores_usac

# Verificar variables de entorno
cat .env
```

### Verificar que la API funciona

```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/likes
curl http://localhost:3001/api/stats/general
```

### Permisos de archivos

```bash
# Asegurar que el servidor pueda escribir
sudo chown -R $USER:$USER /ruta/a/tu/proyecto
```

## 🔐 Seguridad Adicional

1. **No exponer el puerto 3001 directamente** - Usa Nginx como proxy
2. **Configurar firewall** - Solo permitir puertos necesarios
3. **Usar HTTPS** - Configurar SSL con Let's Encrypt
4. **Usuario de MySQL dedicado** - No usar root en producción
5. **Backups regulares**:
   ```bash
   mysqldump -u rectores_user -p rectores_usac > backup_$(date +%Y%m%d).sql
   ```
6. **Actualizar sistema regularmente**:
   ```bash
   sudo apt update && sudo apt upgrade
   ```

## 📝 Notas

- Los likes se guardan en MySQL en la tabla `likes`
- Las visitas se registran automáticamente en la tabla `visits`
- El sistema usa sesiones para evitar contar la misma visita múltiples veces
- PM2 mantiene la aplicación corriendo incluso después de reiniciar el servidor
- Las estadísticas se pueden consultar desde la API o directamente en MySQL

## 🔄 Backup y Restauración

### Backup

```bash
# Backup de la base de datos
mysqldump -u rectores_user -p rectores_usac > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup completo (base de datos + código)
tar -czf backup_completo_$(date +%Y%m%d).tar.gz /ruta/a/tu/proyecto backup_*.sql
```

### Restauración

```bash
# Restaurar base de datos
mysql -u rectores_user -p rectores_usac < backup_20240101_120000.sql
```
